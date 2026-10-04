import { prisma, memoryStore, MemoryBooking } from '@/lib/db';
import { sendWhatsAppMessage, formatWhatsAppAlarmText } from '@/lib/whatsapp';

export interface DispatchResult {
  bookingCode: string;
  customerName: string;
  phone: string;
  status: 'SENT' | 'FAILED' | 'SKIPPED';
  provider?: string;
  messageId?: string;
  error?: string;
}

/**
 * Checks for bookings that start in approximately 60 minutes (window: 50 to 70 mins before departure)
 * and sends an automatic WhatsApp reminder alarm.
 */
export async function dispatchUpcomingAlarms(): Promise<{
  timestamp: string;
  scannedCount: number;
  dispatchedCount: number;
  results: DispatchResult[];
}> {
  const now = new Date();
  const targetMin = new Date(now.getTime() + 50 * 60 * 1000); // 50 mins ahead
  const targetMax = new Date(now.getTime() + 70 * 60 * 1000); // 70 mins ahead

  const results: DispatchResult[] = [];

  let pendingBookings: any[] = [];

  try {
    // Attempt database query first
    pendingBookings = await prisma.booking.findMany({
      where: {
        alarmSent: false,
        status: { in: ['PENDING', 'CONFIRMED', 'DISPATCHED'] },
        dateTime: {
          gte: targetMin,
          lte: targetMax,
        },
      },
      include: {
        customer: true,
      },
    });
  } catch (dbError) {
    // If Prisma connection is not yet configured on local or preview, read from memoryStore
    console.warn('[Alarm Scheduler] Database query failed or unconfigured, falling back to memory store:', (dbError as Error).message);
    pendingBookings = memoryStore.findDueForAlarm(60, 10);
  }

  for (const booking of pendingBookings) {
    try {
      const customer = booking.customer;
      const vehicle = booking.assignedVehicle || 'Van Ejecutiva #24 (Americancun)';
      const driver = booking.driverName || 'Carlos Méndez (Chofer Certificado)';
      const driverPhone = booking.driverPhone || '+52 998 555 4321';

      const sendRes = await sendWhatsAppMessage({
        toPhone: customer.phone,
        customerName: customer.name,
        bookingCode: booking.bookingCode,
        serviceType: booking.serviceType,
        origin: booking.origin,
        destination: booking.destination,
        pickupTime: new Date(booking.dateTime).toLocaleTimeString('es-MX', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'America/Cancun'
        }),
        vehicleAssigned: vehicle,
        driverName: driver,
        driverPhone: driverPhone,
        paymentMethod: booking.paymentMethod,
        totalAmount: `$${booking.totalAmount} ${booking.currency}`,
      });

      // Mark alarm as sent in DB
      try {
        await prisma.booking.update({
          where: { id: booking.id },
          data: {
            alarmSent: true,
            alarmSentAt: new Date(),
          },
        });
      } catch (err) {
        // Fallback update in memory store
        const memBooking = memoryStore.getBooking(booking.bookingCode);
        if (memBooking) {
          memBooking.alarmSent = true;
          memBooking.alarmSentAt = new Date();
        }
      }

      results.push({
        bookingCode: booking.bookingCode,
        customerName: customer.name,
        phone: customer.phone,
        status: 'SENT',
        provider: sendRes.provider,
        messageId: sendRes.messageId,
      });
    } catch (err: any) {
      console.error(`[Alarm Scheduler] Failed for booking ${booking.bookingCode}:`, err);
      results.push({
        bookingCode: booking.bookingCode,
        customerName: booking.customer?.name || 'Cliente',
        phone: booking.customer?.phone || '',
        status: 'FAILED',
        error: err.message,
      });
    }
  }

  return {
    timestamp: now.toISOString(),
    scannedCount: pendingBookings.length,
    dispatchedCount: results.filter(r => r.status === 'SENT').length,
    results,
  };
}

import { describe, it, expect } from 'vitest';
import { memoryStore } from '../src/lib/db';
import { dispatchUpcomingAlarms } from '../src/server/alarm-scheduler';
import { formatWhatsAppAlarmText } from '../src/lib/whatsapp';

describe('60-Minute Pre-Departure WhatsApp Alarm Worker', () => {
  it('correctly formats the 60-minute alarm notification message', () => {
    const text = formatWhatsAppAlarmText({
      toPhone: '+529981234567',
      customerName: 'Alejandro Domínguez',
      bookingCode: 'ACT-2026-9901',
      serviceType: 'AIRPORT_HOTEL',
      origin: 'Terminal 3 - CUN',
      destination: 'Hotel Xcaret México',
      pickupTime: '14:30',
      vehicleAssigned: 'Toyota HiAce Luxury #42',
      driverName: 'Jorge Ramírez',
      driverPhone: '+52 998 777 8899',
    });

    expect(text).toContain('RECORDATORIO DE TRASLADO (EN 60 MINUTOS)');
    expect(text).toContain('Alejandro Domínguez');
    expect(text).toContain('ACT-2026-9901');
    expect(text).toContain('Toyota HiAce Luxury #42');
    expect(text).toContain('Jorge Ramírez');
    expect(text).toContain('14:30');
    expect(text).toContain('AMERICANCUN TRANSFER');
  });

  it('detects bookings due in the 60-minute window and dispatches alarms', async () => {
    // Setup a booking exactly 60 minutes in the future
    const inSixtyMins = new Date(Date.now() + 60 * 60 * 1000);
    const bookingCode = `ACT-TEST-${Date.now()}`;

    memoryStore.saveBooking({
      id: `id-${Date.now()}`,
      bookingCode,
      serviceType: 'AIRPORT_HOTEL',
      origin: 'Aeropuerto Cancún Terminal 3',
      destination: 'Hard Rock Hotel Riviera Maya',
      dateTime: inSixtyMins,
      isRoundTrip: false,
      passengers: 4,
      category: 'GROUP_VAN',
      status: 'CONFIRMED',
      totalAmount: 85,
      currency: 'USD',
      paymentMethod: 'BANK_TRANSFER',
      paymentStatus: 'PENDING',
      assignedVehicle: 'Van VIP Económico #88',
      driverName: 'Manuel Peña',
      driverPhone: '+52 998 111 2233',
      alarmSent: false,
      customer: {
        id: 'cust-1',
        name: 'Carolina Herrera',
        email: 'carolina@test.com',
        phone: '+529989998877',
        language: 'es',
      },
      createdAt: new Date(),
    });

    // Run alarm dispatcher
    const result = await dispatchUpcomingAlarms();

    expect(result.scannedCount).toBeGreaterThan(0);
    const target = result.results.find(r => r.bookingCode === bookingCode);
    expect(target).toBeDefined();
    expect(target?.status).toBe('SENT');

    // Verify booking in memory is now marked as alarmSent = true
    const updated = memoryStore.getBooking(bookingCode);
    expect(updated?.alarmSent).toBe(true);
    expect(updated?.alarmSentAt).toBeInstanceOf(Date);
  });

  it('skips bookings outside the 60-minute window (e.g. 5 hours in the future)', async () => {
    const fiveHoursAhead = new Date(Date.now() + 5 * 60 * 60 * 1000);
    const futureBookingCode = `ACT-FUTURE-${Date.now()}`;

    memoryStore.saveBooking({
      id: `id-future-${Date.now()}`,
      bookingCode: futureBookingCode,
      serviceType: 'TOUR',
      origin: 'Cancún Zona Hotelera',
      destination: 'Chichén Itzá',
      dateTime: fiveHoursAhead,
      isRoundTrip: true,
      passengers: 2,
      category: 'GROUP_VAN',
      status: 'CONFIRMED',
      totalAmount: 210,
      currency: 'USD',
      paymentMethod: 'CASH',
      paymentStatus: 'PENDING',
      alarmSent: false,
      customer: {
        id: 'cust-2',
        name: 'David Beckham',
        email: 'david@test.com',
        phone: '+14155551234',
        language: 'en',
      },
      createdAt: new Date(),
    });

    const dueBookings = memoryStore.findDueForAlarm(60, 10);
    const found = dueBookings.find(b => b.bookingCode === futureBookingCode);
    expect(found).toBeUndefined(); // Should not be due yet
  });
});

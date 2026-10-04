import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: PrismaClient | undefined;
}

export const prisma =
  globalThis.prismaGlobal ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma;
}

// In-memory resilient store for bookings when DB connection is not initialized
export interface MemoryBooking {
  id: string;
  bookingCode: string;
  serviceType: string;
  origin: string;
  destination: string;
  dateTime: Date;
  returnDateTime?: Date | null;
  isRoundTrip: boolean;
  passengers: number;
  category: string;
  status: string;
  totalAmount: number;
  currency: string;
  paymentMethod: string;
  paymentStatus: string;
  speiClabe?: string;
  speiConcept?: string;
  flightNumber?: string;
  terminal?: string;
  hotelName?: string;
  notes?: string;
  assignedVehicle?: string;
  driverName?: string;
  driverPhone?: string;
  alarmSent: boolean;
  alarmSentAt?: Date | null;
  customer: {
    id: string;
    name: string;
    email: string;
    phone: string;
    language: string;
  };
  createdAt: Date;
}

export const memoryStore = {
  bookings: new Map<string, MemoryBooking>(),

  saveBooking(booking: MemoryBooking) {
    this.bookings.set(booking.bookingCode, booking);
    this.bookings.set(booking.id, booking);
    return booking;
  },

  getBooking(codeOrId: string) {
    return this.bookings.get(codeOrId) || null;
  },

  findDueForAlarm(targetWindowMinutes: number = 60, windowToleranceMinutes: number = 10) {
    const now = new Date().getTime();
    const results: MemoryBooking[] = [];

    for (const b of this.bookings.values()) {
      if (b.alarmSent) continue;
      const pickupTime = new Date(b.dateTime).getTime();
      const diffMinutes = (pickupTime - now) / (1000 * 60);

      // Check if pickup is within [50, 70] minutes from now
      if (diffMinutes >= (targetWindowMinutes - windowToleranceMinutes) && 
          diffMinutes <= (targetWindowMinutes + windowToleranceMinutes)) {
        results.push(b);
      }
    }
    return results;
  }
};

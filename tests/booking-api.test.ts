import { describe, it, expect } from 'vitest';
import { POST as createBookingHandler, GET as getBookingHandler } from '../src/app/api/bookings/route';
import { NextRequest } from 'next/server';

describe('Booking API Endpoints (Creation & Lookup)', () => {
  it('creates a new booking with SPEI voucher and customer record', async () => {
    const req = new NextRequest('http://localhost:3000/api/bookings', {
      method: 'POST',
      body: JSON.stringify({
        serviceType: 'AIRPORT_HOTEL',
        origin: 'Aeropuerto Cancún - Terminal 3',
        destination: 'cancun-zona-hotelera',
        dateTime: '2026-11-20T14:00:00Z',
        isRoundTrip: true,
        passengers: 4,
        category: 'GROUP_VAN',
        paymentMethod: 'BANK_TRANSFER',
        currency: 'USD',
        flightNumber: 'UA 1234',
        hotelName: 'Riu Cancun',
        customer: {
          name: 'Alejandro Morales',
          email: 'alejandro@example.com',
          phone: '+529981122334',
        },
      }),
    });

    const res = await createBookingHandler(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.booking.bookingCode).toMatch(/^ACT-\d{4}-\d{4}$/);
    expect(data.booking.speiVoucher).toBeDefined();
    expect(data.booking.speiVoucher.clabe.length).toBe(18);
    expect(data.booking.speiVoucher.concept).toBe(data.booking.bookingCode.replace(/[^A-Z0-9]/gi, ''));
    expect(data.booking.totalAmount).toBe(81); // 45 * 2 = 90 - 10% = 81
    expect(data.booking.customer.name).toBe('Alejandro Morales');
  });

  it('rejects booking if mandatory fields are missing', async () => {
    const req = new NextRequest('http://localhost:3000/api/bookings', {
      method: 'POST',
      body: JSON.stringify({
        serviceType: 'AIRPORT_HOTEL',
        // missing customer and destination
      }),
    });

    const res = await createBookingHandler(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.success).toBe(false);
  });
});

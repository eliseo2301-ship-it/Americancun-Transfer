import { NextRequest, NextResponse } from 'next/server';
import { prisma, memoryStore } from '@/lib/db';
import { calculateQuote, CATEGORY_DETAILS } from '@/lib/pricing';
import { generateSpeiVoucher, generateBookingCode } from '@/lib/spei';
import { sendWhatsAppMessage } from '@/lib/whatsapp';
import { ServiceType, VehicleCategory, PaymentMethod } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      serviceType = 'AIRPORT_HOTEL',
      origin = 'Aeropuerto Cancún (CUN)',
      destination,
      dateTime,
      returnDateTime,
      isRoundTrip = false,
      passengers = 1,
      category = 'GROUP_VAN',
      paymentMethod = 'BANK_TRANSFER',
      currency = 'USD',
      flightNumber = '',
      terminal = '',
      hotelName = '',
      notes = '',
      customer
    } = body;

    if (!customer?.name || !customer?.phone || !customer?.email) {
      return NextResponse.json(
        { success: false, error: 'Nombre, teléfono (WhatsApp) y correo son obligatorios.' },
        { status: 400 }
      );
    }

    if (!destination || !dateTime) {
      return NextResponse.json(
        { success: false, error: 'Destino y fecha/hora de traslado son obligatorios.' },
        { status: 400 }
      );
    }

    // 1. Calculate price
    const quote = calculateQuote({
      serviceType: serviceType as ServiceType,
      origin,
      destination,
      isRoundTrip: Boolean(isRoundTrip),
      passengers: Number(passengers),
      category: category as VehicleCategory,
      currency: currency as 'USD' | 'MXN'
    });

    // 2. Generate unique booking code
    const bookingCode = generateBookingCode();

    // 3. Pre-assign vehicle & driver info
    const vehicleAssigned = category === 'VIP_SUBURBAN' 
      ? 'Chevrolet Suburban Platinum #09'
      : (passengers > 8 ? 'Toyota HiAce Gran Maxi #33' : 'Toyota HiAce Luxury #18');
    const driverName = 'Carlos Méndez (Operador Bilingüe)';
    const driverPhone = '+52 998 555 1234';

    // 4. Generate SPEI voucher if bank transfer
    let speiVoucher = null;
    let speiClabe = null;
    let speiConcept = null;

    if (paymentMethod === 'BANK_TRANSFER') {
      speiVoucher = generateSpeiVoucher({
        bookingCode,
        amount: quote.total,
        currency: currency as 'USD' | 'MXN',
        customerName: customer.name
      });
      speiClabe = speiVoucher.clabe;
      speiConcept = speiVoucher.concept;
    }

    const pickupDate = new Date(dateTime);
    const returnDate = returnDateTime ? new Date(returnDateTime) : null;
    const alarmTime = new Date(pickupDate.getTime() - 60 * 60 * 1000);

    let createdBooking: any = null;

    // 5. Try persisting to Prisma DB
    try {
      let dbCustomer = await prisma.customer.findFirst({
        where: { email: customer.email }
      });

      if (!dbCustomer) {
        dbCustomer = await prisma.customer.create({
          data: {
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            language: customer.language || 'es',
          }
        });
      }

      createdBooking = await prisma.booking.create({
        data: {
          bookingCode,
          serviceType: serviceType as any,
          origin: quote.origin,
          destination: quote.destination,
          dateTime: pickupDate,
          returnDateTime: returnDate,
          isRoundTrip: Boolean(isRoundTrip),
          passengers: Number(passengers),
          category: category as any,
          status: 'CONFIRMED',
          totalAmount: quote.total,
          currency,
          paymentMethod: paymentMethod as any,
          paymentStatus: paymentMethod === 'CASH' ? 'PENDING' : 'PENDING',
          speiClabe,
          speiConcept,
          flightNumber,
          terminal,
          hotelName,
          notes,
          assignedVehicle: vehicleAssigned,
          driverName,
          driverPhone,
          customerId: dbCustomer.id,
        },
        include: {
          customer: true
        }
      });
    } catch (dbErr) {
      console.warn('[DB Booking Fallback to memory store]', (dbErr as Error).message);
      // Fallback in memory
      const memCustomer = {
        id: `cust-${Date.now()}`,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        language: customer.language || 'es'
      };

      createdBooking = memoryStore.saveBooking({
        id: `book-${Date.now()}`,
        bookingCode,
        serviceType,
        origin: quote.origin,
        destination: quote.destination,
        dateTime: pickupDate,
        returnDateTime: returnDate,
        isRoundTrip: Boolean(isRoundTrip),
        passengers: Number(passengers),
        category,
        status: 'CONFIRMED',
        totalAmount: quote.total,
        currency,
        paymentMethod,
        paymentStatus: 'PENDING',
        speiClabe: speiClabe || undefined,
        speiConcept: speiConcept || undefined,
        flightNumber,
        terminal,
        hotelName,
        notes,
        assignedVehicle: vehicleAssigned,
        driverName,
        driverPhone,
        alarmSent: false,
        customer: memCustomer,
        createdAt: new Date()
      });
    }

    // 6. Send immediate booking confirmation dispatch (WhatsApp)
    try {
      await sendWhatsAppMessage({
        toPhone: customer.phone,
        customerName: customer.name,
        bookingCode,
        serviceType: quote.serviceType,
        origin: quote.origin,
        destination: quote.destination,
        pickupTime: pickupDate.toLocaleString('es-MX', { timeZone: 'America/Cancun' }),
        vehicleAssigned,
        driverName,
        driverPhone,
        paymentMethod,
        totalAmount: `$${quote.total} ${currency}`
      });
    } catch (msgErr) {
      console.error('[WhatsApp Booking Notification Error]:', msgErr);
    }

    return NextResponse.json({
      success: true,
      booking: {
        bookingCode,
        id: createdBooking.id,
        serviceType,
        origin: quote.origin,
        destination: quote.destination,
        dateTime: pickupDate.toISOString(),
        returnDateTime: returnDate?.toISOString() || null,
        isRoundTrip: Boolean(isRoundTrip),
        passengers: Number(passengers),
        category,
        categoryLabel: CATEGORY_DETAILS[category as VehicleCategory]?.label || category,
        status: 'CONFIRMED',
        totalAmount: quote.total,
        currency,
        paymentMethod,
        speiVoucher,
        assignedVehicle: vehicleAssigned,
        driverName,
        driverPhone,
        alarmScheduledTime: alarmTime.toISOString(),
        customer: {
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
        }
      }
    });

  } catch (error: any) {
    console.error('[Booking API Error]:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Error procesando reserva' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');

    if (!code) {
      return NextResponse.json({ success: false, error: 'Código de reserva requerido' }, { status: 400 });
    }

    let booking: any = null;
    try {
      booking = await prisma.booking.findUnique({
        where: { bookingCode: code },
        include: { customer: true }
      });
    } catch {
      booking = memoryStore.getBooking(code);
    }

    if (!booking) {
      return NextResponse.json({ success: false, error: 'Reserva no encontrada' }, { status: 404 });
    }

    let speiVoucher = null;
    if (booking.paymentMethod === 'BANK_TRANSFER') {
      speiVoucher = generateSpeiVoucher({
        bookingCode: booking.bookingCode,
        amount: booking.totalAmount,
        currency: booking.currency as any,
        customerName: booking.customer.name
      });
    }

    return NextResponse.json({
      success: true,
      booking: {
        ...booking,
        speiVoucher
      }
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

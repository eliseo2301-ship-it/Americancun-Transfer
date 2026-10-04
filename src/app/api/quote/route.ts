import { NextRequest, NextResponse } from 'next/server';
import { calculateQuote, CATEGORY_DETAILS } from '@/lib/pricing';
import { ServiceType, VehicleCategory } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      serviceType = 'AIRPORT_HOTEL',
      origin = 'Aeropuerto Cancún (CUN)',
      destination = 'cancun-zona-hotelera',
      isRoundTrip = false,
      passengers = 1,
      category = 'GROUP_VAN',
      currency = 'USD'
    } = body;

    const quote = calculateQuote({
      serviceType: serviceType as ServiceType,
      origin,
      destination,
      isRoundTrip: Boolean(isRoundTrip),
      passengers: Number(passengers),
      category: category as VehicleCategory,
      currency: currency as 'USD' | 'MXN'
    });

    const categoryInfo = CATEGORY_DETAILS[category as VehicleCategory] || CATEGORY_DETAILS.GROUP_VAN;

    return NextResponse.json({
      success: true,
      quote,
      categoryInfo,
      generatedAt: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Error calculando cotización' },
      { status: 400 }
    );
  }
}

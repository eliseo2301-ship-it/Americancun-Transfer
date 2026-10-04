import { ServiceType, VehicleCategory, QuoteCalculation } from '@/types';
import { DESTINATIONS_DATA } from './destinations-data';

export const USD_TO_MXN_RATE = 18.50;

export const CATEGORY_DETAILS: Record<VehicleCategory, {
  label: string;
  sublabel: string;
  capacity: string;
  amenities: string[];
  vehicleModel: string;
}> = {
  PER_PERSON: {
    label: 'Servicio Compartido',
    sublabel: 'Por persona',
    capacity: '1 - 4 personas recomendadas',
    amenities: ['Aire acondicionado', 'Unidad sanitizada', 'Asiento individual garantizado', 'Salidas regulares'],
    vehicleModel: 'Toyota HiAce / Crafter compartida'
  },
  GROUP_VAN: {
    label: 'Van Privada Exclusiva',
    sublabel: 'Ideal para familias y grupos (Hasta 8 o 16 pax)',
    capacity: '1 a 8 pax (Estándar) / 9 a 16 pax (Maxi)',
    amenities: ['Servicio 100% privado sin escalas', 'Monitoreo de vuelo en tiempo real', 'Aguas embotelladas frías', 'Wifi a bordo', 'Asientos reclinables de piel sintética'],
    vehicleModel: 'Toyota HiAce Luxury / Ford Transit'
  },
  VIP_SUBURBAN: {
    label: 'Servicio VIP Platinum',
    sublabel: 'Lujo, discreción y amenidades premium',
    capacity: 'Hasta 6 pasajeros con equipaje amplio',
    amenities: ['Cervezas frías o vino espumoso de bienvenida', 'Chofer ejecutivo de etiqueta bilingüe', 'Toallitas húmedas refrescantes con aroma a coco', 'Cargadores de alta velocidad iPhone & Android', 'Privacidad y escolta de equipaje'],
    vehicleModel: 'Chevrolet Suburban Premier / Cadillac Escalade'
  }
};

export function calculateQuote(params: {
  serviceType: ServiceType;
  origin: string;
  destination: string;
  isRoundTrip: boolean;
  passengers: number;
  category: VehicleCategory;
  currency?: 'USD' | 'MXN';
}): QuoteCalculation {
  const {
    serviceType,
    origin,
    destination,
    isRoundTrip,
    passengers = 1,
    category = 'GROUP_VAN',
    currency = 'USD'
  } = params;

  // Find destination in catalog or fallback
  const matched = DESTINATIONS_DATA.find(
    d => d.slug === destination || d.name.toLowerCase().includes(destination.toLowerCase()) || d.id === destination
  ) || DESTINATIONS_DATA[0];

  let baseRateUsd = 0;

  switch (category) {
    case 'PER_PERSON':
      // Per person rate multiplied by passengers count
      baseRateUsd = matched.pricePerPersonUsd * Math.max(1, passengers);
      break;

    case 'GROUP_VAN':
      // Base group van covers up to 8 pax, if more than 8 pax (up to 16) add a 35% surcharge for Maxi-Van
      if (passengers > 8) {
        baseRateUsd = Math.round(matched.priceGroupVanUsd * 1.35);
      } else {
        baseRateUsd = matched.priceGroupVanUsd;
      }
      break;

    case 'VIP_SUBURBAN':
      baseRateUsd = matched.priceVipUsd;
      break;
  }

  // Round trip multiplier: 2x base, with a 10% discount on the total
  let subtotalUsd = isRoundTrip ? baseRateUsd * 2 : baseRateUsd;
  let roundTripDiscountUsd = isRoundTrip ? Math.round(subtotalUsd * 0.10) : 0;
  let finalUsd = subtotalUsd - roundTripDiscountUsd;

  // Best Price Guarantee: Show difference compared to standard airport on-site kiosk rates (which are 25-30% higher)
  const competitorRateUsd = Math.round(finalUsd * 1.28);
  const bestPriceGuaranteeSavingsUsd = competitorRateUsd - finalUsd;

  // Currency multiplier
  const multiplier = currency === 'MXN' ? USD_TO_MXN_RATE : 1;

  return {
    serviceType,
    origin: origin || 'Aeropuerto Cancún (CUN)',
    destination: matched.name,
    isRoundTrip,
    passengers,
    category,
    currency,
    unitPrice: Math.round(baseRateUsd * multiplier),
    subtotal: Math.round(subtotalUsd * multiplier),
    roundTripDiscount: Math.round(roundTripDiscountUsd * multiplier),
    bestPriceGuaranteeSavings: Math.round(bestPriceGuaranteeSavingsUsd * multiplier),
    total: Math.round(finalUsd * multiplier),
    estimatedMinutes: parseDurationToMinutes(matched.estimatedDuration),
    includedAmenities: CATEGORY_DETAILS[category].amenities
  };
}

function parseDurationToMinutes(durationStr: string): number {
  if (durationStr.includes('horas') || durationStr.includes('hora')) {
    const num = parseFloat(durationStr);
    return Math.round((num || 2) * 60);
  }
  const match = durationStr.match(/\d+/);
  return match ? parseInt(match[0], 10) : 35;
}

export function formatPrice(amount: number, currency: 'USD' | 'MXN' = 'USD'): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0
  }).format(amount);
}

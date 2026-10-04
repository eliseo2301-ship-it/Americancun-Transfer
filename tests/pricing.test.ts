import { describe, it, expect } from 'vitest';
import { calculateQuote, formatPrice } from '../src/lib/pricing';

describe('Tarifario Inteligente & Dynamic Pricing Engine', () => {
  it('calculates correct single trip price for standard group van', () => {
    const quote = calculateQuote({
      serviceType: 'AIRPORT_HOTEL',
      origin: 'Aeropuerto Cancún (CUN)',
      destination: 'cancun-zona-hotelera',
      isRoundTrip: false,
      passengers: 4,
      category: 'GROUP_VAN',
      currency: 'USD',
    });

    expect(quote.total).toBe(45);
    expect(quote.isRoundTrip).toBe(false);
    expect(quote.roundTripDiscount).toBe(0);
    expect(quote.bestPriceGuaranteeSavings).toBeGreaterThan(0);
  });

  it('applies 10% round-trip discount correctly', () => {
    const quote = calculateQuote({
      serviceType: 'AIRPORT_HOTEL',
      origin: 'Aeropuerto Cancún (CUN)',
      destination: 'cancun-zona-hotelera',
      isRoundTrip: true,
      passengers: 4,
      category: 'GROUP_VAN',
      currency: 'USD',
    });

    // Single is 45, roundtrip raw is 90, 10% discount is 9, final is 81
    expect(quote.subtotal).toBe(90);
    expect(quote.roundTripDiscount).toBe(9);
    expect(quote.total).toBe(81);
  });

  it('handles per-person shared transfer rates scaling with passenger count', () => {
    const singlePax = calculateQuote({
      serviceType: 'AIRPORT_HOTEL',
      origin: 'Aeropuerto Cancún (CUN)',
      destination: 'cancun-zona-hotelera',
      isRoundTrip: false,
      passengers: 1,
      category: 'PER_PERSON',
      currency: 'USD',
    });

    const threePax = calculateQuote({
      serviceType: 'AIRPORT_HOTEL',
      origin: 'Aeropuerto Cancún (CUN)',
      destination: 'cancun-zona-hotelera',
      isRoundTrip: false,
      passengers: 3,
      category: 'PER_PERSON',
      currency: 'USD',
    });

    expect(singlePax.total).toBe(15);
    expect(threePax.total).toBe(45);
  });

  it('applies Maxi-Van surcharge for groups greater than 8 passengers', () => {
    const standardVan = calculateQuote({
      serviceType: 'AIRPORT_HOTEL',
      origin: 'Aeropuerto Cancún (CUN)',
      destination: 'playa-del-carmen',
      isRoundTrip: false,
      passengers: 6,
      category: 'GROUP_VAN',
      currency: 'USD',
    });

    const maxiVan = calculateQuote({
      serviceType: 'AIRPORT_HOTEL',
      origin: 'Aeropuerto Cancún (CUN)',
      destination: 'playa-del-carmen',
      isRoundTrip: false,
      passengers: 12,
      category: 'GROUP_VAN',
      currency: 'USD',
    });

    expect(standardVan.total).toBe(75);
    // Maxi van has 35% surcharge: 75 * 1.35 = 101.25 -> 101
    expect(maxiVan.total).toBeGreaterThan(standardVan.total);
    expect(maxiVan.total).toBe(101);
  });

  it('calculates VIP Suburban tier with luxury amenities', () => {
    const vip = calculateQuote({
      serviceType: 'AIRPORT_HOTEL',
      origin: 'Aeropuerto Cancún (CUN)',
      destination: 'tulum',
      isRoundTrip: false,
      passengers: 4,
      category: 'VIP_SUBURBAN',
      currency: 'USD',
    });

    expect(vip.total).toBe(240);
    expect(vip.includedAmenities).toContain('Cervezas frías o vino espumoso de bienvenida');
  });

  it('converts properly to MXN currency using exchange rate', () => {
    const quoteMxn = calculateQuote({
      serviceType: 'AIRPORT_HOTEL',
      origin: 'Aeropuerto Cancún (CUN)',
      destination: 'cancun-zona-hotelera',
      isRoundTrip: false,
      passengers: 2,
      category: 'GROUP_VAN',
      currency: 'MXN',
    });

    expect(quoteMxn.currency).toBe('MXN');
    expect(quoteMxn.total).toBe(Math.round(45 * 18.5));
  });
});

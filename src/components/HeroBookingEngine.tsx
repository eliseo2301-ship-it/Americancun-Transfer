'use client';

import React, { useState, useMemo } from 'react';
import { 
  Plane, 
  Building2, 
  MapPin, 
  Calendar, 
  Users, 
  Clock, 
  ArrowRightLeft, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  Info,
  Car
} from 'lucide-react';
import { ServiceType, VehicleCategory } from '@/types';
import { DESTINATIONS_DATA, AIRPORT_ORIGINS, HOTEL_HOTEL_ZONES } from '@/lib/destinations-data';
import { calculateQuote, CATEGORY_DETAILS, formatPrice } from '@/lib/pricing';

interface HeroBookingEngineProps {
  currency: 'USD' | 'MXN';
  onBookNow: (bookingDetails: any) => void;
}

export const HeroBookingEngine: React.FC<HeroBookingEngineProps> = ({ currency, onBookNow }) => {
  const [serviceType, setServiceType] = useState<ServiceType>('AIRPORT_HOTEL');
  const [origin, setOrigin] = useState<string>('CUN_GEN');
  const [destinationSlug, setDestinationSlug] = useState<string>('cancun-zona-hotelera');
  const [hotelHotelOrigin, setHotelHotelOrigin] = useState<string>('Cancún Zona Hotelera');
  const [dateTime, setDateTime] = useState<string>('2026-10-15T12:00');
  const [isRoundTrip, setIsRoundTrip] = useState<boolean>(true);
  const [returnDateTime, setReturnDateTime] = useState<string>('2026-10-22T14:00');
  const [passengers, setPassengers] = useState<number>(2);
  const [category, setCategory] = useState<VehicleCategory>('GROUP_VAN');

  // Real-time calculation
  const quote = useMemo(() => {
    let effectiveOrigin = 'Aeropuerto Cancún (CUN)';
    if (serviceType === 'HOTEL_HOTEL') {
      effectiveOrigin = hotelHotelOrigin;
    } else if (serviceType === 'TOUR') {
      effectiveOrigin = 'Hotel o punto de partida';
    } else {
      const matchAirport = AIRPORT_ORIGINS.find(a => a.id === origin);
      if (matchAirport) effectiveOrigin = matchAirport.name;
    }

    return calculateQuote({
      serviceType,
      origin: effectiveOrigin,
      destination: destinationSlug,
      isRoundTrip,
      passengers,
      category,
      currency
    });
  }, [serviceType, origin, destinationSlug, hotelHotelOrigin, isRoundTrip, passengers, category, currency]);

  const selectedDestination = useMemo(() => {
    return DESTINATIONS_DATA.find(d => d.slug === destinationSlug) || DESTINATIONS_DATA[0];
  }, [destinationSlug]);

  const handleStartBooking = () => {
    onBookNow({
      serviceType,
      origin: quote.origin,
      destination: quote.destination,
      destinationSlug,
      dateTime,
      returnDateTime: isRoundTrip ? returnDateTime : undefined,
      isRoundTrip,
      passengers,
      category,
      currency,
      quote
    });
  };

  return (
    <div id="booking-engine" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-gold-600/15 via-caribbean-500/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cancún • Riviera Maya • Yucatán • Parques</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-white tracking-tight leading-tight">
            Traslados Privados de <span className="gold-gradient-text">Clase Mundial</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-gray-300">
            Cotizaciones instantáneas, tarifas más competitivas del mercado, checkout automatizado vía SPEI o Efectivo y asistencia bilingüe con alertas 60 minutos antes a tu WhatsApp.
          </p>
        </div>

        {/* Engine Box */}
        <div className="glass-panel-gold rounded-3xl p-6 sm:p-8 shadow-2xl shadow-navy-950/80 max-w-5xl mx-auto">
          
          {/* Tabs Selector */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 p-1.5 bg-navy-950/90 rounded-2xl border border-gold-500/20 mb-8">
            <button
              onClick={() => setServiceType('AIRPORT_HOTEL')}
              className={`flex items-center justify-center gap-2 py-3 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                serviceType === 'AIRPORT_HOTEL'
                  ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 shadow-lg font-bold'
                  : 'text-gray-300 hover:text-white hover:bg-navy-900/60'
              }`}
            >
              <Plane className="w-4 h-4" />
              <span>Aeropuerto - Hotel</span>
            </button>

            <button
              onClick={() => setServiceType('HOTEL_HOTEL')}
              className={`flex items-center justify-center gap-2 py-3 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                serviceType === 'HOTEL_HOTEL'
                  ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 shadow-lg font-bold'
                  : 'text-gray-300 hover:text-white hover:bg-navy-900/60'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Hotel - Hotel</span>
            </button>

            <button
              onClick={() => setServiceType('TOUR')}
              className={`flex items-center justify-center gap-2 py-3 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                serviceType === 'TOUR'
                  ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 shadow-lg font-bold'
                  : 'text-gray-300 hover:text-white hover:bg-navy-900/60'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Tours Privados y Grupales</span>
            </button>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            
            {/* Origin */}
            <div className="bg-navy-900/90 border border-gold-500/25 rounded-2xl p-3.5 focus-within:border-gold-400 transition-colors">
              <label className="text-[11px] font-medium uppercase tracking-wider text-gold-400 block mb-1">
                Punto de Partida
              </label>
              {serviceType === 'AIRPORT_HOTEL' ? (
                <select
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  aria-label="Punto de partida Aeropuerto de Cancún"
                  className="w-full bg-transparent text-sm font-medium text-white focus:outline-none cursor-pointer"
                >
                  {AIRPORT_ORIGINS.map(orig => (
                    <option key={orig.id} value={orig.id} className="bg-navy-950 text-white">
                      {orig.name}
                    </option>
                  ))}
                </select>
              ) : serviceType === 'HOTEL_HOTEL' ? (
                <select
                  value={hotelHotelOrigin}
                  onChange={(e) => setHotelHotelOrigin(e.target.value)}
                  aria-label="Zona hotelera de origen"
                  className="w-full bg-transparent text-sm font-medium text-white focus:outline-none cursor-pointer"
                >
                  {HOTEL_HOTEL_ZONES.map(zone => (
                    <option key={zone} value={zone} className="bg-navy-950 text-white">
                      {zone}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  placeholder="Tu Hotel / Airbnb / Villa"
                  defaultValue="Hotel / Villa en Cancún o Riviera Maya"
                  aria-label="Punto de recogida para el tour"
                  className="w-full bg-transparent text-sm font-medium text-white focus:outline-none"
                />
              )}
            </div>

            {/* Destination */}
            <div className="bg-navy-900/90 border border-gold-500/25 rounded-2xl p-3.5 focus-within:border-gold-400 transition-colors">
              <label className="text-[11px] font-medium uppercase tracking-wider text-gold-400 block mb-1">
                Destino o Tour
              </label>
              <select
                value={destinationSlug}
                onChange={(e) => setDestinationSlug(e.target.value)}
                aria-label="Destino o Tour turístico"
                className="w-full bg-transparent text-sm font-medium text-white focus:outline-none cursor-pointer"
              >
                <optgroup label="Quintana Roo" className="bg-navy-950 text-gold-300 font-semibold">
                  {DESTINATIONS_DATA.filter(d => d.region === 'quintana_roo').map(d => (
                    <option key={d.slug} value={d.slug} className="bg-navy-950 text-white">
                      {d.name} ({d.estimatedDuration})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Yucatán & Cultura" className="bg-navy-950 text-gold-300 font-semibold">
                  {DESTINATIONS_DATA.filter(d => d.region === 'yucatan').map(d => (
                    <option key={d.slug} value={d.slug} className="bg-navy-950 text-white">
                      {d.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Parques y Aventura" className="bg-navy-950 text-gold-300 font-semibold">
                  {DESTINATIONS_DATA.filter(d => d.region === 'parques').map(d => (
                    <option key={d.slug} value={d.slug} className="bg-navy-950 text-white">
                      {d.name}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* Date & Time */}
            <div className="bg-navy-900/90 border border-gold-500/25 rounded-2xl p-3.5 focus-within:border-gold-400 transition-colors">
              <label className="text-[11px] font-medium uppercase tracking-wider text-gold-400 block mb-1">
                Fecha & Hora de Ida
              </label>
              <input
                type="datetime-local"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                aria-label="Fecha y hora de recogida"
                className="w-full bg-transparent text-sm font-medium text-white focus:outline-none cursor-pointer"
              />
            </div>

            {/* Passengers & Trip Type */}
            <div className="bg-navy-900/90 border border-gold-500/25 rounded-2xl p-3.5 focus-within:border-gold-400 transition-colors flex items-center justify-between">
              <div>
                <label className="text-[11px] font-medium uppercase tracking-wider text-gold-400 block mb-1">
                  Pasajeros
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setPassengers(Math.max(1, passengers - 1))}
                    className="w-7 h-7 rounded-lg bg-navy-800 border border-gold-500/30 text-white flex items-center justify-center hover:bg-gold-500 hover:text-navy-950 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-sm font-bold text-white min-w-[20px] text-center">
                    {passengers}
                  </span>
                  <button
                    type="button"
                    onClick={() => setPassengers(Math.min(16, passengers + 1))}
                    className="w-7 h-7 rounded-lg bg-navy-800 border border-gold-500/30 text-white flex items-center justify-center hover:bg-gold-500 hover:text-navy-950 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Round Trip Toggle */}
              <div className="text-right">
                <span className="text-[10px] text-gray-400 block mb-1">¿Viaje Redondo?</span>
                <button
                  type="button"
                  onClick={() => setIsRoundTrip(!isRoundTrip)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    isRoundTrip
                      ? 'bg-gold-500 text-navy-950 font-bold shadow'
                      : 'bg-navy-800 text-gray-400 border border-gray-700'
                  }`}
                >
                  <ArrowRightLeft className="w-3 h-3" />
                  {isRoundTrip ? 'Sí (10% OFF)' : 'Solo Ida'}
                </button>
              </div>
            </div>
          </div>

          {/* Return Date Row (if roundtrip) */}
          {isRoundTrip && (
            <div className="mb-6 p-4 rounded-2xl bg-gold-500/5 border border-gold-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-gold-300">
                <Calendar className="w-4 h-4 text-gold-400" />
                <span>Fecha y Hora de Regreso (Recogida para volver al aeropuerto u origen):</span>
              </div>
              <input
                type="datetime-local"
                value={returnDateTime}
                onChange={(e) => setReturnDateTime(e.target.value)}
                aria-label="Fecha y hora de regreso"
                className="bg-navy-900 border border-gold-500/30 text-white text-sm rounded-xl px-3 py-2 focus:outline-none cursor-pointer"
              />
            </div>
          )}

          {/* Vehicle Category Selector */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-300">
                Selecciona tu Categoría de Vehículo:
              </span>
              <span className="text-xs text-gold-400 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Tarifa congelada garantizada
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              {/* Option 1: Per Person */}
              <div
                onClick={() => setCategory('PER_PERSON')}
                className={`cursor-pointer rounded-2xl p-4 transition-all border ${
                  category === 'PER_PERSON'
                    ? 'border-gold-400 bg-gold-500/15 shadow-lg shadow-gold-500/10 scale-[1.02]'
                    : 'border-navy-800 bg-navy-900/60 hover:border-gold-500/40'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Por Persona
                  </span>
                  {category === 'PER_PERSON' && (
                    <div className="w-5 h-5 rounded-full bg-gold-400 text-navy-950 flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>
                <div className="text-xl font-extrabold text-gold-300 mb-1">
                  {formatPrice(selectedDestination.pricePerPersonUsd * (currency === 'MXN' ? 18.5 : 1), currency)}
                  <span className="text-xs font-normal text-gray-400 ml-1">/ pax</span>
                </div>
                <p className="text-xs text-gray-300">Servicio compartido en van con salidas continuas.</p>
              </div>

              {/* Option 2: Group Van (Most Popular) */}
              <div
                onClick={() => setCategory('GROUP_VAN')}
                className={`cursor-pointer rounded-2xl p-4 transition-all border relative ${
                  category === 'GROUP_VAN'
                    ? 'border-gold-400 bg-gold-500/20 shadow-xl shadow-gold-500/15 scale-[1.02]'
                    : 'border-navy-800 bg-navy-900/60 hover:border-gold-500/40'
                }`}
              >
                <div className="absolute -top-3 right-4 px-2 py-0.5 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 text-navy-950 font-bold text-[9px] uppercase tracking-wider">
                  Más Popular
                </div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Van Privada Exclusiva
                  </span>
                  {category === 'GROUP_VAN' && (
                    <div className="w-5 h-5 rounded-full bg-gold-400 text-navy-950 flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>
                <div className="text-xl font-extrabold text-gold-300 mb-1">
                  {formatPrice(selectedDestination.priceGroupVanUsd * (currency === 'MXN' ? 18.5 : 1), currency)}
                  <span className="text-xs font-normal text-gray-400 ml-1">/ unidad</span>
                </div>
                <p className="text-xs text-gray-300">Hasta 8 o 16 pax. 100% privado y directo a tu hotel.</p>
              </div>

              {/* Option 3: VIP Suburban */}
              <div
                onClick={() => setCategory('VIP_SUBURBAN')}
                className={`cursor-pointer rounded-2xl p-4 transition-all border ${
                  category === 'VIP_SUBURBAN'
                    ? 'border-gold-400 bg-gold-500/15 shadow-lg shadow-gold-500/10 scale-[1.02]'
                    : 'border-navy-800 bg-navy-900/60 hover:border-gold-500/40'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-gold-400" />
                    VIP Platinum
                  </span>
                  {category === 'VIP_SUBURBAN' && (
                    <div className="w-5 h-5 rounded-full bg-gold-400 text-navy-950 flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>
                <div className="text-xl font-extrabold text-gold-300 mb-1">
                  {formatPrice(selectedDestination.priceVipUsd * (currency === 'MXN' ? 18.5 : 1), currency)}
                  <span className="text-xs font-normal text-gray-400 ml-1">/ unidad</span>
                </div>
                <p className="text-xs text-gray-300">Chevrolet Suburban con amenidades y bebidas de lujo.</p>
              </div>

            </div>
          </div>

          {/* Pricing Summary & Best Price Guarantee Callout */}
          <div className="p-5 rounded-2xl bg-navy-950 border border-gold-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="flex flex-col space-y-1 w-full md:w-auto">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Total a pagar:</span>
                {quote.roundTripDiscount > 0 && (
                  <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-medium">
                    Ahorras {formatPrice(quote.roundTripDiscount, currency)} en viaje redondo
                  </span>
                )}
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-extrabold gold-gradient-text">
                  {formatPrice(quote.total, currency)}
                </span>
                <span className="text-xs text-gray-400">
                  {currency === 'USD' ? `(~${formatPrice(quote.total * 18.5, 'MXN')} MXN)` : `(~${formatPrice(quote.total / 18.5, 'USD')} USD)`}
                </span>
              </div>

              {/* Best Price Guarantee comparison banner */}
              <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Garantía de Mejor Precio: Ahorras {formatPrice(quote.bestPriceGuaranteeSavings, currency)} vs. tarifas de mostrador de aeropuerto.</span>
              </div>
            </div>

            {/* Action CTA */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
              <button
                onClick={handleStartBooking}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 hover:from-gold-300 hover:to-gold-500 text-navy-950 font-bold text-sm tracking-wider uppercase shadow-xl shadow-gold-500/25 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <span>Reservar Ahora</span>
                <Car className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

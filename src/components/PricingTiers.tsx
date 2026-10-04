'use client';

import React from 'react';
import { ShieldCheck, Check, Sparkles, Car, Users, Crown, Zap } from 'lucide-react';
import { formatPrice } from '@/lib/pricing';

interface PricingTiersProps {
  currency: 'USD' | 'MXN';
  onChooseTier: (category: 'PER_PERSON' | 'GROUP_VAN' | 'VIP_SUBURBAN') => void;
}

export const PricingTiers: React.FC<PricingTiersProps> = ({ currency, onChooseTier }) => {
  const mult = currency === 'MXN' ? 18.5 : 1;

  const tiers = [
    {
      id: 'PER_PERSON',
      name: 'Compartido Económico',
      subtitle: 'Ideal para personas solas o parejas',
      icon: Users,
      badge: 'Tarifa por Persona',
      badgeColor: 'bg-navy-800 text-gray-300 border border-gray-700',
      samplePrice: 15 * mult,
      priceSuffix: '/ persona',
      vehicle: 'Van Toyota HiAce o Crafter climatizada',
      capacity: '1 a 4 personas',
      features: [
        'Unidad compartida con otros pasajeros',
        'Aire acondicionado de alta potencia',
        'Monitoreo de vuelo a tu llegada',
        'Seguro básico de viajero',
        'Punto de encuentro en terminal CUN',
        'Pago por SPEI o Efectivo al subir'
      ],
      popular: false,
      ctaText: 'Seleccionar Compartido'
    },
    {
      id: 'GROUP_VAN',
      name: 'Van Privada Exclusiva',
      subtitle: 'La opción predilecta de familias y grupos',
      icon: Car,
      badge: 'Más Vendido en Cancún',
      badgeColor: 'bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 font-bold',
      samplePrice: 45 * mult,
      priceSuffix: '/ Van privada completa',
      vehicle: 'Toyota HiAce Luxury / Ford Transit (1-8 pax o 9-16 pax)',
      capacity: 'Hasta 8 pax (Estándar) / 16 pax (Maxi)',
      features: [
        'Vehículo 100% exclusivo para tu grupo',
        'Sin escalas directo a tu hotel',
        'Aguas embotelladas frías de cortesía',
        'Wifi de alta velocidad a bordo',
        'Chofer bilingüe certificado con letrero',
        'Alerta WhatsApp 60 minutos antes',
        'Garantía de Mejor Precio frente a mostrador'
      ],
      popular: true,
      ctaText: 'Elegir Van Privada'
    },
    {
      id: 'VIP_SUBURBAN',
      name: 'Servicio VIP Platinum',
      subtitle: 'Máximo lujo, confort y privacidad ejecutiva',
      icon: Crown,
      badge: 'Lujo & Discreción',
      badgeColor: 'bg-gold-500/20 text-gold-300 border border-gold-500/50',
      samplePrice: 95 * mult,
      priceSuffix: '/ Suburban VIP',
      vehicle: 'Chevrolet Suburban Premier / Cadillac Escalade',
      capacity: 'Hasta 6 pasajeros con amplio equipaje',
      features: [
        'Camioneta SUV de lujo con interiores en piel',
        'Cervezas frías o vino espumoso de bienvenida',
        'Toallitas húmedas aromáticas refrescantes',
        'Cargadores rápidos para todos tus dispositivos',
        'Operador ejecutivo de etiqueta con atención VIP',
        'Parada de cortesía de hasta 15 min a petición',
        'Soporte prioritario inmediato 24/7'
      ],
      popular: false,
      ctaText: 'Elegir Experiencia VIP'
    }
  ];

  return (
    <section id="tarifario" className="py-20 bg-navy-900/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>Tarifario Inteligente y Transparente</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            Tarifas Claras, <span className="gold-gradient-text">Sin Cargos Ocultos</span>
          </h2>
          <p className="mt-3 text-gray-400 text-sm">
            Diseñamos soluciones a la medida de tu viaje: desde traslados compartidos para mochileros hasta vans familiares de 16 pasajeros y camionetas Suburban de gran lujo.
          </p>
        </div>

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {tiers.map((t) => (
            <div
              key={t.id}
              className={`rounded-3xl p-8 glass-panel flex flex-col justify-between transition-all duration-300 relative ${
                t.popular
                  ? 'border-2 border-gold-400 shadow-2xl shadow-gold-500/20 scale-100 lg:-translate-y-2'
                  : 'border border-gold-500/20 hover:border-gold-500/50'
              }`}
            >
              {/* Badge */}
              <div className="flex justify-between items-center mb-4">
                <span className={`text-[10px] uppercase tracking-wider px-3 py-1 rounded-full ${t.badgeColor}`}>
                  {t.badge}
                </span>
                <t.icon className="w-6 h-6 text-gold-400" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white">{t.name}</h3>
                <p className="text-xs text-gray-400 mt-1">{t.subtitle}</p>

                {/* Price Display */}
                <div className="mt-6 mb-2">
                  <span className="text-xs text-gray-400 block">Desde (Cancún Zona Hotelera):</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-4xl font-extrabold gold-gradient-text">
                      {formatPrice(t.samplePrice, currency)}
                    </span>
                    <span className="text-xs text-gray-400">{t.priceSuffix}</span>
                  </div>
                </div>

                <div className="py-2 px-3 rounded-xl bg-navy-950/80 border border-gold-500/15 mb-6 text-xs text-gold-300">
                  <span className="font-semibold text-white">Vehículo:</span> {t.vehicle}
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  {t.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-gray-300">
                      <div className="w-4 h-4 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onChooseTier(t.id as any)}
                className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                  t.popular
                    ? 'bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-300 hover:to-gold-500 text-navy-950 shadow-lg shadow-gold-500/25'
                    : 'bg-navy-800 hover:bg-gold-500 text-white hover:text-navy-950 border border-gold-500/30'
                }`}
              >
                {t.ctaText}
              </button>
            </div>
          ))}
        </div>

        {/* Garantía de Mejor Precio Section Callout */}
        <div id="garantia" className="mt-16 glass-panel-gold rounded-3xl p-8 border border-gold-500/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gold-500/20 border border-gold-400 text-gold-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>Garantía de Mejor Precio en Cancún y Riviera Maya</span>
                  <span className="px-2 py-0.5 text-[10px] rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase font-bold">100% Protegido</span>
                </h4>
                <p className="mt-1.5 text-sm text-gray-300 max-w-2xl leading-relaxed">
                  Evita pagar de más al llegar al aeropuerto en mostradores no regulados. En Americancun Transfer monitoreamos diariamente las tarifas del mercado para garantizarte el mejor precio disponible. Si encuentras un servicio privado equivalente con menor precio, te igualamos la tarifa y te otorgamos 5% de descuento adicional.
                </p>
              </div>
            </div>

            <div className="bg-navy-950/80 px-6 py-4 rounded-2xl border border-gold-500/20 text-center shrink-0 w-full md:w-auto">
              <span className="text-xs uppercase tracking-wider text-gray-400 block font-semibold">Ahorro Promedio Estimado</span>
              <span className="text-3xl font-extrabold text-emerald-400 block my-1">20% a 30%</span>
              <span className="text-[11px] text-gray-400">frente a taxis de terminal CUN</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

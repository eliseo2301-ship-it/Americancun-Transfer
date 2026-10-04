'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Plane, Luggage, RotateCcw, AlertTriangle, MapPin, CheckCircle2 } from 'lucide-react';
import { Language, TRANSLATIONS } from '@/lib/translations';

interface FaqSectionProps {
  language: Language;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ language }) => {
  const t = TRANSLATIONS[language].faq;
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedTerminal, setSelectedTerminal] = useState<'T2' | 'T3' | 'T4'>('T2');

  const faqs = language === 'en' ? [
    {
      q: 'How do I locate my driver at Cancun International Airport (CUN)?',
      a: 'Once you claim your luggage and clear customs, walk directly outside the terminal through the automatic sliding glass doors into the designated ground transportation and tour operator concourse. Your driver will be waiting with an official name sign displaying your name and the AMERICANCUN TRANSFER logo. CRITICAL NOTE: Ignore the persistent timeshare agents and unauthorized taxi salesmen inside the corridor ("the shark tank"); continue walking directly to the outdoor passenger platforms.'
    },
    {
      q: 'What is the luggage policy per traveler?',
      a: 'On our Private Van services (1 to 8 pax), we allow up to 1 standard checked bag (up to 25 kg / 55 lbs) plus 1 personal carry-on or backpack per passenger at no extra charge. If traveling with oversize gear (surfboards, golf bags, baby strollers), please specify in your booking comments so we dispatch the optimal vehicle.'
    },
    {
      q: 'What happens if my flight is delayed or arrives early?',
      a: 'We monitor your flight number in real time via aviation radar systems. If your flight is delayed by several hours or lands ahead of schedule, we automatically adjust your driver pickup schedule at zero additional charge. Your vehicle is 100% guaranteed whenever you land.'
    },
    {
      q: 'How does flexible cancellation and rescheduling work?',
      a: 'We understand travel plans can shift unexpectedly. You can cancel or reschedule your ride with zero penalty up to 24 hours prior to scheduled pickup time, receiving a 100% full refund if pre-paid.'
    },
    {
      q: 'Which payment methods are accepted and how does SPEI work?',
      a: 'We accept direct Mexican Bank Wire (SPEI) and Cash on Arrival directly to your driver (Mexican Pesos or USD cash). When selecting SPEI, our system generates an instant payment voucher with a BBVA CLABE and a unique reservation tracking code.'
    },
    {
      q: 'What is the 60-Minute WhatsApp Pre-Departure Alarm?',
      a: 'Exactly 60 minutes prior to your scheduled pickup time, our automated system dispatches a WhatsApp alert with your assigned vehicle number, driver name, direct phone contact, and precise meeting point for complete peace of mind.'
    }
  ] : [
    {
      q: '¿Cómo encuentro a mi chofer en el Aeropuerto de Cancún (CUN)?',
      a: 'Una vez que retires tu equipaje y pases por aduanas, camina directo hacia la salida al exterior de la terminal (zona de andenes y transportistas turísticos). Tu chofer te estará esperando con un letrero oficial con tu nombre y el logo de AMERICANCUN TRANSFER. IMPORTANTE: Ignora a los promotores de tiempos compartidos y taxis no autorizados en el pasillo interior ("shark tank"); camina directo hacia las puertas exteriores.'
    },
    {
      q: '¿Cuál es la política de equipaje por pasajero?',
      a: 'En nuestro servicio de Van Privada (1 a 8 pax) permitimos hasta 1 maleta documentada estándar (hasta 25 kg) más 1 maleta de mano o mochila por pasajero sin costo adicional. Si viajas con equipaje especial (tablas de surf, carriolas grandes o equipo de golf), por favor indícalo en las notas de tu reserva para asignar la unidad óptima.'
    },
    {
      q: '¿Qué sucede si mi vuelo se retrasa o llega antes?',
      a: 'Monitoreamos tu número de vuelo en tiempo real mediante sistemas de radar aeronáutico. Si tu vuelo se adelanta o sufre demoras de varias horas, ajustamos automáticamente el horario de tu chofer sin ningún cargo extra. Tu servicio está 100% garantizado al aterrizar.'
    },
    {
      q: '¿Cómo funciona la cancelación flexible?',
      a: 'Entendemos que los planes pueden cambiar. Puedes cancelar o reprogramar tu traslado sin penalización alguna hasta con 24 horas de anticipación a la hora programada del servicio, recibiendo el 100% de tu reembolso si pagaste por adelantado.'
    },
    {
      q: '¿Cuáles son los métodos de pago aceptados y cómo funciona el SPEI?',
      a: 'Aceptamos Transferencia Bancaria Directa (SPEI) y Pago en Efectivo al Abordar (en Pesos Mexicanos o Dólares USD). Al elegir SPEI, nuestro sistema genera una ficha de pago con CLABE Interbancaria BBVA y un concepto único con tu código de reserva. Al transferir, el sistema concilia tu pago automáticamente sin necesidad de enviar comprobantes por correo.'
    },
    {
      q: '¿Qué es el recordatorio por WhatsApp de 60 minutos?',
      a: 'Exactamente 60 minutos antes de tu hora de recogida programada, nuestro sistema automatizado despacha una alerta a tu WhatsApp con el número económico de la van, el nombre de tu operador asignado, su teléfono directo y el punto de encuentro exacto para tu total tranquilidad.'
    }
  ];

  const terminalDetails = {
    T2: {
      name: language === 'en' ? 'Terminal 2 (Domestic & Charter Flights)' : 'Terminal 2 (Nacional & Vuelos Charter)',
      airlines: 'VivaAerobus, Volaris, Magnicharters, Sunwing',
      meetingPoint: language === 'en'
        ? 'Outside tourist welcome platform, exiting to the right in front of the "Welcome Bar" area.'
        : 'Andén Turístico de Bienvenida exterior, saliendo a mano derecha frente a la zona de "Welcome Bar".',
      instructions: language === 'en'
        ? 'Collect luggage, exit through arrival sliding doors and look for the Americancun Transfer sign on pre-booked transportation platform.'
        : 'Recoge maletas, sal por la puerta de llegadas y busca el letrero de Americancun Transfer en el andén de transportación pre-contratada.'
    },
    T3: {
      name: language === 'en' ? 'Terminal 3 (International Flights USA/Canada)' : 'Terminal 3 (Vuelos Internacionales USA/Canadá)',
      airlines: 'American Airlines, Delta, United, Air Canada, JetBlue, Spirit',
      meetingPoint: language === 'en'
        ? 'Platform #4 outside, heading right adjacent to the "Margaritaville" patio.'
        : 'Andén #4 exterior, saliendo hacia la derecha junto a la terraza de "Margaritaville".',
      instructions: language === 'en'
        ? 'Walk through the indoor corridor without stopping with tour sellers. Exit through the glass doors outdoors to platform #4.'
        : 'Cruza el pasillo interior sin detenerte con los vendedores de tours. Cruza las puertas de cristal al aire libre hacia el andén #4.'
    },
    T4: {
      name: language === 'en' ? 'Terminal 4 (Mixed Arrivals & Europe)' : 'Terminal 4 (Llegadas Mixtas & Europa)',
      airlines: 'Aeroméxico, Air France, Lufthansa, KLM, British Airways, Frontier',
      meetingPoint: language === 'en'
        ? 'Platform "C" for pre-booked tourist transfers, located right in front of main exit.'
        : 'Andén "C" de transportación turística pre-pagada, ubicado justo frente a la salida principal.',
      instructions: language === 'en'
        ? 'Exit through automatic doors into covered tourist platform (Platform C). Your chauffeur will be waiting in uniform with your name.'
        : 'Sal por las puertas automáticas hacia el área techada de andenes turísticos (Andén C). Tu chofer te esperará con el uniforme oficial y tu nombre en pantalla.'
    }
  };

  return (
    <section id="faq" className="py-20 bg-navy-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            {t.title} <span className="gold-gradient-text">{t.titleHighlight}</span>
          </h2>
          <p className="mt-3 text-gray-400 text-sm">
            {t.subtitle}
          </p>
        </div>

        {/* Airport Terminal Visual Guide */}
        <div className="mb-16 glass-panel-gold rounded-3xl p-6 sm:p-8 border border-gold-500/30">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-6 border-b border-gold-500/20 gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-gold-400 font-bold block mb-1">
                {language === 'en' ? 'Step-by-Step CUN Terminal Guide' : 'Guía Paso a Paso en Terminales CUN'}
              </span>
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Plane className="w-6 h-6 text-gold-400" />
                {t.guideTitle}
              </h3>
            </div>

            {/* Terminal Switcher Buttons */}
            <div className="flex gap-2 bg-navy-950 p-1.5 rounded-2xl border border-gold-500/20">
              {(['T2', 'T3', 'T4'] as const).map(term => (
                <button
                  key={term}
                  onClick={() => setSelectedTerminal(term)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedTerminal === term
                      ? 'bg-gradient-to-r from-gold-400 to-gold-600 text-navy-950 shadow'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Terminal {term.replace('T', '')}
                </button>
              ))}
            </div>
          </div>

          {/* Active Terminal Card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            <div className="lg:col-span-2 space-y-4">
              <div>
                <span className="text-xs font-semibold text-gold-400 uppercase tracking-wider">
                  {language === 'en' ? 'Selected Terminal:' : 'Terminal Seleccionada:'}
                </span>
                <h4 className="text-xl font-bold text-white mt-0.5">{terminalDetails[selectedTerminal].name}</h4>
                <p className="text-xs text-gray-400 mt-1">
                  {language === 'en' ? 'Serving Airlines:' : 'Aerolíneas comunes:'} {terminalDetails[selectedTerminal].airlines}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-navy-900/90 border border-gold-500/20">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-white block">
                      {language === 'en' ? 'Exact Waiting Area:' : 'Ubicación Exacta de Espera:'}
                    </span>
                    <p className="text-xs text-gold-200 mt-1 leading-relaxed">
                      {terminalDetails[selectedTerminal].meetingPoint}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{terminalDetails[selectedTerminal].instructions}</span>
              </div>
            </div>

            {/* Security Warning Alert */}
            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-300">
                <AlertTriangle className="w-4 h-4" />
                <span>{t.warningTitle}</span>
              </div>
              <p className="leading-relaxed">
                {t.warningDesc}
              </p>
            </div>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="glass-panel rounded-2xl border border-gold-500/20 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 text-white hover:text-gold-300 transition-colors"
                >
                  <span className="text-base font-semibold">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gold-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-gray-300 leading-relaxed border-t border-navy-900">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

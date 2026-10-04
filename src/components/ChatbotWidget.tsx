'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  Plane,
  Car,
  RotateCcw,
  Clock
} from 'lucide-react';
import { DESTINATIONS_DATA } from '@/lib/destinations-data';
import { calculateQuote, formatPrice } from '@/lib/pricing';
import { CapiAmeriAvatar } from './CapiAmeriAvatar';
import { Language } from '@/lib/translations';

interface ChatbotWidgetProps {
  currency: 'USD' | 'MXN';
  language?: Language;
  onBookNow: (details: any) => void;
  isOpen: boolean;
  onToggle: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  actions?: { label: string; action: string; payload?: any }[];
  quote?: any;
}

export const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({
  currency,
  language = 'es',
  onBookNow,
  isOpen,
  onToggle
}) => {
  const [avatarType, setAvatarType] = useState<'van' | 'plane'>('van');
  const [showTeaser, setShowTeaser] = useState(true);

  const initialBotMessage: ChatMessage = {
    id: 'msg-1',
    sender: 'bot',
    text: language === 'en'
      ? `👋 Welcome! I am **Capi Ameri**, your VIP concierge at Americancun Transfer. ✈️🚐\n\nWhere are you traveling in Cancun, Riviera Maya, or Yucatan? I will calculate your guaranteed best rate in under 5 seconds with zero hidden fees!`
      : `👋 ¡Hola viajero! Soy **Capi Ameri**, tu concierge VIP de Americancun Transfer. ✈️🚐\n\n¿A qué paraíso viajas hoy? Te daré tu cotización exacta en menos de 5 segundos con **Garantía de Mejor Precio** y alertas 60 minutos antes a tu WhatsApp.`,
    timestamp: 'Ahora',
    actions: language === 'en' ? [
      { label: 'Cancun Hotel Zone ($45)', action: 'DESTINATION', payload: 'cancun-zona-hotelera' },
      { label: 'Playa del Carmen ($75)', action: 'DESTINATION', payload: 'playa-del-carmen' },
      { label: 'Tulum & Ruins ($135)', action: 'DESTINATION', payload: 'tulum' },
      { label: 'Chichén Itzá Tour ($210)', action: 'DESTINATION', payload: 'chichen-itza' },
      { label: 'Xcaret Theme Park ($85)', action: 'DESTINATION', payload: 'parque-xcaret' },
      { label: '💳 How does SPEI wire work?', action: 'INFO', payload: 'spei' },
      { label: '⏰ 60-Min WhatsApp Alarm', action: 'INFO', payload: 'alarm' }
    ] : [
      { label: 'Cancún Zona Hotelera ($45)', action: 'DESTINATION', payload: 'cancun-zona-hotelera' },
      { label: 'Playa del Carmen ($75)', action: 'DESTINATION', payload: 'playa-del-carmen' },
      { label: 'Tulum & Ruinas ($135)', action: 'DESTINATION', payload: 'tulum' },
      { label: 'Tour Chichén Itzá ($210)', action: 'DESTINATION', payload: 'chichen-itza' },
      { label: 'Parque Xcaret ($85)', action: 'DESTINATION', payload: 'parque-xcaret' },
      { label: '💳 ¿Cómo funciona el pago SPEI?', action: 'INFO', payload: 'spei' },
      { label: '⏰ Alarma WhatsApp 60 min', action: 'INFO', payload: 'alarm' }
    ]
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialBotMessage]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setShowTeaser(false);
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: 'Ahora'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({
            role: m.sender === 'bot' ? 'assistant' : 'user',
            content: m.text
          }))
        })
      });

      const data = await res.json();
      setIsTyping(false);

      if (data.reply) {
        const botReply: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: data.reply,
          timestamp: 'Ahora',
          actions: data.actions || []
        };
        setMessages(prev => [...prev, botReply]);
      }
    } catch (err) {
      setIsTyping(false);
      const fallbackMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: language === 'en'
          ? 'Thanks for asking! Our WhatsApp team is also available 24/7 at +52 998 768 7600 for instant assistance.'
          : '¡Gracias por tu mensaje! Nuestro equipo por WhatsApp al +52 998 768 7600 también está a tus órdenes para brindarte confirmación inmediata.',
        timestamp: 'Ahora'
      };
      setMessages(prev => [...prev, fallbackMsg]);
    }
  };

  const handleActionClick = (action: { label: string; action: string; payload?: any }) => {
    if (action.action === 'DESTINATION') {
      const slug = action.payload;
      const destination = DESTINATIONS_DATA.find(d => d.slug === slug);
      if (destination) {
        const q = calculateQuote({
          serviceType: 'AIRPORT_HOTEL',
          origin: 'Aeropuerto Cancún (CUN)',
          destination: slug,
          isRoundTrip: true,
          passengers: 2,
          category: 'GROUP_VAN',
          currency
        });

        const replyText = language === 'en'
          ? `🎯 **Instant Quote for ${destination.name}:**\n• Van Privada Exclusiva: **${formatPrice(q.total, currency)}**\n• Round trip savings: ${formatPrice(q.roundTripDiscount, currency)}\n• Estimated travel time: ${destination.estimatedDuration}\n• 60-min WhatsApp alert included.`
          : `🎯 **Cotización Instantánea para ${destination.name}:**\n• Van Privada Exclusiva (hasta 8 pax): **${formatPrice(q.total, currency)}**\n• Ahorro viaje redondo: ${formatPrice(q.roundTripDiscount, currency)}\n• Tiempo aproximado: ${destination.estimatedDuration}\n• Alerta WhatsApp 60 min antes y chofer con letrero.`;

        const botReply: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: replyText,
          timestamp: 'Ahora',
          quote: q,
          actions: [
            { 
              label: language === 'en' ? 'Book this ride now' : 'Reservar este traslado', 
              action: 'BOOK_DIRECT', 
              payload: { quote: q, destination: destination.name, destinationSlug: slug } 
            }
          ]
        };
        setMessages(prev => [...prev, botReply]);
      }
    } else if (action.action === 'BOOK_DIRECT') {
      const { quote, destination, destinationSlug } = action.payload;
      onBookNow({
        serviceType: 'AIRPORT_HOTEL',
        origin: 'Aeropuerto Cancún (CUN)',
        destination,
        destinationSlug: destinationSlug || 'cancun-zona-hotelera',
        dateTime: new Date(Date.now() + 24 * 3600 * 1000).toISOString().slice(0, 16),
        returnDateTime: new Date(Date.now() + 8 * 24 * 3600 * 1000).toISOString().slice(0, 16),
        isRoundTrip: true,
        passengers: 2,
        category: 'GROUP_VAN',
        currency,
        quote
      });
    } else if (action.action === 'INFO') {
      if (action.payload === 'spei') {
        const botReply: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: language === 'en'
            ? '💳 **SPEI Wire Transfer:** At checkout, our platform generates an official BBVA voucher with unique CLABE and tracking concept. You transfer from your mobile banking app without transmitting credit card data!'
            : '💳 **Transferencia SPEI Automatizada:** Al confirmar tu reserva, nuestro sistema genera una ficha oficial BBVA con CLABE interbancaria y concepto alfanumérico único. Tu pago queda registrado automáticamente sin arriesgar tarjetas.',
          timestamp: 'Ahora'
        };
        setMessages(prev => [...prev, botReply]);
      } else if (action.payload === 'alarm') {
        const botReply: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: language === 'en'
            ? '⏰ **60-Minute Alarm:** Exactly 1 hour before your scheduled pickup, our automated background worker sends you a WhatsApp message with your vehicle unit number, driver name, and direct phone contact!'
            : '⏰ **Alarma de 60 Minutos:** Exactamente 1 hora antes de la hora programada de tu traslado, nuestro sistema envía una alerta automática a tu WhatsApp con el número de van, nombre de tu chofer y teléfono directo.',
          timestamp: 'Ahora'
        };
        setMessages(prev => [...prev, botReply]);
      }
    }
  };

  return (
    <>
      {/* Interactive Floating Avatar Trigger */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        
        {/* Floating Interactive Teaser Bubble */}
        {showTeaser && !isOpen && (
          <div className="max-w-[270px] p-3.5 rounded-2xl glass-panel-gold border border-gold-500/40 shadow-2xl shadow-navy-950/80 text-white text-xs animate-bounce mb-1 relative group">
            <button
              onClick={() => setShowTeaser(false)}
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-navy-900 border border-gold-500/30 text-gray-400 hover:text-white flex items-center justify-center text-[10px]"
            >
              <X className="w-3 h-3" />
            </button>
            <div className="flex items-center gap-2 mb-1.5 font-bold text-gold-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Capi Ameri Concierge' : 'Capi Ameri Concierge'}</span>
            </div>
            <p className="text-[11px] text-gray-200 leading-snug">
              {language === 'en' 
                ? '👋 Need a quick quote? Tap me for instant rates in under 5 seconds!'
                : '👋 ¿Planeas tu viaje? Cotiza en menos de 5 seg con el mejor precio garantizado.'}
            </p>
          </div>
        )}

        {/* The Main Interactive Button */}
        <div className="flex items-center gap-2">
          {/* Avatar Switcher Pill (Van / Plane) */}
          {!isOpen && (
            <div className="bg-navy-950/90 border border-gold-500/30 rounded-full p-1 backdrop-blur-md flex items-center gap-1 shadow-lg shadow-navy-950">
              <button
                onClick={() => setAvatarType('van')}
                className={`p-1.5 rounded-full transition-all ${
                  avatarType === 'van' 
                    ? 'bg-gold-500 text-navy-950 shadow' 
                    : 'text-gray-400 hover:text-white'
                }`}
                title="Modo Camioneta VIP"
              >
                <Car className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setAvatarType('plane')}
                className={`p-1.5 rounded-full transition-all ${
                  avatarType === 'plane' 
                    ? 'bg-gold-500 text-navy-950 shadow' 
                    : 'text-gray-400 hover:text-white'
                }`}
                title="Modo Jet Privado"
              >
                <Plane className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Animated Hero Trigger */}
          <button
            onClick={onToggle}
            className="group relative p-2 rounded-2xl bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900 border-2 border-gold-400 shadow-2xl shadow-gold-500/30 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2.5"
            aria-label="Abrir asistente virtual Capi Ameri"
          >
            {/* Glowing ring */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-gold-500/40 via-caribbean-500/30 to-gold-500/40 blur-sm opacity-75 group-hover:opacity-100 transition-opacity -z-10 animate-pulse" />

            {/* Vehicle Graphic */}
            <CapiAmeriAvatar type={avatarType} size="md" />

            <div className="flex flex-col text-left pr-2 hidden sm:block">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1">
                <span>Capi Ameri</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </span>
              <span className="text-[10px] text-gold-400 font-medium">
                {language === 'en' ? 'VIP Concierge < 5s' : 'Concierge VIP < 5s'}
              </span>
            </div>
          </button>
        </div>

      </div>

      {/* Floating Chat Container Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[94vw] sm:w-[420px] max-h-[630px] h-[80vh] flex flex-col rounded-3xl glass-panel-gold border-2 border-gold-500/40 shadow-2xl shadow-navy-950 overflow-hidden animate-slideUp">
          
          {/* Header */}
          <div className="p-4 bg-navy-950 border-b border-gold-500/25 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <CapiAmeriAvatar type={avatarType} size="sm" />
                <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-navy-950 animate-pulse" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>Capi Ameri</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-300 font-semibold uppercase">
                    {avatarType === 'van' ? '🚐 Van VIP' : '✈️ Jet CUN'}
                  </span>
                </h4>
                <span className="text-[10px] text-gray-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-gold-400" />
                  <span>{language === 'en' ? 'Instant quote in < 5 seconds' : 'Cotizaciones instantáneas en < 5s'}</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Toggle vehicle inside chat */}
              <button
                onClick={() => setAvatarType(avatarType === 'van' ? 'plane' : 'van')}
                className="p-1.5 rounded-lg bg-navy-900 border border-gold-500/30 text-gold-400 hover:text-white text-xs flex items-center gap-1 transition-colors"
                title="Cambiar avatar"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onToggle}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-navy-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[88%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 font-medium rounded-tr-none shadow-lg'
                      : 'bg-navy-900/90 text-gray-100 border border-gold-500/20 rounded-tl-none shadow'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Actions buttons */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {msg.actions.map((act, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleActionClick(act)}
                          className="px-2.5 py-1.5 rounded-lg bg-navy-950 hover:bg-gold-500 text-gold-300 hover:text-navy-950 text-[11px] font-semibold border border-gold-500/30 transition-all shadow-sm"
                        >
                          {act.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Direct Book CTA from quote */}
                  {msg.quote && (
                    <div className="mt-3 pt-2.5 border-t border-navy-800 flex items-center justify-between">
                      <span className="font-extrabold text-gold-300 text-sm">
                        {formatPrice(msg.quote.total, currency)}
                      </span>
                      <button
                        onClick={() => handleActionClick({ 
                          label: 'Reservar', 
                          action: 'BOOK_DIRECT', 
                          payload: { quote: msg.quote, destination: msg.quote.destination, destinationSlug: msg.quote.destinationSlug } 
                        })}
                        className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 text-navy-950 font-bold text-[11px] flex items-center gap-1.5 shadow-md shadow-gold-500/20 transition-all hover:scale-105"
                      >
                        <span>{language === 'en' ? 'Book in 1-Click' : 'Reservar en 1 Clic'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
                <span className="text-[9px] text-gray-500 mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 p-3 bg-navy-900/70 rounded-2xl rounded-tl-none border border-gold-500/20 w-24">
                <span className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-navy-950 border-t border-gold-500/25">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder={language === 'en' ? 'Ask Capi Ameri or type a destination...' : 'Escribe a Capi Ameri o pon un destino...'}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 bg-navy-900 border border-gold-500/30 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-gold-400"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 disabled:opacity-40 transition-colors shadow"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
};

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  Car, 
  Calendar, 
  Users, 
  ShieldCheck, 
  ArrowRight,
  RefreshCcw
} from 'lucide-react';
import { DESTINATIONS_DATA } from '@/lib/destinations-data';
import { calculateQuote, formatPrice } from '@/lib/pricing';

interface ChatbotWidgetProps {
  currency: 'USD' | 'MXN';
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
  onBookNow,
  isOpen,
  onToggle
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: '¡Hola! 🌴 Soy **AmeriBot VIP**, tu concierge digital de Americancun Transfer. ¿A qué destino viajas o qué tour te gustaría cotizar hoy? Te daré tu tarifa en menos de 5 segundos con Garantía de Mejor Precio.',
      timestamp: 'Ahora',
      actions: [
        { label: 'Cancún Zona Hotelera ($45)', action: 'DESTINATION', payload: 'cancun-zona-hotelera' },
        { label: 'Playa del Carmen ($75)', action: 'DESTINATION', payload: 'playa-del-carmen' },
        { label: 'Tulum & Cenotes ($135)', action: 'DESTINATION', payload: 'tulum' },
        { label: 'Tour Chichén Itzá ($210)', action: 'DESTINATION', payload: 'chichen-itza' },
        { label: 'Parque Xcaret ($85)', action: 'DESTINATION', payload: 'parque-xcaret' },
      ]
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
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
      // Call chat API
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

      if (data.success) {
        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: data.reply,
          timestamp: 'Ahora',
          actions: data.quickActions,
          quote: data.instantQuote
        };
        setMessages(prev => [...prev, botMsg]);
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      setIsTyping(false);
      // Fallback local processing in under 5 seconds
      const lower = text.toLowerCase();
      const matched = DESTINATIONS_DATA.find(d => lower.includes(d.name.toLowerCase()) || lower.includes(d.slug));
      
      if (matched) {
        const q = calculateQuote({
          serviceType: 'AIRPORT_HOTEL',
          origin: 'Aeropuerto Cancún (CUN)',
          destination: matched.slug,
          isRoundTrip: false,
          passengers: 2,
          category: 'GROUP_VAN',
          currency
        });

        const fallbackMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: `¡Listo! Aquí tienes tu cotización instantánea para **${matched.name}**:\n\n🚐 **Van Privada Exclusiva (hasta 8 pax):** ${formatPrice(q.total, currency)}\n⏱️ **Duración:** ${matched.estimatedDuration}\n🛡️ **Incluye:** Chofer bilingüe, monitoreo de vuelo, alerta 60 minutos antes a WhatsApp y seguro total.`,
          timestamp: 'Ahora',
          quote: q,
          actions: [
            { label: `Reservar ${matched.name} Ahora`, action: 'BOOK_DIRECT', payload: { destination: matched.slug, quote: q } }
          ]
        };
        setMessages(prev => [...prev, fallbackMsg]);
      } else {
        setMessages(prev => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: '¡Con gusto te cotizo! ¿A qué hotel o destino viajas y cuántas personas te acompañan?',
            timestamp: 'Ahora'
          }
        ]);
      }
    }
  };

  const handleActionClick = (action: { label: string; action: string; payload?: any }) => {
    if (action.action === 'DESTINATION') {
      const dest = DESTINATIONS_DATA.find(d => d.slug === action.payload);
      handleSendMessage(`Deseo cotizar traslado para ${dest?.name || action.payload}`);
    } else if (action.action === 'BOOK_DIRECT' || action.action === 'SELECT_DESTINATION') {
      const targetSlug = action.payload?.slug || action.payload?.destination || 'cancun-zona-hotelera';
      const quote = action.payload?.quote || calculateQuote({
        serviceType: 'AIRPORT_HOTEL',
        origin: 'Aeropuerto Cancún (CUN)',
        destination: targetSlug,
        isRoundTrip: false,
        passengers: 2,
        category: action.payload?.category || 'GROUP_VAN',
        currency
      });

      onBookNow({
        serviceType: 'AIRPORT_HOTEL',
        origin: 'Aeropuerto Cancún (CUN)',
        destinationSlug: targetSlug,
        destination: quote.destination,
        dateTime: new Date(Date.now() + 24 * 3600 * 1000).toISOString().slice(0, 16),
        isRoundTrip: false,
        passengers: 2,
        category: quote.category,
        currency,
        quote
      });
      onToggle();
    } else {
      handleSendMessage(action.label);
    }
  };

  return (
    <>
      {/* Floating Action Trigger Button */}
      <button
        onClick={onToggle}
        aria-label="Abrir asistente de cotización virtual"
        className="fixed bottom-6 right-6 z-40 p-4 rounded-2xl bg-gradient-to-tr from-gold-600 via-gold-500 to-gold-400 text-navy-950 shadow-2xl shadow-gold-500/30 hover:scale-105 transition-all duration-300 flex items-center gap-2 group border border-gold-300"
      >
        <Sparkles className="w-5 h-5 animate-pulse" />
        <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">
          {isOpen ? 'Cerrar Concierge' : 'Cotizador Rápido < 5s'}
        </span>
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white"></span>
      </button>

      {/* Floating Chat Container */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[94vw] sm:w-[420px] max-h-[620px] h-[80vh] flex flex-col rounded-3xl glass-panel-gold border border-gold-500/40 shadow-2xl shadow-navy-950 overflow-hidden animate-slideUp">
          
          {/* Header */}
          <div className="p-4 bg-navy-950 border-b border-gold-500/25 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold-500 text-navy-950 flex items-center justify-center font-bold shadow">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>AmeriBot VIP Concierge</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </h4>
                <span className="text-[10px] text-gold-400">Cotización instantánea en &lt; 5s</span>
              </div>
            </div>

            <button
              onClick={onToggle}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-navy-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
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
                      ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 font-medium rounded-tr-none shadow'
                      : 'bg-navy-900/90 text-gray-100 border border-gold-500/20 rounded-tl-none'
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
                          className="px-2.5 py-1.5 rounded-lg bg-navy-950 hover:bg-gold-500 text-gold-300 hover:text-navy-950 text-[11px] font-semibold border border-gold-500/30 transition-all"
                        >
                          {act.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Direct Book CTA from quote */}
                  {msg.quote && (
                    <div className="mt-3 pt-2 border-t border-navy-800 flex items-center justify-between">
                      <span className="font-extrabold text-gold-300">
                        {formatPrice(msg.quote.total, currency)}
                      </span>
                      <button
                        onClick={() => handleActionClick({ label: 'Reservar', action: 'BOOK_DIRECT', payload: { quote: msg.quote, destination: msg.quote.destination } })}
                        className="px-3 py-1 rounded-lg bg-gold-400 hover:bg-gold-300 text-navy-950 font-bold text-[11px] flex items-center gap-1 shadow"
                      >
                        <span>Reservar en 1 Clic</span>
                        <ArrowRight className="w-3 h-3" />
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
                placeholder="Escribe tu destino o pregunta..."
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

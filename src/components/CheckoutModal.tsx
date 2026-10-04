'use client';

import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Check, 
  Copy, 
  CheckCircle2, 
  Building2, 
  Banknote, 
  Car, 
  Plane, 
  Clock, 
  MessageSquare, 
  Download,
  AlertCircle
} from 'lucide-react';
import { formatPrice } from '@/lib/pricing';
import { ServiceType, VehicleCategory, PaymentMethod } from '@/types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingDetails: any;
  currency: 'USD' | 'MXN';
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  bookingDetails,
  currency,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('BANK_TRANSFER');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [terminal, setTerminal] = useState('Terminal 3 (Internacional)');
  const [hotelName, setHotelName] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!isOpen || !bookingDetails) return null;

  const quote = bookingDetails.quote;

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !phone.trim() || !email.trim()) {
      setErrorMsg('Por favor completa Nombre, Correo y WhatsApp.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceType: bookingDetails.serviceType,
          origin: bookingDetails.origin,
          destination: bookingDetails.destinationSlug,
          dateTime: bookingDetails.dateTime,
          returnDateTime: bookingDetails.returnDateTime,
          isRoundTrip: bookingDetails.isRoundTrip,
          passengers: bookingDetails.passengers,
          category: bookingDetails.category,
          paymentMethod,
          currency,
          flightNumber,
          terminal,
          hotelName,
          notes,
          customer: {
            name,
            email,
            phone,
          },
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Error al procesar la reserva');
      }

      setConfirmedBooking(data.booking);
    } catch (err: any) {
      setErrorMsg(err.message || 'Ocurrió un error inesperado');
    } finally {
      setIsSubmitting(false);
    }
  };

  const supportPhone = process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP || '+529981234567';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-navy-900 border border-gold-500/30 rounded-3xl shadow-2xl shadow-navy-950 overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="p-6 bg-navy-950/90 border-b border-gold-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold-500/20 border border-gold-500/40 text-gold-400 flex items-center justify-center">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {confirmedBooking ? '¡Reserva Confirmada con Éxito!' : 'Finalizar Reserva Premium'}
              </h3>
              <span className="text-xs text-gold-400">Americancun Transfer • Tarifa Protegida</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-navy-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {!confirmedBooking ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Trip Summary Pill */}
              <div className="p-4 rounded-2xl bg-navy-950 border border-gold-500/20 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-gray-400 block">Ruta:</span>
                  <span className="font-bold text-white">{quote?.origin} ➔ {quote?.destination}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Vehículo:</span>
                  <span className="font-bold text-gold-400">{bookingDetails.category} ({bookingDetails.passengers} pax)</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Total a Pagar:</span>
                  <span className="font-extrabold text-base text-gold-300">{formatPrice(quote?.total, currency)}</span>
                </div>
              </div>

              {/* Passenger Info */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gold-400 uppercase tracking-wider">
                  1. Datos del Pasajero Principal
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-gray-300 block mb-1">Nombre Completo *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Roberto Sánchez"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-navy-950 border border-gold-500/20 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-gold-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-300 block mb-1">WhatsApp con Lada *</label>
                    <input
                      type="tel"
                      required
                      placeholder="Ej. +52 998 123 4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-navy-950 border border-gold-500/20 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-gold-400"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[11px] text-gray-300 block mb-1">Correo Electrónico *</label>
                    <input
                      type="email"
                      required
                      placeholder="tucorreo@ejemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-navy-950 border border-gold-500/20 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-gold-400"
                    />
                  </div>
                </div>
              </div>

              {/* Flight & Lodging Details */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gold-400 uppercase tracking-wider">
                  2. Logística de Llegada y Alojamiento
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-gray-300 block mb-1">No. de Vuelo o Aerolínea (Opcional)</label>
                    <input
                      type="text"
                      placeholder="Ej. AM 512 o Delta 1420"
                      value={flightNumber}
                      onChange={(e) => setFlightNumber(e.target.value)}
                      className="w-full bg-navy-950 border border-gold-500/20 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-gold-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-300 block mb-1">Terminal de Llegada CUN</label>
                    <select
                      value={terminal}
                      onChange={(e) => setTerminal(e.target.value)}
                      className="w-full bg-navy-950 border border-gold-500/20 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-gold-400"
                    >
                      <option value="Terminal 2">Terminal 2 (Nacional)</option>
                      <option value="Terminal 3">Terminal 3 (Internacional USA/Canadá)</option>
                      <option value="Terminal 4">Terminal 4 (Llegadas Mixtas / Europa)</option>
                      <option value="Por definir">Aún no la conozco</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[11px] text-gray-300 block mb-1">Nombre del Hotel, Villa o Airbnb de Destino</label>
                    <input
                      type="text"
                      placeholder="Ej. Hotel Riu Palace Las Américas o Hyatt Ziva"
                      value={hotelName}
                      onChange={(e) => setHotelName(e.target.value)}
                      className="w-full bg-navy-950 border border-gold-500/20 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-gold-400"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gold-400 uppercase tracking-wider">
                  3. Método de Pago Automatizado
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  {/* SPEI Option */}
                  <div
                    onClick={() => setPaymentMethod('BANK_TRANSFER')}
                    className={`cursor-pointer p-4 rounded-2xl border transition-all ${
                      paymentMethod === 'BANK_TRANSFER'
                        ? 'border-gold-400 bg-gold-500/15 shadow-lg'
                        : 'border-navy-800 bg-navy-950/60 hover:border-gold-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-gold-400" />
                        <span className="text-xs font-bold text-white">Transferencia SPEI</span>
                      </div>
                      {paymentMethod === 'BANK_TRANSFER' && (
                        <div className="w-4 h-4 rounded-full bg-gold-400 text-navy-950 flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <p className="text-[11px] text-gray-300">
                      Ficha automática con CLABE BBVA y concepto único. Conciliación inmediata sin cargos bancarios.
                    </p>
                  </div>

                  {/* Cash on Arrival Option */}
                  <div
                    onClick={() => setPaymentMethod('CASH')}
                    className={`cursor-pointer p-4 rounded-2xl border transition-all ${
                      paymentMethod === 'CASH'
                        ? 'border-gold-400 bg-gold-500/15 shadow-lg'
                        : 'border-navy-800 bg-navy-950/60 hover:border-gold-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Banknote className="w-4 h-4 text-gold-400" />
                        <span className="text-xs font-bold text-white">Pago en Efectivo</span>
                      </div>
                      {paymentMethod === 'CASH' && (
                        <div className="w-4 h-4 rounded-full bg-gold-400 text-navy-950 flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <p className="text-[11px] text-gray-300">
                      Pagas directamente a tu chofer al abordar tu unidad. Aceptamos Pesos Mexicanos (MXN) y Dólares (USD).
                    </p>
                  </div>

                </div>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 hover:from-gold-300 hover:to-gold-500 text-navy-950 font-bold text-sm uppercase tracking-wider shadow-xl shadow-gold-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Generando Ficha & Confirmando...</span>
                ) : (
                  <>
                    <span>Confirmar Reserva ({formatPrice(quote?.total, currency)})</span>
                    <ShieldCheck className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>
          ) : (
            
            /* SUCCESS CONFIRMATION STATE WITH SPEI VOUCHER */
            <div className="space-y-6 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="text-base font-bold text-white">¡Reserva Registrada y Confirmada!</h4>
                  <p className="text-xs text-emerald-300">
                    Código de Reserva Oficial: <strong className="text-white font-mono">{confirmedBooking.bookingCode}</strong>
                  </p>
                </div>
              </div>

              {/* SPEI Automated Voucher Card */}
              {confirmedBooking.speiVoucher && (
                <div className="p-5 rounded-2xl bg-navy-950 border border-gold-500/40 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-navy-800">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400 block">
                        Ficha Digital de Pago SPEI
                      </span>
                      <span className="text-sm font-bold text-white">
                        {confirmedBooking.speiVoucher.bankName}
                      </span>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 font-medium">
                      Conciliación Automática
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {/* CLABE */}
                    <div className="p-3 rounded-xl bg-navy-900 border border-navy-800 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-gray-400 block">CLABE Interbancaria:</span>
                        <span className="font-mono text-white font-bold">{confirmedBooking.speiVoucher.clabe}</span>
                      </div>
                      <button
                        onClick={() => handleCopy(confirmedBooking.speiVoucher.clabe, 'clabe')}
                        className="p-1.5 rounded-lg bg-navy-800 hover:bg-gold-500 hover:text-navy-950 text-gold-400 transition-colors"
                        title="Copiar CLABE"
                      >
                        {copiedField === 'clabe' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* CONCEPTO */}
                    <div className="p-3 rounded-xl bg-navy-900 border border-navy-800 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-gray-400 block">Concepto de Pago (Exacto):</span>
                        <span className="font-mono text-gold-400 font-bold">{confirmedBooking.speiVoucher.concept}</span>
                      </div>
                      <button
                        onClick={() => handleCopy(confirmedBooking.speiVoucher.concept, 'concept')}
                        className="p-1.5 rounded-lg bg-navy-800 hover:bg-gold-500 hover:text-navy-950 text-gold-400 transition-colors"
                        title="Copiar Concepto"
                      >
                        {copiedField === 'concept' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* BENEFICIARY */}
                    <div className="p-3 rounded-xl bg-navy-900 border border-navy-800 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-gray-400 block">Beneficiario:</span>
                        <span className="text-white font-medium">{confirmedBooking.speiVoucher.beneficiary}</span>
                      </div>
                      <button
                        onClick={() => handleCopy(confirmedBooking.speiVoucher.beneficiary, 'beneficiary')}
                        className="p-1.5 rounded-lg bg-navy-800 hover:bg-gold-500 hover:text-navy-950 text-gold-400 transition-colors"
                        title="Copiar Beneficiario"
                      >
                        {copiedField === 'beneficiary' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* AMOUNT */}
                    <div className="p-3 rounded-xl bg-navy-900 border border-navy-800 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-gray-400 block">Monto a Transferir:</span>
                        <span className="font-bold text-gold-300 text-sm">
                          ${confirmedBooking.speiVoucher.amountMxn.toLocaleString('es-MX')} MXN
                        </span>
                      </div>
                      <button
                        onClick={() => handleCopy(String(confirmedBooking.speiVoucher.amountMxn), 'amount')}
                        className="p-1.5 rounded-lg bg-navy-800 hover:bg-gold-500 hover:text-navy-950 text-gold-400 transition-colors"
                        title="Copiar Monto"
                      >
                        {copiedField === 'amount' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <p className="text-[11px] text-gray-400 leading-relaxed italic">
                    * Tu reserva quedará activa inmediatamente. Conserva este comprobante o compártelo vía WhatsApp.
                  </p>
                </div>
              )}

              {/* Cash Instructions Card */}
              {confirmedBooking.paymentMethod === 'CASH' && (
                <div className="p-4 rounded-2xl bg-navy-950 border border-gold-500/20 text-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-gold-400">
                    <Banknote className="w-4 h-4" />
                    <span>Pago en Efectivo al Abordar</span>
                  </div>
                  <p className="text-gray-300">
                    El chofer cobrará el importe acordado de <strong>{formatPrice(confirmedBooking.totalAmount, confirmedBooking.currency)}</strong> al momento de recibirte en la unidad. Puedes pagar en Pesos o Dólares en efectivo.
                  </p>
                </div>
              )}

              {/* Automated WhatsApp 60-Minute Alarm Notification Alert */}
              <div className="p-4 rounded-2xl bg-gold-500/10 border border-gold-500/30 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-gold-400">
                  <Clock className="w-4 h-4" />
                  <span>Sistema de Alarma Automática Activado</span>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Recibirás una notificación automática vía WhatsApp al número <strong>{phone}</strong> exactamente <strong>60 minutos antes</strong> de la salida con los datos del chofer, placas del vehículo y asistencia directa.
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={`/booking/${confirmedBooking.bookingCode}`}
                  className="flex-1 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-2"
                >
                  <span>Ver Ficha Completa en Web</span>
                  <Download className="w-3.5 h-3.5" />
                </a>

                <a
                  href={`https://wa.me/${supportPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hola Americancun Transfer, confirmo mi reserva #${confirmedBooking.bookingCode} a nombre de ${name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Enviar a WhatsApp Oficial</span>
                </a>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};

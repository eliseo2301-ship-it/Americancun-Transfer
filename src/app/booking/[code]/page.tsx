'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { 
  CheckCircle2, 
  Car, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Building2, 
  Copy, 
  Check, 
  Printer, 
  MessageSquare, 
  Compass, 
  ShieldCheck, 
  AlertCircle,
  ArrowLeft,
  Facebook
} from 'lucide-react';
import { formatPrice } from '@/lib/pricing';

export default function BookingDetailPage() {
  const params = useParams();
  const code = params?.code as string;

  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    if (!code) return;

    fetch(`/api/bookings?code=${encodeURIComponent(code)}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setBooking(data.booking);
        } else {
          setError(data.error || 'Reserva no encontrada');
        }
      })
      .catch(err => {
        setError(err.message || 'Error cargando datos de la reserva');
      })
      .finally(() => setLoading(false));
  }, [code]);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-950 flex items-center justify-center text-gold-400">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-gold-400 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-semibold">Cargando Voucher de Reserva...</span>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-navy-950 flex items-center justify-center p-4">
        <div className="glass-panel p-8 rounded-3xl max-w-md text-center border border-red-500/30">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">No pudimos localizar la reserva</h2>
          <p className="text-xs text-gray-400 mb-6">{error || 'El código ingresado no existe.'}</p>
          <Link
            href="/"
            className="px-6 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Inicio</span>
          </Link>
        </div>
      </div>
    );
  }

  const pickupDate = new Date(booking.dateTime);
  const supportPhone = process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP || '+52 998 768 7600';

  return (
    <div className="min-h-screen bg-navy-950 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Top Navbar Back Link */}
        <div className="flex items-center justify-between no-print">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-gold-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a Americancun Transfer</span>
          </Link>

          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-navy-900 border border-gold-500/30 hover:border-gold-400 text-gold-300 text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir / Guardar PDF</span>
          </button>
        </div>

        {/* Voucher Main Card */}
        <div className="glass-panel-gold rounded-3xl p-6 sm:p-10 border border-gold-500/40 shadow-2xl relative overflow-hidden">
          
          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-gold-500/25 gap-4">
            <div className="flex items-center space-x-3">
              <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-gold-500/40 bg-black flex items-center justify-center shadow-lg shadow-gold-500/25">
                <Image
                  src="/logo.png"
                  alt="Americancun Transfer"
                  fill
                  sizes="56px"
                  className="object-contain p-1"
                />
              </div>
              <div>
                <span className="font-serif tracking-widest text-xl font-extrabold uppercase">
                  Americancun <span className="text-gold-400">Transfer</span>
                </span>
                <span className="text-xs text-gray-400 block font-medium">Voucher Oficial de Traslado Turístico</span>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] uppercase tracking-wider text-gray-400 block font-semibold">Código de Reserva:</span>
              <span className="text-2xl font-mono font-extrabold text-gold-400 tracking-wider">
                {booking.bookingCode}
              </span>
            </div>
          </div>

          {/* Status Bar */}
          <div className="my-6 p-4 rounded-2xl bg-navy-950 border border-gold-500/20 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-bold text-white">Estado: Confirmado en Sistema</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-gold-300">
              <ShieldCheck className="w-4 h-4 text-gold-400" />
              <span>Garantía de Mejor Precio & Monitoreo 24/7</span>
            </div>
          </div>

          {/* Logistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 text-xs">
            
            {/* Left: Origin & Destination */}
            <div className="p-5 rounded-2xl bg-navy-900/80 border border-navy-800 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gold-400">Detalles del Itinerario</h4>
              
              <div className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-gray-400 block">Punto de Origen:</span>
                    <span className="font-semibold text-white text-sm">{booking.origin}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-gray-400 block">Destino Final:</span>
                    <span className="font-semibold text-white text-sm">{booking.destination}</span>
                    {booking.hotelName && (
                      <span className="text-gray-300 block text-xs mt-0.5">Hotel: {booking.hotelName}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Calendar className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-gray-400 block">Fecha y Hora de Recogida:</span>
                    <span className="font-semibold text-white">
                      {pickupDate.toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} a las {pickupDate.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>

                {booking.returnDateTime && (
                  <div className="flex items-start gap-2.5">
                    <Calendar className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] text-gray-400 block">Fecha y Hora de Regreso:</span>
                      <span className="font-semibold text-white">
                        {new Date(booking.returnDateTime).toLocaleString('es-MX')}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Passenger & Vehicle Assigned */}
            <div className="p-5 rounded-2xl bg-navy-900/80 border border-navy-800 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gold-400">Pasajero & Unidad Asignada</h4>
              
              <div className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <Users className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-gray-400 block">Titular de la Reserva:</span>
                    <span className="font-semibold text-white text-sm">{booking.customer?.name}</span>
                    <span className="text-gray-400 block">{booking.customer?.phone} • {booking.customer?.email}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Car className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-gray-400 block">Categoría & Vehículo:</span>
                    <span className="font-semibold text-white">
                      {booking.category} ({booking.passengers} Pasajeros)
                    </span>
                    <span className="text-gold-300 block">{booking.assignedVehicle || 'Toyota HiAce Luxury Climatizada'}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Users className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-gray-400 block">Conductor Bilingüe Certificado:</span>
                    <span className="font-semibold text-white">{booking.driverName || 'Carlos Méndez'}</span>
                    <span className="text-gray-400 block">Tel. Directo: {booking.driverPhone || supportPhone}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Automated 60-Minute Alarm Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 border border-gold-500/30 my-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold-500/20 text-gold-400 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 animate-pulse" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-white text-sm block">
                  🔔 Sistema de Alarma Automática en 60 Minutos
                </span>
                <p className="text-gray-300 mt-1 leading-relaxed">
                  Nuestro despachador satelital enviará un mensaje automatizado a tu WhatsApp (<strong>{booking.customer?.phone}</strong>) exactamente 60 minutos antes de la hora acordada ({pickupDate.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}) con la placa del vehículo, fotografía del chofer y confirmación de llegada.
                </p>
              </div>
            </div>
          </div>

          {/* SPEI Digital Voucher (if Bank Transfer) */}
          {booking.speiVoucher && (
            <div className="p-6 rounded-2xl bg-navy-950 border-2 border-gold-500/40 my-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-navy-800">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-gold-400" />
                  <span className="text-sm font-bold text-white">Ficha de Pago SPEI (BBVA México)</span>
                </div>
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                  Sin Comisiones
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-navy-900 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 block">CLABE Interbancaria:</span>
                    <span className="font-mono text-white font-bold">{booking.speiVoucher.clabe}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(booking.speiVoucher.clabe, 'clabe')}
                    className="p-1.5 rounded-lg bg-navy-800 hover:bg-gold-500 hover:text-navy-950 text-gold-400 transition-colors"
                  >
                    {copiedField === 'clabe' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-navy-900 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 block">Concepto de Pago Único:</span>
                    <span className="font-mono text-gold-400 font-bold">{booking.speiVoucher.concept}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(booking.speiVoucher.concept, 'concept')}
                    className="p-1.5 rounded-lg bg-navy-800 hover:bg-gold-500 hover:text-navy-950 text-gold-400 transition-colors"
                  >
                    {copiedField === 'concept' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-navy-900 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 block">Beneficiario:</span>
                    <span className="text-white font-medium">{booking.speiVoucher.beneficiary}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(booking.speiVoucher.beneficiary, 'beneficiary')}
                    className="p-1.5 rounded-lg bg-navy-800 hover:bg-gold-500 hover:text-navy-950 text-gold-400 transition-colors"
                  >
                    {copiedField === 'beneficiary' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-navy-900 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 block">Monto a Transferir:</span>
                    <span className="text-gold-300 font-bold text-sm">
                      ${booking.speiVoucher.amountMxn.toLocaleString('es-MX')} MXN
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(String(booking.speiVoucher.amountMxn), 'amount')}
                    className="p-1.5 rounded-lg bg-navy-800 hover:bg-gold-500 hover:text-navy-950 text-gold-400 transition-colors"
                  >
                    {copiedField === 'amount' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Total Row */}
          <div className="pt-6 border-t border-gold-500/25 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-gray-400 block">Total Liquidado / Por Liquidar:</span>
              <span className="text-3xl font-extrabold gold-gradient-text">
                {formatPrice(booking.totalAmount, booking.currency)}
              </span>
            </div>

            <div className="flex flex-wrap gap-3 no-print">
              <a
                href="https://www.facebook.com/AMER1CANCUN/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow"
              >
                <Facebook className="w-4 h-4" />
                <span>Facebook Oficial</span>
              </a>

              <a
                href={`https://wa.me/${supportPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hola, tengo una duda sobre mi reserva #${booking.bookingCode}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Asistencia WhatsApp 24/7</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

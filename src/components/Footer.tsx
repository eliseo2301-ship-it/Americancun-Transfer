'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Compass, ShieldCheck, Phone, Mail, MapPin, MessageSquare, CreditCard, Clock, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  const supportPhone = process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP || '+52 998 768 7600';

  return (
    <footer className="bg-navy-950 border-t border-gold-500/20 text-gray-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-gold-500/30 bg-black flex items-center justify-center shadow-lg shadow-gold-500/20">
                <Image
                  src="/logo.png"
                  alt="Americancun Transfer"
                  fill
                  sizes="48px"
                  className="object-contain p-1"
                />
              </div>
              <span className="font-serif tracking-widest text-lg font-bold text-white uppercase">
                Americancun <span className="text-gold-400">Transfer</span>
              </span>
            </div>

            <p className="text-gray-400 leading-relaxed text-xs max-w-sm">
              Plataforma digital premium de traslados turísticos privados y grupales en Cancún, Riviera Maya y Yucatán. Cotizaciones instantáneas, tarifas más competitivas del mercado, checkout automatizado con SPEI / Efectivo y recordatorios vía WhatsApp con 60 minutos de anticipación.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5" />
                Empresa 100% Regulada SCT
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/20 font-semibold text-[11px]">
                <Clock className="w-3.5 h-3.5" />
                Puntualidad 100%
              </span>
            </div>

            <div className="pt-2">
              <a
                href="https://www.facebook.com/AMER1CANCUN/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/30 text-xs font-semibold transition-all shadow"
              >
                <Facebook className="w-3.5 h-3.5" />
                <span>Síguenos en Facebook Oficial</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Destinos Top</h4>
            <ul className="space-y-2">
              <li><a href="#destinos" className="hover:text-gold-400 transition-colors">Cancún Zona Hotelera</a></li>
              <li><a href="#destinos" className="hover:text-gold-400 transition-colors">Playa del Carmen</a></li>
              <li><a href="#destinos" className="hover:text-gold-400 transition-colors">Tulum & Ruinas Mayas</a></li>
              <li><a href="#destinos" className="hover:text-gold-400 transition-colors">Tour Chichén Itzá</a></li>
              <li><a href="#destinos" className="hover:text-gold-400 transition-colors">Parques Xcaret & Xel-Há</a></li>
              <li><a href="#destinos" className="hover:text-gold-400 transition-colors">Holbox (Pto. Chiquilá)</a></li>
            </ul>
          </div>

          {/* Logistics & Legal */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Logística & Ayuda</h4>
            <ul className="space-y-2">
              <li><a href="#faq" className="hover:text-gold-400 transition-colors">Terminal 2 - CUN</a></li>
              <li><a href="#faq" className="hover:text-gold-400 transition-colors">Terminal 3 - CUN</a></li>
              <li><a href="#faq" className="hover:text-gold-400 transition-colors">Terminal 4 - CUN</a></li>
              <li><a href="#tarifario" className="hover:text-gold-400 transition-colors">Tarifario Inteligente</a></li>
              <li><a href="#garantia" className="hover:text-gold-400 transition-colors">Garantía de Mejor Precio</a></li>
              <li><a href="#faq" className="hover:text-gold-400 transition-colors">Políticas de Equipaje</a></li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Atención Inmediata</h4>
            <div className="space-y-2 text-xs">
              <a
                href={`https://wa.me/${supportPhone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span>WhatsApp: {supportPhone}</span>
              </a>

              <a
                href="https://www.facebook.com/AMER1CANCUN/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <Facebook className="w-4 h-4 shrink-0" />
                <span>Facebook: /AMER1CANCUN</span>
              </a>

              <div className="flex items-center gap-2 text-gray-300">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Carretera Cancún-Chetumal Km 22, Aeropuerto CUN</span>
              </div>

              <div className="flex items-center gap-2 text-gray-300">
                <CreditCard className="w-4 h-4 text-gold-400 shrink-0" />
                <span>SPEI BBVA / Efectivo USD & MXN</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-navy-900 flex flex-col sm:flex-row items-center justify-between text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Americancun Transfer. Todos los derechos reservados. Operado bajo normativa federal de turismo.</p>
          <div className="flex gap-4">
            <span className="hover:text-gray-400 cursor-pointer">Términos del Servicio</span>
            <span>•</span>
            <span className="hover:text-gray-400 cursor-pointer">Aviso de Privacidad</span>
            <span>•</span>
            <span className="hover:text-gray-400 cursor-pointer">Seguridad de Pago SPEI</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

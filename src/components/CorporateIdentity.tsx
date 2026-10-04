'use client';

import React from 'react';
import { Target, Eye, HeartHandshake, Clock, ShieldCheck, Headphones, MapPin, Award } from 'lucide-react';

export const CorporateIdentity: React.FC = () => {
  return (
    <section id="identidad" className="py-20 bg-navy-950 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold-600/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Identidad & Compromiso de Excelencia</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            Nuestra Filosofía <span className="gold-gradient-text">Customer First</span>
          </h2>
          <p className="mt-3 text-gray-400 text-sm">
            Fundados con el compromiso de transformar la experiencia de traslado en el Caribe Mexicano, combinando tecnología de automatización con calidez humana insuperable.
          </p>
        </div>

        {/* Misión, Visión, Filosofía Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          {/* Misión */}
          <div className="glass-panel rounded-3xl p-8 border border-gold-500/25 hover:border-gold-500/60 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 text-navy-950 flex items-center justify-center mb-6 shadow-lg shadow-gold-500/20 group-hover:scale-105 transition-transform">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <span>Nuestra Misión</span>
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Brindar traslados y experiencias turísticas seguras, puntuales y de excelencia, conectando a viajeros de todo el mundo con la riqueza cultural y natural del Caribe Mexicano y Yucatán.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-navy-800 text-xs text-gold-400 font-semibold tracking-wider uppercase">
              Puntualidad • Seguridad • Calidez
            </div>
          </div>

          {/* Visión */}
          <div className="glass-panel rounded-3xl p-8 border border-gold-500/25 hover:border-gold-500/60 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-caribbean-500 to-caribbean-700 text-white flex items-center justify-center mb-6 shadow-lg shadow-caribbean-500/20 group-hover:scale-105 transition-transform">
                <Eye className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <span>Nuestra Visión</span>
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Consolidarnos como la empresa líder y referente tecnológico en transporte turístico en el sureste mexicano por confiabilidad, calidez humana y precios accesibles.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-navy-800 text-xs text-caribbean-500 font-semibold tracking-wider uppercase">
              Liderazgo • Tecnología • Confianza
            </div>
          </div>

          {/* Filosofía & Satisfacción */}
          <div className="glass-panel rounded-3xl p-8 border border-gold-500/25 hover:border-gold-500/60 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <HeartHandshake className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <span>Filosofía Customer First</span>
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Cada viajero es un invitado de honor. Operamos con 100% de puntualidad garantizada, unidades monitoreadas satelitalmente y atención continua para que tu llegada sea el mejor comienzo de tus vacaciones.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-navy-800 text-xs text-emerald-400 font-semibold tracking-wider uppercase">
              100% Satisfacción Garantizada
            </div>
          </div>

        </div>

        {/* 4 Pillars of Excellence */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-navy-900/80 border border-gold-500/20 flex flex-col items-center text-center">
            <Clock className="w-8 h-8 text-gold-400 mb-2" />
            <span className="text-base font-bold text-white">100% Puntualidad</span>
            <span className="text-xs text-gray-400 mt-1">Conductor listo antes de que aterrice tu vuelo.</span>
          </div>

          <div className="p-5 rounded-2xl bg-navy-900/80 border border-gold-500/20 flex flex-col items-center text-center">
            <ShieldCheck className="w-8 h-8 text-gold-400 mb-2" />
            <span className="text-base font-bold text-white">Monitoreo Satelital</span>
            <span className="text-xs text-gray-400 mt-1">GPS y telemetría en tiempo real en cada ruta.</span>
          </div>

          <div className="p-5 rounded-2xl bg-navy-900/80 border border-gold-500/20 flex flex-col items-center text-center">
            <Headphones className="w-8 h-8 text-gold-400 mb-2" />
            <span className="text-base font-bold text-white">Atención 24/7 Bilingüe</span>
            <span className="text-xs text-gray-400 mt-1">Asistencia por WhatsApp y teléfono en todo momento.</span>
          </div>

          <div className="p-5 rounded-2xl bg-navy-900/80 border border-gold-500/20 flex flex-col items-center text-center">
            <MapPin className="w-8 h-8 text-gold-400 mb-2" />
            <span className="text-base font-bold text-white">Alerta 60 Minutos</span>
            <span className="text-xs text-gray-400 mt-1">Recibe datos del vehículo y chofer 1 hora antes.</span>
          </div>
        </div>

      </div>
    </section>
  );
};

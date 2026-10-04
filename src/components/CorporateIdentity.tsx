'use client';

import React from 'react';
import { Target, Eye, HeartHandshake, Clock, ShieldCheck, Headphones, MapPin, Award } from 'lucide-react';
import { Language, TRANSLATIONS } from '@/lib/translations';

interface CorporateIdentityProps {
  language: Language;
}

export const CorporateIdentity: React.FC<CorporateIdentityProps> = ({ language }) => {
  const t = TRANSLATIONS[language].identity;

  return (
    <section id="identidad" className="py-20 bg-navy-950 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold-600/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            {t.title} <span className="gold-gradient-text">{t.titleHighlight}</span>
          </h2>
          <p className="mt-3 text-gray-400 text-sm">
            {t.subtitle}
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
                <span>{t.missionTitle}</span>
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                {t.missionDesc}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-navy-800 text-xs text-gold-400 font-semibold tracking-wider uppercase">
              {language === 'en' ? 'Punctuality • Safety • Warmth' : 'Puntualidad • Seguridad • Calidez'}
            </div>
          </div>

          {/* Visión */}
          <div className="glass-panel rounded-3xl p-8 border border-gold-500/25 hover:border-gold-500/60 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-caribbean-500 to-caribbean-700 text-white flex items-center justify-center mb-6 shadow-lg shadow-caribbean-500/20 group-hover:scale-105 transition-transform">
                <Eye className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <span>{t.visionTitle}</span>
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                {t.visionDesc}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-navy-800 text-xs text-caribbean-500 font-semibold tracking-wider uppercase">
              {language === 'en' ? 'Leadership • Technology • Trust' : 'Liderazgo • Tecnología • Confianza'}
            </div>
          </div>

          {/* Filosofía & Satisfacción */}
          <div className="glass-panel rounded-3xl p-8 border border-gold-500/25 hover:border-gold-500/60 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <HeartHandshake className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <span>{t.philTitle}</span>
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                {t.philDesc}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-navy-800 text-xs text-emerald-400 font-semibold tracking-wider uppercase">
              {language === 'en' ? '100% Guaranteed Satisfaction' : '100% Satisfacción Garantizada'}
            </div>
          </div>

        </div>

        {/* 4 Pillars of Excellence */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-navy-900/80 border border-gold-500/20 flex flex-col items-center text-center">
            <Clock className="w-8 h-8 text-gold-400 mb-2" />
            <span className="text-base font-bold text-white">{language === 'en' ? '100% Punctuality' : '100% Puntualidad'}</span>
            <span className="text-xs text-gray-400 mt-1">{language === 'en' ? 'Driver waiting before your flight touches down.' : 'Conductor listo antes de que aterrice tu vuelo.'}</span>
          </div>

          <div className="p-5 rounded-2xl bg-navy-900/80 border border-gold-500/20 flex flex-col items-center text-center">
            <ShieldCheck className="w-8 h-8 text-gold-400 mb-2" />
            <span className="text-base font-bold text-white">{language === 'en' ? 'Satellite GPS Tracking' : 'Monitoreo Satelital'}</span>
            <span className="text-xs text-gray-400 mt-1">{language === 'en' ? 'Live telemetry on every single ride.' : 'GPS y telemetría en tiempo real en cada ruta.'}</span>
          </div>

          <div className="p-5 rounded-2xl bg-navy-900/80 border border-gold-500/20 flex flex-col items-center text-center">
            <Headphones className="w-8 h-8 text-gold-400 mb-2" />
            <span className="text-base font-bold text-white">{language === 'en' ? '24/7 Bilingual Concierge' : 'Atención 24/7 Bilingüe'}</span>
            <span className="text-xs text-gray-400 mt-1">{language === 'en' ? 'WhatsApp and telephone support non-stop.' : 'Asistencia por WhatsApp y teléfono en todo momento.'}</span>
          </div>

          <div className="p-5 rounded-2xl bg-navy-900/80 border border-gold-500/20 flex flex-col items-center text-center">
            <MapPin className="w-8 h-8 text-gold-400 mb-2" />
            <span className="text-base font-bold text-white">{language === 'en' ? '60-Minute Alert' : 'Alerta 60 Minutos'}</span>
            <span className="text-xs text-gray-400 mt-1">{language === 'en' ? 'Driver and vehicle details 1 hour prior.' : 'Recibe datos del vehículo y chofer 1 hora antes.'}</span>
          </div>
        </div>

      </div>
    </section>
  );
};

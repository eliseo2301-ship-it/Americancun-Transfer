'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Clock, MapPin, Sparkles, Check, ArrowRight } from 'lucide-react';
import { DESTINATIONS_DATA } from '@/lib/destinations-data';
import { formatPrice } from '@/lib/pricing';
import { Language, TRANSLATIONS } from '@/lib/translations';

interface DestinationsShowcaseProps {
  currency: 'USD' | 'MXN';
  language: Language;
  onSelectDestination: (slug: string) => void;
}

export const DestinationsShowcase: React.FC<DestinationsShowcaseProps> = ({ currency, language, onSelectDestination }) => {
  const t = TRANSLATIONS[language].destinations;
  const [activeTab, setActiveTab] = useState<'all' | 'quintana_roo' | 'yucatan' | 'parques'>('all');

  const filtered = DESTINATIONS_DATA.filter(item => {
    if (activeTab === 'all') return true;
    return item.region === activeTab;
  });

  return (
    <section id="destinos" className="py-20 bg-navy-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              {t.title} <span className="gold-gradient-text">{t.titleHighlight}</span>
            </h2>
            <p className="mt-2 text-gray-400 text-sm max-w-xl">
              {t.subtitle}
            </p>
          </div>

          {/* Region Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0 p-1 bg-navy-900 border border-gold-500/20 rounded-xl">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'all'
                  ? 'bg-gold-500 text-navy-950 shadow font-bold'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {t.filterAll} (15)
            </button>
            <button
              onClick={() => setActiveTab('quintana_roo')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'quintana_roo'
                  ? 'bg-gold-500 text-navy-950 shadow font-bold'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {t.filterQr} (7)
            </button>
            <button
              onClick={() => setActiveTab('yucatan')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'yucatan'
                  ? 'bg-gold-500 text-navy-950 shadow font-bold'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {t.filterYuc} (5)
            </button>
            <button
              onClick={() => setActiveTab('parques')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'parques'
                  ? 'bg-gold-500 text-navy-950 shadow font-bold'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {t.filterParks} (3)
            </button>
          </div>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => {
            const groupVanRate = formatPrice(
              item.priceGroupVanUsd * (currency === 'MXN' ? 18.5 : 1),
              currency
            );
            const perPersonRate = formatPrice(
              item.pricePerPersonUsd * (currency === 'MXN' ? 18.5 : 1),
              currency
            );

            return (
              <div
                key={item.id}
                className="group rounded-3xl overflow-hidden glass-panel border border-gold-500/20 hover:border-gold-500/60 transition-all duration-300 flex flex-col hover:shadow-2xl hover:shadow-gold-500/10"
              >
                {/* Image & Badges */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-navy-900">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
                  
                  {/* Region Badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-navy-950/80 backdrop-blur-md border border-gold-500/30 text-[10px] font-bold text-gold-400 uppercase tracking-wider">
                    {item.regionLabel}
                  </div>

                  {item.popular && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 text-[10px] font-extrabold uppercase tracking-wider shadow">
                      Popular
                    </div>
                  )}

                  {/* Travel Time & Distance */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-gray-200">
                    <span className="flex items-center gap-1 bg-black/60 backdrop-blur px-2 py-0.5 rounded-lg border border-white/10">
                      <Clock className="w-3.5 h-3.5 text-gold-400" />
                      {item.estimatedDuration}
                    </span>
                    <span className="flex items-center gap-1 bg-black/60 backdrop-blur px-2 py-0.5 rounded-lg border border-white/10">
                      <MapPin className="w-3.5 h-3.5 text-gold-400" />
                      {item.distanceKm} km
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-gold-400 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gold-300/90 font-medium mt-1 mb-2">
                      {item.tagline}
                    </p>
                    <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Features checklist */}
                    <div className="mt-4 pt-3 border-t border-navy-800 space-y-1.5">
                      {item.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[11px] text-gray-300">
                          <Check className="w-3 h-3 text-gold-400 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing footer */}
                  <div className="mt-6 pt-4 border-t border-navy-800/80 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-gray-400 block">{t.fromGroupVan}</span>
                      <span className="text-lg font-bold text-gold-400">
                        {groupVanRate}
                      </span>
                      <span className="text-[10px] text-gray-500 ml-1">({perPersonRate}/pax)</span>
                    </div>

                    <button
                      onClick={() => onSelectDestination(item.slug)}
                      className="px-3.5 py-2 rounded-xl bg-navy-800 hover:bg-gold-500 text-gold-400 hover:text-navy-950 font-semibold text-xs border border-gold-500/30 transition-all flex items-center gap-1 group/btn"
                    >
                      <span>{t.quoteBtn}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

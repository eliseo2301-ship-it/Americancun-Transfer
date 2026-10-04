'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Compass, ShieldCheck, Phone, MessageSquare, Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  currency: 'USD' | 'MXN';
  onCurrencyChange: (c: 'USD' | 'MXN') => void;
  onOpenBot?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currency, onCurrencyChange, onOpenBot }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const supportPhone = process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP || '+529981234567';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-gold-500/20 bg-navy-950/85">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gold-400 to-gold-700 flex items-center justify-center shadow-lg shadow-gold-500/20 group-hover:scale-105 transition-transform duration-300">
              <Compass className="w-6 h-6 text-navy-950" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif tracking-widest text-lg font-bold text-white uppercase flex items-center gap-1.5">
                Americancun <span className="text-gold-400">Transfer</span>
              </span>
              <span className="text-[10px] tracking-wider text-gray-400 uppercase font-medium">
                Luxury Private & Group Transfers
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-8 text-sm font-medium text-gray-200">
            <a href="#booking-engine" className="hover:text-gold-400 transition-colors">Cotizador</a>
            <a href="#destinos" className="hover:text-gold-400 transition-colors">Destinos & Tours</a>
            <a href="#tarifario" className="hover:text-gold-400 transition-colors">Tarifario Inteligente</a>
            <a href="#garantia" className="hover:text-gold-400 transition-colors flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-gold-400" />
              Garantía de Precio
            </a>
            <a href="#identidad" className="hover:text-gold-400 transition-colors">Nosotros</a>
            <a href="#faq" className="hover:text-gold-400 transition-colors">Terminales CUN & FAQ</a>
          </div>

          {/* Right Action Bar */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Currency Selector */}
            <div className="flex items-center bg-navy-900 border border-gold-500/30 rounded-lg p-1 text-xs font-semibold">
              <button
                onClick={() => onCurrencyChange('USD')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  currency === 'USD'
                    ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 shadow'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                USD ($)
              </button>
              <button
                onClick={() => onCurrencyChange('MXN')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  currency === 'MXN'
                    ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 shadow'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                MXN ($)
              </button>
            </div>

            {/* Direct WhatsApp Concierge Button */}
            <a
              href={`https://wa.me/${supportPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hola Americancun Transfer, deseo información y cotización de traslado.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs tracking-wide shadow-lg shadow-emerald-600/20 transition-all hover:scale-105"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp 24/7</span>
            </a>

            {/* AI Assistant Quick Trigger */}
            {onOpenBot && (
              <button
                onClick={onOpenBot}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-navy-900 border border-gold-500/40 text-gold-300 hover:text-white hover:border-gold-400 text-xs transition-colors"
                title="Abrir Chatbot de Cotización"
              >
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span>Chatbot Bot</span>
              </button>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center md:hidden gap-3">
            <button
              onClick={() => onCurrencyChange(currency === 'USD' ? 'MXN' : 'USD')}
              className="text-xs px-2.5 py-1 rounded border border-gold-500/40 text-gold-400 bg-navy-900"
            >
              {currency}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-navy-900 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-gold-500/20 px-4 pt-2 pb-6 space-y-3 bg-navy-950">
          <a
            href="#booking-engine"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-gold-400"
          >
            Cotizador Rápido
          </a>
          <a
            href="#destinos"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-gold-400"
          >
            Destinos & Tours
          </a>
          <a
            href="#tarifario"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-gold-400"
          >
            Tarifario Inteligente
          </a>
          <a
            href="#garantia"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-gold-400"
          >
            Garantía de Mejor Precio
          </a>
          <a
            href="#identidad"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-gold-400"
          >
            Misión & Filosofía
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-gold-400"
          >
            Puntos de Encuentro CUN & FAQ
          </a>
          <div className="pt-2 border-t border-gray-800 flex gap-2">
            <a
              href={`https://wa.me/${supportPhone.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-2.5 rounded-lg bg-emerald-600 text-white font-medium text-sm flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp Oficial
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

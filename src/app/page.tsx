'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroBookingEngine } from '@/components/HeroBookingEngine';
import { DestinationsShowcase } from '@/components/DestinationsShowcase';
import { PricingTiers } from '@/components/PricingTiers';
import { CorporateIdentity } from '@/components/CorporateIdentity';
import { FaqSection } from '@/components/FaqSection';
import { Footer } from '@/components/Footer';
import { CheckoutModal } from '@/components/CheckoutModal';
import { ChatbotWidget } from '@/components/ChatbotWidget';
import { calculateQuote } from '@/lib/pricing';
import { VehicleCategory } from '@/types';

export default function HomePage() {
  const [currency, setCurrency] = useState<'USD' | 'MXN'>('USD');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBotOpen, setIsBotOpen] = useState(false);
  const [activeBookingDetails, setActiveBookingDetails] = useState<any>(null);

  const handleOpenBooking = (details: any) => {
    setActiveBookingDetails(details);
    setIsModalOpen(true);
  };

  const handleSelectDestinationFromCatalog = (slug: string) => {
    const q = calculateQuote({
      serviceType: 'AIRPORT_HOTEL',
      origin: 'Aeropuerto Cancún (CUN)',
      destination: slug,
      isRoundTrip: true,
      passengers: 2,
      category: 'GROUP_VAN',
      currency,
    });

    handleOpenBooking({
      serviceType: 'AIRPORT_HOTEL',
      origin: 'Aeropuerto Cancún (CUN)',
      destination: q.destination,
      destinationSlug: slug,
      dateTime: new Date(Date.now() + 24 * 3600 * 1000).toISOString().slice(0, 16),
      returnDateTime: new Date(Date.now() + 8 * 24 * 3600 * 1000).toISOString().slice(0, 16),
      isRoundTrip: true,
      passengers: 2,
      category: 'GROUP_VAN',
      currency,
      quote: q,
    });
  };

  const handleChooseTier = (category: VehicleCategory) => {
    const q = calculateQuote({
      serviceType: 'AIRPORT_HOTEL',
      origin: 'Aeropuerto Cancún (CUN)',
      destination: 'cancun-zona-hotelera',
      isRoundTrip: true,
      passengers: category === 'PER_PERSON' ? 1 : 2,
      category,
      currency,
    });

    handleOpenBooking({
      serviceType: 'AIRPORT_HOTEL',
      origin: 'Aeropuerto Cancún (CUN)',
      destination: q.destination,
      destinationSlug: 'cancun-zona-hotelera',
      dateTime: new Date(Date.now() + 24 * 3600 * 1000).toISOString().slice(0, 16),
      returnDateTime: new Date(Date.now() + 8 * 24 * 3600 * 1000).toISOString().slice(0, 16),
      isRoundTrip: true,
      passengers: category === 'PER_PERSON' ? 1 : 2,
      category,
      currency,
      quote: q,
    });
  };

  return (
    <main className="min-h-screen bg-navy-950 text-white relative">
      {/* Top Navbar */}
      <Navbar
        currency={currency}
        onCurrencyChange={setCurrency}
        onOpenBot={() => setIsBotOpen(true)}
      />

      {/* 1. Hero Booking Engine */}
      <HeroBookingEngine
        currency={currency}
        onBookNow={handleOpenBooking}
      />

      {/* 2. Top Destinations & Tours Showcase */}
      <DestinationsShowcase
        currency={currency}
        onSelectDestination={handleSelectDestinationFromCatalog}
      />

      {/* 3. Tarifario Inteligente */}
      <PricingTiers
        currency={currency}
        onChooseTier={handleChooseTier}
      />

      {/* 4. Identidad Corporativa: Misión, Visión, Filosofía */}
      <CorporateIdentity />

      {/* 5. Centro de Ayuda, Puntos de Encuentro CUN y FAQ */}
      <FaqSection />

      {/* Footer */}
      <Footer />

      {/* Automated Checkout Modal */}
      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bookingDetails={activeBookingDetails}
        currency={currency}
      />

      {/* Interactive Chatbot Widget */}
      <ChatbotWidget
        currency={currency}
        onBookNow={handleOpenBooking}
        isOpen={isBotOpen}
        onToggle={() => setIsBotOpen(!isBotOpen)}
      />
    </main>
  );
}

import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Americancun Transfer | Traslados Turísticos Privados y Tours en Cancún & Riviera Maya',
  description: 'Plataforma digital líder en traslados turísticos privados y grupales en Cancún, Riviera Maya y Yucatán. Cotizaciones instantáneas, Garantía de Mejor Precio, pago seguro por SPEI o efectivo y recordatorios automáticos por WhatsApp 60 minutos antes.',
  keywords: [
    'traslados cancun',
    'cancun airport transfer',
    'transportacion turistica cancun',
    'traslado tulum van privada',
    'tour chichen itza privado',
    'americancun transfer',
    'traslados spei cancun',
    'van privada cancun'
  ],
  authors: [{ name: 'Americancun Transfer S.A. de C.V.' }],
  openGraph: {
    title: 'Americancun Transfer | Experiencias de Traslado de Lujo',
    description: 'Cotizaciones instantáneas, tarifas más competitivas de Cancún y Riviera Maya, checkout con SPEI y alertas WhatsApp en 60 minutos.',
    url: 'https://americancun-transfer.onrender.com',
    siteName: 'Americancun Transfer',
    locale: 'es_MX',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800&family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-navy-950 text-white min-h-screen antialiased selection:bg-gold-500 selection:text-navy-950">
        {children}
      </body>
    </html>
  );
}

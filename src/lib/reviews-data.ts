export interface ReviewItem {
  id: string;
  author: string;
  country: string;
  countryCode: string;
  rating: number;
  date: string;
  serviceType: string;
  serviceTypeEn: string;
  category: 'family' | 'vip' | 'tour';
  title: { es: string; en: string };
  comment: { es: string; en: string };
  avatarUrl: string;
  verified: boolean;
}

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Sarah & Michael Thompson',
    country: 'Dallas, Texas (EE.UU.)',
    countryCode: '🇺🇸',
    rating: 5,
    date: 'Hace 4 días',
    serviceType: 'Aeropuerto CUN ➔ Hyatt Ziva Cancún',
    serviceTypeEn: 'CUN Airport ➔ Hyatt Ziva Cancun',
    category: 'vip',
    title: {
      es: '¡Servicio impecable y puntualidad del 100%!',
      en: 'Flawless service and 100% punctuality!'
    },
    comment: {
      es: 'Nuestro vuelo desde Dallas se retrasó más de 1 hora y nuestro chofer, Carlos, nos estaba esperando puntualmente en la Terminal 3 con cervezas frías y toallas aromáticas. La Suburban impecable y el mensaje de WhatsApp 60 minutos antes nos dio muchísima tranquilidad.',
      en: 'Our flight from Dallas was delayed by over an hour, yet our driver Carlos was waiting patiently at Terminal 3 with ice-cold drinks and refreshing towels. The Suburban was spotless and receiving the WhatsApp alert 60 minutes prior was super reassuring.'
    },
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    verified: true
  },
  {
    id: 'rev-2',
    author: 'Familia Ramírez Morales',
    country: 'Monterrey, N.L. (México)',
    countryCode: '🇲🇽',
    rating: 5,
    date: 'Hace 1 semana',
    serviceType: 'Van Privada 10 pax ➔ Playa del Carmen',
    serviceTypeEn: 'Private 10-Pax Van ➔ Playa del Carmen',
    category: 'family',
    title: {
      es: 'La mejor opción para familias numerosas. Ahorramos bastante.',
      en: 'The absolute best choice for large families. Great savings.'
    },
    comment: {
      es: 'Viajamos 10 personas entre abuelos y niños. Nos asignaron una Toyota HiAce Maxi super amplia y cómoda con aire acondicionado genial. El pago por transferencia SPEI fue facilísimo con la ficha automática. Sin duda los volveremos a contratar.',
      en: 'We traveled with 10 people including grandparents and kids. We got a spacious Maxi Van with powerful AC. Paying via direct SPEI transfer was super smooth with the instant voucher. Will definitely book again.'
    },
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    verified: true
  },
  {
    id: 'rev-3',
    author: 'David & Emily Clarke',
    country: 'Toronto, Ontario (Canadá)',
    countryCode: '🇨🇦',
    rating: 5,
    date: 'Hace 2 semanas',
    serviceType: 'Tour Privado ➔ Chichén Itzá & Cenotes',
    serviceTypeEn: 'Private Tour ➔ Chichén Itzá & Cenotes',
    category: 'tour',
    title: {
      es: 'Tour a Chichén Itzá privado de ensueño',
      en: 'Dream private tour to Chichén Itzá'
    },
    comment: {
      es: 'Hicimos la excursión privada a Chichén Itzá saliendo a las 6:30 am. Llegamos antes que todos los autobuses turísticos y tuvimos las pirámides casi para nosotros solos. El chofer fue muy amable, conocedor de la historia maya y la camioneta sumamente confortable.',
      en: 'We booked the private excursion to Chichén Itzá departing at 6:30 am. We arrived before all the big tour buses and had the ruins practically to ourselves. Our driver was knowledgeable, polite, and the van was extremely comfortable.'
    },
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    verified: true
  },
  {
    id: 'rev-4',
    author: 'Jessica Dupont',
    country: 'Montreal (Canadá / Francia)',
    countryCode: '🇨🇦',
    rating: 5,
    date: 'Hace 3 semanas',
    serviceType: 'Aeropuerto Cancún ➔ Tulum Hotel Zone',
    serviceTypeEn: 'Cancun Airport ➔ Tulum Hotel Zone',
    category: 'vip',
    title: {
      es: 'Seguridad, confort y atención personalizada',
      en: 'Safety, comfort, and personalized attention'
    },
    comment: {
      es: 'Viajé sola por primera vez a Tulum y la seguridad era mi prioridad. El sistema de alerta por WhatsApp me envió el nombre del conductor y las placas del vehículo antes de salir del aeropuerto. Manejo muy suave y profesional.',
      en: 'Traveling solo to Tulum for the first time, safety was my top priority. The automated WhatsApp alert sent me the driver’s name and license plate number before I even exited customs. Super smooth and safe drive.'
    },
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    verified: true
  },
  {
    id: 'rev-5',
    author: 'Ing. Roberto Mendoza',
    country: 'Ciudad de México (México)',
    countryCode: '🇲🇽',
    rating: 5,
    date: 'Hace 1 mes',
    serviceType: 'Traslado Redondo ➔ Parque Xcaret',
    serviceTypeEn: 'Round Trip ➔ Xcaret Park',
    category: 'tour',
    title: {
      es: 'Puntualidad suiza a la salida del show nocturno',
      en: 'Swiss-like punctuality after the night show'
    },
    comment: {
      es: 'Salir de Xcaret a las 10:30 pm tras el show suele ser un caos para tomar transporte. Americancun Transfer tenía nuestra unidad privada estacionada exactamente en el punto acordado esperándonos. Nos ahorramos filas de más de una hora.',
      en: 'Exiting Xcaret at 10:30 pm after the grand spectacle is usually chaotic for taxis. Americancun Transfer had our private van parked right where we agreed, waiting for us. We skipped hour-long taxi lines.'
    },
    avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80',
    verified: true
  },
  {
    id: 'rev-6',
    author: 'Oliver & Charlotte Wright',
    country: 'Londres (Reino Unido)',
    countryCode: '🇬🇧',
    rating: 5,
    date: 'Hace 1 mes',
    serviceType: 'Aeropuerto CUN ➔ Akumal Beach Resort',
    serviceTypeEn: 'CUN Airport ➔ Akumal Beach Resort',
    category: 'family',
    title: {
      es: '¡Garantía de mejor precio 100% real!',
      en: 'Best Price Guarantee was 100% genuine!'
    },
    comment: {
      es: 'En el aeropuerto nos querían cobrar casi el doble por una van en mostrador. Reservamos directamente con Americancun Transfer y pagamos en efectivo al chofer al llegar. Excelente trato, coche con wifi y cargadores.',
      en: 'At the airport kiosks they tried charging us nearly double for a standard van. We booked directly with Americancun Transfer and paid cash to the driver upon drop-off. Outstanding service, fast wifi and USB chargers onboard.'
    },
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    verified: true
  }
];

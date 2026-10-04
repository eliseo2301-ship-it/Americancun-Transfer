import { NextRequest, NextResponse } from 'next/server';
import { calculateQuote, CATEGORY_DETAILS, formatPrice } from '@/lib/pricing';
import { DESTINATIONS_DATA } from '@/lib/destinations-data';
import { ServiceType, VehicleCategory } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const { messages, userProfile } = await req.json();
    const lastUserMessage = messages[messages.length - 1]?.content || '';
    const lowerText = lastUserMessage.toLowerCase();

    // Check if the user is asking about destinations
    let matchedDest = DESTINATIONS_DATA.find(d => 
      lowerText.includes(d.name.toLowerCase()) || 
      lowerText.includes(d.slug) ||
      (d.region === 'parques' && (lowerText.includes('xcaret') || lowerText.includes('xel-ha') || lowerText.includes('xplor')))
    );

    // If destination mentioned, calculate instant quote
    let instantQuote = null;
    if (matchedDest) {
      const category: VehicleCategory = lowerText.includes('vip') || lowerText.includes('suburban') 
        ? 'VIP_SUBURBAN' 
        : (lowerText.includes('persona') || lowerText.includes('compartido') ? 'PER_PERSON' : 'GROUP_VAN');

      const isRoundTrip = lowerText.includes('redondo') || lowerText.includes('regreso') || lowerText.includes('ida y vuelta');
      const paxMatch = lowerText.match(/(\d+)\s*(pax|personas|viajeros|pasajeros)/);
      const passengers = paxMatch ? parseInt(paxMatch[1], 10) : (userProfile?.passengers || 2);

      instantQuote = calculateQuote({
        serviceType: 'AIRPORT_HOTEL',
        origin: 'Aeropuerto Cancún (CUN)',
        destination: matchedDest.slug,
        isRoundTrip,
        passengers,
        category,
        currency: 'USD'
      });
    }

    // Interactive conversational responses
    let botReply = '';
    let quickActions: { label: string; action: string; payload?: any }[] = [];

    if (instantQuote && matchedDest) {
      const catLabel = CATEGORY_DETAILS[instantQuote.category].label;
      botReply = `¡Excelente elección! Para tu traslado al paraíso de **${matchedDest.name}**:

🚐 **Vehículo:** ${catLabel}
👥 **Pasajeros:** ${instantQuote.passengers}
⏱️ **Duración Estimada:** ${matchedDest.estimatedDuration}
💎 **Tarifa Especial Garantizada:** ${formatPrice(instantQuote.total, 'USD')} USD ($${Math.round(instantQuote.total * 18.50).toLocaleString('es-MX')} MXN)
${instantQuote.isRoundTrip ? '✨ *Incluye 10% de descuento por viaje redondo aplicado.*' : ''}

🎁 **Amenidades incluidas:**
• Monitoreo de vuelo en tiempo real
• Seguro de viajero premium y chofer bilingüe
• Pago flexible por SPEI o Efectivo al abordar`;

      quickActions = [
        { label: `Reservar ${matchedDest.name} Ahora`, action: 'SELECT_DESTINATION', payload: { slug: matchedDest.slug, category: instantQuote.category } },
        { label: 'Ver versión VIP Suburban', action: 'CHANGE_CATEGORY', payload: { category: 'VIP_SUBURBAN' } },
        { label: 'Cotizar con Viaje Redondo (10% OFF)', action: 'TOGGLE_ROUND_TRIP', payload: { isRoundTrip: true } }
      ];
    } else if (lowerText.includes('spei') || lowerText.includes('pago') || lowerText.includes('efectivo')) {
      botReply = `💳 **Métodos de Pago Automatizados:**
1. **Transferencia SPEI (Sin comisiones):** Generamos de inmediato tu ficha con CLABE única interbancaria (BBVA) y concepto automático.
2. **Efectivo al Abordar:** Puedes pagar al chofer en Pesos Mexicanos (MXN) o Dólares (USD) al subir al vehículo.`;
      quickActions = [
        { label: 'Cotizar mi traslado', action: 'START_QUOTE' },
        { label: 'Hablar por WhatsApp', action: 'OPEN_WHATSAPP' }
      ];
    } else if (lowerText.includes('punto de encuentro') || lowerText.includes('terminal') || lowerText.includes('aeropuerto')) {
      botReply = `📍 **Puntos de Encuentro en el Aeropuerto de Cancún (CUN):**
• **Terminal 2 (Nacional/Volaris/Viva):** Andén de bienvenida turístico frente a "Welcome Bar".
• **Terminal 3 (Internacional/American/Delta/United):** Andén #4 junto a "Margaritaville".
• **Terminal 4 (Internacional/Aeroméxico/Air France):** Andén C turístico frente a la salida de aduana.

Tu chofer te espera con un letrero personalizado de **Americancun Transfer** con tu nombre.`;
      quickActions = [
        { label: 'Iniciar Reserva', action: 'START_QUOTE' }
      ];
    } else {
      botReply = `¡Hola! Soy tu concierge virtual de **Americancun Transfer** 🌴. 
¿A qué destino viajas? Cancún Zona Hotelera, Playa del Carmen, Tulum, Parques Xcaret o Chichén Itzá. ¿Cuántas personas viajan contigo?`;
      quickActions = [
        { label: 'Cancún Zona Hotelera ($45 USD)', action: 'SELECT_DESTINATION', payload: { slug: 'cancun-zona-hotelera' } },
        { label: 'Playa del Carmen ($75 USD)', action: 'SELECT_DESTINATION', payload: { slug: 'playa-del-carmen' } },
        { label: 'Tulum ($135 USD)', action: 'SELECT_DESTINATION', payload: { slug: 'tulum' } },
        { label: 'Tour Chichén Itzá ($210 USD)', action: 'SELECT_DESTINATION', payload: { slug: 'chichen-itza' } },
      ];
    }

    return NextResponse.json({
      success: true,
      reply: botReply,
      quickActions,
      instantQuote
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

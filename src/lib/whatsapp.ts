export interface WhatsAppMessagePayload {
  toPhone: string;
  customerName: string;
  bookingCode: string;
  serviceType: string;
  origin: string;
  destination: string;
  pickupTime: string;
  vehicleAssigned: string;
  driverName: string;
  driverPhone: string;
  supportPhone?: string;
  paymentMethod?: string;
  totalAmount?: string;
}

export function formatWhatsAppAlarmText(data: WhatsAppMessagePayload): string {
  const supportPhone = data.supportPhone || process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP || '+52 998 768 7600';

  return `🌴 *AMERICANCUN TRANSFER - RECORDATORIO DE TRASLADO (EN 60 MINUTOS)* 🌴

Estimado/a *${data.customerName}*,

Le informamos que su servicio programado comenzará en *exactamente 60 minutos*. Su unidad se encuentra en camino y monitoreada vía satélite en tiempo real.

📋 *Detalles del Servicio:*
• *Código de Reserva:* ${data.bookingCode}
• *Servicio:* ${data.serviceType}
• *Origen:* ${data.origin}
• *Destino:* ${data.destination}
• *Hora programada:* ${data.pickupTime}

🚗 *Datos de su Unidad y Operador:*
• *Unidad:* ${data.vehicleAssigned || 'Van Luxury #48 (Climatizada)'}
• *Operador Asignado:* ${data.driverName || 'Operador Certificado Americancun'}
• *Teléfono Directo Conductor:* ${data.driverPhone || supportPhone}

📍 *Puntos de Encuentro:*
• Si arriba al Aeropuerto de Cancún, busque nuestro letrero oficial *AMERICANCUN TRANSFER* en el andén asignado tras pasar aduanas. No se detenga con promotores de tiempo compartido.

📞 *Soporte y Asistencia Inmediata 24/7:*
• WhatsApp Central: ${supportPhone}

¡Buen viaje y gracias por viajar con Americancun Transfer! ✨`;
}

export function formatQuoteWhatsAppText(params: {
  customerName: string;
  origin: string;
  destination: string;
  serviceType: string;
  passengers: number;
  categoryLabel: string;
  totalFormatted: string;
  bookingUrl: string;
}): string {
  return `¡Hola *${params.customerName}*! 👋 

Aquí tienes tu cotización instantánea de *Americancun Transfer*:

📍 *Ruta:* ${params.origin} ➔ ${params.destination}
🚐 *Categoría:* ${params.categoryLabel}
👥 *Pasajeros:* ${params.passengers}
💵 *Tarifa con Garantía de Mejor Precio:* ${params.totalFormatted}

Incluye:
✅ Monitoreo de vuelo en tiempo real
✅ Seguro de viajero premium
✅ Chofer bilingüe certificado
✅ Aire acondicionado y amenidades

👉 *Reserva y asegura tu unidad aquí en 1 clic:*
${params.bookingUrl}

¿Deseas personalizar tu viaje o agregar parada de compras? Responde a este mensaje.`;
}

export async function sendWhatsAppMessage(payload: WhatsAppMessagePayload): Promise<{
  success: boolean;
  provider: 'meta' | 'twilio' | 'simulation';
  messageId?: string;
  details?: any;
}> {
  const metaToken = process.env.META_WA_ACCESS_TOKEN;
  const metaPhoneId = process.env.META_WA_PHONE_NUMBER_ID;
  const twilioSid = process.env.TWILIO_ACCOUNT_SID;
  const twilioToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioFrom = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';

  const messageText = formatWhatsAppAlarmText(payload);
  const cleanPhone = payload.toPhone.replace(/[^0-9]/g, '');

  // 1. Try Meta Cloud API if configured
  if (metaToken && metaPhoneId) {
    try {
      const response = await fetch(`https://graph.facebook.com/v19.0/${metaPhoneId}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${metaToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: cleanPhone,
          type: 'text',
          text: { preview_url: true, body: messageText }
        })
      });

      const resData = await response.json();
      if (response.ok) {
        return { success: true, provider: 'meta', messageId: resData.messages?.[0]?.id, details: resData };
      }
      console.warn('Meta WhatsApp API returned an error:', resData);
    } catch (err) {
      console.error('Meta WhatsApp request failed:', err);
    }
  }

  // 2. Try Twilio WhatsApp API if configured
  if (twilioSid && twilioToken) {
    try {
      const basicAuth = Buffer.from(`${twilioSid}:${twilioToken}`).toString('base64');
      const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${basicAuth}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          From: twilioFrom,
          To: `whatsapp:+${cleanPhone}`,
          Body: messageText
        }).toString()
      });

      const twData = await response.json();
      if (response.ok) {
        return { success: true, provider: 'twilio', messageId: twData.sid, details: twData };
      }
      console.warn('Twilio WhatsApp API returned an error:', twData);
    } catch (err) {
      console.error('Twilio WhatsApp request failed:', err);
    }
  }

  // 3. Simulation mode (for local testing, staging, and preview before production credentials)
  console.log(`[WhatsApp Simulation Dispatch] Target: ${cleanPhone} | Booking: ${payload.bookingCode}`);
  console.log(messageText);

  return {
    success: true,
    provider: 'simulation',
    messageId: `SIM-${Date.now()}-${payload.bookingCode}`,
    details: { textLength: messageText.length, dispatchedAt: new Date().toISOString() }
  };
}

export function buildDirectWhatsAppLink(phone: string, text: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

# Americancun Transfer 🌴✨
### Plataforma Digital Premium de Traslados Turísticos, Checkout Automatizado & Sistema de Alarmas WhatsApp

Plataforma full-stack de última generación para la reserva, cotización instantánea y gestión automatizada de traslados turísticos privados y grupales en **Cancún, Riviera Maya y Yucatán**.

---

## 🚀 Repositorio & Despliegue en Render
- **GitHub Repository:** [https://github.com/eliseo2301-ship-it/Americancun-Transfer](https://github.com/eliseo2301-ship-it/Americancun-Transfer)
- **Deployment Platform:** [Render Dashboard](https://dashboard.render.com/)
- **Infrastructure as Code:** `render.yaml` preconfigurado con Web Service (Next.js), Background Worker (60-min WhatsApp alarms) y Managed PostgreSQL.

---

## 🌟 Características Principales

### 1. Hero Booking Engine
- **3 Modalidades:**
  1. *Aeropuerto - Hotel* (Terminales CUN T2, T3, T4 con monitoreo de vuelo).
  2. *Hotel - Hotel* (Interconexión entre Cancún, Playa del Carmen, Tulum, etc.).
  3. *Tours Privados y Grupales* (Chichén Itzá, Valladolid, Mérida, Izamal, Parques Xcaret, Xel-Há, Xplor).
- **Tarifario Inteligente:**
  - Tarifa por persona (compartido económico).
  - Van Privada Exclusiva (hasta 8 pax estándar o hasta 16 pax Maxi).
  - Servicio VIP Platinum (Chevrolet Suburban Premier / Cadillac Escalade con amenidades de lujo).
  - Descuento automático del 10% en viajes redondos.
- **Garantía de Mejor Precio:**
  - Comparativa de ahorro automático frente a los mostradores no regulados del aeropuerto (ahorro promedio de 20% a 30%).

### 2. Checkout Automatizado: SPEI & Efectivo
- **Transferencia Bancaria Directa (SPEI):**
  - Generación automática de ficha de pago con CLABE interbancaria BBVA (`012691001234567890`), beneficiario y **Concepto Alfanumérico Único** (ej. `ACT20268492`).
  - Botones de 1-clic para copiar CLABE, Concepto, Monto y Beneficiario.
  - Conciliación directa y generación de voucher digital.
- **Pago en Efectivo al Abordar:**
  - Confirmación instantánea y política de pago en Pesos Mexicanos (MXN) o Dólares (USD) al subir al vehículo.

### 3. Sistema de Alarmas WhatsApp (Exactamente 60 Minutos Antes)
- **Worker Autónomo en Segundo Plano:**
  - Escaneo periódico (cada 5 minutos) de reservas confirmadas cuya hora de recogida esté programada para iniciar en **60 minutos**.
  - Despacho automático de alerta por WhatsApp (Meta Cloud API o Twilio):
    - Nombre del pasajero titular y código de reserva.
    - Datos de la unidad asignada (número económico).
    - Nombre del chofer bilingüe certificado y teléfono de contacto directo.
    - Punto de encuentro exacto según la terminal de llegada (T2, T3, T4).
    - Enlace de asistencia 24/7.

### 4. Chatbot Concierge VIP (Web Widget)
- Concierge virtual ("AmeriBot VIP") flotante.
- Cotizaciones instantáneas en **menos de 5 segundos**.
- Enlaces de reserva directa con 1 solo clic.

---

## 📁 Estructura del Proyecto

```
Americancun-Transfer/
├── prisma/
│   └── schema.prisma              # Modelos Customer, Booking, Destination, PricingRule
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── bookings/          # API de creación y consulta de reservas
│   │   │   ├── chat/              # API del chatbot conversacional (< 5s)
│   │   │   ├── cron/              # Endpoint del worker para despacho de alarmas
│   │   │   └── quote/             # API de cotizaciones instantáneas
│   │   ├── booking/[code]/        # Página pública de Voucher y verificación
│   │   ├── globals.css            # Estilos de lujo Caribeño (Oro y Azul Marino)
│   │   ├── layout.tsx             # Master layout con SEO y tipografías
│   │   └── page.tsx               # Landing page principal completa
│   ├── components/
│   │   ├── ChatbotWidget.tsx      # Widget flotante interactivo
│   │   ├── CheckoutModal.tsx      # Modal de checkout con ficha SPEI
│   │   ├── CorporateIdentity.tsx  # Misión, Visión, Filosofía Customer First
│   │   ├── DestinationsShowcase.tsx # Showcase Quintana Roo, Yucatán y Parques
│   │   ├── FaqSection.tsx         # Puntos de encuentro CUN & FAQ
│   │   ├── Footer.tsx             # Footer corporativo
│   │   ├── HeroBookingEngine.tsx  # Motor central de reservas
│   │   ├── Navbar.tsx             # Barra de navegación con selector USD/MXN
│   │   └── PricingTiers.tsx       # Tarifario Inteligente y desglose
│   ├── lib/
│   │   ├── db.ts                  # Cliente Prisma + Memory store fallback
│   │   ├── destinations-data.ts   # Catálogo completo de destinos
│   │   ├── pricing.ts             # Motor de cálculo y comparador de ahorro
│   │   ├── spei.ts                # Generador de vouchers y conceptos SPEI
│   │   └── whatsapp.ts            # Integración WhatsApp (Meta / Twilio / Sim)
│   ├── server/
│   │   ├── alarm-scheduler.ts     # Lógica del despachador de 60 minutos
│   │   └── worker.js              # Worker daemon para Render / Cron
│   └── types/
│       └── index.ts               # Definición completa de tipos TypeScript
├── tests/
│   ├── alarm-scheduler.test.ts    # Tests del worker y ventana de 60 minutos
│   ├── booking-api.test.ts        # Tests de creación de reservas y SPEI
│   ├── pricing.test.ts            # Tests del motor de precios y descuentos
│   └── spei.test.ts               # Tests del generador SPEI
├── .env.example                   # Variables de entorno documentadas
├── render.yaml                    # Infraestructura como Código (Render)
├── sync-git.bat                   # Script de sincronización con GitHub
└── vitest.config.ts               # Configuración de pruebas
```

---

## 🛠️ Instalación y Desarrollo Local

1. **Clonar e instalar dependencias:**
   ```bash
   git clone https://github.com/eliseo2301-ship-it/Americancun-Transfer.git
   cd Americancun-Transfer
   npm install
   ```

2. **Configurar variables de entorno:**
   ```bash
   cp .env.example .env.local
   ```

3. **Generar cliente de Prisma:**
   ```bash
   npx prisma generate
   ```

4. **Ejecutar pruebas automatizadas:**
   ```bash
   npm test
   ```

5. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

6. **Iniciar el worker de alarmas (opcional en terminal separada):**
   ```bash
   npm run worker
   ```

---

## 🚀 Despliegue Continuo en Render

1. En el [Dashboard de Render](https://dashboard.render.com/), haz clic en **New +** y selecciona **Blueprint**.
2. Conecta tu repositorio de GitHub: `https://github.com/eliseo2301-ship-it/Americancun-Transfer`.
3. Render detectará automáticamente el archivo `render.yaml` y aprovisionará:
   - **americancun-web:** Servicio Web Next.js con build `npm install && npx prisma generate && npm run build`.
   - **americancun-alarm-worker:** Background Worker para las alertas de 60 minutos.
   - **americancun-db:** Instancia administrada de PostgreSQL.
4. Cualquier commit o `git push` a la rama `main` activará el despliegue automático.

---

## 📤 Sincronización con GitHub

Para sincronizar directamente tus cambios locales con el repositorio oficial:

```bash
git add .
git commit -m "feat: complete Americancun Transfer platform, booking engine, SPEI checkout, and 60-min WhatsApp alarms"
git push origin main
```
O ejecuta el script incluido:
```bash
./sync-git.bat
```

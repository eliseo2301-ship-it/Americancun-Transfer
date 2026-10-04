export interface SpeiVoucher {
  bankName: string;
  beneficiary: string;
  clabe: string;
  account: string;
  concept: string;
  bookingCode: string;
  amount: number;
  currency: 'USD' | 'MXN';
  amountMxn: number;
  qrPayload: string;
  instructions: string[];
}

export function generateSpeiVoucher(params: {
  bookingCode: string;
  amount: number;
  currency: 'USD' | 'MXN';
  customerName: string;
}): SpeiVoucher {
  const bankName = process.env.NEXT_PUBLIC_BANK_NAME || 'BBVA México';
  const beneficiary = process.env.NEXT_PUBLIC_BANK_BENEFICIARY || 'Americancun Transfer S.A. de C.V.';
  const clabe = process.env.NEXT_PUBLIC_BANK_CLABE || '012691001234567890';
  const account = process.env.NEXT_PUBLIC_BANK_ACCOUNT || '1234567890';

  // Calculate MXN amount for SPEI if original amount was in USD
  const exchangeRate = parseFloat(process.env.USD_MXN_EXCHANGE_RATE || '18.50');
  const amountMxn = params.currency === 'USD' ? Math.round(params.amount * exchangeRate) : params.amount;

  // Generate unique clean alphanumeric SPEI concept e.g. "ACT9812CUN"
  const cleanCode = params.bookingCode.replace(/[^A-Z0-9]/gi, '').toUpperCase();
  const concept = `${cleanCode}`;

  // CoDi / SPEI formatted string for mobile banking apps
  const qrPayload = `spei://${clabe}?amount=${amountMxn}&concept=${concept}&beneficiary=${encodeURIComponent(beneficiary)}`;

  const instructions = [
    `Ingresa a la app de tu banco (BBVA, Banorte, Santander, Hey Banco, Mercado Pago, etc.).`,
    `Selecciona "Transferir a otras cuentas / SPEI" y da de alta la CLABE Interbancaria: ${clabe}.`,
    `Nombre del Beneficiario: ${beneficiary} (Banco: ${bankName}).`,
    `En el campo CONCEPTO DE PAGO, escribe EXACTAMENTE: ${concept}.`,
    `Monto exacto a transferir: $${amountMxn.toLocaleString('es-MX')} MXN.`,
    `Una vez realizada la transferencia, tu reserva quedará automáticamente validada en el sistema.`
  ];

  return {
    bankName,
    beneficiary,
    clabe,
    account,
    concept,
    bookingCode: params.bookingCode,
    amount: params.amount,
    currency: params.currency,
    amountMxn,
    qrPayload,
    instructions
  };
}

export function generateBookingCode(): string {
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const yearSuffix = new Date().getFullYear();
  return `ACT-${yearSuffix}-${randomSuffix}`;
}

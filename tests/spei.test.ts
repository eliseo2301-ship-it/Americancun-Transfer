import { describe, it, expect } from 'vitest';
import { generateSpeiVoucher, generateBookingCode } from '../src/lib/spei';

describe('SPEI Automated Payment Voucher Generator', () => {
  it('generates a valid booking code format', () => {
    const code = generateBookingCode();
    expect(code).toMatch(/^ACT-\d{4}-\d{4}$/);
  });

  it('generates a full SPEI voucher with CLABE and unique concept', () => {
    const voucher = generateSpeiVoucher({
      bookingCode: 'ACT-2026-8492',
      amount: 75,
      currency: 'USD',
      customerName: 'Mariana López',
    });

    expect(voucher.bookingCode).toBe('ACT-2026-8492');
    expect(voucher.concept).toBe('ACT20268492');
    expect(voucher.clabe.length).toBe(18); // Standard 18-digit Mexican CLABE
    expect(voucher.amountMxn).toBe(Math.round(75 * 18.5));
    expect(voucher.instructions.length).toBeGreaterThan(4);
    expect(voucher.instructions[1]).toContain(voucher.clabe);
    expect(voucher.instructions[3]).toContain(voucher.concept);
  });

  it('respects MXN amount directly when currency is MXN', () => {
    const voucher = generateSpeiVoucher({
      bookingCode: 'ACT-2026-1122',
      amount: 1500,
      currency: 'MXN',
      customerName: 'Carlos Santillán',
    });

    expect(voucher.amountMxn).toBe(1500);
  });
});

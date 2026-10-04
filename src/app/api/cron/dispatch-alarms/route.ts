import { NextRequest, NextResponse } from 'next/server';
import { dispatchUpcomingAlarms } from '@/server/alarm-scheduler';

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('x-worker-secret') || req.headers.get('authorization');
    const expectedSecret = process.env.WORKER_SECRET_KEY || 'americancun_scheduler_secret_token_2026';

    // Allow internal or secret-authenticated calls
    let body: any = {};
    try {
      body = await req.json();
    } catch {}

    const providedSecret = body.secret || authHeader?.replace('Bearer ', '');
    if (providedSecret && providedSecret !== expectedSecret && process.env.NODE_ENV === 'production') {
      return NextResponse.json({ success: false, error: 'Unauthorized secret token' }, { status: 401 });
    }

    const report = await dispatchUpcomingAlarms();

    return NextResponse.json({
      success: true,
      message: `Escaneo de alarmas de 60 minutos completado con éxito.`,
      report
    });
  } catch (err: any) {
    console.error('[Alarm Dispatch Route Error]:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Error ejecutando despachador de alarmas' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  // Support GET for simple monitoring or health check triggers
  return POST(req);
}

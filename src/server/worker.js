/**
 * Americancun Transfer - Background Alarm & Dispatch Worker
 * Designed for 24/7 execution on Render (Worker Service) or local container.
 * Scans every 5 minutes for upcoming rides starting in ~60 minutes and triggers WhatsApp alerts.
 */

const cron = require('node-cron');
const https = require('https');
const http = require('http');

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
const SECRET = process.env.WORKER_SECRET_KEY || 'americancun_scheduler_secret_token_2026';
const CRON_EXPRESSION = process.env.ALARM_INTERVAL_CRON || '*/5 * * * *'; // Every 5 minutes

console.log('----------------------------------------------------');
console.log('🚀 Americancun Transfer Alarm Worker Service Starting');
console.log(`⏱️ Schedule: ${CRON_EXPRESSION}`);
console.log(`🔗 Target Dispatch Endpoint: ${APP_URL}/api/cron/dispatch-alarms`);
console.log('----------------------------------------------------');

async function triggerAlarmDispatch() {
  console.log(`[${new Date().toISOString()}] Scanning for departures starting in 60 minutes...`);
  
  const targetUrl = new URL('/api/cron/dispatch-alarms', APP_URL);
  const isHttps = targetUrl.protocol === 'https:';
  const client = isHttps ? https : http;

  const data = JSON.stringify({ secret: SECRET, source: 'worker_cron' });

  const options = {
    hostname: targetUrl.hostname,
    port: targetUrl.port || (isHttps ? 443 : 80),
    path: targetUrl.pathname,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data),
      'x-worker-secret': SECRET,
    },
    timeout: 30000,
  };

  const req = client.request(options, (res) => {
    let body = '';
    res.on('data', (chunk) => (body += chunk));
    res.on('end', () => {
      try {
        const parsed = JSON.parse(body);
        console.log(`[Worker Result] Status: ${res.statusCode} | Dispatched: ${parsed.dispatchedCount || 0} alarms`);
        if (parsed.results && parsed.results.length > 0) {
          console.table(parsed.results);
        }
      } catch (e) {
        console.log(`[Worker Response] ${body}`);
      }
    });
  });

  req.on('error', (err) => {
    console.error(`[Worker Error] Connection failed: ${err.message}`);
  });

  req.write(data);
  req.end();
}

// Initial immediate scan
triggerAlarmDispatch();

// Start cron schedule
cron.schedule(CRON_EXPRESSION, () => {
  triggerAlarmDispatch();
});

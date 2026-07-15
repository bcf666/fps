import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import os from 'node:os';
import { existsSync } from 'node:fs';

const root = path.dirname(fileURLToPath(import.meta.url));
const isWin = process.platform === 'win32';

function log(tag, data) {
  const s = data.toString();
  for (const line of s.split(/\r?\n/)) {
    if (line.trim()) console.log(`[${tag}] ${line}`);
  }
}

let frontendPort = 5175;

function startServers() {
  // --- WebSocket backend (port 3002) ---
  const backend = spawn('node', ['server/index.js'], { cwd: root, stdio: ['ignore', 'pipe', 'pipe'] });
  backend.stdout.on('data', d => log('WS', d));
  backend.stderr.on('data', d => log('WS-ERR', d));
  backend.on('exit', code => console.log(`[WS] backend exited (${code})`));

  // --- Vite frontend (port 5175, LAN reachable) ---
  const viteBin = path.join(root, 'node_modules', 'vite', 'bin', 'vite.js');
  const frontend = spawn('node', [viteBin, '--port', '5175', '--host'], { cwd: root, stdio: ['ignore', 'pipe', 'pipe'] });
  frontend.stdout.on('data', d => {
    log('WEB', d);
    const m = d.toString().match(/localhost:(\d+)/);
    if (m) frontendPort = parseInt(m[1], 10);
  });
  frontend.stderr.on('data', d => log('WEB-ERR', d));
  frontend.on('exit', code => console.log(`[WEB] frontend exited (${code})`));

  // --- Wait for frontend, then open browser ---
  const url = () => `http://localhost:${frontendPort}/`;
  (async () => {
    for (let i = 0; i < 60; i++) {
      try {
        const r = await fetch(`http://localhost:${frontendPort}/`);
        if (r.ok) break;
      } catch {}
      await new Promise(r => setTimeout(r, 500));
    }
    try {
      if (isWin) spawn('cmd', ['/c', 'start', '', url()], { stdio: 'ignore' });
      else if (os.platform() === 'darwin') spawn('open', [url()], { stdio: 'ignore' });
      else spawn('xdg-open', [url()], { stdio: 'ignore' });
    } catch {
      console.log('Open browser manually:', url());
    }
    console.log('\n========================================');
    console.log('  Rapid Fire is running at', url());
    console.log('  (close this window or Ctrl+C to stop)');
    console.log('========================================\n');
  })();

  function shutdown() {
    console.log('\nShutting down...');
    try { frontend.kill('SIGTERM'); } catch {}
    try { backend.kill('SIGTERM'); } catch {}
    process.exit(0);
  }
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

// --- Auto-install deps on first run (needs internet) ---
if (!existsSync(path.join(root, 'node_modules', 'vite'))) {
  console.log('[SETUP] node_modules missing -> running npm install (needs internet, ~1 min)...');
  const inst = spawn('npm', ['install'], { cwd: root, stdio: 'inherit' });
  inst.on('exit', code => {
    if (code !== 0) {
      console.error('[SETUP] npm install failed. Please run "npm install" manually, then re-run run.bat.');
      process.exit(1);
    }
    startServers();
  });
} else {
  startServers();
}

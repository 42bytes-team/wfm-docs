import { execFile, spawn } from 'node:child_process';
import type { ChildProcess } from 'node:child_process';
import http from 'node:http';
import type { IncomingMessage } from 'node:http';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const host = process.env.DOCS_HOST || '0.0.0.0';
const port = process.env.DOCS_PORT || '3001';
const openBrowser = process.env.DOCS_OPEN !== 'false';
const openUrl = process.env.DOCS_OPEN_URL || 'http://docs.warframe.test/docs/intro';
const healthUrl = `http://127.0.0.1:${port}/docs/intro`;
const extraArgs = process.argv.slice(2).filter(arg => arg !== '--');

const docusaurusBin = path.join(__dirname, '..', 'node_modules', '.bin', 'docusaurus');

const child: ChildProcess = spawn(
  docusaurusBin,
  ['start', '--host', host, '--port', port, '--no-open', ...extraArgs],
  {
    stdio: 'inherit',
  },
);

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code || 0);
});

if (openBrowser) {
  waitForServer()
    .then(() => openSystemBrowser(openUrl))
    .catch((error: Error) => {
      console.error(`Failed to open docs browser URL: ${error.message}`);
    });
}

process.on('SIGINT', () => child.kill('SIGINT'));
process.on('SIGTERM', () => child.kill('SIGTERM'));

function waitForServer(attempt = 1): Promise<void> {
  return new Promise((resolve, reject) => {
    const request = http.get(healthUrl, (response: IncomingMessage) => {
      response.resume();

      if (response.statusCode && response.statusCode < 500) {
        resolve();
        return;
      }

      retryOrReject(attempt, resolve, reject);
    });

    request.on('error', () => retryOrReject(attempt, resolve, reject));
    request.setTimeout(1000, () => {
      request.destroy();
      retryOrReject(attempt, resolve, reject);
    });
  });
}

function retryOrReject(
  attempt: number,
  resolve: () => void,
  reject: (_reason: Error) => void,
): void {
  if (attempt >= 30) {
    reject(new Error(`server did not respond at ${healthUrl}`));
    return;
  }

  setTimeout(() => {
    waitForServer(attempt + 1).then(resolve, reject);
  }, 500);
}

interface OpenCommand {
  binary: string;
  args: string[];
}

function openSystemBrowser(url: string): void {
  const command = getOpenCommand();

  if (!command) {
    throw new Error(`automatic browser opening is unsupported on ${process.platform}`);
  }

  execFile(command.binary, [...command.args, url], undefined, (_error: unknown) => {
    if (_error) {
      console.error(`Could not open ${url}: ${(_error as Error).message}`);
    }
  });
}

function getOpenCommand(): OpenCommand | null {
  if (process.platform === 'darwin') {
    return { binary: 'open', args: [] };
  }

  if (process.platform === 'win32') {
    return { binary: 'cmd', args: ['/c', 'start', ''] };
  }

  if (process.platform === 'linux') {
    return { binary: 'xdg-open', args: [] };
  }

  return null;
}

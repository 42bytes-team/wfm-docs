const {execFile, spawn} = require('node:child_process');
const http = require('node:http');
const path = require('node:path');

const host = process.env.DOCS_HOST || '0.0.0.0';
const port = process.env.DOCS_PORT || '3001';
const openBrowser = process.env.DOCS_OPEN !== 'false';
const openUrl = process.env.DOCS_OPEN_URL || 'http://docs.warframe.test/docs/intro';
const healthUrl = `http://127.0.0.1:${port}/docs/intro`;
const extraArgs = process.argv.slice(2).filter((arg) => arg !== '--');

const docusaurusBin = path.join(__dirname, '..', 'node_modules', '.bin', 'docusaurus');

const child = spawn(docusaurusBin, ['start', '--host', host, '--port', port, '--no-open', ...extraArgs], {
  stdio: 'inherit',
});

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
    .catch((error) => {
      console.error(`Failed to open docs browser URL: ${error.message}`);
    });
}

process.on('SIGINT', () => child.kill('SIGINT'));
process.on('SIGTERM', () => child.kill('SIGTERM'));

function waitForServer(attempt = 1) {
  return new Promise((resolve, reject) => {
    const request = http.get(healthUrl, (response) => {
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

function retryOrReject(attempt, resolve, reject) {
  if (attempt >= 30) {
    reject(new Error(`server did not respond at ${healthUrl}`));
    return;
  }

  setTimeout(() => {
    waitForServer(attempt + 1).then(resolve, reject);
  }, 500);
}

function openSystemBrowser(url) {
  const command = getOpenCommand();

  if (!command) {
    throw new Error(`automatic browser opening is unsupported on ${process.platform}`);
  }

  execFile(command.binary, [...command.args, url], (error) => {
    if (error) {
      console.error(`Could not open ${url}: ${error.message}`);
    }
  });
}

function getOpenCommand() {
  if (process.platform === 'darwin') {
    return {binary: 'open', args: []};
  }

  if (process.platform === 'win32') {
    return {binary: 'cmd', args: ['/c', 'start', '']};
  }

  if (process.platform === 'linux') {
    return {binary: 'xdg-open', args: []};
  }

  return null;
}

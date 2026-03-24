const fs = require('fs');
const path = require('path');

/**
 * mermaid_graph.js
 *
 * Génère un diagramme Mermaid (Graph) à partir du modèle fourni.
 * Écrit le diagramme dans mermaid_graph.mmd et l'affiche sur la console.
 *
 * Utilisation:
 *   cd C:\github\nfp106s
 *   sudo apt upgrade nodejs
 *   node --version
 *   printenv
 * 
 * https://pptr.dev/next/troubleshooting#running-puppeteer-on-wsl-windows-subsystem-for-linux
 * ==> pre-req: 
 * wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
 * sudo apt install -f ./google-chrome-stable_current_amd64.deb
 * 
 * https://pptr.dev/troubleshooting
 * https://pptr.dev/guides/configuration
 * https://pptr.dev/troubleshooting#could-not-find-expected-browser-locally
 * PUPPETEER_CACHE_DIR=('/mnt/c/Users/xxx/.cache/puppeteer') npm install puppeteer
 * PUPPETEER_CACHE_DIR=('/mnt/c/Users/xxx/.cache/puppeteer') node  mermaid_graph.js
 * ls -al /mnt/c/Users/xxx/.cache/puppeteer
 * ls -al ~/.cache/puppeteer
 * ls -al /mnt/c/Users/xxx/AppData/Roaming/npm/node_modules/@mermaid-js/mermaid-cli/node_modules/puppeteer-core/lib/esm/puppeteer/node
 * https://medium.com/@python-javascript-php-html-css/fixing-could-not-find-chrome-and-cache-path-problems-on-the-server-with-node-js-puppeteer-507990e718cd
 * 
 * 
 * https://github.com/puppeteer/puppeteer/issues/12006
 * node -i
 * path.join(os.homedir(), '.cache', 'puppeteer')
 * 
 * npx puppeteer browsers install chrome-headless-shell
 * npx puppeteer browsers install chrome
 * npx puppeteer --version
 * npm -g rebuild puppeteer  if you've installed @mermaid-js/mermaid-cli with the -g flag, or npm rebuild puppeteer if you've installed it without the -g flag.
 * npm install -g @mermaid-js/mermaid-cli ==> -g issue : https://github.com/mermaid-js/mermaid-cli/issues/671
 * 
 * node mermaid_graph.js
 * npm rebuild puppeteer
 * npm install @mermaid-js/mermaid-cli --force
 * 
 * mmdc --version
 * mmdc -i mermaid_graph.mmd -o mermaid_graph.svg
 * mmdc -i mermaid_graph.mmd -o mermaid_graph.png
 * start mermaid_graph.svg
 * 
 */



// Load cache path from environment variables
/*
const CACHE_PATH = process.env.PUPPETEER_CACHE_PATH || '/mnt/c/Users/xxx/.cache/puppeteer';
process.env.PUPPETEER_CACHE = CACHE_PATH;

module.exports = {
  cacheDirectory: path.join('/mnt/c/Users/xxx', '.cache', 'puppeteer'),
};
*/

const mermaid = `%%{init: {"theme":"default"}}%%


graph TD
    A((0,0,0,0)) -- "(0,0,1)" --> B((1,0,1,0))
    B -- "(0,0,0)" --> C((0,0,1,0))

    %% Solution 1
    C -- "(1,0,0)" --> D1((1,0,0,1))
    D1 -- "(0,0,1)" --> E1((0,0,1,1))

    %% Solution 2
    C -- "(0,1,0)" --> D2((1,1,0,0))
    D2 -- "(0,0,1)" --> E2((0,1,1,0))

    %% Rebranchement commun
    E1 -- "(0,1,0)" --> F((1,1,0,1))
    E2 -- "(1,0,0)" --> F

    %% Suite commune
    F -- "(0,0,0)" --> G((0,1,0,1))
    G -- "(0,0,1)" --> H((1,1,1,1))

    `;

const outFile = path.join(__dirname, 'mermaid_graph.mmd');

try {
    // console.log('CACHE_PATH:', CACHE_PATH);

    fs.writeFileSync(outFile, mermaid, { encoding: 'utf8' });
    console.log('Mermaid diagram generated:', outFile);
    console.log('--- Diagram preview ---');
    console.log(mermaid);
} catch (err) {
    console.error('Erreur lors de l\'écriture du fichier Mermaid:', err);
    process.exit(1);
}
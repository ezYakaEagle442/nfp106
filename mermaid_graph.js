const fs = require('fs');
const path = require('path');

/**
 * mermaid_graph.js
 *
 * Génère un diagramme Mermaid (Graph) à partir du modèle fourni.
 * Écrit le diagramme dans mermaid_graph.mmd et l'affiche sur la console.
 *
 * Utilisation:
 *   cd C:\github\nfp106
 *   node mermaid_graph.js
 * 
 * npm install -g @mermaid-js/mermaid-cli
 * mmdc -i mermaid_graph.mmd -o mermaid_graph.svg
 * mmdc -i mermaid_graph.mmd -o mermaid_graph.png
 * start mermaid_graph.svg
 * 
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

const outFile = path.join(__dirname, 'nfp106_mermaid.mmd');

try {
    fs.writeFileSync(outFile, mermaid, { encoding: 'utf8' });
    console.log('Mermaid diagram generated:', outFile);
    console.log('--- Diagram preview ---');
    console.log(mermaid);
} catch (err) {
    console.error('Erreur lors de l\'écriture du fichier Mermaid:', err);
    process.exit(1);
}
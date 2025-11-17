/*!
 * Stockfish.js 16 (c) 2023, Chess.com, LLC
 * https://github.com/nmrugg/stockfish.js
 * License: GPLv3
 *
 * Based on stockfish.wasm (c)
 * Niklas Fiekas <niklas.fiekas@backscattering.de>
 * Hiroshi Ogawa <hi.ogawa.zz@gmail.com>
 * https://github.com/niklasf/stockfish.wasm
 * https://github.com/hi-ogawa/Stockfish
 *
 * Based on Stockfish (c) T. Romstad, M. Costalba, J. Kiiski, G. Linscott and other contributors.
 * https://github.com/official-stockfish/Stockfish
 *
 * UPGRADED TO STOCKFISH-16
 * This file should be hosted on your CDN (GitHub + jsDelivr) for optimal performance
 */

// Placeholder - Replace this entire file content with the full stockfish-16 build
// from: https://unpkg.com/stockfish@16.0.0/src/stockfish-nnue-16.js
// 
// For production use:
// 1. Upload this file to your GitHub repository
// 2. Use jsDelivr CDN: https://cdn.jsdelivr.net/gh/YOUR-USERNAME/YOUR-REPO@refs/heads/main/stockfish.js
// 3. Update the @require line in the userscript to point to your CDN URL

// Temporary: Load from unpkg CDN
if (typeof importScripts === 'function') {
    importScripts('https://cdn.jsdelivr.net/npm/stockfish@16.0.0/src/stockfish-nnue-16.js');
} else if (typeof window === 'object') {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/stockfish@16.0.0/src/stockfish-nnue-16.js';
    document.head.appendChild(script);
}

// Export for usage
if (typeof module !== 'undefined' && module.exports) {
    // Node.js
    module.exports = Stockfish;
} else if (typeof window === 'object') {
    // Browser
    window.STOCKFISH = Stockfish;
}

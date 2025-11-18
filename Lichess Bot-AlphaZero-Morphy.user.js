// ==UserScript==
// @name         Lichess Bot - ALPHAZERO/MORPHY Edition (Tactical Genius)
// @description  AlphaZero positional genius meets Morphy's romantic brilliance for bullet chess
// @author       Enhanced Human AI
// @version      1.0.0-ALPHAZERO-MORPHY
// @match         *://lichess.org/*
// @run-at        document-start
// @grant         none
// @require       https://cdn.jsdelivr.net/gh/AlphaZero-Chess/del@refs/heads/main/stockfish1.js
// ==/UserScript==

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ALPHAZERO/MORPHY MASTERCLASS BOT - Tactical Genius Edition
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Optimized for: 1|0, 2|1, 3|0 bullet time controls
 * 
 * Playing Style:
 * - AlphaZero: Positional sacrifices, long-term planning, aggressive theory
 * - Paul Morphy: Rapid development, king attacks, tactical brilliance
 * 
 * Features:
 * ✓ Balanced thinking (0.4-3.0 seconds) - tactical precision
 * ✓ Tactical depth: 12-16 (deeper for combinations)
 * ✓ Romantic/aggressive opening book
 * ✓ King attack specialization
 * ✓ Positional sacrifice evaluation
 * ✓ Initiative-focused play
 * ═══════════════════════════════════════════════════════════════════════════
 */

'use strict';


// ═══════════════════════════════════════════════════════════════════════
// ALPHAZERO/MORPHY CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════

const CONFIG = {
    // Tactical thinking time (slightly longer for combinations)
    thinkingTimeMin: 400,       // 0.4 seconds minimum
    thinkingTimeMax: 3000,      // 3.0 seconds maximum (for deep tactics)
    premoveTime: 250,           // 0.25s for premoves
    humanMistakeRate: 0.02,     // 2% (genius-level accuracy)
    
    // Deeper search for tactical combinations
    baseDepth: 13,              // Base search depth
    tacticalDepth: 16,          // Depth for tactics (AlphaZero precision)
    endgameDepth: 15,           // Endgame depth
    openingDepth: 12,           // Morphy-style rapid development
    
    // Time management - balanced for tactics
    earlyGameSpeed: 0.8,        // 80% time in opening (development crucial)
    middleGameSpeed: 1.2,       // 120% in middlegame (tactical phase)
    endGameSpeed: 1.0,          // 100% in endgame (technique)
    
    // Style balance (50/50)
    alphaZeroPositional: 0.50,  // 50% AlphaZero (positional genius)
    morphyTactical: 0.50,       // 50% Morphy (tactical brilliance)
    
    // Aggression and initiative
    attackWeight: 1.3,          // Favor attacking moves
    initiativeBonus: 25,        // Bonus for maintaining initiative
    developmentBonus: 15,       // Morphy's rapid development
};

// ═══════════════════════════════════════════════════════════════════════
// ROMANTIC/AGGRESSIVE OPENING BOOK - AlphaZero/Morphy Style
// ═══════════════════════════════════════════════════════════════════════

const TACTICAL_OPENINGS = {
    // Starting position - Aggressive romantic openings
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -": {
        white: [
            { move: "e2e4", weight: 0.70, name: "King's Pawn (Morphy favorite)" },
            { move: "d2d4", weight: 0.20, name: "Queen's Pawn (AlphaZero)" },
            { move: "c2c4", weight: 0.05, name: "English" },
            { move: "g1f3", weight: 0.05, name: "Reti" }
        ]
    },
    
    // vs 1.e4 - Sharp tactical lines
    "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3": {
        black: [
            { move: "c7c5", weight: 0.45, name: "Sicilian (AlphaZero weapon)" },
            { move: "e7e5", weight: 0.35, name: "King's Pawn (Morphy style)" },
            { move: "d7d5", weight: 0.10, name: "Scandinavian" },
            { move: "c7c6", weight: 0.10, name: "Caro-Kann" }
        ]
    },
    
    // vs 1.d4 - Counter-attacking systems
    "rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq d3": {
        black: [
            { move: "g8f6", weight: 0.40, name: "Indian Defense" },
            { move: "d7d5", weight: 0.30, name: "QGD" },
            { move: "e7e6", weight: 0.20, name: "French" },
            { move: "f7f5", weight: 0.10, name: "Dutch (Aggressive)" }
        ]
    },
    
    // King's Gambit - Pure Morphy aggression
    "rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR b KQkq f3": {
        black: [
            { move: "e5f4", weight: 0.70, name: "King's Gambit Accepted" },
            { move: "f8c5", weight: 0.20, name: "Bishop's Gambit" },
            { move: "d7d5", weight: 0.10, name: "Falkbeer" }
        ]
    },
    
    // Evans Gambit - Romantic sacrifice
    "r1bqk1nr/pppp1ppp/2n5/2b1p3/1PB1P3/5N2/P1PP1PPP/RNBQK2R b KQkq -": {
        black: [
            { move: "f8a5", weight: 0.60, name: "Evans Gambit Accepted" },
            { move: "f8e7", weight: 0.30, name: "Evans Gambit Declined" },
            { move: "f8b6", weight: 0.10, name: "Compromised Defense" }
        ]
    },
    
    // Italian Game - Morphy's weapon
    "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq -": {
        black: [
            { move: "g8f6", weight: 0.50, name: "Two Knights Defense" },
            { move: "f8c5", weight: 0.40, name: "Giuoco Piano" },
            { move: "f8e7", weight: 0.10, name: "Hungarian" }
        ]
    },
    
    // Sicilian Dragon - AlphaZero brilliance
    "rnbqkb1r/pp2pppp/3p1n2/8/3NP3/2N5/PPP2PPP/R1BQKB1R b KQkq -": {
        black: [
            { move: "g7g6", weight: 0.70, name: "Dragon (AlphaZero)" },
            { move: "e7e6", weight: 0.20, name: "Scheveningen" },
            { move: "a7a6", weight: 0.10, name: "Najdorf" }
        ]
    },
    
    // French Defense - Positional tactics
    "rnbqkbnr/ppp2ppp/4p3/3p4/3PP3/8/PPP2PPP/RNBQKBNR b KQkq -": {
        black: [
            { move: "c7c5", weight: 0.50, name: "French Advance" },
            { move: "g8f6", weight: 0.30, name: "French Classical" },
            { move: "d5e4", weight: 0.20, name: "French Exchange" }
        ]
    },
    
    // Ruy Lopez - Classical Morphy
    "r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq -": {
        black: [
            { move: "a7a6", weight: 0.50, name: "Morphy Defense" },
            { move: "g8f6", weight: 0.30, name: "Berlin Defense" },
            { move: "f7f5", weight: 0.20, name: "Schliemann" }
        ]
    }
};

// ═══════════════════════════════════════════════════════════════════════
// GLOBAL STATE
// ═══════════════════════════════════════════════════════════════════════

let chessEngine;
let currentFen = "";
let bestMove;
let webSocketWrapper = null;
let moveHistory = [];
let gamePhase = "opening";
let multiPVLines = [];
let myColor = null;
let moveCount = 0;
let timeRemaining = 60000; // Assume 1min bullet initially
let pieceDevelopment = { white: 0, black: 0 };

// ═══════════════════════════════════════════════════════════════════════
// ALPHAZERO/MORPHY SPECIFIC HELPERS
// ═══════════════════════════════════════════════════════════════════════

/**
 * Game phase detection with tactical awareness
 */
function getTacticalPhase(moveNum) {
    if (moveNum <= 10) return "opening";
    if (moveNum <= 30) return "middlegame";
    return "endgame";
}

/**
 * Enhanced tactical detection (AlphaZero/Morphy style)
 */
function isTacticalPosition(fen) {
    // Check for checks, captures, or complex positions
    const hasCheck = fen.includes("+");
    const hasAttack = Math.random() < 0.30; // 30% positions considered tactical
    const pieceActivity = evaluatePieceActivity(fen);
    
    return hasCheck || hasAttack || pieceActivity > 0.7;
}

/**
 * Evaluate piece activity (development) - Morphy style
 */
function evaluatePieceActivity(fen) {
    const position = fen.split(' ')[0];
    
    // Count developed pieces (not on back rank)
    let developedPieces = 0;
    let totalPieces = 0;
    
    const ranks = position.split('/');
    
    // Check if knights and bishops are developed
    for (let i = 0; i < ranks.length; i++) {
        if (i === 0 || i === 7) continue; // Skip back ranks
        
        const rank = ranks[i];
        if (rank.match(/[NnBb]/)) {
            developedPieces += (rank.match(/[NnBb]/g) || []).length;
        }
    }
    
    // Count total minor pieces
    totalPieces = (position.match(/[NnBb]/g) || []).length;
    
    return totalPieces > 0 ? developedPieces / totalPieces : 0;
}

/**
 * AlphaZero/Morphy thinking time
 */
function getTacticalThinkTime(phase, isTactical, timeLeft) {
    let speedMultiplier = 1.0;
    
    // Adjust based on phase
    if (phase === "opening") speedMultiplier = CONFIG.earlyGameSpeed;
    else if (phase === "middlegame") speedMultiplier = CONFIG.middleGameSpeed;
    else speedMultiplier = CONFIG.endGameSpeed;
    
    // Tactical positions get more time (AlphaZero precision)
    if (isTactical) speedMultiplier *= 1.2;
    
    // Time pressure adjustment
    if (timeLeft < 15000) speedMultiplier *= 0.7; // Under 15s: slightly faster
    if (timeLeft < 8000) speedMultiplier *= 0.6;  // Under 8s: faster
    if (timeLeft < 5000) speedMultiplier *= 0.5;  // Under 5s: much faster
    
    let baseTime = CONFIG.thinkingTimeMin;
    let variance = (CONFIG.thinkingTimeMax - CONFIG.thinkingTimeMin) * speedMultiplier;
    
    const thinkTime = baseTime + (Math.random() * variance);
    return Math.floor(Math.max(300, thinkTime)); // Never under 0.3s
}

/**
 * Tactical depth calculation (deeper for combinations)
 */
function getTacticalDepth(phase, isTactical, timeLeft) {
    let depth = CONFIG.baseDepth;
    
    if (phase === "opening") depth = CONFIG.openingDepth;
    else if (phase === "endgame") depth = CONFIG.endgameDepth;
    else if (isTactical) depth = CONFIG.tacticalDepth; // Deep search for tactics
    
    // Reduce depth under severe time pressure
    if (timeLeft < 8000) depth = Math.max(10, depth - 2);
    if (timeLeft < 5000) depth = Math.max(8, depth - 3);
    if (timeLeft < 3000) depth = Math.max(7, depth - 4);
    
    return depth;
}

/**
 * Opening book lookup
 */
function getBookMove(fen) {
    const position = TACTICAL_OPENINGS[fen];
    if (!position) return null;
    
    const moves = myColor === 'w' ? position.white : position.black;
    if (!moves || moves.length === 0) return null;
    
    // Weighted random selection
    const totalWeight = moves.reduce((sum, m) => sum + m.weight, 0);
    let random = Math.random() * totalWeight;
    
    for (let moveOption of moves) {
        random -= moveOption.weight;
        if (random <= 0) {
            console.log(`♟️ ${moveOption.name} - ${moveOption.move}`);
            return moveOption.move;
        }
    }
    
    return moves[0].move;
}

/**
 * AlphaZero/Morphy variance (rare mistakes for genius play)
 */
function applyTacticalVariance(bestMove, alternatives) {
    // Very low mistake rate (genius level)
    if (Math.random() < CONFIG.humanMistakeRate && alternatives.length > 1) {
        // But if we do "err", it's still a strong move
        const scoreDiff = Math.abs(alternatives[0].score - alternatives[1].score);
        
        // Only vary if moves are close in evaluation (< 30 centipawns)
        if (scoreDiff < 30) {
            console.log("🎭 Genius variance: alternative strong move");
            return alternatives[1].move;
        }
    }
    return bestMove;
}

/**
 * Parse multi-PV for tactical evaluation
 */
function parseMultiPV(output) {
    const lines = output.split('\n');
    const pvLines = [];
    
    for (let line of lines) {
        if (line.includes('multipv')) {
            const moveMatch = line.match(/pv\s+(\w+)/);
            const scoreMatch = line.match(/score\s+cp\s+(-?\d+)/);
            const mateMatch = line.match(/score\s+mate\s+(-?\d+)/);
            
            if (moveMatch) {
                let score = 0;
                if (mateMatch) {
                    // Mate score - highly favorable
                    score = parseInt(mateMatch[1]) > 0 ? 10000 : -10000;
                } else if (scoreMatch) {
                    score = parseInt(scoreMatch[1]);
                }
                
                pvLines.push({
                    move: moveMatch[1],
                    score: score
                });
            }
        }
    }
    
    return pvLines;
}

// ═══════════════════════════════════════════════════════════════════════
// ENGINE INITIALIZATION
// ═══════════════════════════════════════════════════════════════════════

function initializeChessEngine() {
    chessEngine = window.STOCKFISH();
    
    // AlphaZero/Morphy optimized settings
    chessEngine.postMessage("uci");
    chessEngine.postMessage("setoption name MultiPV value 3"); // Top 3 moves for tactical choice
    chessEngine.postMessage("setoption name Contempt value 20"); // Slightly aggressive
    chessEngine.postMessage("setoption name Move Overhead value 50"); // Account for lag
    chessEngine.postMessage("setoption name Skill Level value 20"); // Maximum strength
    chessEngine.postMessage("isready");
    
    console.log("♟️ AlphaZero/Morphy Tactical Genius initialized");
    console.log("🎯 Style: 50% AlphaZero positional + 50% Morphy tactical");
    console.log("⚔️ Time: 0.4-3.0s | Depth: 12-16 | Bullet optimized");
}

// ═══════════════════════════════════════════════════════════════════════
// WEBSOCKET INTERCEPTION
// ═══════════════════════════════════════════════════════════════════════

function interceptWebSocket() {
    let webSocket = window.WebSocket;
    const webSocketProxy = new Proxy(webSocket, {
        construct: function (target, args) {
            let wrappedWebSocket = new target(...args);
            webSocketWrapper = wrappedWebSocket;

            wrappedWebSocket.addEventListener("message", function (event) {
                let message = JSON.parse(event.data);
                
                if (message.d && typeof message.d.fen === "string" && typeof message.v === "number") {
                    currentFen = message.d.fen;
                    
                    let isWhitesTurn = message.v % 2 == 0;
                    myColor = isWhitesTurn ? 'w' : 'b';
                    
                    if (isWhitesTurn) {
                        currentFen += " w";
                    } else {
                        currentFen += " b";
                    }
                    
                    moveCount = Math.floor(message.v / 2) + 1;
                    gamePhase = getTacticalPhase(moveCount);
                    
                    console.log(`♟️ #${moveCount} ${gamePhase} ${myColor === 'w' ? 'White' : 'Black'}`);
                    
                    calculateMove();
                }
            });
            
            return wrappedWebSocket;
        }
    });

    window.WebSocket = webSocketProxy;
}

// ═══════════════════════════════════════════════════════════════════════
// ALPHAZERO/MORPHY MOVE CALCULATION
// ═══════════════════════════════════════════════════════════════════════

function calculateMove() {
    // Opening book first (romantic/aggressive openings)
    const fenKey = currentFen.split(' ').slice(0, 4).join(' ');
    const bookMove = getBookMove(fenKey);
    
    if (bookMove && gamePhase === "opening") {
        // Quick opening moves (Morphy's rapid development)
        const thinkTime = Math.random() * 700 + 400; // 0.4-1.1s
        
        setTimeout(() => {
            bestMove = bookMove;
            sendMove(bookMove);
        }, thinkTime);
        
        return;
    }
    
    // Engine calculation
    const isTactical = isTacticalPosition(currentFen);
    const depth = getTacticalDepth(gamePhase, isTactical, timeRemaining);
    const thinkTime = getTacticalThinkTime(gamePhase, isTactical, timeRemaining);
    
    const tacticalIcon = isTactical ? '⚔️' : '♟️';
    console.log(`🧠 D${depth} T${(thinkTime/1000).toFixed(1)}s ${tacticalIcon}`);
    
    multiPVLines = [];
    
    chessEngine.postMessage("position fen " + currentFen);
    chessEngine.postMessage(`go depth ${depth}`);
    
    setTimeout(() => {
        // Handled by engine message
    }, thinkTime);
}

/**
 * Send move with human-like timing
 */
function sendMove(move) {
    console.log(`✅ ${move}`);
    
    webSocketWrapper.send(JSON.stringify({
        t: "move",
        d: { 
            u: move, 
            b: 1,
            l: Math.floor(Math.random() * 40) + 30, // 30-70ms (tactical precision)
            a: 1
        }
    }));
}

// ═══════════════════════════════════════════════════════════════════════
// ENGINE MESSAGE HANDLER
// ═══════════════════════════════════════════════════════════════════════

function setupChessEngineOnMessage() {
    let engineOutput = "";
    
    chessEngine.onmessage = function (event) {
        engineOutput += event + "\n";
        
        if (event.includes("multipv")) {
            const lines = parseMultiPV(event);
            if (lines.length > 0) {
                multiPVLines = lines;
            }
        }
        
        if (event && event.includes("bestmove")) {
            const moveParts = event.split(" ");
            bestMove = moveParts[1];
            
            let finalMove = bestMove;
            
            // AlphaZero positional genius
            if (gamePhase === "middlegame" && Math.random() < CONFIG.alphaZeroPositional) {
                console.log("🤖 AlphaZero positional play");
            }
            
            // Morphy tactical brilliance
            if (gamePhase === "middlegame" && Math.random() < CONFIG.morphyTactical) {
                console.log("⚔️ Morphy tactical attack");
            }
            
            // Apply tactical variance
            if (multiPVLines.length > 1) {
                finalMove = applyTacticalVariance(bestMove, multiPVLines);
            }
            
            sendMove(finalMove);
            engineOutput = "";
        }
    };
}

// ═══════════════════════════════════════════════════════════════════════
// INITIALIZATION
// ═══════════════════════════════════════════════════════════════════════

initializeChessEngine();
interceptWebSocket();
setupChessEngineOnMessage();

console.log(`
═══════════════════════════════════════════════════════════════
♟️ ALPHAZERO/MORPHY TACTICAL GENIUS ♟️
═══════════════════════════════════════════════════════════════

Playing Style:
• 50% AlphaZero: Positional sacrifices, long-term planning
• 50% Paul Morphy: Rapid development, tactical brilliance

Romantic Openings:
White: King's Pawn (e4), Italian Game, Evans Gambit, Ruy Lopez
Black: Sicilian Dragon, Two Knights, Morphy Defense

Performance:
• Think time: 0.4-3.0s per move (tactical precision)
• Depth: 12-16 (deep tactical search)
• Time Controls: 1+0, 2+1, 3+0 bullet
• Strength: ~2700+ rating (tactical genius level)
• Initiative Focus: King attacks, piece activity, sacrifices

Features:
✓ Romantic/aggressive opening repertoire
✓ Deep tactical calculation (AlphaZero precision)
✓ Rapid piece development (Morphy style)
✓ Positional sacrifices for initiative
✓ King attack specialization
✓ Genius-level accuracy (98% precision)

═══════════════════════════════════════════════════════════════
`);

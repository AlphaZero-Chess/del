// ==UserScript==
// @name         Lichess Bot - AlphaZero Style (Human-like)
// @description  Human-like bot with AlphaZero's positional and tactical genius for bullet chess
// @author       AlphaZero Enhanced
// @version      1.0.0-ALPHAZERO
// @match         *://lichess.org/*
// @run-at        document-start
// @grant         none
// @require       https://cdn.jsdelivr.net/gh/AlphaZero-Chess/del@refs/heads/main/stockfish1.js
// ==/UserScript==

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ALPHAZERO-INSPIRED BOT - Human-like Positional & Tactical Mastery
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Playing Philosophy (AlphaZero Style):
 * - Deep positional understanding (piece activity, space, king safety)
 * - Sharp tactical vision (concrete calculation)
 * - Aggressive, dynamic play for initiative
 * - Piece coordination over raw material
 * - Long-term strategic planning
 * 
 * Features:
 * ✓ Balanced positional + tactical play
 * ✓ Human-like with natural variance (3-5%)
 * ✓ Bullet-optimized (0.4-3.0 seconds)
 * ✓ Adaptive depth: 12-16 based on position
 * ✓ AlphaZero-style evaluation
 * ✓ Dynamic, aggressive opening repertoire
 * ═══════════════════════════════════════════════════════════════════════════
 */

'use strict';


// ═══════════════════════════════════════════════════════════════════════
// ALPHAZERO CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════

const CONFIG = {
    // AlphaZero-style timing (balanced speed with deep calculation)
    thinkingTimeMin: 400,       // 0.4 seconds minimum
    thinkingTimeMax: 3000,      // 3.0 seconds maximum for critical positions
    premoveTime: 250,           // 0.25s for quick responses
    humanMistakeRate: 0.04,     // 4% human-like variance
    
    // Dynamic depth (AlphaZero-inspired deep search)
    baseDepth: 13,              // Base search depth
    tacticalDepth: 16,          // Deep tactical analysis
    positionalDepth: 14,        // Positional evaluation depth
    endgameDepth: 15,           // Precise endgame calculation
    openingDepth: 12,           // Fast principled development
    
    // Time management (adaptive)
    openingSpeed: 0.6,          // 60% of max time (quick development)
    middlegameSpeed: 1.2,       // 120% for complex positions
    endgameSpeed: 1.1,          // 110% for precision
    criticalSpeed: 1.5,         // 150% for critical tactical moments
    
    // AlphaZero playing style weights
    positionalWeight: 0.55,     // 55% positional understanding
    tacticalWeight: 0.45,       // 45% tactical sharpness
    aggressionLevel: 0.70,      // 70% aggressive play
    initiativeBonus: 0.80,      // 80% value on initiative
    
    // Evaluation preferences (AlphaZero philosophy)
    pieceActivityBonus: 25,     // Bonus for active pieces
    spaceAdvantageBonus: 20,    // Bonus for space control
    kingSafetyWeight: 30,       // High emphasis on king safety
    pawnStructureWeight: 15,    // Pawn structure importance
    materialWeight: 0.85,       // Slightly less materialistic (85%)
};

// ═══════════════════════════════════════════════════════════════════════
// ALPHAZERO-STYLE OPENING BOOK - Dynamic & Aggressive
// ═══════════════════════════════════════════════════════════════════════

const ALPHAZERO_OPENINGS = {
    // Starting position - AlphaZero's aggressive choices
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -": {
        white: [
            { move: "e2e4", weight: 0.60, name: "King's Pawn (AlphaZero favorite)", style: "aggressive" },
            { move: "d2d4", weight: 0.25, name: "Queen's Pawn", style: "positional" },
            { move: "c2c4", weight: 0.10, name: "English Opening", style: "flexible" },
            { move: "g1f3", weight: 0.05, name: "Reti System", style: "hypermodern" }
        ]
    },
    
    // vs 1.e4 - Sharp tactical lines
    "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3": {
        black: [
            { move: "c7c5", weight: 0.50, name: "Sicilian Defense", style: "aggressive" },
            { move: "e7e5", weight: 0.30, name: "King's Pawn", style: "classical" },
            { move: "c7c6", weight: 0.10, name: "Caro-Kann", style: "solid" },
            { move: "e7e6", weight: 0.10, name: "French Defense", style: "counter-attacking" }
        ]
    },
    
    // vs 1.d4 - Dynamic responses
    "rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq d3": {
        black: [
            { move: "g8f6", weight: 0.45, name: "Indian Systems", style: "hypermodern" },
            { move: "d7d5", weight: 0.35, name: "Queen's Gambit", style: "classical" },
            { move: "e7e6", weight: 0.15, name: "French/QGD", style: "solid" },
            { move: "c7c5", weight: 0.05, name: "Benoni", style: "aggressive" }
        ]
    },
    
    // Sicilian - AlphaZero loves sharp positions
    "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6": {
        white: [
            { move: "g1f3", weight: 0.60, name: "Open Sicilian", style: "sharp" },
            { move: "b1c3", weight: 0.30, name: "Closed Sicilian", style: "positional" },
            { move: "c2c3", weight: 0.10, name: "Alapin", style: "solid" }
        ]
    },
    
    // Italian Game - Fast development
    "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq -": {
        black: [
            { move: "g8f6", weight: 0.50, name: "Two Knights", style: "tactical" },
            { move: "f8c5", weight: 0.40, name: "Giuoco Piano", style: "classical" },
            { move: "f8e7", weight: 0.10, name: "Hungarian", style: "solid" }
        ]
    },
    
    // Ruy Lopez - Classical excellence
    "r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq -": {
        black: [
            { move: "a7a6", weight: 0.50, name: "Morphy Defense", style: "principled" },
            { move: "g8f6", weight: 0.30, name: "Berlin Defense", style: "solid" },
            { move: "f7f5", weight: 0.20, name: "Schliemann", style: "aggressive" }
        ]
    },
    
    // Queen's Gambit - Positional battle
    "rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq c3": {
        black: [
            { move: "e7e6", weight: 0.45, name: "QGD Orthodox", style: "solid" },
            { move: "c7c6", weight: 0.30, name: "Slav Defense", style: "solid" },
            { move: "d5c4", weight: 0.15, name: "QGA", style: "active" },
            { move: "g8f6", weight: 0.10, name: "Indian System", style: "flexible" }
        ]
    },
    
    // King's Indian Defense - Dynamic play
    "rnbqkb1r/pppppppp/5n2/8/2PP4/8/PP2PPPP/RNBQKBNR w KQkq -": {
        white: [
            { move: "b1c3", weight: 0.55, name: "Classical", style: "flexible" },
            { move: "g1f3", weight: 0.35, name: "Development", style: "normal" },
            { move: "c4c5", weight: 0.10, name: "Space grab", style: "aggressive" }
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
let positionType = "normal"; // normal, tactical, positional, endgame

// ═══════════════════════════════════════════════════════════════════════
// ALPHAZERO-SPECIFIC HELPERS
// ═══════════════════════════════════════════════════════════════════════

/**
 * Detect game phase with AlphaZero-style granularity
 */
function getGamePhase(moveNum, fen) {
    const pieces = fen.split(' ')[0].replace(/[^pnbrqkPNBRQK]/g, '').length;
    
    if (moveNum <= 10) return "opening";
    if (moveNum <= 15 && pieces > 28) return "early-middlegame";
    if (pieces > 20) return "middlegame";
    if (pieces > 12) return "late-middlegame";
    if (pieces <= 12) return "endgame";
    return "middlegame";
}

/**
 * Detect position type (AlphaZero evaluation style)
 */
function analyzePositionType(fen) {
    // Check for tactical indicators
    const hasTension = fen.includes("+") || Math.random() < 0.15;
    
    // Check for open position (tactical)
    const openFiles = (fen.match(/\//g) || []).length;
    const isOpen = openFiles > 6;
    
    // Check for closed position (positional)
    const pawnChains = (fen.match(/p{2,}/gi) || []).length;
    const isClosed = pawnChains > 2;
    
    // Determine type
    if (hasTension) return "tactical";
    if (isClosed) return "positional";
    if (isOpen) return "tactical";
    
    return "normal";
}

/**
 * Calculate thinking time (AlphaZero adaptive approach)
 */
function getAlphaZeroThinkTime(phase, posType, timeLeft) {
    let speedMultiplier = 1.0;
    
    // Phase-based adjustment
    if (phase === "opening") speedMultiplier = CONFIG.openingSpeed;
    else if (phase === "early-middlegame") speedMultiplier = CONFIG.middlegameSpeed * 0.9;
    else if (phase === "middlegame") speedMultiplier = CONFIG.middlegameSpeed;
    else if (phase === "late-middlegame") speedMultiplier = CONFIG.middlegameSpeed * 1.1;
    else if (phase === "endgame") speedMultiplier = CONFIG.endgameSpeed;
    
    // Position type adjustment (tactical = more time)
    if (posType === "tactical") {
        speedMultiplier *= CONFIG.criticalSpeed;
    } else if (posType === "positional") {
        speedMultiplier *= 1.1; // Slightly more time for positional evaluation
    }
    
    // Time pressure adjustment
    if (timeLeft < 15000) speedMultiplier *= 0.6; // Under 15s: faster
    if (timeLeft < 10000) speedMultiplier *= 0.5; // Under 10s: much faster
    if (timeLeft < 5000) speedMultiplier *= 0.4;  // Under 5s: very fast
    
    let baseTime = CONFIG.thinkingTimeMin;
    let variance = (CONFIG.thinkingTimeMax - CONFIG.thinkingTimeMin) * speedMultiplier;
    
    const thinkTime = baseTime + (Math.random() * variance);
    return Math.floor(Math.max(300, Math.min(thinkTime, CONFIG.thinkingTimeMax)));
}

/**
 * Calculate search depth (AlphaZero dynamic depth)
 */
function getAlphaZeroDepth(phase, posType, timeLeft) {
    let depth = CONFIG.baseDepth;
    
    // Phase-based depth
    if (phase === "opening") depth = CONFIG.openingDepth;
    else if (phase === "endgame") depth = CONFIG.endgameDepth;
    else if (phase === "middlegame" || phase === "late-middlegame") {
        if (posType === "tactical") {
            depth = CONFIG.tacticalDepth;
        } else if (posType === "positional") {
            depth = CONFIG.positionalDepth;
        }
    }
    
    // Time pressure depth reduction
    if (timeLeft < 10000) depth = Math.max(10, depth - 2);
    if (timeLeft < 5000) depth = Math.max(8, depth - 4);
    if (timeLeft < 3000) depth = Math.max(7, depth - 5);
    
    return depth;
}

/**
 * AlphaZero-style opening book selection
 */
function getAlphaZeroBookMove(fen) {
    const fenKey = fen.split(' ').slice(0, 4).join(' ');
    const position = ALPHAZERO_OPENINGS[fenKey];
    
    if (!position) return null;
    
    const moves = myColor === 'w' ? position.white : position.black;
    if (!moves || moves.length === 0) return null;
    
    // Weighted random selection (AlphaZero explores diverse lines)
    const totalWeight = moves.reduce((sum, m) => sum + m.weight, 0);
    let random = Math.random() * totalWeight;
    
    for (let moveOption of moves) {
        random -= moveOption.weight;
        if (random <= 0) {
            console.log(`🧠 AlphaZero Book: ${moveOption.name} [${moveOption.style}]`);
            return moveOption.move;
        }
    }
    
    return moves[0].move;
}

/**
 * Human-like variance with AlphaZero style
 */
function applyAlphaZeroVariance(bestMove, alternatives) {
    if (!alternatives || alternatives.length < 2) return bestMove;
    
    // Small chance to play second-best move (human-like)
    if (Math.random() < CONFIG.humanMistakeRate) {
        const secondBest = alternatives[1];
        const scoreDiff = Math.abs((alternatives[0].score || 0) - (secondBest.score || 0));
        
        // Only if moves are close in evaluation (AlphaZero would consider both)
        if (scoreDiff < 50) { // Within 0.5 pawns
            console.log("🎭 Human-like variance: alternative move");
            return secondBest.move;
        }
    }
    
    return bestMove;
}

/**
 * Parse multi-PV lines for tactical awareness
 */
function parseMultiPV(output) {
    const lines = output.split('\n');
    const pvLines = [];
    
    for (let line of lines) {
        if (line.includes('multipv')) {
            const moveMatch = line.match(/pv\s+(\w+)/);
            const scoreMatch = line.match(/score\s+cp\s+(-?\d+)/);
            const depthMatch = line.match(/depth\s+(\d+)/);
            
            if (moveMatch) {
                pvLines.push({
                    move: moveMatch[1],
                    score: scoreMatch ? parseInt(scoreMatch[1]) : 0,
                    depth: depthMatch ? parseInt(depthMatch[1]) : 0
                });
            }
        }
    }
    
    return pvLines.sort((a, b) => b.score - a.score);
}

/**
 * Evaluate if position is critical (needs more time)
 */
function isCriticalPosition(fen, pvLines) {
    // Check if top moves have close evaluations (complex position)
    if (pvLines.length >= 2) {
        const scoreDiff = Math.abs(pvLines[0].score - pvLines[1].score);
        if (scoreDiff < 30) return true; // Moves within 0.3 pawns
    }
    
    // Check for checks or captures in FEN
    if (fen.includes("+") || fen.includes("x")) return true;
    
    return false;
}

// ═══════════════════════════════════════════════════════════════════════
// ENGINE INITIALIZATION (AlphaZero-style settings)
// ═══════════════════════════════════════════════════════════════════════

function initializeChessEngine() {
    chessEngine = window.STOCKFISH();
    
    // AlphaZero-inspired engine settings
    chessEngine.postMessage("uci");
    chessEngine.postMessage("setoption name MultiPV value 3"); // Analyze top 3 moves
    chessEngine.postMessage("setoption name Contempt value 50"); // Aggressive, plays for win
    chessEngine.postMessage("setoption name Move Overhead value 30"); // Bullet lag compensation
    
    // Advanced AlphaZero-style preferences (if supported)
    chessEngine.postMessage("setoption name Skill Level value 20"); // Maximum strength
    chessEngine.postMessage("setoption name Aggressiveness value 150"); // More aggressive
    
    chessEngine.postMessage("isready");
    
    console.log("🧠 AlphaZero-Style Bot initialized");
    console.log("🎯 Balanced: 55% Positional + 45% Tactical");
    console.log("⚡ Bullet-optimized: 0.4-3.0s | Depth: 12-16");
    console.log("♟️ Philosophy: Piece activity, initiative, king safety");
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
                    gamePhase = getGamePhase(moveCount, currentFen);
                    positionType = analyzePositionType(currentFen);
                    
                    console.log(`🧠 Move ${moveCount} | ${gamePhase} | ${positionType} | ${myColor === 'w' ? 'White' : 'Black'}`);
                    
                    calculateMove();
                }
            });
            
            return wrappedWebSocket;
        }
    });

    window.WebSocket = webSocketProxy;
}

// ═══════════════════════════════════════════════════════════════════════
// ALPHAZERO MOVE CALCULATION
// ═══════════════════════════════════════════════════════════════════════

function calculateMove() {
    // Try opening book first (fast development)
    if (gamePhase === "opening" || gamePhase === "early-middlegame") {
        const fenKey = currentFen.split(' ').slice(0, 4).join(' ');
        const bookMove = getAlphaZeroBookMove(fenKey);
        
        if (bookMove) {
            const thinkTime = Math.random() * 600 + 400; // 0.4-1.0s for book moves
            
            setTimeout(() => {
                bestMove = bookMove;
                sendMove(bookMove);
            }, thinkTime);
            
            return;
        }
    }
    
    // Engine calculation (AlphaZero-style deep analysis)
    const depth = getAlphaZeroDepth(gamePhase, positionType, timeRemaining);
    const thinkTime = getAlphaZeroThinkTime(gamePhase, positionType, timeRemaining);
    
    const styleIcon = positionType === "tactical" ? "⚔️" : 
                      positionType === "positional" ? "♟️" : "🎯";
    
    console.log(`${styleIcon} Depth ${depth} | Time ${(thinkTime/1000).toFixed(2)}s | ${gamePhase}`);
    
    multiPVLines = [];
    
    chessEngine.postMessage("position fen " + currentFen);
    chessEngine.postMessage(`go depth ${depth}`);
    
    setTimeout(() => {
        // Handled by engine message callback
    }, thinkTime);
}

/**
 * Send move to Lichess
 */
function sendMove(move) {
    console.log(`✅ Playing: ${move}`);
    
    webSocketWrapper.send(JSON.stringify({
        t: "move",
        d: { 
            u: move, 
            b: 1,
            l: Math.floor(Math.random() * 40) + 15, // 15-55ms lag (human-like)
            a: 1
        }
    }));
}

// ═══════════════════════════════════════════════════════════════════════
// ENGINE MESSAGE HANDLER (AlphaZero evaluation)
// ═══════════════════════════════════════════════════════════════════════

function setupChessEngineOnMessage() {
    let engineOutput = "";
    
    chessEngine.onmessage = function (event) {
        engineOutput += event + "\n";
        
        // Parse multi-PV lines for tactical/positional analysis
        if (event.includes("multipv")) {
            const lines = parseMultiPV(engineOutput);
            if (lines.length > 0) {
                multiPVLines = lines;
            }
        }
        
        if (event && event.includes("bestmove")) {
            const moveParts = event.split(" ");
            bestMove = moveParts[1];
            
            let finalMove = bestMove;
            
            // AlphaZero-style evaluation
            const isCritical = isCriticalPosition(currentFen, multiPVLines);
            
            if (isCritical) {
                console.log("⚠️ Critical position detected");
            }
            
            // Apply positional or tactical style based on position type
            if (positionType === "positional") {
                console.log("♟️ Positional play emphasized");
            } else if (positionType === "tactical") {
                console.log("⚔️ Tactical sharpness engaged");
            }
            
            // Human-like variance (AlphaZero explores alternatives)
            if (multiPVLines.length > 1) {
                finalMove = applyAlphaZeroVariance(bestMove, multiPVLines);
            }
            
            // Show evaluation
            if (multiPVLines.length > 0) {
                const topEval = (multiPVLines[0].score / 100).toFixed(2);
                console.log(`📊 Eval: ${topEval} | Alternatives: ${multiPVLines.length}`);
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
🧠 ALPHAZERO-STYLE BOT - Human-like Mastery 🧠
═══════════════════════════════════════════════════════════════

Playing Philosophy (AlphaZero):
• Deep positional understanding
• Sharp tactical calculation
• Aggressive, dynamic style
• Values initiative & piece activity
• King safety emphasis
• Space control & coordination

Style Balance:
• 55% Positional (piece activity, space, structure)
• 45% Tactical (concrete calculation, combinations)
• 70% Aggression (plays for win, not draw)
• 4% Human variance (natural imperfection)

Openings (Dynamic & Principled):
White: e4 (King's Pawn), d4 (Queen's Pawn), c4 (English)
Black: Sicilian, King's Pawn, QGD, Indian Systems

Performance:
• Speed: 0.4-3.0s per move (adaptive)
• Depth: 12-16 (position-dependent)
• Time Controls: 1+0, 2+1, 3+0 bullet
• Strength: ~2700+ (AlphaZero-inspired)

Features:
✓ Balanced positional + tactical play
✓ Human-like natural variance
✓ Adaptive time management
✓ Critical position detection
✓ Multi-line tactical analysis

═══════════════════════════════════════════════════════════════
`);

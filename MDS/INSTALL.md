# 🚀 Quick Installation Guide

## Step-by-Step Instructions

### 1️⃣ Install Userscript Manager

Choose one based on your browser:

**Chrome / Edge / Brave:**
- Go to [Tampermonkey Chrome Extension](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
- Click "Add to Chrome"

**Firefox:**
- Go to [Tampermonkey Firefox Add-on](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
- Click "Add to Firefox"

**Safari:**
- Go to [Tampermonkey Safari App](https://apps.apple.com/us/app/tampermonkey/id1482490089)
- Download and install

---

### 2️⃣ Choose Your Bot

You have two options:

#### Option A: **Fischer/Carlsen (Speed Demon)** ⚡
- Best for: 1+0 hyperbullet
- Style: Fast, practical, safe
- File: `Lichess Bot-Bullet.user.js`

#### Option B: **AlphaZero/Morphy (Tactical Genius)** 🧠
- Best for: 2+1 or 3+0 bullet
- Style: Tactical, aggressive, romantic
- File: `Lichess Bot-AlphaZero-Morphy.user.js`

---

### 3️⃣ Install the Bot

**Method 1: From File**
1. Click on Tampermonkey icon in your browser
2. Click "Dashboard"
3. Click "+" tab (New Script)
4. Delete all existing code
5. Open your chosen bot file (e.g., `Lichess Bot-AlphaZero-Morphy.user.js`)
6. Copy ALL the code
7. Paste into Tampermonkey editor
8. Click "File" → "Save" (or Ctrl+S / Cmd+S)

**Method 2: Drag and Drop** (if supported)
1. Open Tampermonkey Dashboard
2. Drag the `.user.js` file onto the dashboard
3. Click "Install"

---

### 4️⃣ Verify Installation

1. Click Tampermonkey icon
2. You should see your bot listed
3. Ensure it has a green indicator (enabled)
4. Check "Enabled" is checked

Example:
```
✅ Lichess Bot - ALPHAZERO/MORPHY Edition
   Enabled: ✓
   Running on: lichess.org
```

---

### 5️⃣ Test the Bot

1. Go to [Lichess.org](https://lichess.org)
2. Click "Create a game"
3. Select time control:
   - For Fischer/Carlsen: Choose 1+0
   - For AlphaZero/Morphy: Choose 2+1 or 3+0
4. Click "Create game"
5. **Important:** Play as White OR Black (bot works for both)
6. Watch the bot play automatically!

---

## 🔍 Troubleshooting

### Bot Not Working?

**Check 1: Is Tampermonkey Enabled?**
- Click Tampermonkey icon
- Ensure extension is enabled
- Ensure your bot script is enabled

**Check 2: Is Script Running on Lichess?**
- Open Tampermonkey dashboard
- Click on your bot script
- Check "Enabled" checkbox
- Verify `@match *://lichess.org/*` is in the script header

**Check 3: Check Browser Console**
1. Press F12 (or Cmd+Option+I on Mac)
2. Click "Console" tab
3. You should see bot initialization messages like:
```
♟️ AlphaZero/Morphy Tactical Genius initialized
🎯 Style: 50% AlphaZero positional + 50% Morphy tactical
```

**Check 4: Refresh Lichess**
- Sometimes a simple page refresh helps
- Press F5 or Cmd+R
- Try creating a new game

---

### Multiple Bots Conflict?

**Solution:**
1. Open Tampermonkey dashboard
2. **Disable all other chess bots**
3. Enable ONLY ONE bot at a time
4. Refresh Lichess page

---

### Bot Playing Slowly?

**Possible Causes:**
- Slow internet connection
- Too many browser tabs open
- Computer under heavy load

**Solutions:**
1. Close unnecessary tabs
2. Lower the depth in CONFIG:
```javascript
baseDepth: 11,  // Lower = faster
tacticalDepth: 13,  // Lower = faster
```

---

### Bot Making Mistakes?

**Adjust Settings:**

For more accuracy (slower):
```javascript
thinkingTimeMin: 600,
thinkingTimeMax: 4000,
baseDepth: 15,
```

For faster play (less accurate):
```javascript
thinkingTimeMin: 300,
thinkingTimeMax: 2000,
baseDepth: 10,
```

---

## ⚙️ Advanced Configuration

### Opening Book Customization

Add your favorite openings to the `TACTICAL_OPENINGS` or `BULLET_OPENINGS` object:

```javascript
"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -": {
    white: [
        { move: "e2e4", weight: 0.70, name: "King's Pawn" },
        { move: "d2d4", weight: 0.30, name: "Queen's Pawn" }
    ]
}
```

### Style Adjustment

**Make AlphaZero/Morphy MORE aggressive:**
```javascript
attackWeight: 1.5,        // Higher = more attacking
initiativeBonus: 35,      // Higher = prioritize initiative
morphyTactical: 0.70,     // 70% Morphy, 30% AlphaZero
```

**Make Fischer/Carlsen MORE defensive:**
```javascript
fischerAggression: 0.50,  // Less aggressive
carlsenSpeed: 0.50,       // More careful
humanMistakeRate: 0.01,   // Less mistakes
```

---

## 🎯 Quick Tips

### For Best Results:

1. **Stable Internet:** Bot needs consistent connection
2. **One Bot Only:** Disable other chess scripts
3. **Right Time Control:** 
   - Fischer/Carlsen → 1+0
   - AlphaZero/Morphy → 2+1 or 3+0
4. **Fresh Browser:** Close unnecessary tabs
5. **Console Open:** Keep F12 console open to monitor

---

## 📝 Console Messages Guide

When bot is working correctly, you'll see:

### Initialization:
```
♟️ AlphaZero/Morphy Tactical Genius initialized
⚔️ Time: 0.4-3.0s | Depth: 12-16 | Bullet optimized
```

### During Game:
```
♟️ #5 opening White
♟️ King's Pawn (Morphy favorite) - e2e4
🧠 D12 T0.8s ⚔️
✅ e2e4
```

**What it means:**
- `♟️ #5 opening White` - Move 5, opening phase, playing as White
- `♟️ King's Pawn` - Using opening book
- `🧠 D12 T0.8s ⚔️` - Depth 12, thinking 0.8 seconds, tactical position
- `✅ e2e4` - Move sent

---

## ⚠️ Important Reminders

### Ethical Use Only!

✅ **DO:**
- Use for learning
- Use for analysis
- Use in casual/practice games
- Use to study different styles

❌ **DON'T:**
- Use in rated games
- Use to cheat
- Use in tournaments
- Deceive other players

---

## 🔄 Switching Between Bots

To switch from one bot to another:

1. Open Tampermonkey Dashboard
2. **Disable current bot** (uncheck "Enabled")
3. **Enable new bot** (check "Enabled")
4. Refresh Lichess (F5)
5. Start new game

**Remember:** Only ONE bot should be enabled at a time!

---

## 📊 Monitoring Bot Performance

Open Browser Console (F12) to see:
- Move calculations
- Depth searches
- Thinking times
- Tactical evaluations
- Style decisions (AlphaZero vs Morphy, Fischer vs Carlsen)

---

## 🆘 Need More Help?

### Check These Files:
1. **README.md** - Complete documentation
2. **COMPARISON.md** - Detailed bot comparison
3. **This file (INSTALL.md)** - Installation guide

### Common Issues:

**"Bot not moving"**
→ Check Tampermonkey is enabled
→ Refresh Lichess page
→ Check console for errors

**"Bot playing randomly"**
→ Check internet connection
→ Increase thinking time
→ Close other tabs

**"Bot too slow"**
→ Lower depth settings
→ Reduce think time
→ Use faster bot (Fischer/Carlsen)

---

## ✅ Installation Checklist

Before starting a game, verify:

- [ ] Tampermonkey installed
- [ ] Bot script added to Tampermonkey
- [ ] Bot script enabled (green indicator)
- [ ] Only ONE bot enabled at a time
- [ ] Lichess.org page loaded
- [ ] Console shows initialization message
- [ ] Chosen appropriate time control
- [ ] Stable internet connection

---

**You're ready to play! Good luck! ♟️**

---

## 🎮 Quick Start Commands

### For Developers/Advanced Users:

**View in Console:**
```javascript
// Check if bot is loaded
console.log(CONFIG);

// Check current game state
console.log(currentFen);

// Check move count
console.log(moveCount);
```

**Modify on the Fly:**
```javascript
// Make bot faster
CONFIG.thinkingTimeMax = 2000;

// Make bot deeper
CONFIG.tacticalDepth = 18;

// Adjust aggression
CONFIG.morphyTactical = 0.80;
```

---

**Happy Chess! May your tactics be brilliant! 🏆**

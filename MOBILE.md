# 📱 MOBILE.md — NAIM Evolution Log

---

## 🧬 Identity

**NAIM Name:** `BlockBlast NAIM`
**Crew:** `Eray`
**App Concept:** `Block Blast tarzı mobil bulmaca oyunu — chat ile AI'a komut verince uygulama kendini güncelliyor`
**Starting Tool:** `Stitch + Antigravity`

---

## 📊 Scoreboard

| Metric | Value |
|--------|-------|
| Total Iterations | 4 |
| Total Weight (kg) | 50 |
| Total Time (min) | 60 |
| Failed Attempts | 1 |

---

## 🔁 Iterations

---

### 🏋️ Iteration 1

| Field | Value |
|-------|-------|
| Feature | Ana oyun ekranı (Game Board UI) |
| Weight | 5 kg |
| Tool Used | Stitch + Antigravity |
| Time | 15 min |
| Attempts | 1 |
| Status | ✅ Success |

**Prompt given to AI:**
```
I have a React Native Expo project already set up. 
Build the main game screen based on this design:
- Dark navy/black background
- Top bar: hamburger menu icon on left, "BLOCK BLAST" title center, leaderboard icon right
- Score section: two cards — CURRENT SCORE and HIGH SCORE
- Center: 8x8 grid game board with colored block pieces (red, blue, green)
- Bottom: 3 upcoming block pieces panel
- Bottom navigation: Play, Trophy, Settings
```

**What happened:**
- Antigravity tasarımı başarıyla üretti. Stitch tasarımına uygun dark tema ve grid yapısı oluştu.

**Screenshot:** `assets/iteration1.png`

**Commit:** `[NAIM: BlockBlastNAIM] Added main game screen UI - 5kg`

---

### 🏋️ Iteration 2

| Field | Value |
|-------|-------|
| Feature | Chat Bar bileşeni |
| Weight | 10 kg |
| Tool Used | Antigravity |
| Time | 15 min |
| Attempts | 1 |
| Status | ✅ Success |

**Prompt given to AI:**
```
Add a chat input bar at the bottom of the screen.
User types a command, app sends it to AI API.
Create components/ChatBar.tsx
```

**What happened:**
- Chat bar eklendi, metin girişi ve gönder butonu çalışıyor.

**Screenshot:** `assets/iteration2.png`

**Commit:** `[NAIM: BlockBlastNAIM] Added chat input bar component - 10kg`

---

### 🏋️ Iteration 3

| Field | Value |
|-------|-------|
| Feature | JSON Renderer bileşeni |
| Weight | 10 kg |
| Tool Used | Antigravity |
| Time | 15 min |
| Attempts | 1 |
| Status | ✅ Success |

**Prompt given to AI:**
```
Create components/JsonRenderer.tsx
Takes JSON from AI, renders UI changes dynamically.
JSON schema includes backgroundColor, blockColors, theme, gridSize.
```

**What happened:**
- JsonRenderer JSON'u okuyup ekranı dinamik olarak güncelliyor.

**Screenshot:** `assets/iteration3.png`

**Commit:** `[NAIM: BlockBlastNAIM] Added JSON renderer for dynamic UI updates - 10kg`

---

### 🏋️ Iteration 4

| Field | Value |
|-------|-------|
| Feature | Gemini API bağlantısı (Chat-Driven UI) |
| Weight | 25 kg |
| Tool Used | Antigravity + Gemini API |
| Time | 15 min |
| Attempts | 2 |
| Status | ✅ Success |

**Prompt given to AI:**
```
Connect useAIChat.ts hook to Gemini API.
Endpoint: https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent
API key from: process.env.EXPO_PUBLIC_GEMINI_API_KEY
AI returns JSON, JsonRenderer updates the screen in real time.
```

**What happened:**
- Gemini API bağlandı. Chat'e komut yazınca AI JSON üretiyor, ekran kendini güncelliyor.
- Import path hatası çıktı (useAIChat bulunamıyor), düzeltildi.

**Screenshot:** `assets/iteration4.png`

**Commit:** `[NAIM: BlockBlastNAIM] Connected Gemini API for chat-driven UI changes - 25kg`

---

## 🧠 Reflection

**Hardest part:**
Import path hataları ve JSON parsing sorunları beklenmedik zaman aldı.

**What AI did well:**
Tasarımdan koda geçişi hızlı yaptı, component yapısını düzgün kurdu.

**Where AI failed:**
Dosya yollarını bazen yanlış yazdı, manuel düzeltme gerekti.

**If I started over, I would:**
Önce dosya yapısını netleştirip sonra kod üretmeye başlardım.

**Best feature I built:**
Chat'e komut yazınca uygulamanın kendini güncellemesi (JSON Renderer + Gemini API).

**Biggest surprise:**
Stitch tasarımının Antigravity'ye bu kadar kolay aktarılabilmesi.
# KhushiRNN Frontend

An aesthetic, editorial-themed React application for sentiment analysis powered by the **KhushiRNN** backend model.

🔗 **Live Website**: [https://lucky-KRMU.github.io/KhushiRNN/](https://lucky-KRMU.github.io/KhushiRNN/)  
⚙️ **Live Backend API**: [https://khushirnn-backend.onrender.com](https://khushirnn-backend.onrender.com)

---

## ✨ Features

- **Aesthetic Typography**: Styled with Google Fonts (`Cormorant Garamond`, `Newsreader`, `Cinzel`) for a luxury, literary/editorial publication aesthetic.
- **Dark & Light Modes**: Seamless toggle between warm antique ivory (light) and velvet obsidian charcoal (dark), with persistent user preference in `localStorage`.
- **Real-Time Backend Status**: Live health ping to the backend API (`/health`) with latency measurement.
- **Dynamic Sentiment Output**:
  - Verdict announcement: **Positive** (emerald laurels) or **Negative** (crimson seal).
  - Confidence probability gauge with decision boundary indicator.
  - Processed token count and sequence truncation notice (max 120 tokens).
- **Curated Samples**: One-click preset reviews for instant testing.
- **Adjustable Threshold**: Fine-tune the decision threshold from 0.1 to 0.9.
- **Evaluation History**: Stores recent reviews with verdict badges in `localStorage`.
- **Configurable Backend URL**: Easily switch between local dev server (`http://localhost:8000`) and a production Render endpoint (`https://...onrender.com`) via in-app settings or `.env`.

---

## 🚀 Quickstart

### 1. Install Dependencies
```bash
cd Frontend
npm install
```

### 2. Configure Environment (Optional)
Create a `.env` file from the template:
```bash
cp .env.example .env
```
Set `VITE_API_URL` to your backend host (defaults to `https://khushirnn-backend.onrender.com`).

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
```bash
npm run build
```
The optimized static bundle will be generated in `dist/`.

---

## 👤 Author

- **Lucky Pawar** ([@lucky-KRMU](https://github.com/lucky-KRMU))


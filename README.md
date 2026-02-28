# XFNX CTF Writeups 🚀

A premium, modern CTF writeups website built with React, Vite, and Framer Motion.

## ✨ Features
- **Modern Design**: Sleek dark mode with glassmorphism and vibrant purple accents.
- **Markdown Support**: Easily write and display your deep dives.
- **Responsive**: Perfect viewing on all devices.
- **Easy Deployment**: One-command deployment to GitHub Pages.

## 🛠️ Tech Stack
- **Framework**: React (Vite)
- **Styling**: Vanilla CSS (Premium Tokens)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Markdown**: React Markdown

## 🚀 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Local Development
```bash
npm run dev
```

### 3. Adding New Writeups
Open `src/data/writeups.js` and add a new object to the array. You can use Markdown for the `content` field.

```javascript
{
  id: "your-id",
  title: "Title",
  category: "Web",
  difficulty: "Easy",
  date: "2026-02-24",
  summary: "Brief summary...",
  tags: ["web", "sqli"],
  content: \`# Your Markdown Content\`
}
```

### 4. Deployment
To deploy to GitHub Pages:
1. Ensure your repository is initialized and connected to GitHub.
2. Push your latest changes to GitHub:
```bash
git add .
git commit -m "update writeups"
git push origin main
```
3. Run:
```bash
npm run deploy
```

## 📄 License
MIT

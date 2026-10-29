# 🌿 Zenith • Life & Wellness OS

> A personal productivity, atomic habit tracking, nutrition, and academic management system built with semantic HTML5, modern vanilla CSS3, and ES6 JavaScript.

![License](https://img.shields.io/badge/license-MIT-green.svg)
![Zero Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen.svg)
![Responsive](https://img.shields.io/badge/mobile-responsive-blue.svg)

---

## 🌟 Key Features

### 1. 🔥 Atomic Habit Tracker
- **Streak & Momentum Tracking**: Calculates current streaks, all-time best streaks, and today's completion percentage.
- **7-Day Interactive Matrix**: 1-tap check-ins with subtle Web Audio synthesized acoustic chords and celebratory confetti particle bursts.
- **30-Day Heatmap Matrix**: GitHub-style density grid displaying atomic habit consistency over the past month.
- **Categories & Cadence**: Organize routines by *Mind & Body*, *Productivity*, *Fitness*, *Academics*, and *Mindfulness*.

### 2. 🥗 Food, Calorie & Nutrition Journal
- **Searchable Food Catalog**: Instant filtering across common dishes with detailed macronutrient and micronutrient profiles.
- **Photo Scan & Visual Portion Estimation**: Simulated AI visual portion analysis with confidence scoring (e.g. *88% confidence*) and editable dish values.
- **Transparency & Medical Notice**: Prominently labels photo-based values as estimations, emphasizing that visual recognition heuristics are not medically precise.
- **Daily Targets & Macro Progress**: Real-time animated circular calorie gauge and macronutrient ratios (Protein, Carbs, Healthy Fats) alongside Dietary Fiber and Sodium intake limits.
- **Hydration Monitor**: 1-tap `+250ml` and `+500ml` logging toward a customizable daily goal.

### 3. 🎓 Academic Hub & Knowledge Repository
- **Course Enrollment & Grade Records**: Syllabus records, credit weighting, schedule times, and room locations.
- **Live GPA Calculator**: Dynamically calculates cumulative and semester GPA based on enrolled credits and grades.
- **Deadlines & Academic Tasks**: Urgency countdown badges (*Due Today*, *In 2 days*, *Overdue*) and to-do lists.
- **Campus Dues & Billing**: Tracks tuition installments, lab deposits, and student guild fees with 1-click payment clearance.
- **Notes & Document Repository**: Real-time fuzzy search by keyword, tag, or course, with an integrated document previewer supporting images and PDF files.

### 4. 🧠 Motivational Reflections
- Curated library of 35+ stoic and philosophical thoughts (Marcus Aurelius, Viktor Frankl, Seneca, Epictetus, James Clear, Carl Jung).
- Dynamic rotation after every habit check-in, plus a **"Spark Another"** button for on-demand inspiration.

### 5. 🎨 Customization & Privacy
- **4 Distinct Aesthetic Themes**: *Nordic Sage* (calming dark), *Obsidian Ember* (deep dark & bronze), *Ethereal Porcelain* (airy light mode), and *Oceanic Calm* (deep cyan).
- **Multi-User Isolation**: Client-side sandboxing in `localStorage` under `zenith_data_{userId}`.
- **Data Portability**: Full JSON export and restore for complete offline ownership and zero tracking.

---

## 🚀 Local Development

To run locally without installing any third-party dependencies:

```bash
# Start local Node.js server
node server.js
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deploy to Vercel

### Option A: 1-Click Terminal Deployment via Vercel CLI

```bash
# In the project directory, run:
npx vercel
```

Follow the interactive prompts:
1. `Set up and deploy?` → **Y**
2. `Which scope?` → Select your Vercel account
3. `Link to existing project?` → **N**
4. `Project name?` → `zenith-life-os` (or your choice)
5. `In which directory?` → `./`
6. `Want to modify settings?` → **N**

Vercel will output your live URL in seconds!

### Option B: Deploy via GitHub (Continuous Deployment)

1. Create a new repository on [GitHub](https://github.com/new).
2. Push this repository to GitHub:
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git branch -M main
   git push -u origin main
   ```
3. Visit [vercel.com/new](https://vercel.com/new), import your repository, and click **Deploy**.

---

## 🔒 Security & Data Privacy

- **Zero Secrets**: Contains no hardcoded API keys, tokens, or private credentials.
- **100% Client-Side**: All user data, food logs, and academic notes remain strictly inside the user's browser `localStorage`.

# 🎵 Meme Soundboard

A chaotic little soundboard packed with 24 classic meme sounds. Click a button. Annoy your coworkers. No installs required.

## Features

- **24 meme sounds** across 2 paginated pages (12 per page)
- **🎲 Random Meme** button — surprise yourself
- **🔇 Stop All Sounds** button — for damage control
- **Now Playing bar** — shows what's currently blasting
- **Animated buttons** — bounce on click, glow while playing
- **Responsive grid** — 2–4 columns depending on screen size

## Sounds

| # | Sound | # | Sound |
|---|-------|---|-------|
| 1 | 💥 Vine Boom | 13 | 🐿️ Dramatic Chipmunk |
| 2 | 😐 Bruh | 14 | 😨 Oh No |
| 3 | 😬 Oof | 15 | 💻 Windows XP Error |
| 4 | 📯 Air Horn | 16 | 🪙 Mario Coin |
| 5 | 🐱 Nyan Cat | 17 | 🚨 Emergency Meeting |
| 6 | 😂 Laugh Track | 18 | 👟 What Are Those |
| 7 | 🎺 Sad Trombone | 19 | ⛏️ Minecraft Ow |
| 8 | 😱 Wilhelm Scream | 20 | 🎤 Rickroll |
| 9 | 🎵 Roundabout | 21 | 🔨 Bonk |
| 10 | 💨 Fart | 22 | 🦗 Crickets |
| 11 | 🐸 It's a Prank | 23 | 🥁 Drum Roll |
| 12 | 🐢 Turtle | 24 | 🧅 Get Out My Swamp |

## Tech Stack

- **HTML5** — structure
- **[Tailwind CSS](https://tailwindcss.com)** (via CDN) — styling
- **Vanilla JS** — all logic in `app.js`
- **Web Audio API** — sound playback via `new Audio()`
- **[Fredoka One](https://fonts.google.com/specimen/Fredoka+One)** — the fun font

## How to Run

No build step, no dependencies. Just open `index.html` in your browser:

```
open index.html
```

Chrome and Firefox work best.

## How to Add Sounds

MP3 files are not included in the repo (file size). To add them:

1. Download free MP3s from sites like [freesound.org](https://freesound.org) or [myinstants.com](https://www.myinstants.com)
2. Rename each file to match the filenames expected by `app.js` (e.g. `vine-boom.mp3`)
3. Drop them in the `sounds/` folder

See `sounds/README.txt` for the full list of expected filenames and more tips.

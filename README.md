# LeetType

LeetType is a typing speed practice app built with on **Next.js** with **TypeScript**. Practice common LeetCode algorithms in multiple programming languages with instant feedback on your speed and accuracy

![Desktop only](public/window.svg)

## Features

- **Algorithm typing practice** – choose from a selection of LeetCode problems and type the standard solutions in Java, Python, JavaScript or C++
- **Real‑time metrics** – the app tracks WPM, time per word, total characters, errors made and overall accuracy

## Implementation Details

- Source code for each algorithm and language lives in `public/algorithms/`. The main page dynamically fetches the selected file so no additional backend is needed
- The typing area displays six lines at a time and handles backspace, whitespace and line transitions with smooth animations
- Restart the exercise quickly with **Tab + Enter** once typing is complete

## Getting Started

```bash
npm install
npm install react react-icons
npm run dev
```

## Scripts

- `npm run dev` – run the Next.js development server
- `npm run build` – build for production
- `npm run start` – start the production server
- `npm run lint` – run ESLint

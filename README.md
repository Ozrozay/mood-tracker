# Mood Tracker 🧘‍♂️🌤️

A modern, sleek mood tracker app built with React + TypeScript. Track your daily mood with emojis, notes, weather integration, and a fun mood pet! Supports light, dark, and zen themes.

## Features

- 🎨 **Themes:** Light, Dark, and Zen mode (pastel gradients, calm UI)
- 😺 **Mood Pet:** Animated pet reacts to your mood patterns
- 🌤️ **Weather:** Auto-fetches your local weather (with fallback to Buea, Cameroon)
- 😀 **Emoji Mood:** Select from a range of mood emojis
- 📝 **Notes:** Add a note to each mood entry
- 📅 **Mood History:** View your mood and notes over time
- 💾 **Local Storage:** Theme and mood data persist in your browser
- 📱 **Responsive:** Works beautifully on desktop and mobile

## Screenshots

![Mood Tracker Screenshot](screenshot.png)

## Getting Started

1. **Clone the repo:**
   ```sh
   git clone https://github.com/yourusername/mood-tracker.git
   cd mood-tracker
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Run the app:**
   ```sh
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Weather API
- Uses [OpenWeatherMap](https://openweathermap.org/) for real-time weather.
- Default location: Buea, Cameroon if geolocation is denied.

## Customization
- Edit emoji options, themes, or pet logic in the `src/components` and `src/context` folders.

## Contributing
Pull requests are welcome! For major changes, please open an issue first.

## License
[MIT](LICENSE)

---

> Made with ❤️ and ☀️ in Cameroon

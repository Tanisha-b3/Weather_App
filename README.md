# Weather Dashboard

A modern, responsive weather application built with React, Vite, and Tailwind CSS. Features real-time weather data, forecasts, and an interactive map.

![Weather Dashboard](https://img.shields.io/badge/React-18.2.0-blue) ![Vite](https://img.shields.io/badge/Vite-4.4.5-purple) ![Tailwind](https://img.shields.io/badge/Tailwind-3.3.3-cyan)

## Features

- 🌤️ Current weather conditions with detailed metrics
- 📅 7-day weather forecast
- ⏰ 24-hour hourly forecast
- 🗺️ Interactive weather map with nearby locations
- 💾 Recent search history with localStorage persistence
- 🩺 Health recommendations based on weather conditions
- 📱 Fully responsive design
- 🎨 Beautiful UI with dynamic background based on weather

## Technologies Used

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Maps**: Leaflet & React-Leaflet
- **API**: Open-Meteo Weather API

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd weather-dashboard
### Installation
```bash
npm install

## 2. Install shadcn/ui Components
### Install
```bash
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add card
npx shadcn@latest add alert
npx shadcn@latest add tabs
npx shadcn@latest add skeleton
npx shadcn@latest add progress
npx shadcn@latest add badge
```

### Install Additional Dependencies
```bash
npm install lucide-react leaflet react-leaflet
```

### Run Development Server
```bash
npm run dev
```

---

## 📌 Usage
- Enter a city name in the search bar
- View current weather conditions (temperature, humidity, wind speed, etc.)
- Switch between **hourly** and **daily** forecasts using the tabs
- Check **health recommendations** based on current conditions
- Explore nearby locations on the interactive **map**
- Click on **recent searches** to quickly view the weather for previously searched cities

---

## 🌐 API Reference
This application uses the **Open-Meteo API** for:
- Geocoding (city → coordinates)
- Current weather data
- Weather forecasts
- Historical weather data

---

## 🧩 Component Structure
```
App.jsx
├── Header (Search functionality)
├── CurrentWeather (Main weather display)
├── ForecastTabs (Hourly/Daily forecasts)
├── RecentSearches (Search history)
├── InteractiveMap (Leaflet map with weather data)
├── HealthRecommendations (Weather-based advice)
├── ErrorDisplay (Error handling)
├── LoadingState (Loading animations)
├── EmptyState (Initial state)
└── Footer (App information)
```

---

## ⚡ Custom Hooks
- **useWeather.js**: Manages all weather-related state and API calls

## 🔧 Utilities
- **weatherUtils.js**: Helper functions for weather data processing

---

## ⚙️ Project Configuration

### Tailwind Config (`tailwind.config.js`)
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Vite Config (`vite.config.js`)
``` js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

---

## 🔑 Environment Variables
Create a `.env` file in the root directory:
```env
VITE_APP_NAME=Weather Dashboard
```

---

## 📦 Building for Production
```bash
npm run build
```
The build artifacts will be stored in the `dist/` directory.

---

## 🚀 Deployment
You can deploy the app to:
- **Vercel**: Connect GitHub repo for automatic deployments
- **Netlify**: Drag & drop `dist/` folder or connect repo
- **GitHub Pages**: Use `gh-pages` package for deployment

---

## ⚡ Performance Optimizations
- Component lazy loading for faster initial load
- API response caching to minimize requests
- Debounced search input to reduce API calls
- Optimized images & assets

---

## 🌍 Browser Support
Supported on all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## 🤝 Contributing
1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License
This project is licensed under the **MIT License** - see the LICENSE file for details.

---

## 🙏 Acknowledgments
- [Open-Meteo](https://open-meteo.com/) for free weather API
- [Lucide](https://lucide.dev/) for icons
- [Leaflet](https://leafletjs.com/) for maps
- [shadcn/ui](https://ui.shadcn.com/) for components

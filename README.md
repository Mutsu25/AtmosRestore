# AtmosRestore Dashboard

Welcome to the AtmosRestore Dashboard! This project is a modern, interactive web dashboard for real-time monitoring and control of soil and hydrology sensors, designed for environmental restoration and research projects.

## Features

- **Authentication:** Secure login/logout with Firebase Auth. Dashboard is hidden until login.
- **Navigation:** Sleek hamburger menu and navigation drawer for switching between dashboard sections.
- **Real-time Gauges:** Live soil and hydrology gauges (moisture, humidity, temperature, pH, salinity, flooding, tide, velocity) with animated visuals.
- **Live Feed & Pump Control:** View live RTSP video stream and control water pumps in real time via Firebase.
- **Trend Charts:** Interactive Chart.js graphs for all metrics, with dropdown to select trends.
- **History Tables:** Real-time updating tables for soil and water history, with CSV and PDF export (jsPDF/AutoTable integration).
- **Species Metrics:** Dropdown to view optimal metrics for different mangrove species.
- **Responsive Design:** Clean, nature-inspired UI with mangrove background, modern fonts, and smooth animations. Fully responsive for desktop and mobile.
- **PWA Support:** Includes a web manifest for installable Progressive Web App experience.

## Technology Stack

- HTML, CSS, JavaScript (ES6 modules)
- [JustGage](https://justgage.com/) for animated gauges
- [Chart.js](https://www.chartjs.org/) for charts
- [Firebase Realtime Database & Auth](https://firebase.google.com/)
- [jsPDF](https://github.com/parallax/jsPDF) & [jsPDF-AutoTable](https://github.com/simonbengtsson/jsPDF-AutoTable) for PDF export
- Google Fonts (Inter)

## Getting Started

1. **Clone or download this repository.**
2. **Firebase Setup:**
   - Create a Firebase project at [firebase.google.com](https://firebase.google.com/).
   - Enable **Realtime Database** and **Authentication (Email/Password)**.
   - Replace the Firebase config in `public/index.html` with your own project credentials.
   - Set up your database structure as needed (see `/pump/pump1`, `/pump/pump2`, `/soilHistory`, `/waterHistory` in the code).
3. **Run the Dashboard:**
   - Open `public/index.html` in a modern web browser (Chrome/Edge/Firefox recommended).
   - Log in with a registered Firebase Auth user.
   - All features (gauges, charts, history, live feed, pump control) will work in real time if your Firebase is set up.

## Project Structure

- `public/index.html` - Main dashboard HTML page
- `public/styles.css` - Dashboard styling
- `public/soilGauges.js`, `hydrologyGauges.js`, `charts.js`, `history.js`, `speciesMetrics.js`, `navigation.js`, `auth.js`, `liveFeed.js`, `main.js` - Modular JavaScript for each dashboard section
- `public/FairatmosLogo.jpg`, `public/Mangrove.jpg` - Branding and background
- `public/site.webmanifest` - PWA manifest

## Requirements

- Modern web browser (with ES6 module support)
- Firebase project with Realtime Database and Auth enabled
- Internet connection for CDN libraries (JustGage, Chart.js, jsPDF, Firebase, etc.)

## License

This project is open source and available under the MIT License.

---

Enjoy monitoring and controlling your restoration site with the AtmosRestore Dashboard!

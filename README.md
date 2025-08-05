# AtmosRestore Dashboard

AtmosRestore is a prototype dashboard for in-house soil and water assessment tools, designed to monitor, visualize, and control environmental parameters for mangrove restoration projects. The dashboard integrates real-time sensor data, historical trends, and remote device control (such as pumps and relays) using Firebase and ESP32 microcontrollers.

## Features

- **User Authentication**: Secure login for dashboard access.
- **Real-Time Gauges**: Live display of soil and hydrology metrics (moisture, humidity, temperature, pH, salinity, flooding, tide, etc.).
- **Historical Data**: View and export historical soil and water measurements as PDF or CSV.
- **Charts & Trends**: Visualize trends for all key metrics using interactive charts.
- **Optimal Species Metrics**: Reference optimal environmental ranges for various mangrove species.
- **Live Feed**: (Planned) Integration for live RTSP video stream from the field.
- **Remote Device Control**: Control relays and pumps remotely via the dashboard, with commands routed through Firebase Cloud Functions to ESP32 devices.

## Project Structure

```
AtmosRestore/
├── firebase.json
├── README.md
├── favicon_io/           # Favicon and icon assets
├── functions/            # Firebase Cloud Functions (relay proxy, backend logic)
│   ├── index.js
│   └── package.json
├── public/               # Main dashboard frontend
│   ├── app.js
│   ├── auth.js
│   ├── charts.js
│   ├── history.js
│   ├── hydrologyGauges.js
│   ├── index.html        # Main dashboard UI
│   ├── liveFeed.js
│   ├── main.js           # Main JS logic (Firebase, UI, controls)
│   ├── navigation.js
│   ├── relay-control.html# Standalone relay control page
│   ├── soilGauges.js
│   ├── speciesMetrics.js
│   ├── styles.css
│   └── ... (images, manifest, etc.)
└── Soil Assesment Prototype/
    └── public/           # (Legacy or prototype files)
```

## Setup & Deployment

### Prerequisites
- Node.js & npm
- Firebase CLI (`npm install -g firebase-tools`)
- A Firebase project (Realtime Database enabled)
- ESP32 devices with firmware to read/write Firebase and receive relay/pump commands

### 1. Clone the Repository
```sh
git clone <your-repo-url>
cd AtmosRestore
```

### 2. Install Firebase Functions Dependencies
```sh
cd functions
npm install
```

### 3. Configure Firebase
- Update `firebase.json` and `public/index.html` with your Firebase project credentials if needed.
- Initialize Firebase in your project:
```sh
firebase login
firebase use --add
```

### 4. Deploy Cloud Functions & Hosting
```sh
firebase deploy --only functions,hosting
```

### 5. ESP32 Setup
- Flash your ESP32 with firmware that connects to your Wi-Fi and Firebase Realtime Database.
- Ensure it listens for relay/pump commands and updates its state in Firebase.

### 6. Access the Dashboard
- Open the hosted URL provided by Firebase Hosting.
- Login with your credentials to access the dashboard.

## File Descriptions

- `public/index.html`: Main dashboard UI.
- `public/main.js`: Handles Firebase integration, UI logic, and device control.
- `public/relay-control.html`: Standalone page for direct relay control.
- `functions/index.js`: Firebase Cloud Functions (relay proxy, backend logic).
- `public/styles.css`: Dashboard styling.

## Notes
- The dashboard expects ESP32 devices to be online and connected for real-time control and state updates.
- Live video feed is currently disabled; enable when RTSP stream is available.
- For security, never expose secret keys or sensitive credentials in public repositories.

## License
This project is for prototype and demonstration purposes. Please contact the project owner for licensing details.

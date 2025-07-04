// soilGauges.js
// Handles all logic for Soil Gauges section (moisture, humidity, temperature, pH, salinity)
// Exports: initSoilGauges
//
// This module initializes the JustGage gauges for soil metrics and sets up Firebase listeners
// to update the gauges in real time. It also manages the local soilData object for use by other modules.

// --- Dependencies: JustGage, Firebase must be loaded globally ---

export const soilData = {
    moisture: null,
    humidity: null,
    temperature: null,
    ph: null,
    salinity: null
};

let moistureGauge, humidityGauge, temperatureGauge, phGauge, salinityGauge;

/**
 * Initializes all soil gauges and sets up Firebase listeners for real-time updates.
 * Also records new readings to Firebase history every 5 seconds if data is present.
 */
export function initSoilGauges() {
    // Initialize JustGage instances for each soil metric
    moistureGauge = new JustGage({
        id: "moistureGauge",
        value: 0,
        min: 0,
        max: 100,
        title: "Moisture",
        label: "%",
        valueFontColor: "#ffffff",
        valueFontFamily: "Inter",
        gaugeWidthScale: 0.6,
        levelColors: ["#ed1c24", "#f2ed23", "#4caf50"]
    });
    humidityGauge = new JustGage({
        id: "humidityGauge",
        value: 0,
        min: 0,
        max: 100,
        title: "Humidity",
        label: "%",
        valueFontColor: "#ffffff",
        valueFontFamily: "Inter",
        gaugeWidthScale: 0.6,
        levelColors: ["#b2dfdb", "#4dd0e1", "#0097a7"]
    });
    temperatureGauge = new JustGage({
        id: "temperatureGauge",
        value: 0,
        min: 0,
        max: 50,
        title: "Temperature",
        label: "°C",
        valueFontColor: "#ffffff",
        valueFontFamily: "Inter",
        gaugeWidthScale: 0.6,
        levelColors: ["#4caf50", "#f2ed23", "#ed1c24"]
    });
    phGauge = new JustGage({
        id: "phGauge",
        value: 0,
        min: 0,
        max: 14,
        decimals: 2,
        title: "pH Level",
        label: "pH",
        valueFontColor: "#ffffff",
        valueFontFamily: "Inter",
        gaugeWidthScale: 0.6,
        levelColors: ["#ed1c24", "#f2ed23", "#4caf50"]
    });
    salinityGauge = new JustGage({
        id: "salinityGauge",
        value: 0,
        min: 0,
        max: 50,
        decimals: 2,
        title: "Salinity",
        label: "ppt",
        valueFontColor: "#ffffff",
        valueFontFamily: "Inter",
        gaugeWidthScale: 0.6,
        levelColors: ["#a0522d", "#deb887", "#4caf50"]
    });

    // Set up Firebase listeners for each metric
    if (window.firebase && window.firebase.database) {
        firebase.database().ref('/sensor/moisture').on('value', function(snapshot) {
            const val = snapshot.val();
            soilData.moisture = val;
            moistureGauge.refresh(val);
        });
        firebase.database().ref('/sensor/humidity').on('value', function(snapshot) {
            const val = snapshot.val();
            soilData.humidity = val;
            humidityGauge.refresh(val);
        });
        firebase.database().ref('/sensor/temperature').on('value', function(snapshot) {
            const val = snapshot.val();
            soilData.temperature = val;
            temperatureGauge.refresh(val);
        });
        firebase.database().ref('/sensor/ph').on('value', function(snapshot) {
            const val = snapshot.val();
            soilData.ph = val;
            phGauge.refresh(val);
        });
        firebase.database().ref('/sensor/salinity').on('value', function(snapshot) {
            const val = snapshot.val();
            soilData.salinity = val;
            salinityGauge.refresh(val);
        });

        // Every 5 seconds, record the latest soil data to Firebase history if all values are present
        setInterval(() => {
            const { moisture, humidity, temperature, ph, salinity } = soilData;
            if (
                moisture !== null && humidity !== null && temperature !== null &&
                ph !== null && salinity !== null
            ) {
                const now = new Date();
                const entry = {
                    time: now.toLocaleString(),
                    moisture,
                    humidity,
                    temperature,
                    ph,
                    salinity
                };
                firebase.database().ref('/history/soil').push(entry);
            }
        }, 5000);
    } else {
        console.warn('Firebase not loaded: Soil gauges will not update.');
    }
}

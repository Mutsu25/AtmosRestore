// hydrologyGauges.js
// Handles all logic for Hydrology Gauges section (flooding duration, frequency, high tide, current velocity)
// Exports: initHydrologyGauges

/**
 * Initializes JustGage gauges for hydrology metrics and sets up Firebase listeners.
 * Always generates dummy data for demo purposes and records to Firebase history every 5 seconds.
 */
export function initHydrologyGauges() {
    // Hydrology data object for use by other modules
    window.hydrologyData = {
        floodingDuration: null,
        floodingFrequency: null,
        highTideDuration: null,
        currentVelocity: null
    };

    // Initialize JustGage instances for each hydrology metric
    const floodingDurationGauge = new JustGage({
        id: "floodingDurationGauge",
        value: 0,
        min: 0,
        max: 400,
        title: "Flooding Duration",
        label: "min/day",
        valueFontColor: "#ffffff",
        valueFontFamily: "Inter",
        gaugeWidthScale: 0.6,
        levelColors: ["#4caf50", "#f2ed23", "#ed1c24"]
    });
    const floodingFrequencyGauge = new JustGage({
        id: "floodingFrequencyGauge",
        value: 0,
        min: 0,
        max: 3,
        title: "Flooding Frequency",
        label: "per day",
        decimals: 2,
        valueFontColor: "#ffffff",
        valueFontFamily: "Inter",
        gaugeWidthScale: 0.6,
        levelColors: ["#4caf50", "#f2ed23", "#ed1c24"]
    });
    const highTideDurationGauge = new JustGage({
        id: "highTideDurationGauge",
        value: 0,
        min: 0,
        max: 300,
        title: "High Tide Duration",
        label: "min",
        valueFontColor: "#ffffff",
        valueFontFamily: "Inter",
        gaugeWidthScale: 0.6,
        levelColors: ["#4caf50", "#f2ed23", "#ed1c24"]
    });
    const currentVelocityGauge = new JustGage({
        id: "currentVelocityGauge",
        value: 0,
        min: 0.00,
        max: 1.00,
        title: "Current Velocity",
        label: "m/s",
        decimals: 2,
        valueFontColor: "#ffffff",
        valueFontFamily: "Inter",
        gaugeWidthScale: 0.6,
        levelColors: ["#4caf50", "#f2ed23", "#ed1c24"]
    });

    // Always use dummy data for hydrology (since sensor not built)
    setInterval(() => {
        window.hydrologyData.floodingDuration = parseFloat((Math.random() * 400).toFixed(2));
        window.hydrologyData.floodingFrequency = parseFloat((Math.random() * 3).toFixed(2));
        window.hydrologyData.highTideDuration = parseFloat((Math.random() * 300).toFixed(2));
        window.hydrologyData.currentVelocity = parseFloat((Math.random() * 0.99 + 0.01).toFixed(2));
        floodingDurationGauge.refresh(window.hydrologyData.floodingDuration);
        floodingFrequencyGauge.refresh(window.hydrologyData.floodingFrequency);
        highTideDurationGauge.refresh(window.hydrologyData.highTideDuration);
        currentVelocityGauge.refresh(window.hydrologyData.currentVelocity);
        // Record to Firebase hydrology history every 5 seconds
        if (window.firebase && window.firebase.database) {
            const now = new Date();
            const entry = {
                time: now.toLocaleString(),
                floodingDuration: window.hydrologyData.floodingDuration,
                floodingFrequency: window.hydrologyData.floodingFrequency,
                highTideDuration: window.hydrologyData.highTideDuration,
                currentVelocity: window.hydrologyData.currentVelocity
            };
            firebase.database().ref('/history/water').push(entry);
        }
    }, 5000);
}

const labels = [];
const moistureData = [];
const temperatureData = [];
const phData = [];
const salinityData = [];
const floodingDurationData = [];
const floodingFrequencyData = [];
const highTideDurationData = [];
const currentVelocityData = [];


//#384e40 Color

// Added new metrics: floodingDuration, floodingFrequency, highTideDuration, currentVelocity
const soilData = {
    moisture: null,
    humidity: null, // Add humidity to soilData
    temperature: null,
    ph: null,
    salinity: null,
    floodingDuration: null, // in minutes per day
    floodingFrequency: null, // per day
    highTideDuration: null, // in minutes
    currentVelocity: null, // in m/s
    history: [
        { time: 'Starting', moisture: 0, humidity: 0, temperature: 0, ph: 0, salinity: 0,
          floodingDuration: 0, floodingFrequency: 0, highTideDuration: 0, currentVelocity: 0 },
    ]
};

// Gauge configuration helper to reduce repetition
function createGauge({id, value, min, max, title, label, decimals = 0, levelColors}) {
    return new JustGage({
        id,
        value,
        min,
        max,
        title,
        label,
        decimals,
        valueFontColor: "#ffffff",
        valueFontFamily: "Inter",
        gaugeWidthScale: 0.6,
        levelColors
    });
}

const moistureGauge = createGauge({
    id: "moistureGauge",
    value: soilData.moisture,
    min: 0,
    max: 100,
    title: "Moisture",
    label: "%",
    levelColors: ["#ed1c24", "#f2ed23", "#4caf50"]
});

const humidityGauge = createGauge({
    id: "humidityGauge",
    value: soilData.humidity,
    min: 0,
    max: 100,
    title: "Humidity",
    label: "%",
    levelColors: ["#b2dfdb", "#4dd0e1", "#0097a7"]
});


const temperatureGauge = createGauge({
    id: "temperatureGauge",
    value: soilData.temperature,
    min: 0,
    max: 50,
    title: "Temperature",
    label: "°C",
    levelColors: ["#4caf50", "#f2ed23", "#ed1c24"]
});
const phGauge = createGauge({
    id: "phGauge",
    value: soilData.ph,
    min: 0,
    max: 14,
    decimals:2,
    title: "pH Level",
    label: "pH",
    levelColors: ["#ed1c24", "#f2ed23", "#4caf50"]
});
const salinityGauge = createGauge({
    id: "salinityGauge",
    value: soilData.salinity,
    min: 0,
    max: 50,
    decimals: 2,
    title: "Salinity",
    label: "ppt",
    levelColors: ["#a0522d", "#deb887", "#4caf50"]
});
const floodingDurationGauge = createGauge({
    id: "floodingDurationGauge",
    value: soilData.floodingDuration,
    min: 0,
    max: 400,
    title: "Flooding Duration",
    label: "min/day",
    levelColors: ["#4caf50", "#f2ed23", "#ed1c24"]
});
const floodingFrequencyGauge = createGauge({
    id: "floodingFrequencyGauge",
    value: soilData.floodingFrequency,
    min: 0,
    max: 3,
    title: "Flooding Frequency",
    label: "per day",
    decimals: 2,
    levelColors: ["#4caf50", "#f2ed23", "#ed1c24"]
});
const highTideDurationGauge = createGauge({
    id: "highTideDurationGauge",
    value: soilData.highTideDuration,
    min: 0,
    max: 300,
    title: "High Tide Duration",
    label: "min",
    levelColors: ["#4caf50", "#f2ed23", "#ed1c24"]
});
const currentVelocityGauge = createGauge({
    id: "currentVelocityGauge",
    value: soilData.currentVelocity,
    min: 0.00,
    max: 1.00,
    title: "Current Velocity",
    label: "m/s",
    decimals: 2,
    levelColors: ["#4caf50", "#f2ed23", "#ed1c24"]
});


// =====================
// Chart Update Helper
// =====================
function updateChart(chart, value) {
    const currentTime = new Date().toLocaleTimeString();
    chart.data.labels.push(currentTime);
    chart.data.datasets[0].data.push(value);
    if (chart.data.labels.length > 20) {
        chart.data.labels.shift();
        chart.data.datasets[0].data.shift();
    }
    chart.update();
}

// =====================
// Chart Initializations
// =====================
var humidityChartCtx = document.getElementById('humidityChart').getContext('2d');
var humidityChart = new Chart(humidityChartCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Humidity (%)',
            data: [],
            borderColor: '#0097a7',
            fill: true,
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: true },
            title: { display: false }
        },
        scales: {
            y: { beginAtZero: true, max: 100 }
        }
    }
});

var moistureChartCtx = document.getElementById('moistureChart').getContext('2d');
var moistureChart = new Chart(moistureChartCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Moisture (%)',
            data: [],
            borderColor: '#4caf50',
            fill: true,
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: true },
            title: { display: false }
        },
        scales: {
            y: { beginAtZero: true, max: 100 }
        }
    }
});

var temperatureChartCtx = document.getElementById('temperatureChart').getContext('2d');
var temperatureChart = new Chart(temperatureChartCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Temperature (°C)',
            data: [],
            borderColor: '#ffa726',
            fill: true,
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: true },
            title: { display: false }
        },
        scales: {
            y: { beginAtZero: true, max: 50 }
        }
    }
});

var phChartCtx = document.getElementById('phChart').getContext('2d');
var phChart = new Chart(phChartCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'pH Level',
            data: [],
            borderColor: '#3cba9f',
            fill: true,
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: true },
            title: { display: false }
        },
        scales: {
            y: { beginAtZero: false, suggestedMin: 0, suggestedMax: 14 }
        }
    }
});

var salinityChartCtx = document.getElementById('salinityChart').getContext('2d');
var salinityChart = new Chart(salinityChartCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Salinity (ppt)',
            data: [],
            borderColor: '#a0522d',
            fill: true,
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: true },
            title: { display: false }
        },
        scales: {
            y: { beginAtZero: true, suggestedMax: 50 }
        }
    }
});

// =====================
// Hydrology Chart Initializations (MUST be present for dummy data to update charts)
// =====================
var floodingDurationChartCtx = document.getElementById('floodingDurationChart').getContext('2d');
var floodingDurationChart = new Chart(floodingDurationChartCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Flooding Duration (min/day)',
            data: [],
            borderColor: '#1976d2',
            fill: true,
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: true },
            title: { display: false }
        },
        scales: {
            y: { beginAtZero: true, max: 400 }
        }
    }
});

var floodingFrequencyChartCtx = document.getElementById('floodingFrequencyChart').getContext('2d');
var floodingFrequencyChart = new Chart(floodingFrequencyChartCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Flooding Frequency (per day)',
            data: [],
            borderColor: '#388e3c',
            fill: true,
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: true },
            title: { display: false }
        },
        scales: {
            y: { beginAtZero: true, max: 3 }
        }
    }
});

var highTideDurationChartCtx = document.getElementById('highTideDurationChart').getContext('2d');
var highTideDurationChart = new Chart(highTideDurationChartCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'High Tide Duration (min)',
            data: [],
            borderColor: '#fbc02d',
            fill: true,
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: true },
            title: { display: false }
        },
        scales: {
            y: { beginAtZero: true, max: 300 }
        }
    }
});

var currentVelocityChartCtx = document.getElementById('currentVelocityChart').getContext('2d');
var currentVelocityChart = new Chart(currentVelocityChartCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Current Velocity (m/s)',
            data: [],
            borderColor: '#0288d1',
            fill: true,
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: true },
            title: { display: false }
        },
        scales: {
            y: { beginAtZero: true, max: 1 }
        }
    }
});

// =====================
// Firebase Listeners (Charts & Gauges)
// =====================
document.addEventListener('DOMContentLoaded', function() {
    // Fetch latest soil measurement history from Firebase on page load
    function fetchLastSoilHistoryFromFirebase() {
        const soilHistoryTable = document.getElementById('historyTableSoil');
        if (!soilHistoryTable) return;
        const soilHistoryTableBody = soilHistoryTable.getElementsByTagName('tbody')[0];
        if (!soilHistoryTableBody) return;
        // Clear table
        soilHistoryTableBody.innerHTML = '';
        // Fetch last 25 soil history entries from Firebase
        firebase.database().ref('/history/soil').limitToLast(25).once('value', function(snapshot) {
            const data = snapshot.val();
            if (!data) return;
            const entries = Object.values(data);
            entries.forEach(entry => {
                const row = soilHistoryTableBody.insertRow();                row.innerHTML = `
                    <td>${entry.time || ''}</td>
                    <td>${entry.moisture || 0}</td>
                    <td>${entry.humidity || 0}</td>
                    <td>${entry.temperature || 0}</td>
                    <td>${entry.ph || 0}</td>
                    <td>${(entry.salinity || 0).toFixed(2)}</td>`;
            });
            // Update soil measurement charts with fetched data
            moistureChart.data.labels = entries.map(e => e.time || '');
            moistureChart.data.datasets[0].data = entries.map(e => e.moisture || 0);
            moistureChart.update();
            
            humidityChart.data.labels = entries.map(e => e.time || '');
            humidityChart.data.datasets[0].data = entries.map(e => e.humidity || 0);
            humidityChart.update();
            
            temperatureChart.data.labels = entries.map(e => e.time || '');
            temperatureChart.data.datasets[0].data = entries.map(e => e.temperature || 0);
            temperatureChart.update();
            
            phChart.data.labels = entries.map(e => e.time || '');
            phChart.data.datasets[0].data = entries.map(e => e.ph || 0);
            phChart.update();
            
            salinityChart.data.labels = entries.map(e => e.time || '');
            salinityChart.data.datasets[0].data = entries.map(e => e.salinity || 0);
            salinityChart.update();

            // Update soil data with latest values
            if (entries.length > 0) {
                const lastEntry = entries[entries.length - 1];
                soilData.moisture = lastEntry.moisture || soilData.moisture;
                soilData.humidity = lastEntry.humidity || soilData.humidity;
                soilData.temperature = lastEntry.temperature || soilData.temperature;
                soilData.ph = lastEntry.ph || soilData.ph;
                soilData.salinity = lastEntry.salinity || soilData.salinity;
                
                // Update gauges with latest values
                moistureGauge.refresh(soilData.moisture);
                humidityGauge.refresh(soilData.humidity);
                temperatureGauge.refresh(soilData.temperature);
                phGauge.refresh(soilData.ph);
                salinityGauge.refresh(soilData.salinity);

                // Update last updated timestamp
                const lastUpdated = document.getElementById('lastUpdated');
                if (lastUpdated && lastEntry.time) {
                    lastUpdated.textContent = lastEntry.time;
                }
            }
        });
    }

    // Humidity
    firebase.database().ref('/sensor/humidity').on('value', function(snapshot) {
        const value = snapshot.val();
        if (typeof value === 'number') {
            soilData.humidity = value;
            humidityGauge.refresh(value);
            updateChart(humidityChart, value);
        }
    });
    // Moisture
    firebase.database().ref('/sensor/moisture').on('value', function(snapshot) {
        const value = snapshot.val();
        if (typeof value === 'number') {
            soilData.moisture = value;
            moistureGauge.refresh(value);
            updateChart(moistureChart, value);
        }
    });
    // Temperature
    firebase.database().ref('/sensor/temperature').on('value', function(snapshot) {
        const value = snapshot.val();
        if (typeof value === 'number') {
            soilData.temperature = value;
            temperatureGauge.refresh(value);
            updateChart(temperatureChart, value);
        }
    });
    // pH
    firebase.database().ref('/sensor/ph').on('value', function(snapshot) {
        const value = snapshot.val();
        if (typeof value === 'number') {
            soilData.ph = value;
            phGauge.refresh(value);
            updateChart(phChart, value);
        }
    });
    // Salinity
    firebase.database().ref('/sensor/salinity').on('value', function(snapshot) {
        const value = snapshot.val();
        if (typeof value === 'number') {
            soilData.salinity = value;
            salinityGauge.refresh(value);
            updateChart(salinityChart, value);
        }
    });
    // Moisture Firebase listener
    firebase.database().ref('/sensor/moisture').on('value', function(snapshot) {
        const value = snapshot.val();
        if (typeof value === 'number') {
            soilData.moisture = value;
            moistureGauge.refresh(value);
            const currentTime = new Date().toLocaleTimeString();
            moistureChart.data.labels.push(currentTime);
            moistureChart.data.datasets[0].data.push(value);
            if (moistureChart.data.labels.length > 20) {
                moistureChart.data.labels.shift();
                moistureChart.data.datasets[0].data.shift();
            }
            moistureChart.update();
        }
    });

    // Temperature Firebase listener
    firebase.database().ref('/sensor/temperature').on('value', function(snapshot) {
        const value = snapshot.val();
        if (typeof value === 'number') {
            soilData.temperature = value;
            temperatureGauge.refresh(value);
            const currentTime = new Date().toLocaleTimeString();
            temperatureChart.data.labels.push(currentTime);
            temperatureChart.data.datasets[0].data.push(value);
            if (temperatureChart.data.labels.length > 20) {
                temperatureChart.data.labels.shift();
                temperatureChart.data.datasets[0].data.shift();
            }
            temperatureChart.update();
        }
    });

    // pH Firebase listener
    firebase.database().ref('/sensor/ph').on('value', function(snapshot) {
        const value = snapshot.val();
        if (typeof value === 'number') {
            soilData.ph = value;
            phGauge.refresh(value);
            const currentTime = new Date().toLocaleTimeString();
            phChart.data.labels.push(currentTime);
            phChart.data.datasets[0].data.push(value);
            if (phChart.data.labels.length > 20) {
                phChart.data.labels.shift();
                phChart.data.datasets[0].data.shift();
            }
            phChart.update();
        }
    });

    // Salinity Firebase listener
    firebase.database().ref('/sensor/salinity').on('value', function(snapshot) {
        const value = snapshot.val();
        if (typeof value === 'number') {
            soilData.salinity = value;
            salinityGauge.refresh(value);
            const currentTime = new Date().toLocaleTimeString();
            salinityChart.data.labels.push(currentTime);
            salinityChart.data.datasets[0].data.push(value);
            if (salinityChart.data.labels.length > 20) {
                salinityChart.data.labels.shift();
                salinityChart.data.datasets[0].data.shift();
            }
            salinityChart.update();
        }
    });

    // Chart dropdown logic
    const chartSelect = document.getElementById('chartSelect');
    const chartCards = [
        'moistureChartCard',
        'humidityChartCard',
        'temperatureChartCard',
        'phChartCard',
        'salinityChartCard',
        'floodingDurationChartCard',
        'floodingFrequencyChartCard',
        'highTideDurationChartCard',
        'currentVelocityChartCard'
    ];
    chartSelect.addEventListener('change', function() {
        chartCards.forEach(id => {
            document.getElementById(id).style.display = (id === this.value) ? '' : 'none';
        });
    });
    // Show only the first chart by default
    chartCards.forEach((id, idx) => {
        document.getElementById(id).style.display = idx === 0 ? '' : 'none';
    });

    // --- Wrap all update functions in a single function ---
    function updateAllReadings() {
        // Update gauges
        if (typeof updateGauges === 'function') updateGauges();
        // Update charts
        if (typeof updateCharts === 'function') updateCharts();
        // Update full soil history (if present)
        if (typeof fetchAndRenderFullSoilHistory === 'function') fetchAndRenderFullSoilHistory();
        // Update soil history table and Firebase
        updateSoilHistoryTableAndFirebase();
    }

    // Initial call
    updateAllReadings();
    // Update every 5 seconds
    setInterval(updateAllReadings, 5000);

    // Initial fetch of histories from Firebase (only once on page load)
    fetchLastSoilHistoryFromFirebase();
    if (typeof fetchLastWaterHistoryFromFirebase === 'function') {
        fetchLastWaterHistoryFromFirebase();
    }

    // Fetch latest water/tide history from Firebase on page load
    if (typeof fetchLastWaterHistoryFromFirebase === 'function') {
        fetchLastWaterHistoryFromFirebase();
    } else {
        // Fallback: implement fetchLastWaterHistoryFromFirebase inline if not defined
        function fetchLastWaterHistoryFromFirebase() {
            const waterHistoryTable = document.getElementById('historyTableWater');
            if (!waterHistoryTable) return;
            const waterHistoryTableBody = waterHistoryTable.getElementsByTagName('tbody')[0];
            if (!waterHistoryTableBody) return;
            // Clear table
            waterHistoryTableBody.innerHTML = '';
            // Fetch last 25 water/tide history entries from Firebase
            firebase.database().ref('/history/water').limitToLast(25).once('value', function(snapshot) {
                const data = snapshot.val();
                if (!data) return;
                // Sort by time if possible (Firebase returns as object)
                const entries = Object.values(data);
                // Optionally sort by time if needed (assuming time is a string, so keep as is)
                entries.forEach(entry => {
                    const row = waterHistoryTableBody.insertRow();
                    row.innerHTML = `
                        <td>${entry.time || ''}</td>
                        <td>${entry.floodingDuration || 0}</td>
                        <td>${entry.floodingFrequency || 0}</td>
                        <td>${entry.highTideDuration || 0}</td>
                        <td>${entry.currentVelocity || 0}</td>`;
                });
                // Update hydrology charts with fetched data
                floodingDurationChart.data.labels = entries.map(e => e.time || '');
                floodingDurationChart.data.datasets[0].data = entries.map(e => e.floodingDuration || 0);
                floodingDurationChart.update();
                floodingFrequencyChart.data.labels = entries.map(e => e.time || '');
                floodingFrequencyChart.data.datasets[0].data = entries.map(e => e.floodingFrequency || 0);
                floodingFrequencyChart.update();
                highTideDurationChart.data.labels = entries.map(e => e.time || '');
                highTideDurationChart.data.datasets[0].data = entries.map(e => e.highTideDuration || 0);
                highTideDurationChart.update();
                currentVelocityChart.data.labels = entries.map(e => e.time || '');
                currentVelocityChart.data.datasets[0].data = entries.map(e => e.currentVelocity || 0);
                currentVelocityChart.update();
                // Set last updated time to the most recent entry's time
                if (entries.length > 0) {
                    const lastEntry = entries[entries.length - 1];
                    const lastUpdated = document.getElementById('lastUpdated');
                    if (lastUpdated && lastEntry.time) {
                        lastUpdated.textContent = lastEntry.time;
                    }
                }
            });
        }
        fetchLastWaterHistoryFromFirebase();
    }

});

// =====================
// DUMMY DATA FOR HYDROLOGY METRICS (until real sensors are available)
// =====================
function updateHydrologyDummyData() {
    // Generate dummy data for hydrology metrics only
    soilData.floodingDuration = parseFloat((Math.random() * 400).toFixed(2));
    soilData.floodingFrequency = parseFloat((Math.random() * 3).toFixed(2));
    soilData.highTideDuration = parseFloat((Math.random() * 300).toFixed(2));
    soilData.currentVelocity = parseFloat((Math.random() * 0.99 + 0.01).toFixed(2));

    // Update hydrology gauges with new dummy values
    floodingDurationGauge.refresh(soilData.floodingDuration);
    floodingFrequencyGauge.refresh(soilData.floodingFrequency);
    highTideDurationGauge.refresh(soilData.highTideDuration);
    currentVelocityGauge.refresh(soilData.currentVelocity);

    // Defensive: check if charts exist before updating
    if (typeof floodingDurationChart !== 'undefined' && floodingDurationChart.data) {
        const currentTime = new Date().toLocaleTimeString();
        floodingDurationChart.data.labels.push(currentTime);
        floodingDurationChart.data.datasets[0].data.push(soilData.floodingDuration);
        if (floodingDurationChart.data.labels.length > 20) {
            floodingDurationChart.data.labels.shift();
            floodingDurationChart.data.datasets[0].data.shift();
        }
        floodingDurationChart.update();
    }
    if (typeof floodingFrequencyChart !== 'undefined' && floodingFrequencyChart.data) {
        const currentTime = new Date().toLocaleTimeString();
        floodingFrequencyChart.data.labels.push(currentTime);
        floodingFrequencyChart.data.datasets[0].data.push(soilData.floodingFrequency);
        if (floodingFrequencyChart.data.labels.length > 20) {
            floodingFrequencyChart.data.labels.shift();
            floodingFrequencyChart.data.datasets[0].data.shift();
        }
        floodingFrequencyChart.update();
    }
    if (typeof highTideDurationChart !== 'undefined' && highTideDurationChart.data) {
        const currentTime = new Date().toLocaleTimeString();
        highTideDurationChart.data.labels.push(currentTime);
        highTideDurationChart.data.datasets[0].data.push(soilData.highTideDuration);
        if (highTideDurationChart.data.labels.length > 20) {
            highTideDurationChart.data.labels.shift();
            highTideDurationChart.data.datasets[0].data.shift();
        }
        highTideDurationChart.update();
    }
    if (typeof currentVelocityChart !== 'undefined' && currentVelocityChart.data) {
        const currentTime = new Date().toLocaleTimeString();
        currentVelocityChart.data.labels.push(currentTime);
        currentVelocityChart.data.datasets[0].data.push(soilData.currentVelocity);
        if (currentVelocityChart.data.labels.length > 20) {
            currentVelocityChart.data.labels.shift();
            currentVelocityChart.data.datasets[0].data.shift();
        }
        currentVelocityChart.update();
    }

    // Append a new row to the water & tide history table with dummy hydrology data
    const waterHistoryTable = document.getElementById('historyTableWater');
    if (waterHistoryTable) {
        const waterHistoryTableBody = waterHistoryTable.getElementsByTagName('tbody')[0];
        if (waterHistoryTableBody) {
            const newWaterHistoryRow = waterHistoryTableBody.insertRow();
            newWaterHistoryRow.innerHTML = `
                <td>${new Date().toLocaleTimeString()}</td>
                <td>${soilData.floodingDuration}</td>
                <td>${soilData.floodingFrequency}</td>
                <td>${soilData.highTideDuration}</td>
                <td>${soilData.currentVelocity}</td>`;
            // Limit water & tide history table rows to last 25 entries
            while (waterHistoryTableBody.rows.length > 25) {
                waterHistoryTableBody.deleteRow(0);
            }
        }
    }

    // Save to Firebase
    firebase.database().ref('/history/water').push({
        time: new Date().toLocaleTimeString(),
        floodingDuration: soilData.floodingDuration,
        floodingFrequency: soilData.floodingFrequency,
        highTideDuration: soilData.highTideDuration,
        currentVelocity: soilData.currentVelocity
    });

    // Update last updated timestamp
    const lastUpdated = document.getElementById('lastUpdated');
    if (lastUpdated) lastUpdated.textContent = new Date().toLocaleTimeString();
}

// Set interval to update hydrology charts and water/tide history table every 5 seconds
setInterval(updateHydrologyDummyData, 5000);

function populateInitialHistory() {
    const soilHistoryTableBody = document.getElementById('historyTableSoil').getElementsByTagName('tbody')[0];
    const waterHistoryTableBody = document.getElementById('historyTableWater').getElementsByTagName('tbody')[0];

    // Clear existing rows
    soilHistoryTableBody.innerHTML = '';
    waterHistoryTableBody.innerHTML = '';

    // Populate initial soil history data
    soilData.history.forEach(entry => {        const soilRow = soilHistoryTableBody.insertRow();
        soilRow.innerHTML = `
            <td>${entry.time}</td>
            <td>${entry.moisture}</td>
            <td>${entry.humidity}</td>
            <td>${entry.temperature}</td>
            <td>${entry.ph}</td>
            <td>${(entry.salinity || 0).toFixed(2)}</td>
        `;
    });

    // Populate initial water & tide history data
    soilData.history.forEach(entry => {
        const waterRow = waterHistoryTableBody.insertRow();
        waterRow.innerHTML = `
            <td>${entry.time}</td>
            <td>${entry.floodingDuration || 0}</td>
            <td>${entry.floodingFrequency || 0}</td>
            <td>${entry.highTideDuration || 0}</td>
            <td>${entry.currentVelocity || 0}</td>
        `;
    });

    // Initialize chart data with history
    moistureChart.data.labels = soilData.history.map(d => d.time);
    moistureChart.data.datasets[0].data = soilData.history.map(d => d.moisture);

    temperatureChart.data.labels = soilData.history.map(d => d.time);
    temperatureChart.data.datasets[0].data = soilData.history.map(d => d.temperature);

    phChart.data.labels = soilData.history.map(d => d.time);
    phChart.data.datasets[0].data = soilData.history.map(d => d.ph);

    salinityChart.data.labels = soilData.history.map(d => d.time);
    salinityChart.data.datasets[0].data = soilData.history.map(d => d.salinity);

    floodingDurationChart.data.labels = soilData.history.map(d => d.time);
    floodingDurationChart.data.datasets[0].data = soilData.history.map(d => d.floodingDuration || 0);

    floodingFrequencyChart.data.labels = soilData.history.map(d => d.time);
    floodingFrequencyChart.data.datasets[0].data = soilData.history.map(d => d.floodingFrequency || 0);

    highTideDurationChart.data.labels = soilData.history.map(d => d.time);
    highTideDurationChart.data.datasets[0].data = soilData.history.map(d => d.highTideDuration || 0);

    currentVelocityChart.data.labels = soilData.history.map(d => d.time);
    currentVelocityChart.data.datasets[0].data = soilData.history.map(d => d.currentVelocity || 0);

    // Update all charts
    moistureChart.update();
    temperatureChart.update();
    phChart.update();
    salinityChart.update();
    floodingDurationChart.update();
    floodingFrequencyChart.update();
    highTideDurationChart.update();
    currentVelocityChart.update();
}

// No changes needed for gauge, chart, or history logic. All DOM elements retain their IDs and are simply shown/hidden by navigation. No code changes required for this separation.

// Helper for random int
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.getElementById('exportSoilHistoryCSV').addEventListener('click', function() {
    exportTableToCSV('historyTableSoil', 'soil_metrics_history.csv');
});
document.getElementById('exportWaterHistoryCSV').addEventListener('click', function() {
    exportTableToCSV('historyTableWater', 'water_tide_metrics_history.csv');
});

function exportTableToCSV(tableId, filename) {
    const table = document.getElementById(tableId);
    let csv = [];
    for (let row of table.rows) {
        let rowData = [];
        for (let cell of row.cells) {
            let text = cell.innerText.replace(/"/g, '""');
            rowData.push(`"${text}"`);
        }
        csv.push(rowData.join(','));
    }
    const csvContent = csv.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// --- AGGREGATE SOIL HISTORY UPDATE EVERY 5 SECONDS ---
let lastSoilHistoryUpdate = 0;
function updateSoilHistoryTableAndFirebase() {    // Don't update if we're still using the initial null values
    if (soilData.moisture === null || 
        soilData.humidity === null || 
        soilData.temperature === null || 
        soilData.ph === null || 
        soilData.salinity === null) {
        return;
    }

    const currentTime = new Date().toLocaleTimeString();

    // Store history in Firebase
    firebase.database().ref('/history/soil').push({
        time: currentTime,
        moisture: soilData.moisture,
        humidity: soilData.humidity,
        temperature: soilData.temperature,
        ph: soilData.ph,
        salinity: soilData.salinity
    });

    // Update last updated timestamp
    document.getElementById('lastUpdated').textContent = currentTime;

    // Only do a local update to the table to prevent unnecessary refreshes
    const soilHistoryTableBody = document.getElementById('historyTableSoil').getElementsByTagName('tbody')[0];
    if (soilHistoryTableBody) {
        const newSoilHistoryRow = soilHistoryTableBody.insertRow();        newSoilHistoryRow.innerHTML = `
            <td>${currentTime}</td>
            <td>${soilData.moisture}</td>
            <td>${soilData.humidity}</td>
            <td>${soilData.temperature}</td>
            <td>${soilData.ph}</td>
            <td>${(soilData.salinity || 0).toFixed(2)}</td>`;
        while (soilHistoryTableBody.rows.length > 25) {
            soilHistoryTableBody.deleteRow(0);
        }
    }
}


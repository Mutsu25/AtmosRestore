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
    moisture: 40,
    humidity: 70, // Add humidity to soilData
    temperature: 25,
    ph: 6.5,
    salinity: 1.2,
    floodingDuration: 300, // in minutes per day
    floodingFrequency: 1.2, // per day
    highTideDuration: 220, // in minutes
    currentVelocity: 0.11, // in m/s
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
    value: getRandomInt(60, 80),
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



setInterval(function() {
    humidityGauge.refresh(getRandomInt(60, 80));
}, 2000);

// Dummy data for humidity chart
var humidityChartCtx = document.getElementById('humidityChart').getContext('2d');
var humidityChart = new Chart(humidityChartCtx, {
    type: 'line',
    data: {
        labels: ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00"],
        datasets: [{
            label: 'Humidity (%)',
            data: [60, 62, 65, 67, 66, 68, 65],
            borderColor: '#0097a7',
            // backgroundColor: 'rgb(250, 250, 250)',
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

const moistureCtx = document.getElementById('moistureChart').getContext('2d');
const temperatureCtx = document.getElementById('temperatureChart').getContext('2d');
const phCtx = document.getElementById('phChart').getContext('2d');
const salinityCtx = document.getElementById('salinityChart').getContext('2d');
const floodingDurationCtx = document.getElementById('floodingDurationChart').getContext('2d');
const floodingFrequencyCtx = document.getElementById('floodingFrequencyChart').getContext('2d');
const highTideDurationCtx = document.getElementById('highTideDurationChart').getContext('2d');
const currentVelocityCtx = document.getElementById('currentVelocityChart').getContext('2d');
const moistureChart = new Chart(moistureCtx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Moisture (%)',
            data: moistureData,
            borderColor: '#4caf50',
            borderWidth: 2,
            fill: true
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {//
                }
            },
            x: {
                ticks: {//
                }
            }
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {//
                }
            }
        }
    }
});

const temperatureChart = new Chart(temperatureCtx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Temperature (°C)',
            data: temperatureData,
            borderColor: '#ffa726',
            borderWidth: 2,
            tension: 0.4,
            fill: true
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {//
                }
            },
            x: {
                ticks: {//
                }
            }
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {//
                }
            }
        }
    }
});

const phChart = new Chart(phCtx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'pH Level',
            data: phData,
            borderColor: '#3cba9f',
            borderWidth: 2,
            tension: 0.4,
            fill: true
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: false,
                suggestedMin: 0,
                suggestedMax: 14,
                ticks: {//
                }
            },
            x: {
                ticks: {//
                }
            }
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {//
                }
            }
        }
    }
});

const salinityChart = new Chart(salinityCtx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Salinity (ppt)',
            data: salinityData,
            borderColor: '#a0522d',
            borderWidth: 2,
            tension: 0.4,
            fill: true
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                suggestedMax: 50,
                ticks: {//
                }
            },
            x: {
                ticks: {//
                }
            }
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {//
                }
            }
        }
    }
});


const floodingDurationChart = new Chart(floodingDurationCtx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Flooding Duration (min/day)',
            data: floodingDurationData,
            borderColor: '#4caf50',
            borderWidth: 2,
            tension: 0.4,
            fill: true
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                suggestedMax: 400,
                ticks: {//
                }
            },
            x: {
                ticks: {//
                }
            }
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {//
                }
            }
        }
    }
});

const floodingFrequencyChart = new Chart(floodingFrequencyCtx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Flooding Frequency (per day)',
            data: floodingFrequencyData,
            borderColor: '#4caf50',
            borderWidth: 2,
            tension: 0.4,
            fill: true
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                suggestedMax: 3,
                ticks: {//
                }
            },
            x: {
                ticks: {//
                }
            }
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {//
                }
            }
        }
    }
});

const highTideDurationChart = new Chart(highTideDurationCtx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'High Tide Duration (min)',
            data: highTideDurationData,
            borderColor: '#4caf50',
            borderWidth: 2,
            tension: 0.4,
            fill: true
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                suggestedMax: 300,
                ticks: {//
                }
            },
            x: {
                ticks: {//
                }
            }
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {//
                }
            }
        }
    }
});

const currentVelocityChart = new Chart(currentVelocityCtx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Current Velocity (m/s)',
            data: currentVelocityData,
            decimals: 2,
            borderColor: '#4caf50',
            borderWidth: 2,
            tension: 0.4,
            fill: true
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                suggestedMax: 0.2,
                ticks: {//
                }
            },
            x: {
                ticks: {//
                }
            }
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {//
                }
            }
        }
    }
});

// === Optimal Species Metrics Card Logic ===
const speciesOptimalMetrics = {
    'Rhizophora mucronata': {
        moisture: '60-80%',
        humidity: '70-90%',
        temperature: '25-32°C',
        ph: '5.5-7.5',
        salinity: '5-25 ppt'
    },
    'Rhizophora apiculata': {
        moisture: '60-80%',
        humidity: '70-90%',
        temperature: '25-32°C',
        ph: '5.5-7.5',
        salinity: '5-25 ppt'
    },
    'Rhizophora stylosa': {
        moisture: '60-80%',
        humidity: '70-90%',
        temperature: '25-32°C',
        ph: '5.5-7.5',
        salinity: '5-25 ppt'
    },
    'Avicennia marina': {
        moisture: '50-70%',
        humidity: '60-85%',
        temperature: '20-35°C',
        ph: '6.0-8.0',
        salinity: '10-35 ppt'
    },
    'Bruguiera gymnnorhiza': {
        moisture: '60-80%',
        humidity: '70-90%',
        temperature: '25-32°C',
        ph: '5.5-7.5',
        salinity: '5-25 ppt'
    }
};

function updateSpeciesMetricsCard() {
    const select = document.getElementById('speciesSelect');
    const metricsDiv = document.getElementById('speciesMetricsDisplay');
    const selected = select.value;
    const metrics = speciesOptimalMetrics[selected];
    if (metrics) {
        metricsDiv.innerHTML = `
            <table class="species-metrics-table">
                <tr><th>Moisture</th><td>${metrics.moisture}</td></tr>
                <tr><th>Humidity</th><td>${metrics.humidity}</td></tr>
                <tr><th>Temperature</th><td>${metrics.temperature}</td></tr>
                <tr><th>pH</th><td>${metrics.ph}</td></tr>
                <tr><th>Salinity</th><td>${metrics.salinity}</td></tr>
            </table>
        `;
    } else {
        metricsDiv.innerHTML = '<em>Select a species to view optimal metrics.</em>';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Listen for live humidity updates (dummy for now)
    setInterval(function() {
        const humidityValue = getRandomInt(60, 80);
        soilData.humidity = humidityValue;
        humidityGauge.refresh(humidityValue);
        const currentTime = new Date().toLocaleTimeString();
        // Update humidity chart
        humidityChart.data.labels.push(currentTime);
        humidityChart.data.datasets[0].data.push(humidityValue);
        if (humidityChart.data.labels.length > 20) {
            humidityChart.data.labels.shift();
            humidityChart.data.datasets[0].data.shift();
        }
        humidityChart.update();
    }, 2000);

    // Listen for live moisture updates
    firebase.database().ref('/sensor/humidity').on('value', function(snapshot) {
        const value = snapshot.val();
        console.log('Firebase /sensor/humidity value:', value); // Debug log
        if (typeof value === 'number') {
            soilData.moisture = value;
            moistureGauge.refresh(value);
            const currentTime = new Date().toLocaleTimeString();
            // Update chart
            moistureChart.data.labels.push(currentTime);
            moistureChart.data.datasets[0].data.push(value);
            if (moistureChart.data.labels.length > 20) {
                moistureChart.data.labels.shift();
                moistureChart.data.datasets[0].data.shift();
            }
            moistureChart.update();
            // Update soil history table
            const soilHistoryTableBody = document.getElementById('historyTableSoil').getElementsByTagName('tbody')[0];
            const newSoilHistoryRow = soilHistoryTableBody.insertRow();
            newSoilHistoryRow.innerHTML = `
                <td>${currentTime}</td>
                <td>${soilData.moisture}</td>
                <td>${soilData.temperature}</td>
                <td>${soilData.ph}</td>
                <td>${soilData.salinity}</td>`;
            while (soilHistoryTableBody.rows.length > 10) {
                soilHistoryTableBody.deleteRow(0);
            }
            // Update last updated timestamp
            document.getElementById('lastUpdated').textContent = currentTime;
        }
    });
    // Listen for live temperature updates
    firebase.database().ref('/sensor/temperature').on('value', function(snapshot) {
        const value = snapshot.val();
        console.log('Firebase /sensor/temperature value:', value); // Debug log
        if (typeof value === 'number') {
            soilData.temperature = value;
            temperatureGauge.refresh(value);
            const currentTime = new Date().toLocaleTimeString();
            // Update chart
            temperatureChart.data.labels.push(currentTime);
            temperatureChart.data.datasets[0].data.push(value);
            if (temperatureChart.data.labels.length > 20) {
                temperatureChart.data.labels.shift();
                temperatureChart.data.datasets[0].data.shift();
            }
            temperatureChart.update();
            // Update soil history table
            const soilHistoryTableBody = document.getElementById('historyTableSoil').getElementsByTagName('tbody')[0];
            const newSoilHistoryRow = soilHistoryTableBody.insertRow();
            newSoilHistoryRow.innerHTML = `
                <td>${currentTime}</td>
                <td>${soilData.moisture}</td>
                <td>${soilData.temperature}</td>
                <td>${soilData.ph}</td>
                <td>${soilData.salinity}</td>`;
            while (soilHistoryTableBody.rows.length > 10) {
                soilHistoryTableBody.deleteRow(0);
            }
            // Update last updated timestamp
            document.getElementById('lastUpdated').textContent = currentTime;
        }
    });
    // Listen for live salinity updates
    firebase.database().ref('/sensor/salinity').on('value', function(snapshot) {
        const value = snapshot.val();
        console.log('Firebase /sensor/salinity value:', value); // Debug log
        if (typeof value === 'number') {
            soilData.salinity = value;
            salinityGauge.refresh(value);
            const currentTime = new Date().toLocaleTimeString();
            // Update chart
            salinityChart.data.labels.push(currentTime);
            salinityChart.data.datasets[0].data.push(value);
            if (salinityChart.data.labels.length > 20) {
                salinityChart.data.labels.shift();
                salinityChart.data.datasets[0].data.shift();
            }
            salinityChart.update();
            // Update soil history table
            const soilHistoryTableBody = document.getElementById('historyTableSoil').getElementsByTagName('tbody')[0];
            const newSoilHistoryRow = soilHistoryTableBody.insertRow();
            newSoilHistoryRow.innerHTML = `
                <td>${currentTime}</td>
                <td>${soilData.moisture}</td>
                <td>${soilData.temperature}</td>
                <td>${soilData.ph}</td>
                <td>${soilData.salinity}</td>`;
            while (soilHistoryTableBody.rows.length > 10) {
                soilHistoryTableBody.deleteRow(0);
            }
            // Update last updated timestamp
            document.getElementById('lastUpdated').textContent = currentTime;
        }
    });
    // Listen for live ph updates
    firebase.database().ref('/sensor/ph').on('value', function(snapshot) {
        const value = snapshot.val();
        console.log('Firebase /sensor/ph value:', value); // Debug log
        if (typeof value === 'number') {
            soilData.ph = value;
            phGauge.refresh(value);
            const currentTime = new Date().toLocaleTimeString();
            // Update chart
            phChart.data.labels.push(currentTime);
            phChart.data.datasets[0].data.push(value);
            if (phChart.data.labels.length > 20) {
                phChart.data.labels.shift();
                phChart.data.datasets[0].data.shift();
            }
            phChart.update();
            // Update soil history table
            const soilHistoryTableBody = document.getElementById('historyTableSoil').getElementsByTagName('tbody')[0];
            const newSoilHistoryRow = soilHistoryTableBody.insertRow();
            newSoilHistoryRow.innerHTML = `
                <td>${currentTime}</td>
                <td>${soilData.moisture}</td>
                <td>${soilData.temperature}</td>
                <td>${soilData.ph}</td>
                <td>${soilData.salinity}</td>`;
            while (soilHistoryTableBody.rows.length > 10) {
                soilHistoryTableBody.deleteRow(0);
            }
            // Update last updated timestamp
            document.getElementById('lastUpdated').textContent = currentTime;
        }
    });

    // Optimal species metrics card setup
    const speciesSelect = document.getElementById('speciesSelect');
    if (speciesSelect) {
        speciesSelect.addEventListener('change', updateSpeciesMetricsCard);
        updateSpeciesMetricsCard(); // Initialize on load
    }

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
});

function updateDashboard() {
    // Only update static/dummy data here
    soilData.floodingDuration = parseFloat((Math.random() * 400).toFixed(2));
    soilData.floodingFrequency = parseFloat((Math.random() * 3).toFixed(2));
    soilData.highTideDuration = parseFloat((Math.random() * 300).toFixed(2));
    soilData.currentVelocity = parseFloat((Math.random() * 0.99 + 0.01).toFixed(2));

    // Update gauges with new values
    floodingDurationGauge.refresh(soilData.floodingDuration);
    floodingFrequencyGauge.refresh(soilData.floodingFrequency);
    highTideDurationGauge.refresh(soilData.highTideDuration);
    currentVelocityGauge.refresh(soilData.currentVelocity);

    // Update chart datasets with new values (ONLY for static/dummy metrics)
    const currentTime = new Date().toLocaleTimeString();
    floodingDurationChart.data.labels.push(currentTime);
    floodingDurationChart.data.datasets[0].data.push(soilData.floodingDuration);
    if (floodingDurationChart.data.labels.length > 20) {
        floodingDurationChart.data.labels.shift();
        floodingDurationChart.data.datasets[0].data.shift();
    }

    floodingFrequencyChart.data.labels.push(currentTime);
    floodingFrequencyChart.data.datasets[0].data.push(soilData.floodingFrequency);
    if (floodingFrequencyChart.data.labels.length > 20) {
        floodingFrequencyChart.data.labels.shift();
        floodingFrequencyChart.data.datasets[0].data.shift();
    }

    highTideDurationChart.data.labels.push(currentTime);
    highTideDurationChart.data.datasets[0].data.push(soilData.highTideDuration);
    if (highTideDurationChart.data.labels.length > 20) {
        highTideDurationChart.data.labels.shift();
        highTideDurationChart.data.datasets[0].data.shift();
    }

    currentVelocityChart.data.labels.push(currentTime);
    currentVelocityChart.data.datasets[0].data.push(soilData.currentVelocity);
    if (currentVelocityChart.data.labels.length > 20) {
        currentVelocityChart.data.labels.shift();
        currentVelocityChart.data.datasets[0].data.shift();
    }


    // Append a new row to the soil history table (REMOVE moisture/temperature/salinity row here)
    // const soilHistoryTableBody = document.getElementById('historyTableSoil').getElementsByTagName('tbody')[0];
    // const newSoilHistoryRow = soilHistoryTableBody.insertRow();
    // newSoilHistoryRow.innerHTML = `
    //     <td>${currentTime}</td>
    //     <td>${soilData.moisture}</td>
    //     <td>${soilData.temperature}</td>
    //     <td>${soilData.ph}</td>
    //     <td>${soilData.salinity}</td>`;

    // Append a new row to the water & tide history table
    const waterHistoryTableBody = document.getElementById('historyTableWater').getElementsByTagName('tbody')[0];
    const newWaterHistoryRow = waterHistoryTableBody.insertRow();
    newWaterHistoryRow.innerHTML = `
        <td>${currentTime}</td>
        <td>${soilData.floodingDuration}</td>
        <td>${soilData.floodingFrequency}</td>
        <td>${soilData.highTideDuration}</td>
        <td>${soilData.currentVelocity}</td>`;

    // Limit water & tide history table rows to last 10 entries
    while (waterHistoryTableBody.rows.length > 10) {
        waterHistoryTableBody.deleteRow(0);
    }

    // Update charts
    phChart.update();
    salinityChart.update();
    floodingDurationChart.update();
    floodingFrequencyChart.update();
    highTideDurationChart.update();
    currentVelocityChart.update();

    // Update last updated timestamp
    document.getElementById('lastUpdated').textContent = currentTime;
}

// Set interval to update charts and data log every 3 seconds
setInterval(updateDashboard, 3000);

function populateInitialHistory() {
    const soilHistoryTableBody = document.getElementById('historyTableSoil').getElementsByTagName('tbody')[0];
    const waterHistoryTableBody = document.getElementById('historyTableWater').getElementsByTagName('tbody')[0];

    // Clear existing rows
    soilHistoryTableBody.innerHTML = '';
    waterHistoryTableBody.innerHTML = '';

    // Populate initial soil history data
    soilData.history.forEach(entry => {
        const soilRow = soilHistoryTableBody.insertRow();
        soilRow.innerHTML = `
            <td>${entry.time}</td>
            <td>${entry.moisture}</td>
            <td>${entry.temperature}</td>
            <td>${entry.ph}</td>
            <td>${entry.salinity}</td>
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

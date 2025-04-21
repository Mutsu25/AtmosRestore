const soilData = {
    moisture: 40,
    temperature: 25,
    ph: 6.5,
    salinity: 1.2,
    history: [
        { time: '10 AM', moisture: 40, temperature: 25, ph: 6.5, salinity: 1.2 },
        { time: '11 AM', moisture: 42, temperature: 26, ph: 6.4, salinity: 1.3 },
        { time: '12 PM', moisture: 38, temperature: 24, ph: 6.6, salinity: 1.1 }
    ]
};

// Initialize Gauges with Units
const moistureGauge = new JustGage({
    id: "moistureGauge",
    value: soilData.moisture,
    min: 0,
    max: 100,
    title: "Moisture",
    label: "%",
    gaugeWidthScale: 0.6,
    levelColors: ["#ed1c24", "#f2ed23", "#4caf50"]
});

const temperatureGauge = new JustGage({
    id: "temperatureGauge",
    value: soilData.temperature,
    min: -10,
    max: 50,
    title: "Temperature",
    label: "°C",
    gaugeWidthScale: 0.6,
    levelColors: ["#4caf50", "#f2ed23", "#ed1c24"]
});

const phGauge = new JustGage({
    id: "phGauge",
    value: soilData.ph,
    min: 0,
    max: 14,
    title: "pH Level",
    label: "pH",
    gaugeWidthScale: 0.6,
    levelColors: ["#ed1c24", "#f2ed23", "#4caf50"]
});

const salinityGauge = new JustGage({
    id: "salinityGauge",
    value: soilData.salinity,
    min: 0,
    max: 100,
    title: "Salinity",
    label: "ppt",
    gaugeWidthScale: 0.6,
    levelColors: ["#a0522d", "#deb887", "#4caf50"]
});

// Initialize Charts
const labels = soilData.history.map(data => data.time);
const moistureData = soilData.history.map(data => data.moisture);
const temperatureData = soilData.history.map(data => data.temperature);
const phData = soilData.history.map(data => data.ph);
const salinityData = soilData.history.map(data => data.salinity);

const moistureCtx = document.getElementById('moistureChart').getContext('2d');
const temperatureCtx = document.getElementById('temperatureChart').getContext('2d');
const phCtx = document.getElementById('phChart').getContext('2d');
const salinityCtx = document.getElementById('salinityChart').getContext('2d');

const moistureChart = new Chart(moistureCtx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Moisture (%)',
            data: moistureData,
            borderColor: '#4caf50',
            borderWidth: 2,
            fill: false
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
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
            fill: false
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
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
            fill: false
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: false,
                suggestedMin: 0,
                suggestedMax: 14
            }
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
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
            fill: false
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                suggestedMax: 50
            }
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            }
        }
    }
});

function updateDashboard() {
    // Simulate data updates
    soilData.moisture = Math.floor(Math.random() * 100);
    soilData.temperature = Math.floor(Math.random() * 60) - 10;
    soilData.ph = parseFloat((Math.random() * 14).toFixed(2));
    soilData.salinity = parseFloat((Math.random() * 50).toFixed(2));

    // Update gauges with new values
    moistureGauge.refresh(soilData.moisture);
    temperatureGauge.refresh(soilData.temperature);
    phGauge.refresh(soilData.ph);
    salinityGauge.refresh(soilData.salinity);

    const currentTime = new Date().toLocaleTimeString();

    // Update chart datasets with new values
    moistureChart.data.labels.push(currentTime);
    moistureChart.data.datasets[0].data.push(soilData.moisture);

    temperatureChart.data.labels.push(currentTime);
    temperatureChart.data.datasets[0].data.push(soilData.temperature);

    phChart.data.labels.push(currentTime);
    phChart.data.datasets[0].data.push(soilData.ph);

    salinityChart.data.labels.push(currentTime);
    salinityChart.data.datasets[0].data.push(soilData.salinity);

    // Append a new row to the data log table
    const tableBody = document.getElementById('dataLog').getElementsByTagName('tbody')[0];
    const newRow = tableBody.insertRow();
    newRow.innerHTML = `
        <td>${currentTime}</td>
        <td>${soilData.moisture}</td>
        <td>${soilData.temperature}</td>
        <td>${soilData.ph}</td>
        <td>${soilData.salinity}</td>`;

    // Append a new row to the history table
    const historyTableBody = document.getElementById('historyTable').getElementsByTagName('tbody')[0];
    const newHistoryRow = historyTableBody.insertRow();
    newHistoryRow.innerHTML = `
        <td>${currentTime}</td>
        <td>${soilData.moisture}</td>
        <td>${soilData.temperature}</td>
        <td>${soilData.ph}</td>
        <td>${soilData.salinity}</td>`;

    // Limit history table rows to last 10 entries
    while (historyTableBody.rows.length > 10) {
        historyTableBody.deleteRow(0);
    }

    // Update charts
    moistureChart.update();
    temperatureChart.update();
    phChart.update();
    salinityChart.update();

    // Update last updated timestamp
    document.getElementById('lastUpdated').textContent = currentTime;
}

// Set interval to update charts and data log every 5 seconds
setInterval(updateDashboard, 5000);

populateInitialHistory();

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
    temperature: 25,
    ph: 6.5,
    salinity: 1.2,
    floodingDuration: 300, // in minutes per day
    floodingFrequency: 1.2, // per day
    highTideDuration: 220, // in minutes
    currentVelocity: 0.11, // in m/s
    history: [
        { time: 'Starting', moisture: 0, temperature: 0, ph: 0, salinity: 0,
          floodingDuration: 0, floodingFrequency: 0, highTideDuration: 0, currentVelocity: 0 },
    ]
};

const moistureGauge = new JustGage({
    id: "moistureGauge",
    value: soilData.moisture,
    min: 0,
    max: 100,
    title: "Moisture",
    label: "%",
    valueFontColor: "#ffffff",
    gaugeWidthScale: 0.6,
    levelColors: ["#ed1c24", "#f2ed23", "#4caf50"]
});

const temperatureGauge = new JustGage({
    id: "temperatureGauge",
    value: soilData.temperature,
    min: 0,
    max: 50,
    title: "Temperature",
    label: "°C",
    valueFontColor: "#ffffff",
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
    valueFontColor: "#ffffff",
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
    valueFontColor: "#ffffff",
    gaugeWidthScale: 0.6,
    levelColors: ["#a0522d", "#deb887", "#4caf50"]
});

// Added missing gauges for flooding and tide metrics
const floodingDurationGauge = new JustGage({
    id: "floodingDurationGauge",
    value: soilData.floodingDuration,
    min: 0,
    max: 400,
    title: "Flooding Duration",
    label: "min/day",
    valueFontColor: "#ffffff",
    gaugeWidthScale: 0.6,
    levelColors: ["#4caf50", "#f2ed23", "#ed1c24"]
});

const floodingFrequencyGauge = new JustGage({
    id: "floodingFrequencyGauge",
    value: soilData.floodingFrequency,
    min: 0,
    max: 3,
    title: "Flooding Frequency",
    decimals: 2,
    label: "per day",
    valueFontColor: "#ffffff",
    gaugeWidthScale: 0.6,
    levelColors: ["#4caf50", "#f2ed23", "#ed1c24"]
});

const highTideDurationGauge = new JustGage({
    id: "highTideDurationGauge",
    value: soilData.highTideDuration,
    min: 0,
    max: 300,
    title: "High Tide Duration",
    label: "min",
    valueFontColor: "#ffffff",
    gaugeWidthScale: 0.6,
    levelColors: ["#4caf50", "#f2ed23", "#ed1c24"]
});

const currentVelocityGauge = new JustGage({
    id: "currentVelocityGauge",
    value: soilData.currentVelocity,
    min: 0.00,
    max: 1.00,
    title: "Current Velocity",
    decimals: 2,
    label: "m/s",
    valueFontColor: "#ffffff",
    gaugeWidthScale: 0.6,
    levelColors: ["#4caf50", "#f2ed23", "#ed1c24"]
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
            fill: true
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
            fill: true
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
            fill: true
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


const floodingDurationChart = new Chart(floodingDurationCtx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Flooding Duration (min/day)',
            data: floodingDurationData,
            borderColor: '#4caf50',
            borderWidth: 2,
            fill: true
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                suggestedMax: 400
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

const floodingFrequencyChart = new Chart(floodingFrequencyCtx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Flooding Frequency (per day)',
            data: floodingFrequencyData,
            borderColor: '#4caf50',
            borderWidth: 2,
            fill: true
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                suggestedMax: 3
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

const highTideDurationChart = new Chart(highTideDurationCtx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'High Tide Duration (min)',
            data: highTideDurationData,
            borderColor: '#4caf50',
            borderWidth: 2,
            fill: true
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                suggestedMax: 300
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
            fill: true
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                suggestedMax: 0.2
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
    soilData.temperature = Math.floor(Math.random() * 50);
    soilData.ph = parseFloat((Math.random() * 14).toFixed(2));
    soilData.salinity = parseFloat((Math.random() * 50).toFixed(2));
    soilData.floodingDuration = parseFloat((Math.random() * 400).toFixed(2));
    soilData.floodingFrequency = parseFloat((Math.random() * 3).toFixed(2));
    soilData.highTideDuration = parseFloat((Math.random() * 300).toFixed(2));
    soilData.currentVelocity = parseFloat((Math.random() * 0.99 + 0.01).toFixed(2));

    // Update gauges with new values
    moistureGauge.refresh(soilData.moisture);
    temperatureGauge.refresh(soilData.temperature);
    phGauge.refresh(soilData.ph);
    salinityGauge.refresh(soilData.salinity);
    floodingDurationGauge.refresh(soilData.floodingDuration);
    floodingFrequencyGauge.refresh(soilData.floodingFrequency);
    highTideDurationGauge.refresh(soilData.highTideDuration);
    currentVelocityGauge.refresh(soilData.currentVelocity);

    const currentTime = new Date().toLocaleTimeString();

    // Update chart datasets with new values
    moistureChart.data.labels.push(currentTime);
    moistureChart.data.datasets[0].data.push(soilData.moisture);
    if (moistureChart.data.labels.length > 20) {
        moistureChart.data.labels.shift();
        moistureChart.data.datasets[0].data.shift();
    }

    temperatureChart.data.labels.push(currentTime);
    temperatureChart.data.datasets[0].data.push(soilData.temperature);
    if (temperatureChart.data.labels.length > 20) {
        temperatureChart.data.labels.shift();
        temperatureChart.data.datasets[0].data.shift();
    }

    phChart.data.labels.push(currentTime);
    phChart.data.datasets[0].data.push(soilData.ph);
    if (phChart.data.labels.length > 20) {
        phChart.data.labels.shift();
        phChart.data.datasets[0].data.shift();
    }

    salinityChart.data.labels.push(currentTime);
    salinityChart.data.datasets[0].data.push(soilData.salinity);
    if (salinityChart.data.labels.length > 20) {
        salinityChart.data.labels.shift();
        salinityChart.data.datasets[0].data.shift();
    }

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


    // Append a new row to the soil history table
    const soilHistoryTableBody = document.getElementById('historyTableSoil').getElementsByTagName('tbody')[0];
    const newSoilHistoryRow = soilHistoryTableBody.insertRow();
    newSoilHistoryRow.innerHTML = `
        <td>${currentTime}</td>
        <td>${soilData.moisture}</td>
        <td>${soilData.temperature}</td>
        <td>${soilData.ph}</td>
        <td>${soilData.salinity}</td>`;

    // Append a new row to the water & tide history table
    const waterHistoryTableBody = document.getElementById('historyTableWater').getElementsByTagName('tbody')[0];
    const newWaterHistoryRow = waterHistoryTableBody.insertRow();
    newWaterHistoryRow.innerHTML = `
        <td>${currentTime}</td>
        <td>${soilData.floodingDuration}</td>
        <td>${soilData.floodingFrequency}</td>
        <td>${soilData.highTideDuration}</td>
        <td>${soilData.currentVelocity}</td>`;

    // Limit soil history table rows to last 10 entries
    while (soilHistoryTableBody.rows.length > 10) {
        soilHistoryTableBody.deleteRow(0);
    }

    // Limit water & tide history table rows to last 10 entries
    while (waterHistoryTableBody.rows.length > 10) {
        waterHistoryTableBody.deleteRow(0);
    }

    // Update charts
    moistureChart.update();
    temperatureChart.update();
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

populateInitialHistory();

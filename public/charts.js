// charts.js
// Handles all logic for Charts section (all chart initializations and updates)
// Exports: initCharts

/**
 * Initializes all charts and handles dropdown switching logic.
 * Assumes Chart.js is loaded globally and chart containers exist in the DOM.
 */
export function initCharts() {
    // Chart.js chart instances
    const charts = {};

    // Helper to create a line chart
    function createLineChart(ctxId, label, color, maxY) {
        const ctx = document.getElementById(ctxId).getContext('2d');
        return new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: label,
                    data: [],
                    borderColor: color,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: true }, title: { display: false } },
                scales: { y: { beginAtZero: true, max: maxY } }
            }
        });
    }

    // Initialize all charts
    charts.moisture = createLineChart('moistureChart', 'Moisture (%)', '#4caf50', 100);
    charts.humidity = createLineChart('humidityChart', 'Humidity (%)', '#0097a7', 100);
    charts.temperature = createLineChart('temperatureChart', 'Temperature (°C)', '#ffa726', 50);
    charts.ph = createLineChart('phChart', 'pH Level', '#3cba9f', 14);
    charts.salinity = createLineChart('salinityChart', 'Salinity (ppt)', '#a0522d', 50);
    charts.floodingDuration = createLineChart('floodingDurationChart', 'Flooding Duration (min/day)', '#1976d2', 400);
    charts.floodingFrequency = createLineChart('floodingFrequencyChart', 'Flooding Frequency (per day)', '#388e3c', 3);
    charts.highTideDuration = createLineChart('highTideDurationChart', 'High Tide Duration (min)', '#fbc02d', 300);
    charts.currentVelocity = createLineChart('currentVelocityChart', 'Current Velocity (m/s)', '#0288d1', 1);

    // Dropdown logic for chart selection
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
    if (chartSelect) {
        chartSelect.addEventListener('change', function() {
            chartCards.forEach(id => {
                const el = document.getElementById(id);
                if (el) el.style.display = (id === chartSelect.value) ? '' : 'none';
            });
        });
        // Show only the first chart by default
        chartCards.forEach((id, idx) => {
            const el = document.getElementById(id);
            if (el) el.style.display = (idx === 0) ? '' : 'none';
        });
    }

    // Real data update for all charts every 5 seconds
    setInterval(() => {
        const now = new Date().toLocaleTimeString();
        // Soil data from window.soilData (populated by soilGauges.js)
        const soil = window.soilData || {};
        // Hydrology data from window.hydrologyData (populated by hydrologyGauges.js)
        const hydro = window.hydrologyData || {};
        // Helper to push and trim chart data
        function pushChart(chart, value) {
            chart.data.labels.push(now);
            chart.data.datasets[0].data.push(value ?? null);
            if (chart.data.labels.length > 20) {
                chart.data.labels.shift();
                chart.data.datasets[0].data.shift();
            }
            chart.update();
        }
        pushChart(charts.moisture, soil.moisture);
        pushChart(charts.humidity, soil.humidity);
        pushChart(charts.temperature, soil.temperature);
        pushChart(charts.ph, soil.ph);
        pushChart(charts.salinity, soil.salinity);
        pushChart(charts.floodingDuration, hydro.floodingDuration);
        pushChart(charts.floodingFrequency, hydro.floodingFrequency);
        pushChart(charts.highTideDuration, hydro.highTideDuration);
        pushChart(charts.currentVelocity, hydro.currentVelocity);
    }, 5000);
}

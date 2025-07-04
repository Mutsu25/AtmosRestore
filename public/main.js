// main.js
// Entry point: imports and initializes all modules for the dashboard

import { initSoilGauges } from './soilGauges.js';
import { initHydrologyGauges } from './hydrologyGauges.js';
import { initCharts } from './charts.js';
import { initHistory } from './history.js';
import { initSpeciesMetrics } from './speciesMetrics.js';
import { initNavigation } from './navigation.js';
import { initAuth } from './auth.js';
import { initLiveFeed } from './liveFeed.js';

document.addEventListener('DOMContentLoaded', () => {
    initAuth();
    initNavigation();
    initSoilGauges();
    initHydrologyGauges();
    initCharts();
    initHistory();
    initSpeciesMetrics();
    initLiveFeed();
    // Update last updated clock in footer every 5 seconds
    function updateFooterClock() {
        const el = document.getElementById('lastUpdated');
        if (el) {
            const now = new Date();
            el.textContent = now.toLocaleString();
        }
    }
    updateFooterClock();
    setInterval(updateFooterClock, 5000);
});

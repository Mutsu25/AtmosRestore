// speciesMetrics.js
// Handles logic for the Optimal Species Metrics card and species selection
// Exports: initSpeciesMetrics

/**
 * Initializes the species metrics dropdown and display logic.
 * Shows the correct metrics for the selected mangrove species.
 */
export function initSpeciesMetrics() {
    const select = document.getElementById('speciesSelect');
    if (!select) return;
    const speciesIds = [
        'mucronata',
        'apiculata',
        'stylosa',
        'avicennia',
        'bruguiera'
    ];
    select.addEventListener('change', function() {
        speciesIds.forEach(id => {
            const metricsDiv = document.getElementById('metrics-' + id);
            if (metricsDiv) metricsDiv.style.display = (select.value === id) ? 'block' : 'none';
        });
    });
    // Show the first species by default
    speciesIds.forEach((id, idx) => {
        const metricsDiv = document.getElementById('metrics-' + id);
        if (metricsDiv) metricsDiv.style.display = (idx === 0) ? 'block' : 'none';
    });
}

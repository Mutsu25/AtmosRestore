// history.js
// Handles all logic for Soil and Water History tables and CSV export
// Exports: initHistory

/**
 * Initializes history tables for soil and water metrics.
 * Listens to Firebase for latest data and updates tables in real time.
 * Adds CSV and PDF export for both tables.
 */
export function initHistory() {
    // Soil history table
    const soilTableBody = document.querySelector('#historyTableSoil tbody');
    // Water history table
    const waterTableBody = document.querySelector('#historyTableWater tbody');

    // Listen for latest soil data
    if (window.firebase && window.firebase.database) {
        firebase.database().ref('/history/soil').limitToLast(20).on('value', function(snapshot) {
            const data = snapshot.val() || {};
            const rows = Object.values(data).sort((a, b) => (a.time > b.time ? 1 : -1));
            if (soilTableBody) soilTableBody.innerHTML = '';
            rows.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${row.time || ''}</td>
                    <td>${row.moisture ?? ''}</td>
                    <td>${row.humidity ?? ''}</td>
                    <td>${row.temperature ?? ''}</td>
                    <td>${row.ph ?? ''}</td>
                    <td>${row.salinity ?? ''}</td>
                `;
                if (soilTableBody) soilTableBody.appendChild(tr);
            });
        });
        // Listen for latest water/tide data
        firebase.database().ref('/history/water').limitToLast(20).on('value', function(snapshot) {
            const data = snapshot.val() || {};
            const rows = Object.values(data).sort((a, b) => (a.time > b.time ? 1 : -1));
            if (waterTableBody) waterTableBody.innerHTML = '';
            rows.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${row.time || ''}</td>
                    <td>${row.floodingDuration ?? ''}</td>
                    <td>${row.floodingFrequency ?? ''}</td>
                    <td>${row.highTideDuration ?? ''}</td>
                    <td>${row.currentVelocity ?? ''}</td>
                `;
                if (waterTableBody) waterTableBody.appendChild(tr);
            });
        });
    }
    // CSV export logic
    document.getElementById('exportSoilHistoryCSV')?.addEventListener('click', function() {
        exportTableToCSV('historyTableSoil', 'soil_history.csv');
    });
    document.getElementById('exportWaterHistoryCSV')?.addEventListener('click', function() {
        exportTableToCSV('historyTableWater', 'water_history.csv');
    });
    // PDF export logic
    document.getElementById('exportSoilHistoryPDF')?.addEventListener('click', function() {
        exportTableToPDF('historyTableSoil', 'Soil History');
    });
    document.getElementById('exportWaterHistoryPDF')?.addEventListener('click', function() {
        exportTableToPDF('historyTableWater', 'Water & Tide History');
    });
    // Polish export buttons
    document.querySelectorAll('.export-buttons button').forEach(btn => {
        btn.style.background = '#325947';
        btn.style.color = '#eafbe6';
        btn.style.border = 'none';
        btn.style.borderRadius = '8px';
        btn.style.padding = '0.7rem 1.2rem';
        btn.style.fontSize = '1.05rem';
        btn.style.cursor = 'pointer';
        btn.style.transition = 'background 0.2s, color 0.2s';
        btn.onmouseover = () => { btn.style.background = '#4caf50'; btn.style.color = '#fff'; };
        btn.onmouseout = () => { btn.style.background = '#325947'; btn.style.color = '#eafbe6'; };
    });
}

// Helper: Export table to CSV
function exportTableToCSV(tableId, filename) {
    const table = document.getElementById(tableId);
    if (!table) return;
    let csv = '';
    for (let row of table.rows) {
        let rowData = [];
        for (let cell of row.cells) {
            rowData.push('"' + cell.innerText.replace(/"/g, '""') + '"');
        }
        csv += rowData.join(',') + '\n';
    }
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Helper: Export table to PDF using jsPDF and autoTable
function exportTableToPDF(tableId, title) {
    if (typeof window.jspdf === 'undefined' && typeof window.jspdf === 'undefined') {
        alert('PDF export requires jsPDF and jsPDF-AutoTable.');
        return;
    }
    const doc = new window.jspdf.jsPDF('l', 'pt', 'a4');
    const table = document.getElementById(tableId);
    if (!table) return;
    const head = [];
    const body = [];
    for (let i = 0; i < table.rows.length; i++) {
        const row = [];
        for (let j = 0; j < table.rows[i].cells.length; j++) {
            row.push(table.rows[i].cells[j].innerText);
        }
        if (i === 0) head.push(row);
        else body.push(row);
    }
    doc.text(title, 40, 40);
    doc.autoTable({
        head: head,
        body: body,
        startY: 60,
        theme: 'grid',
        headStyles: { fillColor: [50, 89, 71], textColor: [234, 251, 230], fontStyle: 'bold' },
        bodyStyles: { fillColor: [44, 70, 56], textColor: [234, 251, 230] },
        alternateRowStyles: { fillColor: [61, 92, 71] },
        styles: { font: 'helvetica', fontSize: 10, cellPadding: 4, halign: 'center' }
    });
    doc.save(title.replace(/\s+/g, '_').toLowerCase() + '.pdf');
}

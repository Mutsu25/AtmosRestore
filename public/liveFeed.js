// liveFeed.js
// Handles logic for the Live Feed section, including pump controls and UI polish
// Exports: initLiveFeed

/**
 * Initializes the live feed section, including pump toggle buttons and status updates.
 * Integrates with Firebase for real-time pump control and status.
 * Polishes the UI for a modern, professional look.
 */
export function initLiveFeed() {
    // Pump 1
    const pump1Toggle = document.getElementById('pump1Toggle');
    const pump1Status = document.getElementById('pump1Status');
    // Pump 2
    const pump2Toggle = document.getElementById('pump2Toggle');
    const pump2Status = document.getElementById('pump2Status');
    // Remove the status message element from the DOM for a cleaner look
    const statusMsg = document.getElementById('status');
    if (statusMsg) statusMsg.style.display = 'none';
    // Video container
    const videoContainer = document.querySelector('.video-container');
    const liveFeedContainer = document.querySelector('.live-feed-container');
    const pumpControls = document.querySelector('.pump-controls');

    // --- UI Polish ---
    if (liveFeedContainer) {
        liveFeedContainer.style.background = 'rgba(44, 70, 56, 0.95)';
        liveFeedContainer.style.borderRadius = '18px';
        liveFeedContainer.style.boxShadow = '0 6px 32px #2f4f2f55';
        liveFeedContainer.style.padding = '32px 24px 32px 24px';
        liveFeedContainer.style.margin = '2rem auto';
        liveFeedContainer.style.maxWidth = '900px';
        liveFeedContainer.style.gap = '32px';
    }
    if (videoContainer) {
        videoContainer.style.background = '#1a2a22';
        videoContainer.style.borderRadius = '14px';
        videoContainer.style.boxShadow = '0 2px 12px #2f4f2f33';
        videoContainer.style.padding = '18px';
        videoContainer.style.display = 'flex';
        videoContainer.style.justifyContent = 'center';
        videoContainer.style.alignItems = 'center';
    }
    const streamImg = document.getElementById('rtspStream');
    if (streamImg) {
        streamImg.style.borderRadius = '10px';
        streamImg.style.boxShadow = '0 2px 12px #2f4f2f33';
        streamImg.style.background = '#000';
        streamImg.style.border = '3px solid #325947';
        streamImg.style.maxHeight = '60vh';
        streamImg.style.objectFit = 'cover';
    }
    if (pumpControls) {
        pumpControls.style.background = 'rgba(50, 89, 71, 0.95)';
        pumpControls.style.borderRadius = '14px';
        pumpControls.style.boxShadow = '0 2px 12px #2f4f2f33';
        pumpControls.style.padding = '24px 18px';
        pumpControls.style.display = 'flex';
        pumpControls.style.justifyContent = 'center';
        pumpControls.style.gap = '48px';
        pumpControls.style.marginTop = '1.5rem';
    }
    document.querySelectorAll('.pump-toggle-group').forEach(group => {
        group.style.display = 'flex';
        group.style.flexDirection = 'column';
        group.style.alignItems = 'center';
        group.style.gap = '10px';
        group.style.background = 'rgba(44, 70, 56, 0.7)';
        group.style.borderRadius = '10px';
        group.style.padding = '18px 16px';
        group.style.boxShadow = '0 1px 6px #2f4f2f22';
        group.style.minWidth = '140px';
    });
    // Font polish for pump status
    document.querySelectorAll('.pump-status').forEach(status => {
        status.style.fontFamily = "'Inter', Arial, sans-serif";
        status.style.fontWeight = 'bold';
        status.style.fontSize = '1.1rem';
        status.style.letterSpacing = '1px';
        status.style.textShadow = '0 1px 4px #2f4f2f55';
        status.style.transition = 'color 0.2s';
        status.style.color = '#eafbe6';
    });
    document.querySelectorAll('.pump-switch input[type="checkbox"]').forEach(input => {
        input.style.width = '0';
        input.style.height = '0';
        input.style.opacity = '0';
    });
    document.querySelectorAll('.pump-slider').forEach(slider => {
        slider.style.display = 'block';
        slider.style.width = '54px';
        slider.style.height = '54px';
        slider.style.background = '#325947';
        slider.style.borderRadius = '10px';
        slider.style.position = 'relative';
        slider.style.transition = 'background 0.3s';
        slider.style.boxShadow = '0 2px 8px #2f4f2f33';
        slider.style.border = '2px solid #222';
    });
    document.querySelectorAll('.pump-switch input[type="checkbox"]').forEach(input => {
        input.addEventListener('change', function() {
            const slider = input.nextElementSibling;
            if (slider) {
                slider.style.background = input.checked ? '#4caf50' : '#325947';
            }
        });
    });
    // Initial polish for status message
    if (statusMsg) {
        statusMsg.style.fontWeight = 'bold';
        statusMsg.style.fontSize = '1.1rem';
        statusMsg.style.marginTop = '1rem';
        statusMsg.style.transition = 'color 0.2s';
        statusMsg.style.textAlign = 'center';
        statusMsg.style.background = 'rgba(44, 70, 56, 0.7)';
        statusMsg.style.borderRadius = '8px';
        statusMsg.style.padding = '10px 0';
        statusMsg.style.boxShadow = '0 1px 6px #2f4f2f22';
        statusMsg.style.maxWidth = '400px';
        statusMsg.style.marginLeft = 'auto';
        statusMsg.style.marginRight = 'auto';
    }

    // --- Pump Logic ---
    // Remove pump status text updates for aesthetics
    /*
    function updatePumpStatus(pump, isOn) {
        if (pump === 1 && pump1Status) {
            pump1Status.textContent = isOn ? 'Pump 1 ON' : 'Pump 1 OFF';
            pump1Status.style.color = isOn ? '#4caf50' : '#eafbe6';
        }
        if (pump === 2 && pump2Status) {
            pump2Status.textContent = isOn ? 'Pump 2 ON' : 'Pump 2 OFF';
            pump2Status.style.color = isOn ? '#4caf50' : '#eafbe6';
        }
    }
    */
    // Optionally hide the status elements if present
    if (pump1Status) pump1Status.style.display = 'none';
    if (pump2Status) pump2Status.style.display = 'none';

    if (window.firebase && window.firebase.database) {
        firebase.database().ref('/pump/pump1').on('value', function(snapshot) {
            const isOn = snapshot.val() === true || snapshot.val() === 'on';
            if (pump1Toggle) pump1Toggle.checked = isOn;
            // updatePumpStatus(1, isOn); // No longer needed
        });
        firebase.database().ref('/pump/pump2').on('value', function(snapshot) {
            const isOn = snapshot.val() === true || snapshot.val() === 'on';
            if (pump2Toggle) pump2Toggle.checked = isOn;
            // updatePumpStatus(2, isOn); // No longer needed
        });
    }
    if (pump1Toggle) {
        pump1Toggle.addEventListener('change', function() {
            if (window.firebase && window.firebase.database) {
                firebase.database().ref('/pump/pump1').set(pump1Toggle.checked ? 'on' : 'off');
            }
        });
    }
    if (pump2Toggle) {
        pump2Toggle.addEventListener('change', function() {
            if (window.firebase && window.firebase.database) {
                firebase.database().ref('/pump/pump2').set(pump2Toggle.checked ? 'on' : 'off');
            }
        });
    }
}

/**
 * Hotel KPI Calculator
 * Calculates real-time hotel performance metrics: Occupancy, ADR, and RevPAR
 */

// Currency formatter for consistent monetary display
const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

// DOM element references
const totalRoomsInput = document.getElementById('total-rooms');
const roomsSoldInput = document.getElementById('rooms-sold');
const totalRevenueInput = document.getElementById('total-revenue');
const clearBtn = document.getElementById('clear-btn');

// KPI display elements
const occupancyValue = document.getElementById('occupancy-value');
const adrValue = document.getElementById('adr-value');
const revparValue = document.getElementById('revpar-value');

// Hint elements for edge cases
const occupancyHint = document.getElementById('occupancy-hint');
const adrHint = document.getElementById('adr-hint');
const revparHint = document.getElementById('revpar-hint');

// Cards for animation effects
const occupancyCard = document.getElementById('occupancy-card');
const adrCard = document.getElementById('adr-card');
const revparCard = document.getElementById('revpar-card');

/**
 * Calculate Occupancy Rate
 * Formula: (Rooms Sold / Total Rooms Available) * 100
 * @param {number} roomsSold - Number of rooms sold
 * @param {number} totalRooms - Total rooms available
 * @returns {number|null} - Occupancy percentage or null if cannot calculate
 */
function calcOccupancy(roomsSold, totalRooms) {
    // Edge case: Cannot calculate if no rooms available
    if (totalRooms === 0) {
        return null;
    }

    // Prevent negative values and invalid calculations
    if (roomsSold < 0 || totalRooms < 0) {
        return null;
    }

    return (roomsSold / totalRooms) * 100;
}

/**
 * Calculate Average Daily Rate (ADR)
 * Formula: Total Room Revenue / Rooms Sold
 * @param {number} totalRevenue - Total revenue from rooms
 * @param {number} roomsSold - Number of rooms sold
 * @returns {number|null} - ADR value or null if cannot calculate
 */
function calcADR(totalRevenue, roomsSold) {
    // Edge case: Cannot calculate if no rooms sold
    if (roomsSold === 0) {
        return null;
    }

    // Prevent negative values
    if (totalRevenue < 0 || roomsSold < 0) {
        return null;
    }

    return totalRevenue / roomsSold;
}

/**
 * Calculate Revenue Per Available Room (RevPAR)
 * Formula: Total Room Revenue / Total Rooms Available
 * @param {number} totalRevenue - Total revenue from rooms
 * @param {number} totalRooms - Total rooms available
 * @returns {number|null} - RevPAR value or null if cannot calculate
 */
function calcRevPAR(totalRevenue, totalRooms) {
    // Edge case: Cannot calculate if no rooms available
    if (totalRooms === 0) {
        return null;
    }

    // Prevent negative values
    if (totalRevenue < 0 || totalRooms < 0) {
        return null;
    }

    return totalRevenue / totalRooms;
}

/**
 * Add visual highlight animation to a KPI card
 * @param {HTMLElement} element - The element to animate
 */
function addHighlight(element) {
    element.classList.remove('updated');
    // Force reflow to restart animation
    void element.offsetWidth;
    element.classList.add('updated');
}

/**
 * Get input values and parse them as numbers
 * Returns 0 for empty inputs to allow progressive data entry
 * @returns {Object} - Object containing parsed input values
 */
function getInputValues() {
    const totalRooms = parseFloat(totalRoomsInput.value) || 0;
    const roomsSold = parseFloat(roomsSoldInput.value) || 0;
    const totalRevenue = parseFloat(totalRevenueInput.value) || 0;

    return {
        totalRooms: Math.max(0, totalRooms), // Ensure non-negative
        roomsSold: Math.max(0, roomsSold),
        totalRevenue: Math.max(0, totalRevenue)
    };
}

/**
 * Main update function - recalculates and displays all KPIs
 * Called whenever any input changes
 */
function updateAll() {
    // Get current input values
    const { totalRooms, roomsSold, totalRevenue } = getInputValues();

    // Calculate Occupancy Rate
    const occupancy = calcOccupancy(roomsSold, totalRooms);
    if (occupancy === null) {
        occupancyValue.textContent = 'N/A';
        occupancyValue.style.color = 'var(--text-light)';
        occupancyHint.textContent = totalRooms === 0 ? 'Total Rooms must be > 0' : '';
    } else {
        occupancyValue.textContent = `${occupancy.toFixed(2)}%`;
        occupancyValue.style.color = 'var(--primary-color)';
        occupancyHint.textContent = '';
        addHighlight(occupancyValue);
    }

    // Calculate ADR (Average Daily Rate)
    const adr = calcADR(totalRevenue, roomsSold);
    if (adr === null) {
        adrValue.textContent = 'N/A';
        adrValue.style.color = 'var(--text-light)';
        adrHint.textContent = roomsSold === 0 ? 'Rooms Sold must be > 0 to compute ADR' : '';
    } else {
        adrValue.textContent = currencyFormatter.format(adr);
        adrValue.style.color = 'var(--primary-color)';
        adrHint.textContent = '';
        addHighlight(adrValue);
    }

    // Calculate RevPAR (Revenue Per Available Room)
    const revpar = calcRevPAR(totalRevenue, totalRooms);
    if (revpar === null) {
        revparValue.textContent = 'N/A';
        revparValue.style.color = 'var(--text-light)';
        revparHint.textContent = totalRooms === 0 ? 'Total Rooms must be > 0' : '';
    } else {
        revparValue.textContent = currencyFormatter.format(revpar);
        revparValue.style.color = 'var(--primary-color)';
        revparHint.textContent = '';
        addHighlight(revparValue);
    }
}

/**
 * Clear all input fields and reset KPIs to default state
 */
function clearAll() {
    totalRoomsInput.value = '';
    roomsSoldInput.value = '';
    totalRevenueInput.value = '';

    // Reset display to default state
    occupancyValue.textContent = '0.00%';
    occupancyValue.style.color = 'var(--primary-color)';
    occupancyHint.textContent = '';

    adrValue.textContent = '$0.00';
    adrValue.style.color = 'var(--primary-color)';
    adrHint.textContent = '';

    revparValue.textContent = '$0.00';
    revparValue.style.color = 'var(--primary-color)';
    revparHint.textContent = '';

    // Return focus to first input
    totalRoomsInput.focus();
}

/**
 * Prevent negative values from being entered
 * @param {Event} event - Input event
 */
function preventNegative(event) {
    const input = event.target;
    if (parseFloat(input.value) < 0) {
        input.value = 0;
    }
}

// Event Listeners for real-time calculation
// Using 'input' event for immediate response as user types
totalRoomsInput.addEventListener('input', updateAll);
roomsSoldInput.addEventListener('input', updateAll);
totalRevenueInput.addEventListener('input', updateAll);

// Prevent negative values
totalRoomsInput.addEventListener('change', preventNegative);
roomsSoldInput.addEventListener('change', preventNegative);
totalRevenueInput.addEventListener('change', preventNegative);

// Clear button functionality
clearBtn.addEventListener('click', clearAll);

// Initialize on page load
document.addEventListener('DOMContentLoaded', updateAll);

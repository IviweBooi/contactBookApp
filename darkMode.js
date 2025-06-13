// Get the current dark mode status from local storage
let darkMode = localStorage.getItem('darkMode');

// Function to enable dark mode
function enableDarkMode() {
    // Add the 'darkMode' class to the body element to apply dark styles
    document.getElementById('body').classList.add('darkMode');
    // Save the dark mode status in local storage as 'active'
    localStorage.setItem('darkMode', 'active');
}

// Function to disable dark mode
function disableDarkMode() {
    // Remove the 'darkMode' class from the body element to revert to light styles
    document.getElementById('body').classList.remove('darkMode');
    // Save the dark mode status in local storage as null (can also use 'inactive')
    localStorage.setItem('darkMode', null);
}

// Check if dark mode was previously enabled when the page loads
if (darkMode === 'active') {
    // If dark mode was active, enable it on page load
    enableDarkMode();
}

// Function to toggle dark mode on button click
function activateThemeChange() {
    // Get the current dark mode status from local storage
    darkMode = localStorage.getItem('darkMode');

    // Check if dark mode is not currently active
    if (darkMode !== 'active') {
        // Enable dark mode if it's not active
        enableDarkMode();
    } else {
        // Disable dark mode if it is currently active
        disableDarkMode();
    }
}
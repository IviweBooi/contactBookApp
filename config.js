// Define the root path for the Contact Book API
let rootPath = "https://mysite.itvarsity.org/api/ContactBook/";

// Check if an API key is stored in local storage
let apiKey = checkApiKey();

// Function to verify the presence of an API key
function checkApiKey() {
    // If there is no API key stored, redirect the user to the API key entry page
    // and load in the same window as the current page
    if (!localStorage.getItem("apiKey")) {
        window.open("enter-api-key.html", "_self"); // Open the API key entry page
    }
    // Return the API key from local storage (if it exists)
    return localStorage.getItem("apiKey");
}

// Function to navigate to the contacts page
function navigate_to_contacts() {
    window.open("contactsPage.html", "_self"); // Opens contacts page in the same tab
}

// Function to navigate to the home page
function navigate_to_home() {
    window.open("index.html", "_self"); // Opens home page in the same tab
}

// Function to navigate to the add-new-contact page
function navigate_to_add_contact() {
    window.open("addContactPage.html", "_self"); // Opens add new contact page in the same tab
}

// Function to navigate to the edit-contact page
function navigate_to_edit_contact(id) {
    window.open("editContactPage.html?id=" + id, "_self"); // Opens edit contact page with the specified ID
}

// Get references to the file input, label, and button elements
const input = document.getElementById('avatar');
const label = document.querySelector('.profile-image-label');
const button = document.getElementById('add-btn');

// Add click event listener to the button
button.addEventListener('click', function() {
    input.click(); // Trigger file input click to open the file dialog
});

// Add change event listener to the file input
input.addEventListener('change', function() {
    const file = this.files[0]; // Get the selected file
    if (file) {
        const reader = new FileReader(); // Create a new FileReader instance
        reader.onload = function(e) {
            label.style.backgroundImage = `url(${e.target.result})`; // Set the label's background image to the selected file
        }
        reader.readAsDataURL(file); // Read the file as a data URL
    }
});
// function to navigate to the contacts page
function navigate_to_contacts(){
    window.open("contactsPage.html", "_self");
}


// function to navigate to the home page
function navigate_to_home(){
    window.open("index.html", "_self");
}

// function to navigate to the add-new-contact page
function navigate_to_add_contact(){
    window.open("addContactPage.html", "_self");
}

const input = document.getElementById('profileImageInput');
const label = document.querySelector('.profile-image-label');
const button = document.getElementById('add-btn');

button.addEventListener('click', function() {
    input.click(); // Trigger file input click
});

input.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            label.style.backgroundImage = `url(${e.target.result})`;
        }
        reader.readAsDataURL(file);
    }
});



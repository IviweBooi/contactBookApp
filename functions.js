// Function to fetch contacts from the server
function fetchContacts() {
    fetch(rootPath + "controller/get-contacts/")
        .then(function(response) {
            return response.json(); // Parse JSON response
        })
        .then(function(data) {
            displayOutput(data); // Display fetched contacts
        });
}

// Function to display contacts in a table format
function displayOutput(data) {
    let output = "<table>";
    for (let a in data) {
        output += `
            <tr>
                <td>
                    <div id="contact-list-box">
                        <div onclick="navigate_to_edit_contact(${data[a].id})" class="contact-list">
                            <div class="contact-profile-pic" style="background-image: url(${rootPath}controller/uploads/${data[a].avatar}); background-size: cover; background-position: center; background-repeat: no-repeat;"></div>
                            <div class="contact-profile-details">
                                <h2 class="contact-name">${data[a].firstname} ${data[a].lastname}</h2>
                                <p class="contact-number">${data[a].mobile}</p>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        `;
    }
    output += "</table>";
    document.getElementById("table").innerHTML = output; // Inject HTML into the table
}

// Function to fetch all contacts for another view
function fetchAllContacts() {
    fetch(rootPath + "controller/get-contacts/")
        .then(function(response) {
            return response.json(); // Parse JSON response
        })
        .then(function(data) {
            displayAllOutput(data); // Display all contacts
        });
}

// Function to display all contacts, including action icons
function displayAllOutput(data) {
    let new_output = "<table>";
    for (let a in data) {
        new_output += `
            <tr>
                <td>
                    <div id="contact-list-box">
                        <div onclick="navigate_to_edit_contact(${data[a].id})" class="contact-list">
                            <div class="contact-profile-pic" style="background-image: url(${rootPath}controller/uploads/${data[a].avatar}); background-size: cover; background-position: center; background-repeat: no-repeat;"></div>
                            <div class="contact-profile-details">
                                <h2 class="contact-name">${data[a].firstname} ${data[a].lastname}</h2>
                                <p class="contact-number">${data[a].mobile}</p>
                            </div>

                        </div>
                    </div>
                </td>
            </tr>
        `;
    }
    new_output += "</table>";
    document.getElementById("new_table").innerHTML = new_output; // Inject HTML into the new table
}

// Function to submit the contact form
function submitForm(e) {
    e.preventDefault(); // Prevent default form submission
    const form = new FormData(document.querySelector('#addContacts'));
    form.append('apiKey', apiKey); // Append API key

    fetch(rootPath + 'controller/insert-contact/', {
        method: 'POST',
        headers: {'Accept': 'application/json, *.*'},
        body: form
    })
    .then(function(response) {
        return response.text(); // Parse text response
    })
    .then(function(data) {
        if (data === "1") {
            alert("Contact added.");
            homeLink(); // Navigate home
        } else {
            alert(data); // Show error message
            homeLink(); // Navigate home
        }
    });
}

// Event listener for saving the contact
document.getElementById("save-contact").addEventListener('click', submitForm);

// Function to navigate to the home page
function homeLink() {
    window.open("index.html", "_self");
}

// Function to get the contact ID from the URL
var id = getId();
function getId() {
    var url = window.location.href;
    var pos = url.search('=');
    return url.slice(pos + 1); // Return ID from URL
}

// Function to fetch a specific contact's details
function getContact() {
    fetch(rootPath + 'controller/get-contacts/?id=' + id)
        .then(function(response) {
            return response.json(); // Parse JSON response
        })
        .then(function(data) {
            displayContactOutput(data); // Display contact details
        });
}

// Function to display a specific contact's details
function displayContactOutput(data) {
    const avatarImage = `${rootPath}controller/uploads/${data[0].avatar}`; // Avatar URL
    const backgroundImage = document.querySelector('.profile-image-label');
    backgroundImage.style.backgroundImage = `url(${avatarImage})`; // Set background image
    document.getElementById("firstname").value = data[0].firstname; // Fill form fields
    document.getElementById("lastname").value = data[0].lastname;
    document.getElementById("phone").value = data[0].mobile;
    document.getElementById("email").value = data[0].email;
}

// Function to enable editing of contact details
function editContactDetails() {
    document.getElementById("firstname").readOnly = false;
    document.getElementById("lastname").readOnly = false;
    document.getElementById("phone").readOnly = false;
    document.getElementById("email").readOnly = false;
    document.getElementById("save-contact").hidden = false; // Show save button
    document.getElementById("add-btn").hidden = false; // Show add button
    document.getElementById("edit-contact").hidden = true; // Hide edit button
}

// Function to submit the edited contact form
function submitNewForm(e) {
    e.preventDefault(); // Prevent default form submission
    const form = new FormData(document.querySelector('#contactInfoForm'));
    form.append('apiKey', apiKey); // Append API key
    form.append('id', id); // Append contact ID

    fetch(rootPath + 'controller/edit-contact/', {
        method: 'POST',
        headers: {'Accept': 'application/json, *.*'},
        body: form
    })
    .then(function(response) {
        return response.text(); // Parse text response
    })
    .then(function(data) {
        if (data === "1") {
            alert("Contact edited.");
            navigate_to_edit_contact(id); // Navigate to edited contact
        } else {
            alert(data); // Show error message
            navigate_to_edit_contact(id); // Navigate to edited contact
        }
    });
}

// Event listener for saving the edited contact
document.getElementById("save-contact").addEventListener('click', submitNewForm);

// Function to delete a contact
function deleteContact() {
    var confirmDelete = confirm("Delete contact. Are you sure?");
    if (confirmDelete === true) {
        fetch(rootPath + 'controller/delete-contact/?id=' + id)
            .then(function(response) {
                return response.text(); // Parse text response
            })
            .then(function(data) {
                if (data === "1") {
                    alert("Contact deleted successfully.");
                    homeLink(); // Navigate home
                } else {
                    alert("Failed to delete contact: " + data); // Show error message
                }
            })
            .catch(function(error) {
                console.error("Error during deletion:", error);
                alert("An error occurred while deleting the contact."); // Handle errors
            });
    }
}

// Function to filter contacts based on search input
function searchContacts() {
    const searchInput = document.getElementById("search-contact").value.toLowerCase(); // Get input value
    const contacts = document.querySelectorAll("#contact-list-box .contact-list"); // Select all contact elements
    contacts.forEach(contact => {
        const contactName = contact.querySelector(".contact-name").textContent.toLowerCase(); // Get contact name
        const contactNumber = contact.querySelector(".contact-number").textContent.toLowerCase(); // Get contact number
        // Check if the contact name or number includes the search input
        if (contactName.includes(searchInput) || contactNumber.includes(searchInput)) {
            contact.style.display = ""; // Show contact
        } else {
            contact.style.display = "none"; // Hide contact
        }
    });
}

// Event listener for the search input
document.getElementById("search-contact").addEventListener("input", searchContacts);

// Function to filter contacts based on search input from the header
function searchInSite() {
    const searchInput = document.querySelector('#search-bar-box input[type="text"]').value.toLowerCase(); // Get input value
    const contactLists = document.querySelectorAll('.contact-list'); // Select all contact elements

    contactLists.forEach(contact => {
        const contactName = contact.querySelector('.contact-name').textContent.toLowerCase(); // Get contact name
        const contactNumber = contact.querySelector('.contact-number').textContent.toLowerCase(); // Get contact number

        // Check if the contact name or number includes the search input
        if (contactName.includes(searchInput) || contactNumber.includes(searchInput)) {
            contact.style.display = ""; // Show contact
        } else {
            contact.style.display = "none"; // Hide contact
        }
    });
}

// Event listener for the search input in the header
document.querySelector('#search-bar-box input[type="text"]').addEventListener('input', searchInSite);

function handleDeleteContact(contactId) {
    var confirmDelete = confirm("Delete contact. Are you sure?");
    if (confirmDelete === true) {
        delete_a_contact(contactId); // Call the deleteContact function
    }
}

function delete_a_contact(contactId) {
    fetch(rootPath + 'controller/delete-contact/?id=' + contactId)
        .then(function(response) {
            return response.text(); // Parse text response
        })
        .then(function(data) {
            if (data === "1") {
                alert("Contact deleted successfully.");
                fetchAllContacts(); // Refresh the contact list
            } else {
                alert("Failed to delete contact: " + data); // Show error message
            }
        })
        .catch(function(error) {
            console.error("Error during deletion:", error);
            alert("An error occurred while deleting the contact."); // Handle errors
        });
}

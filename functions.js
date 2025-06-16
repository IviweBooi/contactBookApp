
function fetchContacts(){
        fetch(rootPath + "controller/get-contacts/")
        .then(function(response){
            return response.json();
        })
        .then(function(data){
          displayOutput(data);
        })
}


function displayOutput(data){
    output ="<table>";
    for(a in data){
        output += `
            <tr>
                <td>
                    <div id="contact-list-box">
                        <div onclick="navigate_to_edit_contact(${data[a].id})" class="contact-list">
                            <div class="contact-profile-pic" style="background-image: url(${rootPath}controller/uploads/${data[a].avatar});background-size: cover;background-position: center;background-repeat: no-repeat;"></div>
                            <div class="contact-profile-details">
                                <h2 class="contact-name">${data[a].firstname} ${data[a].lastname}</h2>
                                <p class="contact-number">${data[a].mobile}</p>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        `
    }
    output += "</table>"
    document.getElementById("table").innerHTML = output;
}



function fetchAllContacts(){
        fetch(rootPath + "controller/get-contacts/")
        .then(function(response){
            return response.json();
        })
        .then(function(data){
          displayAllOutput(data);
        })
}


function displayAllOutput(data){
    new_output ="<table>";
    for(a in data){
        new_output += `
            <tr>
                <td>
                    <div id="contact-list-box">
                        <div onclick="navigate_to_edit_contact(${data[a].id})" class="contact-list">
                            <div class="contact-profile-pic" style="background-image: url(${rootPath}controller/uploads/${data[a].avatar});background-size: cover;background-position: center;background-repeat: no-repeat;"></div>
                            <div class="contact-profile-details">
                                <h2 class="contact-name">${data[a].firstname} ${data[a].lastname}</h2>
                                <p class="contact-number">${data[a].mobile}</p>
                            </div>
                            <div id="action-icons">
                                <i id="star" class="fa-solid fa-star"></i>
                                <i id="bin" class="fa-solid fa-trash"></i>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        `
    }
    new_output += "</table>"
    document.getElementById("new_table").innerHTML = new_output;
}

function submitForm(e){
    e.preventDefault();
    const form = new FormData(document.querySelector('#addContacts'));
    form.append('apiKey',apiKey);

    fetch(rootPath + 'controller/insert-contact/',{
        method: 'POST',
        headers: {'Accept': 'application/json, *.*'},
        body: form
    })
    .then(function(response){
        return response.text();
    })
    .then(function(data){
        if(data =="1"){
            alert("Contact added.");
            homeLink();
        }else{
            alert(data);
            homeLink();
        }
    })
}

document.getElementById("save-contact").addEventListener('click', submitForm);

function homeLink(){
    window.open("index.html", "_self");
}

var id = getId();

function getId(){
    var url = window.location.href;
    var pos = url.search('=');
    var id = url.slice(pos + 1)
    return id;
}

function getContact(){
    fetch(rootPath + 'controller/get-contacts/?id=' + id)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        displayContactOutput(data);
    })
}

function displayContactOutput(data) {
    const avatarImage = `${rootPath}controller/uploads/${data[0].avatar}`; // Use backticks for template literals
    const backgroundImage = document.querySelector('.profile-image-label');
    backgroundImage.style.backgroundImage = `url(${avatarImage})`; // Use backticks here as well
    document.getElementById("firstname").value = data[0].firstname;
    document.getElementById("lastname").value = data[0].lastname;
    document.getElementById("phone").value = data[0].mobile;
    document.getElementById("email").value = data[0].email;
}

function editContactDetails(){
    document.getElementById("firstname").readOnly = false;
    document.getElementById("lastname").readOnly = false;
    document.getElementById("phone").readOnly = false;
    document.getElementById("email").readOnly = false;
    document.getElementById("save-contact").hidden= false;
    document.getElementById("add-btn").hidden= false;
    document.getElementById("edit-contact").hidden= true;

}

document.getElementById('edit-contact').addEventListener('click', editContactDetails)

function submitNewForm(e){
    e.preventDefault();
    const form = new FormData(document.querySelector('#contactInfoForm'));
    form.append('apiKey', apiKey);
    form.append('id', id);

    fetch(rootPath + 'controller/edit-contact/',{
        method: 'POST',
        headers: {'Accept': 'application/json, *.*'},
        body: form
    })
    .then(function(response){
        return response.text();
    })
    .then(function(data){
        if(data =="1"){
            alert("Contact edited.");
            navigate_to_edit_contact(id)
        }else{
            alert(data);
            navigate_to_edit_contact(id)
        }
    })
}

document.getElementById("save-contact").addEventListener('click', submitNewForm);

function deleteContact() {
    var confirmDelete = confirm("Delete contact. Are you sure?");

    if (confirmDelete === true) {
        fetch(rootPath + 'controller/delete-contact/?id=' + id)
        .then(function(response) {
            return response.text();
        })
        .then(function(data) {
            if (data === "1") {
                alert("Contact deleted successfully.");
                homeLink(); // redirect or refresh
            } else {
                alert("Failed to delete contact: " + data);
            }
        })
        .catch(function(error) {
            console.error("Error during deletion:", error);
            alert("An error occurred while deleting the contact.");
        });
    }
}

document.getElementById("delete-contact").addEventListener('click', deleteContact);

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
                        <div class="contact-list">
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
                        <div class="contact-list">
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




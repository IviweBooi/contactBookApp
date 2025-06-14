
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
    output = "<table>";

    for(a in data){
        output += `
            <tr>
                <td><img src="${rootPath}controller/uploads/${data[a].avatar}" width='40'/></td>
                <td><h5>${data[a].firstname}</h5></td>
                <td><h5>${data[a].lastname}</h5></td>
                <td><h5>${data[a].mobile}</h5></td>
            </tr>
        `
    }
    output += "</table>";
    document.getElementById("table").innerHTML = output;
}
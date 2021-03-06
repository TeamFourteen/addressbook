var cont_id = '';
//var infoobj = {};
//var infoaddress = {};
//var infophone = {};

//This is the function that hides the leftbar and make the main display take up the whole page.
document.getElementById("hide").addEventListener("click", function() {
    if (main.style.width == "85%") {
        main.style.left = "0px";
        main.style.width = "100%";
    } else {
        main.style.left = "15%";
        main.style.width = "85%";
    }
});

//This function shows the location of the contact's address by changing the style when the address is clicked on.
addresses = document.getElementsByClassName("addrs")

for (i = 0; i < addresses.length; i++) {
    item_id = addresses[i].id;
    if (item_id != "") {
        document.getElementById(item_id).addEventListener("click", function() {
            map = document.getElementById(this.id + "_map")
            if (map.className == "maphide") {
                document.getElementById(this.id).style.height = "250px";
                map.className = "mapshow";
            } else {
                document.getElementById(this.id).style.height = "23px";
                map.className = "maphide";
            }
        })
    }
}

//This function changes the add contact window's display property to show the window.
document.getElementById("addcontacts").addEventListener("click", function() {
    addone.style.display = "block";
})

//This function sends all the user input in the add contact window after it packs all the info to the server.
document.getElementById("confirmadd").addEventListener("click", function() {
    addone.style.display = "none";
    obj = { fname: fnameinputbox.value, lname: lnameinputbox.value, bio: bioinputbox.value };
    fetch("/cont_addcontacts", {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    }).then((response) => {
        return response.json();
    }).then((json) => {
        if (json.status == 'OK') {
            window.location.assign(json.url)
        } else if (json.status == 'NOK') {
            alert('Invalid Bio Input')
        }
    })
    fnameinputbox.value = "";
    lnameinputbox.value = "";
    bioinputbox.value = "";
})

//This function changes the add address window's display property to show the window.
editaddress = document.getElementsByClassName("editaddress")
for (i = 0; i < editaddress.length; i++) {
    document.getElementById(editaddress[i].id).addEventListener("click", function() {
        editaddresspage.style.display = "block";
    })
}

//Once the user done with adding address, it sends the the address data to the server.
document.getElementById("okaddress").addEventListener("click", function() {
    send_info = cont_id.split("_")
    obj = { cont_id: send_info[0], user_id: send_info[1], address: newaddressbox.value };
    fetch("/cont_addaddress", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    }).then((response) => {
        return response.json();
    }).then((json) => {
        if (json.status == 'OK') {
            window.location.assign(json.url)
        } else if (json.status == 'NOK') {
            alert('Invalid Address Input')
        }
    })
    newaddressbox.value = "";
    editaddresspage.style.display = "none";
})

//This function changes the add phone window's display property to show the window.
editphone = document.getElementsByClassName("editphone")
for (i = 0; i < editphone.length; i++) {
    document.getElementById(editphone[i].id).addEventListener("click", function() {
        editphonepage.style.display = "block";
    })
}


//Once the user done with adding phone, it sends the the address data to the server.
document.getElementById("okphone").addEventListener("click", function() {
    var numbers = document.getElementById("newphonebox").value;
    send_info = cont_id.split("_")
    obj = { cont_id: send_info[0], user_id: send_info[1], type: typeselect.value, phone: newphonebox.value };
    fetch("/cont_addphone", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    }).then((response) => {
        return response.json();
    }).then((json) => {
        if (json.status == 'OK') {
            window.location.assign(json.url)
        } else if (json.status == 'NOK') {
            alert('Invalid Phone Input')
        }
    })
    newphonebox.value = "";
    editphonepage.style.display = "none";
    warningpic.style.display = "none";
    warning.style.display = "none";
});

//This function shows the location of the address from user input in add address window.
document.getElementById("viewonmap").addEventListener("click", function() {
    if (previewmap.style.display == "none") {
        previewmap.style.display = "block";
        previewmap.src = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyBo7uKcrJKGkcPuoKgo-Si-pNHAHE4V-5U&q=' + newaddressbox.value;
    } else {
        previewmap.style.display = "none";
    }

});

contacts = document.getElementsByClassName("contacts")
cards = document.getElementsByClassName("cards")

for (i = 0; i < contacts.length; i++) {
    item_id = contacts[i].id;
    document.getElementById(item_id).addEventListener("click", function() {
        for (i = 0; i < cards.length; i++) {
            cards[i].style.display = "none";
        }
        card = document.getElementById(this.id + "_card")
        if (card.style.display == "none") {
            cont_id = card.id
            card.style.display = "block";
        }
    })
}

document.getElementById("search").addEventListener("click", function() {
    addone.style.display = "none";
    searchwindow.style.display = "block";
});

document.getElementById("nameoremail").addEventListener("click", function() {
    if (nameoremail.value == "name") {
        searchnameoremail.placeholder = "Enter name"
    } else {
        searchnameoremail.placeholder = "Enter Email"
    }
});

document.getElementById("searchbutton").addEventListener("click", function() {
    obj = { type: nameoremail.value, keyword: searchnameoremail.value }
    fetch("/cont_sendKeyword", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    }).then((response) => {
        return response.json();
    }).then((json) => {
        console.log(json)
        searchwindow.style.display = "none";
        resultwindow.style.display = "block";
        for (i = 0; i < json.length; i++) {
            newresult = document.createElement("div");
            newresult.innerHTML = json[i].name + " " + " " + " " + " " + json[i].email
            newresult.id = json[i].user_id
            resultwindow.appendChild(newresult);

            newresult.addEventListener("click", function() {
                fetch("/cont_addcontactswithaccount", {
                    method: "POST",
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ cont_info: this.id })
                }).then((response) => {
                    return response.json();
                }).then((json) => {
                    if (json.status == 'OK') {
                        window.location.assign(json.url)
                    } else if (json.status == 'NOK') {
                        alert('Invalid Input')
                    }
                })
            })

        }
    })
})
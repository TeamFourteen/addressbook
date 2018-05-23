nChtRoom = document.getElementById("addCrButton")
addChtRmPupPg = document.getElementById("addChatRoomPopUpPage")
createBtn = document.getElementById("createButton")
perConInfo = document.getElementById("personContactInfo")
nCtRmName = document.getElementById("newChatRoomName")

socket = io();

selected_people = []
userID = 0;
userfullname = ""
currentRoom = 'none'
chatroom = []
crooms = 0

fetch('/chat_user', {
    method: "POST",
    credentials: 'include',
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        "require": "name"
    })
}).then((response) => {
    return response.json();
}).then((json) => {
    userID = json.user_id
    console.log(userID)
    userfullname = json.user_name
})

nChtRoom.addEventListener("click", function() { //  "new chatroom" button 
    addChtRmPupPg.style.display = "block";
    selected_people = []
    console.log(userID)
    fetch('/chat_adUserDiv', {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "require": "name"
        })
    }).then((response) => {
        return response.json();
    }).then((json) => {
        perConInfo.innerHTML = "";
        for (i = 0; i < json.length; i++) {

            adUserDiv = document.createElement("div");
            adUserDiv.className = "adUrDiv";
            adUserDiv.innerHTML = json[i].fName + " " + json[i].lName;
            adUserDiv.id = json[i].userId
            perConInfo.appendChild(adUserDiv);

            adUserDiv.addEventListener('click', function() {
                if (document.getElementById(this.id).className == "adUrDiv") {
                    document.getElementById(this.id).className = "adUrDiv_selected"
                    selected_people.push(this.id)
                    console.log(selected_people)
                } else {
                    document.getElementById(this.id).className = "adUrDiv"
                    selected_people.splice(selected_people.indexOf(this.id), 1);
                    console.log(selected_people)
                }
            })



        }
    })
});



createBtn.addEventListener("click", function() { //"create" new chatroom button
    fetch('/chat_newChatRoomDiv', {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            chatroom_name: document.getElementById('createChatRoomName').value,
            chatroom_users: selected_people
        })
    }).then((response) => {
        return response.json();
    }).then((json) => {
        addChtRmPupPg.style.display = "none";
    })
});

crNum = document.getElementsByClassName('crNum')

for (i = 0; i < crNum.length; i++) {
    document.getElementById(crNum[i].id).addEventListener('click', function() {
        for (j = 0; j < crNum.length; j++) {
            document.getElementById(crNum[j].id + "_display").style.display = 'none'
        }
        document.getElementById(this.id + "_display").style.display = 'block'
        currentRoom = this.id
    })
}

document.getElementById("sendBtn").addEventListener("click", function() { // "Send Message" button
    socket.emit('sendMessage', { room: currentRoom, message: document.getElementById('sendInp').value, user: userfullname });
    document.getElementById('sendInp').value = "";
});

socket.on('reqUser_ID', function(data) {
    setTimeout(function() {
        socket.emit('resUser_ID', { user_id: userID })
    }, 500);

})


socket.on('joinRoom', function(data) {
    var mess = document.createElement("div");
    var user = document.createElement("div");
    var message = document.createElement("div");

    mess.className = "messDiv";
    user.className = "userNameDiv";
    message.className = "textInfoDiv";

    user.innerHTML = "Server: ";
    message.innerHTML = data.message;

    mess.appendChild(user);
    mess.appendChild(message);
    document.getElementById(data.room + "_chatlog").appendChild(mess)
})


socket.on('chat', function(data) {
    var mess = document.createElement("div");
    var user = document.createElement("div");
    var message = document.createElement("div");

    mess.className = "messDiv";
    user.className = "userNameDiv";
    message.className = "textInfoDiv";


    user.innerHTML = data.user + ":";
    message.innerHTML = data.message;



    mess.appendChild(user);
    mess.appendChild(message);
    document.getElementById(data.room + "_chatlog").appendChild(mess);
})

socket.on('room_length', function(data) {
    crooms = data
})

socket.on('new_room', function(data) {
    document.getElementById("chatRoomList").innerHTML += data.selection
    document.getElementById("chatroomMain").innerHTM += data.main_body
    crNum = document.getElementsByClassName('crNum')

    for (i = 0; i < crNum.length; i++) {
        document.getElementById(crNum[i].id).addEventListener('click', function() {
            for (j = 0; j < crNum.length; j++) {
                document.getElementById(crNum[j].id + "_display").style.display = 'none'
            }
            document.getElementById(this.id + "_display").style.display = 'block'
            currentRoom = this.id
        })
    }

    crooms += 1
})
setInterval(function() {
    socket.emit('update_chatroom', { rl_length: crooms })
}, 5000)
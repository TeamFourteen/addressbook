// module.exports = function(){
	// return 'hello';
// };

var crNum1 = document.getElementById("chatRoom1"),
	crNum2 = document.getElementById("chatRoom2"),
	crNum3 = document.getElementById("chatRoom3"),
	ur1Text = document.getElementById("user1_text"),
	ur2Text = document.getElementById("user2_text"),
	ur3Text = document.getElementById("user3_text"),
	sdB = document.getElementById("sendBtn"),
	nChtRoom = document.getElementById("addCrButton"),
	chtDisp = document.getElementById("chatDisplay"),
	addChtRmPupPg = document.getElementById("addChatRoomPopUpPage"),
	createBtn = document.getElementById("createButton"),
	cDetails = document.getElementById("chatDetails"),
	sdInp = document.getElementById("sendInp"),
	addUsers = document.getElementById("addPeopleToChatRoom"),
	perConInfo = document.getElementById("personContactInfo"),
	createCRN = document.getElementById("createChatRoomName"),
	confirmBn = document.getElementById("confrimButton"),
	nCtRmName = document.getElementById("newChatRoomName"),
	socket = io(),
	userid = '',
	currentRoom='',
	//validateChatData = (chatData) => {},
	uNList = document.getElementById("userNameList");

	
	
addUsers.addEventListener("click",function(){
	    fetch('/adUserDiv', {
          method:"POST",
          headers: {
            "Content-Type":"application/json"
          },
          body: JSON.stringify({
            "require":"name"
          })
    }).then((response)=>{
        return response.json();
    }).then((json)=>{
        perConInfo.innerHTML = "";
		console.log(json)
		for(i=0; i < json.length; i++){
			
			console.log(json[i]);
			adUserDiv = document.createElement("div");
			adUserDiv.className = "adUrDiv";
			adUserDiv.innerHTML = json[i].fName+" "+json[i].lName;
			adUserDiv.id = json[i].userId
			
			perConInfo.appendChild(adUserDiv);
		}
    })
});

createBtn.addEventListener("click",function(){
	    fetch('/newChatRoomDiv', {
          method:"POST",
          headers: {
            "Content-Type":"application/json"
          },
          body: JSON.stringify({
            "require":"message"
          })
    }).then((response)=>{
        return response.json();
    }).then((json)=>{
        console.log(json.message)
    })
});



confirmBn.addEventListener("click",function(){
	// socket.emit('sendMessage', {room:currentRoom, message:sdInp.value, user: userid});
	nCtRmName.innerHTML = createCRN.value;
	createCRN.value = "";
});
createCRN.addEventListener("keyup",function(ev){
	if(ev.keyCode=="13"){
		//socket.emit('sendMessage', {room:currentRoom, message:sdInp.value, user: userid});
		nCtRmName.innerHTML = createCRN.value;
		createCRN.value="";
	}
});

	
crNum1.addEventListener("click",function(){
	

	socket.emit("choiceChat",{room:this.id, user:userid});
	
	cDetails.style.display = "block";
});
crNum2.addEventListener("click",function(){
	socket.emit("choiceChat",{room:this.id, user:userid});
	cDetails.style.display = "block";
});
crNum3.addEventListener("click",function(){
	socket.emit("choiceChat",{room:this.id, user:userid});
	cDetails.style.display = "block";
});
sdB.addEventListener("click",function(){
	socket.emit('sendMessage', {room:currentRoom, message:sdInp.value, user: userid});
	sdInp.value = "";
});
sdInp.addEventListener("keyup",function(ev){
	if(ev.keyCode=="13"){
		socket.emit('sendMessage', {room:currentRoom, message:sdInp.value, user: userid});
		sdInp.value="";
	}
});

nChtRoom.addEventListener("click",function(){
	addChtRmPupPg.style.display = "block";
});
createBtn.addEventListener("click",function(){
	addChtRmPupPg.style.display = "none";
	alert("Add Person to Chat room !!!")
});

socket.on('chat', function(data){
	var mess = document.createElement("div");
	var user = document.createElement("div");
	var message = document.createElement("div");
	
	mess.className="messDiv";
	user.className="userNameDiv";
	message.className="textInfoDiv";

	
	user.innerHTML = data.user+":";
	message.innerHTML = data.message;
	

	
	mess.appendChild(user);
	mess.appendChild(message);
	cDetails.appendChild(mess);
	
	
	//cDetails.appendChild(message)
})
socket.on('currentRoom', function(data){
	currentRoom = data;
	console.log(currentRoom)
})
socket.on('userAcount',function(data){
	userid=data
})
socket.on('joinRoom',function(data){
	uNList.innerHTML = ''
	for(var i=0;i<data.length; i++){
		var user= document.createElement("div")
	user.innerHTML = data[i]
	uNList.appendChild(user)
	user.className = "users"
	}
	
});









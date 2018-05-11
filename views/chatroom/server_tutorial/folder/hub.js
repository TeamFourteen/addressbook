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
	socket = io(),
	userid = '',
	currentRoom='',
	uNList = document.getElementById("userNameList");
	

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
	user.innerHTML = data.user+": "+data.message;
	//message.innerHTML = data.message;
	
	user.className = "users"
	
	mess.appendChild(user)
	mess.appendChild(message)
	cDetails.appendChild(mess)
	
	
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
	}
	
});









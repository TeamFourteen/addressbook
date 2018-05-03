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
	createBtn = document.getElementById("createButton");

crNum1.addEventListener("click",function(){
	ur3Text.innerHTML = "This is User3's Text"
	ur2Text.innerHTML = "This is User2's Text"
	ur1Text.innerHTML = "This is User1's Text"
});
crNum2.addEventListener("click",function(){
	ur3Text.innerHTML = ""
	ur2Text.innerHTML = ""
	ur1Text.innerHTML = ""
});
crNum3.addEventListener("click",function(){
	ur3Text.innerHTML = ""
	ur2Text.innerHTML = ""
	ur1Text.innerHTML = ""
});
sdB.addEventListener("click",function(){
	alert("Testing Send Button  !!!")
});
nChtRoom.addEventListener("click",function(){
	addChtRmPupPg.style.display = "block";
});
createBtn.addEventListener("click",function(){
	addChtRmPupPg.style.display = "none";
	alert("Add Person to Chat room !!!")
});













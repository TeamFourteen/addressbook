buttonSelection = document.getElementsByClassName("left_options")
frames = document.getElementsByClassName("right_window")

document.getElementById("add").addEventListener("click", () => {
    document.getElementById("addContact").style.display = "block";
    document.getElementById("updateInfo").style.display = "none";
})

document.getElementById("update").addEventListener("click", () => {
    document.getElementById("addContact").style.display = "none";
    document.getElementById("updateInfo").style.display = "block";
})

window.onclick = function(event) {
    if ((event.target == document.getElementById("addContact")) || (event.target == document.getElementById("updateInfo"))) {
        document.getElementById("addContact").style.display = "none";
        document.getElementById("updateInfo").style.display = "none"
    }
    if (event.target == document.getElementById("a_view")) {
        document.getElementById("a_updateRev").src = "https://www.google.com/maps/embed/v1/place?key=AIzaSyBo7uKcrJKGkcPuoKgo-Si-pNHAHE4V-5U&q=" + document.getElementById("a_address").value
     
    }
    if (event.target == document.getElementById("u_view")) {
        document.getElementById("u_updateRev").src = "https://www.google.com/maps/embed/v1/place?key=AIzaSyBo7uKcrJKGkcPuoKgo-Si-pNHAHE4V-5U&q=" + document.getElementById("u_address").value
     
    }
}



document.getElementById("logout").addEventListener("click", ()=>{
	fetch("/logout", {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
            "command": "End Session"
		})
	}).then((response)=>{
		return response.json()
	}).then((json)=>{
		if (json.status === "OK"){
			window.location.assign("/")
		}
	})
})

for (i = 0; i < buttonSelection.length; i++) {
	button_id = buttonSelection[i].id
	document.getElementById(button_id).addEventListener("click", function(){ //Use the function() instead of ()=>{} when referring to this.something

		for (i = 0; i < frames.length; i++) {
			frames[i].style.display = "none"
		}

		element = this.id
		pos = element.indexOf("_button")
		e2 = element.slice(0 ,pos)

		document.getElementById(e2).style.display = "block"
	})
}

var evname =document.getElementById('evname'),
    eventname = document.getElementById('eventname'),
    date = document.getElementById('datefrom'),
    submit = document.getElementById('submit'),
    datefrom = document.getElementById('datefrom'),
    hourfrom = document.getElementById('hourfrom'),
    tohour = document.getElementById('tohour'),
    todate = document.getElementById('todate'),
    address = document.getElementById('address'),
    info = document.getElementById('info'),
    objectarr =[];

submit.addEventListener("click",function(){
    eventname.innerHTML = evname.value;
    var objects ={event:(eventname.innerHTML),
                from:('Date:'+datefrom.value+'/'+hourfrom.value+':00 To'),
                end:('Date:'+todate.value+'/'+tohour.value+':00'),
                address:(address.value)};
    
    objectarr.push(objects);
    var newd=document.createElement('div'),
        fromtime ='',
        endtime ='',
        addressa ='';
    for(i=0;i<objectarr.length;i++){
        fromtime = objectarr[i].from;
        endtime = objectarr[i].end;
        addressa = objectarr[i].address;
    }
    newd.innerHTML = fromtime+endtime+' '+addressa;
    info.appendChild(newd);
    console.log(fromtime);
});



todate.addEventListener("change",function(){
    if(todate.value >'31'){
        todate.value = 31
    }
});

tohour.addEventListener("change",function(){
    if(tohour.value >'24'){
        tohour.value = 24
    }
});

datefrom.addEventListener("change",function(){
    if(datefrom.value >'31'){
        datefrom.value = 31
    }
});

hourfrom.addEventListener("change",function(){
    if(hourfrom.value >'24'){
        hourfrom.value = 24
    }
});





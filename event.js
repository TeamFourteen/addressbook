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
    submit = document.getElementById('submit'),
    startfrom = document.getElementById('startfrom'),
    endtime = document.getElementById('endtime'),
    address = document.getElementById('address'),
    info = document.getElementById('info'),
    objectarr =[];

console.log(endtime.value);

submit.addEventListener("click",function(){
    //check();
    var objects ={event:(evname.value),
                from:(startfrom.value),
                end:(endtime.value),
                address:(address.value)};
    
    objectarr.push(objects);
    console.log(objectarr);
    
    var newd=document.createElement('div'),
        fromtime ='',
        endtime ='',
        location ='';
    
    for(i=0;i<objectarr.length;i++){
        evename = objectarr[i].event;
        fromtime = objectarr[i].from;
        endtime = objectarr[i].end;
        location = objectarr[i].address;
    }
    
    newd.innerHTML ='Event Name: '+evename+'<br />';
    newd.innerHTML +='From: '+fromtime+'<br />';
    newd.innerHTML +='End: '+endtime+'<br />';
    newd.innerHTML +='Location: '+location+'<br /><br />';
    newd.style.fontSize ='20px';
    newd.style.textAlign ='left';
    info.appendChild(newd);
});


function check(){
    if (evname.value == ''){
        alert('You should enter a event name');
        throw new Error("Something went wrong!");
    }else if(startfrom.value==''){
        alert('You should enter the start time');
        throw new Error("Something went wrong!");
    }else if(endtime.value==''){
        alert('You should enter a ending time');
        throw new Error("Something went wrong!");
    }
    
}




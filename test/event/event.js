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
    starttime=document.getElementById('hourf'),
    endtime = document.getElementById('endtime'),
    endh = document.getElementById('endh'),
    address = document.getElementById('address'),
    info = document.getElementById('info'),
    objectarr =[];

function createinfo(ev){
    var newd=document.createElement('div'),
        fromtime ='',
        endti ='',
        location ='';
    
    for(i=0;i<ev.length;i++){
        evename = ev[i].event;
        fromtime = ev[i].from;
        starthour = ev[i].fromh;
        endti = ev[i].endt;
        endho = ev[i].endh;
        location = ev[i].address;
    }
    
    newd.innerHTML ='Event Name: '+evename+'<br />';
    newd.innerHTML +='From: '+fromtime+'  '+starthour+'<br />';
    newd.innerHTML +='End: '+endti+'  '+endho+'<br />';
    newd.innerHTML +='Location: '+location+'<br /><br />';
    newd.style.fontSize ='20px';
    newd.style.textAlign ='left';
    info.appendChild(newd);
}

submit.addEventListener("click",function(){
    console.log(endtime.value);
    check();
    var objects ={event:(evname.value),
                from:(startfrom.value),
                fromh:(starttime.value),
                endt:(endtime.value),
                endh:(endh.value),
                address:(address.value)};
    
    objectarr.push(objects);
    console.log(objectarr);
    
    createinfo(objectarr);
    
    fetch('/',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(
            objects
        )
    }).then((response)=>{
        return response.json();
    }).then((json)=>{
        console.log(json.message)
    })
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
    }else if(starttime.value==''){
        alert('You should enter the details of start time');
        throw new Error("Something went wrong!");
    }else if(endh.value==''){
        alert('You should enter the details of ending time');
        throw new Error("Something went wrong!");
    }else if(endtime.value < startfrom.value){
        alert('The end time must be greater than the start time');
        endtime.value = startfrom.value;
        throw new Error("Something went wrong!");
    }else if(endtime.value == startfrom.value){
        if(starttime.value > endh.value){
            alert('The end time must be greater than the start time when they are on the same date');
            endh.value = starttime.value;
            throw new Error("Something went wrong!");
        }
    }
    
}





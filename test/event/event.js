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
    startdate = document.getElementById('startdate'),
    starttime=document.getElementById('starttime'),
    enddate = document.getElementById('enddate'),
    endtime = document.getElementById('endtime'),
    address = document.getElementById('address'),
    info = document.getElementById('info'),
    invite = document.getElementById('invite'),
    objectarr =[];

function createinfo(ev){
    var newd=document.createElement('div'),
        fromtime ='',
        endti ='',
        location ='';
    
    for(i=0;i<ev.length;i++){
        evename = ev[i].event;
        fromtime = ev[i].fromdate;
        starthour = ev[i].fromtime;
        endti = ev[i].enddate;
        endho = ev[i].endtime;
        location = ev[i].address;
        invitemember = ev[i].invitemem;
    }
    
    //newd.innerHTML ='Event Name: '+evename+'<br />';
    //newd.innerHTML +='From: '+fromtime+'  '+starthour+'<br />';
    //newd.innerHTML +='End: '+endti+'  '+endho+'<br />';
    //newd.innerHTML +='Location: '+location+'<br /><br />';
    //newd.style.fontSize ='20px';
    //newd.style.textAlign ='left';
    //info.appendChild(newd);
}



submit.addEventListener("click",function(){
    check();
    var objects ={eventname:(evname.value),
                fromdate:(startdate.value),
                fromtime:(starttime.value),
                enddate:(enddate.value),
                endtime:(endtime.value),
                address:(address.value),
                invitemem:(invite.value)};
    
    objectarr.push(objects);
    createinfo(objectarr);
    console.log(objectarr);
    
    fetch('/event',{
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
    });

    location.reload(true);
});

function check(){
    if (evname.value == ''){
        alert('You should enter a event name');
        throw new Error("Do not enter a event name");
    }else if(starttime.value==''){
        alert('You should enter the start time');
        throw new Error("Do not enter the start time");
    }else if(endtime.value==''){
        alert('You should enter a ending time');
        throw new Error("Do not enter the end time");
    }else if(startdate.value==''){
        alert('You should enter the details of start time');
        throw new Error("Do not enter the start date");
    }else if(enddate.value==''){
        alert('You should enter the details of ending time');
        throw new Error("Do not enter the end date");
    }else if(enddate.value < startdate.value){
        alert('The end time must be greater than the start time');
        enddate.value = startdate.value;
        throw new Error("The end date can not be smaller than the start date");
    }else if(enddate.value == startdate.value){
        if(starttime.value > endtime.value){
            alert('The end time must be greater than the start time when they are on the same date');
            endtime.value = starttime.value;
            throw new Error("The end time should not be smaller than the start time");
        }
    }
};






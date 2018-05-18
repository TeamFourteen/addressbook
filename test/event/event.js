var evname =document.getElementById('evname'),
    submit = document.getElementById('submit'),
    startdate = document.getElementById('startdate'),
    starttime=document.getElementById('starttime'),
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
});

function check(){
    if (evname.value == ''){
        alert('You should enter a event name');
        throw new Error("Do not enter a event name");
    }else if(starttime.value==''){
        alert('You should enter the start time');
        throw new Error("Do not enter the start time");
    }else if(startdate.value==''){
        alert('You should enter the details of start time');
        throw new Error("Do not enter the start date");
    }
};






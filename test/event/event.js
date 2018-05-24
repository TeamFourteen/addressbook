var evname =document.getElementById('evname'),
    submit = document.getElementById('submit'),
    startdate = document.getElementById('startdate'),
    starttime=document.getElementById('starttime'),
    address = document.getElementById('address'),
    info = document.getElementById('info'),
    invite = document.getElementById('invite'),
    selectmem = document.getElementById('selectmem'),
    objectarr =[],
    selectpeople=[],
    submitBut=document.getElementById('submitInvite'),
    member=document.getElementById('member'),
    leftbox = document.getElementById('left_selection');

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
};


selectmem.addEventListener("click",function(){
    selectpeople=[];
    fetch('/selectpeople',{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            text:"invite people"
        })
    }).then((response)=>{
        return response.json();
    }).then((json)=>{
        member.style.display="inline";
        submitBut.style.display="inline";
        leftbox.appendChild(submitBut);
        leftbox.appendChild(member);
        var num1 =10,
            num2 =10;
        for(var num =0; num<json.length;num++){
            ndiv= document.createElement('button');
            ndiv.id="ndiv"+num;
            ndiv.className="newdivs";
            ndiv.innerHTML=json[num].lname+" "+json[num].fname;
            ndiv.style.position="absolute";
            ndiv.style.left=num1+"%";
            ndiv.style.height="30%";
            ndiv.style.width="30%";
            ndiv.style.top=num2+"%";
            member.appendChild(ndiv);
            num1+=35;
            if (num1>=70){
                num1 = 10;
                num2 =num2+25;
            }      
        };
        
        var newdivs = document.getElementsByClassName('newdivs');
        
        for (var n=0;n<newdivs.length;n++){
            newdiv = newdivs[n].id;
            document.getElementById(newdiv).addEventListener("click",function(){
                console.log(this.innerHTML);               
                alert(this.innerHTML+' has been added');
                selectpeople.push(this.innerHTML);
                member.removeChild(this);
                console.log(selectpeople);
            });
        };    
    });
});

submitBut.addEventListener('click',function(){
    submitBut.style.display="none";
    member.style.display="none";
});

submit.addEventListener("click",function(){
    check();
    var objects ={eventname:(evname.value),
                fromdate:(startdate.value),
                fromtime:(starttime.value),
                address:(address.value),
                invitemem:(selectpeople)};
    
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






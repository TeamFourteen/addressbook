var count = 1;
var infoobj = {};
var infoaddress = {};
var infophone = {};

document.getElementById("hide").addEventListener("click",function(){
    if(leftbar.style.left == "0px"){
        leftbar.style.left = "-15vw";
        leftbar.style.transition = "0.5s";
        main.style.left = "0px";
        main.style.width = "100vw";
        main.style.transition = "0.5s";
        info.style.width = "25vw";
        info.style.left = "2vw";
        address.style.width = "25vw";
        address.style.left = "28vw";
        phone.style.width = "25vw";
        phone.style.left = "54vw";
    }
    else{
        leftbar.style.left = "0px";
        leftbar.style.transition = "0.5s";
        main.style.left = "15vw";
        main.style.width = "85vw";
        main.style.transition = "0.5s";
        info.style.width = "20vw";
        info.style.left = "3vw";
        address.style.width = "20vw";
        address.style.left = "25vw";
        phone.style.width = "20vw";
        phone.style.left = "47vw";
        
    }
});

document.getElementById("addcontacts").addEventListener("click",function(){
    var newcontact = document.createElement("div");
    leftbar.appendChild(newcontact);
    newcontact.className = "contacts";
    count = count + 1;
    newcontact.innerHTML = "Contact"+String(count);
});

//document.getElementById("addr1").addEventListener("click",function(){
//    if(addr1.style.height != "250px"){
//        addr1.style.height = "250px";
//        map1.style.display = "block";
//    }
//    else{
//        addr1.style.height = "23px";
//        map1.style.display = "none";
//    }
//});
//
//document.getElementById("addr2").addEventListener("click",function(){
//    if(addr2.style.height != "250px"){
//        addr2.style.height = "250px";
//        map2.style.display = "block";
//    }
//    else{
//        addr2.style.height = "23px";
//        map2.style.display = "none";
//    }
//});
//
//document.getElementById("addr3").addEventListener("click",function(){
//    if(addr3.style.height != "250px"){
//        addr3.style.height = "250px";
//        map3.style.display = "block";
//    }
//    else{
//        addr3.style.height = "23px";
//        map3.style.display = "none";
//    }
//});

addresses = document.getElementsByClassName("addrs")

for(i = 0; i < addresses.length; i++){
    item_id = addresses[i].id;
    document.getElementById(item_id).addEventListener("click",function(){
        map = document.getElementById(this.id+"_map")
        if(map.className == "maphide"){
            document.getElementById(this.id).style.height = "250px";
            map.className = "mapshow";
        }
        else{
            document.getElementById(this.id).style.height = "23px";
            map.className = "maphide";
        }
    })
}

document.getElementById("addcontacts").addEventListener("click",function(){
    addone.style.display = "block";
})

document.getElementById("confirmadd").addEventListener("click",function(){
    addone.style.display = "none";
    infoobj.fname = fnameinputbox.value;
    infoobj.lname = lnameinputbox.value;
    infoobj.bio = bioinputbox.value;
    infoobj.email = emailinputbox.value;
    console.log(infoobj);
    fnameinputbox.value = "";
    lnameinputbox.value = "";
    bioinputbox.value = "";
    emailinputbox.value = "";
    fetch("/item",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
        want:"ice cream"
    })
    }).then((response)=>{
        return response.json();
    }).then((json)=>{
        console.log(json.message)
    })
})

document.getElementById("editaddress").addEventListener("click",function(){
    editaddresspage.style.display = "block";
})

document.getElementById("okaddress").addEventListener("click",function(){
    infoaddress.newaddress = newaddressbox.value;
    newaddressbox.value = "";
    infoobj.address = infoaddress;
    editaddresspage.style.display = "none";
    console.log(infoobj);
})

document.getElementById("editphone").addEventListener("click",function(){
    editphonepage.style.display = "block";
})

document.getElementById("okphone").addEventListener("click",function(){
    infophone.newphone = newphonebox.value;
    newphonebox.value = "";
    infoobj.phone = infophone;
    editphonepage.style.display = "none";
    console.log(infoobj);
})


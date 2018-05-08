var count = 1;

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
})

document.getElementById("editaddress").addEventListener("click",function(){
    
})
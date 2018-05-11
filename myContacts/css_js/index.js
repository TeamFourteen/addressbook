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
//    infoobj.fname = fnameinputbox.value;
//    infoobj.lname = lnameinputbox.value;
//    infoobj.bio = bioinputbox.value;
//    infoobj.email = emailinputbox.value;
//    console.log(infoobj);
//    
    
    obj = {fname: fnameinputbox.value, lname: lnameinputbox.value, bio: bioinputbox.value, email: emailinputbox.value};
    fetch("/addcontacts",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(obj)
    }).then((response)=>{
        return response.json();
    }).then((json)=>{
        console.log(json.message)
    })
    fnameinputbox.value = "";
    lnameinputbox.value = "";
    bioinputbox.value = "";
    emailinputbox.value = "";
//    fetch("/item",{
//        method:"POST",
//        headers:{
//            "Content-Type":"application/json"
//        },
//        body:JSON.stringify({
//        want:"ice cream"
//    })
//    }).then((response)=>{
//        return response.json();
//    }).then((json)=>{
//        console.log(json.message)
//    })
})

document.getElementById("editaddress").addEventListener("click",function(){
    editaddresspage.style.display = "block";
})

document.getElementById("okaddress").addEventListener("click",function(){
    obj = {address: newaddressbox.value};
    fetch("/addaddress",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(obj)
    }).then((response)=>{
        return response.json();
    }).then((json)=>{
        console.log(json.message)
    })
    newaddressbox.value = "";
    editaddresspage.style.display = "none";
})

document.getElementById("editphone").addEventListener("click",function(){
    editphonepage.style.display = "block";
})

document.getElementById("okphone").addEventListener("click",function(){
    var numbers = document.getElementById("newphonebox").value;
    if(numbers.length >= 10 & numbers.length <= 14 & numbers == parseInt(numbers, 10)){
        
        obj = {type: typeselect.value, phone:newphonebox.value};
        fetch("/addphone",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(obj)
    }).then((response)=>{
        return response.json();
    }).then((json)=>{
        console.log(json.message)
    })
        newphonebox.value = "";
        editphonepage.style.display = "none";
        warningpic.style.display = "none";
        warning.style.display = "none";
    }else{
        warningpic.style.display = "block";
        warning.style.display = "block";
        newphonebox.value = "";
    }
    
});


document.getElementById("viewonmap").addEventListener("click",function(){
    if(previewmap.style.display == "none"){
        previewmap.style.display = "block";
        previewmap.src = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyBo7uKcrJKGkcPuoKgo-Si-pNHAHE4V-5U&q='+newaddressbox.value;
    }else{
        previewmap.style.display = "none";
    }
    
});

contacts = document.getElementsByClassName("contacts")
cards = document.getElementsByClassName("cards")

for(i = 0; i < contacts.length; i++){
    item_id = contacts[i].id;
    document.getElementById(item_id).addEventListener("click",function(){
        for(i=0; i< cards.length; i++){
            cards[i].style.display = "none";
        }
        card = document.getElementById(this.id+"_card")
        if(card.style.display == "none"){
            card.style.display = "block";
        }
    })
}
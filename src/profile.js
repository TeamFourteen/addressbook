var addressDiv = document.getElementById("addressDiv");
var addressClass = document.getElementsByClassName("addressClass");
var contactAdd = document.getElementById("contactAdd");
var contactInputs = document.getElementById("contactInputs");
var addressAdd = document.getElementById("addressAdd");
var addressInputs = document.getElementById("addressInputs");
var addAddress = document.getElementById("addAddress");
var addressInput = document.getElementById("addressInput");
var phoneInput = document.getElementById("phoneInput");
var addPhone = document.getElementById("addPhone");
var phoneType = document.getElementById("phoneType");
var bioAdd = document.getElementById("bioAdd");
var bioInputs = document.getElementById("bioInputs");
var addBio = document.getElementById("addBio");
var bioInput = document.getElementById("bioInput");
var phoneDone = document.getElementById("phoneDone");
var addressDone = document.getElementById("addressDone");
var bioDone = document.getElementById("bioDone");

bioDone.addEventListener("click", function(){
   bioInputs.style.display = "none"; 
});

phoneDone.addEventListener("click", function(){
   contactInputs.style.display = "none"; 
});

addressDone.addEventListener("click", function(){
   addressInputs.style.display = "none"; 
});

for(i=0; i < addressClass.length; i++){
  address = addressClass[i].id
    document.getElementById(address).addEventListener("click", function(){
        if(document.getElementById(this.id+"_map").className == "mapHide"){
          document.getElementById(this.id+"_map").className = "mapShow";  
        } else {
            document.getElementById(this.id+"_map").className = "mapHide";
        }
    });
};



bioAdd.addEventListener("click", function(){
   bioInputs.style.display = "block"; 
});

addBio.addEventListener("click", function(){
    fetch('/prof_bio', {
          method:"POST",
          headers: {
            "Content-Type":"application/json"
          },
          body: JSON.stringify({
            bio:bioInput.value
          })
    }).then((response)=>{
        return response.json();
    }).then((json)=>{
        console.log(json.message)
    })
    
    bioInput.value = "";
});

contactAdd.addEventListener("click", function(){
    contactInputs.style.display = "block";
});

addPhone.addEventListener("click", function(){
    fetch('/prof_phones', {
          method:"POST",
          headers: {
            "Content-Type":"application/json"
          },
          body: JSON.stringify({
            type:phoneType.value, phone:phoneInput.value
          })
    }).then((response)=>{
        return response.json();
    }).then((json)=>{
        console.log(json.message)
    })
    
    phoneInput.value = "";
});

addressAdd.addEventListener("click", function(){
   addressInputs.style.display = "block"; 
});

addAddress.addEventListener("click", function(){
    fetch('/prof_address', {
          method:"POST",
          headers: {
            "Content-Type":"application/json"
          },
          body: JSON.stringify({
            "address":addressInput.value
          })
    }).then((response)=>{
        return response.json();
    }).then((json)=>{
        console.log(json.message)
    })
    
    addressInput.value = "";
});


document.getElementById("button").addEventListener("click",function(){
    wtf.style.height = "100%";
    wtf.style.height = "60%";
    wtf.style.backgroundColor = "blue";
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
});

var phones = document.getElementsByClassName("phones");

for(i = 0; i < phones.length; i++){
	phone = phones[i].id
	document.getElementById(phone).addEventListener("click", function(){
		document.getElementById(this.id).style.color = "red";
		document.getElementById(this.id).style.fontSize = "100px";
	})
}
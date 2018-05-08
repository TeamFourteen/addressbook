

document.getElementById("button").addEventListener("click",function(){
	document.getElementById("box").style.width="2500px";
	document.getElementById("box").style.height="2500px";
	fetch('/item', {
		method:"POST",
		headers:{
			"Content-type":"application/json"
		},
		body:JSON.stringify({
			"want":"money"
		})
	}).then((response)=>{}
	return response.json();
	}).then((json)=>{
		console.log(json.message)
	})
});

for(i=0; i<phones.length; i++){
	phone = phones[i].id
	document.getElementById(this.id).style.fontSize = "25px";
	document.getElementById(this.id).style.color = "red";
	});
});
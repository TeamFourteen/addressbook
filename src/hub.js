main_window = document.getElementById('main_window')
indiv_styles = document.getElementById('indiv_styles')
indiv_scripts = document.getElementById('indiv_scripts')

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

document.getElementById("profile").addEventListener('click', ()=>{
	fetch("/profile", {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
            "command": "profile"
		})
	}).then((response)=>{
		return response.json()
	}).then((json)=>{
		console.log(json)
		main_window.innerHTML = json.layout
		indiv_styles.href = json.style
		document.getElementById('indiv_scripts').src = json.script
	})
})

document.getElementById("contacts").addEventListener('click', ()=>{
	fetch("/contacts", {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
            "command": "profile"
		})
	}).then((response)=>{
		return response.json()
	}).then((json)=>{
		console.log(json)
		main_window.innerHTML = json.layout
		indiv_styles.href = json.style
		document.getElementById('indiv_scripts').src = json.script
	})
})


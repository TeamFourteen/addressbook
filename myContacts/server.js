const hbs = require("hbs")
const express = require("express")
const app = express()
const bodyparser = require("body-parser")
app.use(express.static(__dirname + "/wtf"))
app.use(bodyparser.json())

app.use(express.static(__dirname + "/css_js"))
app.set("view engine", "hbs")
app.get("/", function(require, response){
	response.render("index.hbs", {
		contacts: [{
            fname: "John",
            lname: "Doe",
            phonenumber: [{type: "Cell", number: "1234567890"}, {type: "Home", number: "0987654321"}, {type: "Work", number: "4237892347590"}],
            address: [{cont_id: 1, addr: "555 Seymour St"}, {cont_id: 2, addr: "Scott Road Station 110th Ave"}, {cont_id: 3, addr: "10720 King George blvd"}]
        }, {
            fname: "Anakin",
            lname: "Skywalker",
            phonenumber: [{type: "Cell", number: "99999999"}, {type: "Home", number: "1111111111"}, {type: "Work", number: "555555555"}],
            address: [{cont_id: 4, addr: "555 Seymour St"}, {cont_id: 5, addr: "Scott Road Station 110th Ave"}, {cont_id: 6, addr: "10720 King George blvd"}]
        }]
        
        
	})
//	response.sendFile(__dirname + "/index.html")
})

app.post("/addcontacts", function(require, response){
    console.log(require.body)
    response.send({message: "Personal info added"})
})

app.post("/addaddress", function(require, response){
    console.log(require.body)
    response.send({message: "Address added"})
})

app.post("/addphone", function(require, response){
    console.log(require.body)
    response.send({message: "Phone added"})
})

app.listen(4500, function(err){
	if(err){
		console.log(err)
	}
	console.log("listening on port 4500")
})


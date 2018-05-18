const hbs = require("hbs")
const express = require("express")
const app = express()
const bodyparser = require("body-parser")
const validation = require("./private/validation.js")
//-------------------------------------------------------------  
//This part of the script is run first before the whole sending to the client part
app.use(express.static(__dirname + "/wtf"))
app.use(bodyparser.json())
app.use(express.static(__dirname + "/css_js"))
app.set("view engine", "hbs")
//------------------------------------------------------------
// app.get('/') is your first page of the website
app.get("/", function(require, response){
	response.render("index.hbs", { //This response.render is where you change the page data into html format
		contacts: [{
            cont_id: 10,
            fname: "John",
            lname: "Doe",
            phonenumber: [{type: "Cell", number: "1234567890"}, {type: "Home", number: "0987654321"}, {type: "Work", number: "4237892347590"}],
            address: [{cont_id: "10_1", addr: "555 Seymour St"}, {cont_id: "10_2", addr: "Scott Road Station 110th Ave"}, {cont_id: "10_3", addr: "10720 King George blvd"}]
        }, {
            cont_id: 11,
            fname: "Anakin",
            lname: "Skywalker",
            phonenumber: [{type: "Cell", number: "99999999"}, {type: "Home", number: "1111111111"}, {type: "Work", number: "555555555"}],
            address: [{cont_id: "11_4", addr: "555 Seymour St"}, {cont_id: "11_5", addr: "Scott Road Station 110th Ave"}, {cont_id: "11_6", addr: "10720 King George blvd"}]
        }]
        
        
	})
//	response.sendFile(__dirname + "/index.html")
})

//-------------------------------------------------------------------------------------------
//These are all your routes which the client will 'fetch' from
app.post("/addcontacts", function(require, response){
    console.log(require.body)
    response.send({message: "Personal info added"})
})

app.post("/addaddress", function(require, response){
    console.log(require.body)
    response.send({message: "Address added"})
})

app.post("/addphone", function(require, response){
    console.log(require.body);
    if(validation.validate_obj(require.body) == true){
        console.log("Phone added")
        response.send({message: "Phone added"});
    }else{
        response.send({message: "Phone not added"});
    }
    
})

app.post("/sendKeyword", function(require, response){
    console.log(require.body)
    //response.send({message: "Keyword sent"})
    if(require.body.name == "Kaiser"){
        result = [{name: "Kaiser Willhelm", email: "KaiserW@gmail.com"}, {name: "Kaiser Ferdinand", email:" KaiserF@yahoo.com"}]
        response.json(result)
    }
})
//---------------------------------------------------------------------------------------------
//This is the part of your code which will start the server
app.listen(4500, function(err){
	if(err){
		console.log(err)
	}
	console.log("listening on port 4500")
})


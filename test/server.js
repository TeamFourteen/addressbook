const hbs = require("hbs")
const express = require("express")
const app = express()
const bodyparser = require("body-parser")
app.use(express.static(__dirname + "/wtf"))
app.use(bodyparser.json())

app.set("view engine", "hbs")
app.get("/", function(require, response){
	/*response.render("something.hbs", {
		stuff:"what the hair",
		phonenumber: [{phone:"1234567", name:"hahahaha"}, {phone:"2345667", name:"qweopuiqpty"}, {phone:"890436798", name:"hasdf"}]
	})*/
	response.sendFile(__dirname + "/index.html")
})

app.get("/ice", function(require, response){
	response.send("juicy ice")
})

app.post("/item", function(require, response){
    console.log(require.body.want)
    response.send({message:"I got them ONE HUGE ice cream"})
})

app.listen(4500, function(err){
	if(err){
		console.log(err)
	}
	console.log("listening on port 4500")
})


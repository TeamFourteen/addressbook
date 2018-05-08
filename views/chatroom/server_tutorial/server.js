const express = require("express")
const app = express()
const bodyParser = require("body-parser")  //helps with retrieveing stuff from database
const hbs = require('hbs')
const port = 3000;

app.use(express.static(__dirname+ "/folder"))
app.use(bodyParser.json())  //this will run first before it sends something

app.set('view engine' ,'hbs')

app.get("/",function(require,response){
	response.render("index.hbs",{
		stuff:"a message",
		phoneNumber: [{phone:"1234567890", name:"Jone Doe"}, {phone:"6845324567", name:"Jane DOe"},{phone:"4168888888", name:"Jame"}]
	});
});
app.get("/cont", function(require,response){
	response.send("Come on")
})

app.post("/item",function(require,response){
	console.log(require.body.want)
	response.send({message:"I get them ice"})
})
	
	
app.listen(port,function(err){
	if(err){
		console.log(err)
	}
	console.log("listening on port 3000")
});


app.use(bodyParser.json())




hbs.registerPartials(__dirname + "/views/partials")



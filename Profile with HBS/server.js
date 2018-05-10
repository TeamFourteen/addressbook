const express = require("express")  //imports express module which helps with making internet connections 
const app = express()
const bodyParser = require("body-parser") //helps with retrieveing stuff from database
const hbs = require("hbs")

app.use(express.static(__dirname + "/css_js"))
app.use(bodyParser.json()) // this will run first before it sends something
app.set("view engine", "hbs")
//--------------------------------------------------------------------
app.get('/', function(require,response){
    
	response.render("index.hbs", {

        profileName:[{fname:"Jhon", lname:"Doe"}],
        bio:"This is a sample Bio",
        phoneNumber: [{type:"Cell Phone:", phone:"123-123-1234"}, {type:"Work Phone:", phone:"123-123-1234"}, {type:"Home Phone:", phone:"123-123-1234"}]
    })
    
}) //This is called a router which helps you get to your page

app.post('/item', (require,response)=>{
    console.log(require.body.want)
    response.send({message:"I got them monies"})
});

app.get('/profile', (require,response)=>{
  profileInfo = {fname:"fname", lname:"lname", bio:"A users bio", email:"email", phone:["1234", "5678", "9012"], addresses:["first street", "second second avenue", "three third road"]}
    
    response.render("profile.hbs", profileInfo);
    //INCORPORATE ^^^ KEYS ^^^ AS THE HBS THINGS
});

app.get("/message",(require,response)=>{
    
	response.send("first message")
    
});

//-------------------------------------------------------------------
app.listen(4500, function(err){
	if(err){
		console.log(err)
	}
	console.log("listening on port 4500")
})

// response.sendFile(__dirname + "/example.html")


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
        profileName:"Profile Name",
        phoneNumber: [{phone:"1234567890", name:"John Doe"},{phone:"6045324567", name:"Jane Doe"},{phone:"4145679087", name:"November Falls"}]
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




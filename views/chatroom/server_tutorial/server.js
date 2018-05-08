const express = require("express")  //imports express module which helps with making internet connections 
const app = express()
const bodyParser = require("body-parser") //helps with retrieveing stuff from database
const hbs = require("hbs");

const http = require("http").createServer(app);
const io = require("socket.io").listen(http);


var char_room= ["chatRoom1","chatRoom2","chatRoom3"],
	user_count = 0;
	


app.use(express.static(__dirname + "/folder")) //<-- css and javascript
app.use(bodyParser.json()) // this will run first before it sends something
app.set("view engine", "hbs")
//--------------------------------------------------------------------
app.get('/', function(require,response){
    
	response.render("index.hbs", {
        stuff:"a message",
        phoneNumber: [{phone:"1234567890", name:"John Doe"},{phone:"6045324567", name:"Jane Doe"},{phone:"4145679087", name:"November Falls"}]
    })
    
}) //This is called a router which helps you get to your page
app.get('/chat',function(require,response){
	response.sendFile(__dirname + "/chat.html")
	
});
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
var users=[];
io.on('connection', function(socket){
	console.log("user connected")
	user_count +=1
	socket.emit('userAcount', 'user'+user_count.toString())
	socket.on("choiceChat", function(data){      //socket.on <--listen 
		console.log(data)
		socket.join(data.room)
		socket.emit('currentRoom', data.room)
		users.push(data.user)
		io.in(data.room).emit('joinRoom', users)
		io.in(data.room).emit('chat', {user:'server', message:'someone has joined this room'}) //anything.emit <-- say something
	})
	socket.on("sendMessage", function(data){
		io.in(data.room).emit('chat', {user:data.user, message:data.message})
	})
	socket.on('disconnect', function(){
		console.log("user disconnected")
	}); 
})

//-------------------------------------------------------------------
http.listen(4500, function(err){
	if(err){
		console.log(err)
	}
	console.log("listening on port 4500")
})





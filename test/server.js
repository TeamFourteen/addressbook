const express =require('express')
const app = express()
const bodyParser = require('body-parser')
const hbs = require('hbs')

app.use(express.static(__dirname+"/event"))

app.use(bodyParser.json())

app.set('view engine','hbs')

app.get("/",function(require,response){
    response.render("event.hbs",{name:"Name"})
})

app.post("/",function(require,response){
    console.log(require.body.want)
    response.send({message:"something"})
})

app.listen(4500,function(err){
    if(err){
        console.log(err)
    }
    console.log("listening on port 4500")
})
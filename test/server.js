const express =require('express')
const app = express()
const bodyParser = require('body-parser')
const hbs = require('hbs')
const checkdate = require('./private/function')

app.use(express.static(__dirname+"/event"))

app.use(bodyParser.json())

app.set('view engine','hbs')

app.get("/",function(require,response){
    response.render("event.hbs",{
        name:'username',
        number:[{eventname:'Stuff',fromtime:'2018-05-01 01:01',location:'Vancouver,CA',member:'Glenn'},{eventname:'StuffA',fromtime:'2018-05-02 01:01',location:'Burnaby,CA',member:'Jack'}    
        ]
    })
})

app.post("/event",function(require,response){
    console.log(require.body)
    response.send({message:'added'})
})

app.post("/selectpeople",function(require,response){
    console.log(require.body)
    response.send(select_people)
})

select_people=[{fname:'Allen' , lname:'Doll' , usrId:'1_Allen_Doll'},{fname:'Len' , lname:'Steve' , usrId:'2_Len_Steve'},];


app.listen(4500,function(err){
    if(err){
        console.log(err)
    }
    console.log("listening on port 4500")
})
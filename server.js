/**
 * @file This file is the server file which is used to pass information to the client side. The main goal of this project is to
 * @author Glenn Parale - Original Creator/Back-end contributor
 * @author Rory Woo - Past Contributor
 * @author Sam Hadavi - FRONT-BACK Communication
 */
/** Provide connection between Back End Server Functions and Front End Client Requests
 * @module express
 * @requires express
 */
/**
 * Express module
 * @const
 */
const express = require('express')
/** Parses request from the client. Needed to retrieve information from the client
 * @module bodyParser
 * @requires body-parser
 */
/**
 * Body Parser Module
 * @const
 */
const bodyParser = require('body-parser')
/**
 * Module Needed for creating seperate sessions for user logins and individual information
 * @module session
 * @requires express-session
 */
/**
 * Session Module
 * @const
 */
const session = require('express-session')
/**
 * Module Needed for design template and layout of the page
 * @module hbs
 * @requires hbs
 */
/**
 * Handlebars module
 * @const
 */
const hbs = require('hbs')
/**
 * Module needed for importing files from directory
 * @module fs
 * @requires fs
 */
/**
 * File systems module
 * @const 
 */
const fs = require('fs')
/**
 * Module needed for communication with the server database
 * @module Postgres
 * @requires pg
 */
/**
 * Database Pool/Client module
 * @const 
 */
const { Pool, Client } = require('pg')
/**
 * Module needed for saving sessions to the database (useful for logins using express session)
 * @module pgSession
 * @requires connect-pg-simple
 * @requires pg
 * @requires session
 */
/**
 * Postgres Session Module
 * @const 
 */
const pgSession = require('connect-pg-simple')(session)

const dbfunct = require("./private/databaseFunctions.js")
/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 * @namespace userRoutes
 */
const app = express();
/**
 * @global
 * @name dbUrl
 * @description This is the database port to which the server will communicate to the database
 */
var dbURL = process.env.DATABASE_URL || "postgres://postgres:thegreatpass@localhost:5432/callcenter"; // change this per db name
/**
 * @global
 * @const
 * @name pgpool
 * @description This code will set the communication between server and database
 */
const pgpool = new Pool({
    connectionString: dbURL,
})
/*pgpool.query('SELECT username fROM USERS WHERE password= $1', ["LisiWoo"], (err, res) => {
    //console.log(err, res)
    console.log(res.rows[0].username)
    //console.log(res.rows[0].username)
    pool.end()
})*/
/**
 * @description Scripts that will run before sending the page information (i.e. Client Preparation). This is where most middleware actions take place.
 * @module app/use
 */
/**
 * This will make "/src" directory static (useful for styling and effects for the client)
 * @name Static Directory
 * @memberof module:app/use
 */
app.use(express.static(__dirname + "/src"))
/**
 * This will read all the HBS Files and store them to a variable (so any view files that had been created for the hub can be stored here for later use for this program).
 * @name HBS Window Reader
 * @memberof module:app/use
 */
app.use((request, response, next) => {
    profile = hbs.compile(fs.readFileSync(__dirname + "/views/radicals/profile.hbs", 'utf8'))
    contacts = hbs.compile(fs.readFileSync(__dirname + "/views/radicals/contacts.hbs", 'utf8'))
    next();
})

/**
 * This module helps with registering partial handlebar templates
 * @name hbs/registerPartials
 * @memberof module:hbs
 */
hbs.registerPartials(__dirname + "/views/partials")

app.use(bodyParser.json()) //Needed for when retrieving JSON from front-end

app.set('view engine', 'hbs')

app.use(session({
    secret: 'tolkien',
    store: new pgSession({
        pool: pgpool,
        tableName: 'session'
    }),
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 60 * 60000 }
}))

app.get("/", (request, response) => {

    response.sendFile(__dirname + "/front_end.html")
    //response.end('This is a test for stuff')
})


app.post("/login", (request, response) => {
    dbfunct.getLoginData(request.body["user"]).then((result) => {
        if (result.password == request.body["pass"]) {
            request.session.user_id = result.user_id
            response.json({ message: "Login Successful", url: "hub" })
        } else {
            response.json({ message: "Login Failed", url: "Message Failed" })
        }
    })
})

//---------------------------------------------------------------------------------------------------------------
/* From this line, look at the additions for the hub and the logout button*/
//FRONT END CALL CENTRE HUB
app.get("/hub", (request, response, next) => {
    sessionInfos = request.session.user_id
    dbfunct.getUserData(sessionInfos).then((result)=>{
        response.render('hub.hbs', {
        fname: result.fname,
        lname: result.lname
    })
    })
    // profile_info = {
    //     fname: 'Glenn',
    //     lname: 'Parale',
    //     p_numbers: [{ number: '604 777 2818' }],
    //     locs: [{ location: '555 Seymour Street, Vancouver, BC' }]
    // }

    // contactees = [{ cont_id: 1, fname: 'Billy', lname: 'Wong', p_number: '604 123 4567', location: '555 Seymour Street, Vancouver, BC' },
    //     { cont_id: 2, fname: 'Billy', lname: 'Wong', p_number: '604 123 4567', location: '555 Seymour Street, Vancouver, BC' },
    //     { cont_id: 3, fname: 'Billy', lname: 'Wong', p_number: '604 123 4567', location: '555 Seymour Street, Vancouver, BC' }
    // ]

    // response.render("hub.hbs", {
    //     username: 'glenn',
    //     sel: [{
    //         id_name: "profile",
    //         opt_name: "Profile",
    //         img_source: "https://d30y9cdsu7xlg0.cloudfront.net/png/138926-200.png",
    //         layout: profile(profile_info),
    //         script: ""
    //     }, {
    //         id_name: "contacts",
    //         opt_name: "Contacts",
    //         img_source: "http://www.gaby-moreno.com/administrator/public_html/css/ionicons/png/512/android-contacts.png",
    //         layout: contacts({
    //             contact: contactees
    //         }),
    //         script: "/contacts.js"
    //     }]
    // })

})

//-----------------------------------------------------------------------
app.post("/profile", (request, response)=>{
    sessionInfos = request.session.user_id
    /*dbfunct.getUserData(sessionInfos).then((result)=>{

    })*/
    response.send({script: '/profile.js', style: '/profile.css', layout: profile({
        name_id: '1',
        fname: 'FNAME',
        lname: 'LNAME',
        bio: 'A Bio',
        email: 'email@email.com',
        phoneNumber: [{phone_id: '1', phone: '6041231234', type: 'Work'}],
        addresses: [{address_id: '1', addressName: '555 Seymour Street'}]
    })})
})

app.post('/prof_address', (require,response)=>{
    console.log(require.body)
    response.send({message:"I got that message"})
});

app.post('/prof_phones', (require,response)=>{
    console.log(require.body)
    response.send({message:"I got that message"})
});

app.post('/prof_bio', (require,response)=>{
    console.log(require.body)
    response.send({message:"I got that message"})
});

//-----------------------------------------------------------------------
//LOGOUT FUNCTION
app.post("/logout", (request, response) => {
    request.session.destroy()
    response.json({ status: "OK", message: "Log out successfully" })
})

app.post("/update", (request, response) => {

    sessionInfos = request.session.user_id
    new_phone = request.body["phone"]
    new_address = request.body["address"]
    pgpool.query('update users set p_numbers = $2, locate = $3 where user_id = $1', [sessionInfos, new_phone, new_address], (err, res) => {
        if (err) {
            response.json({ status: "NOK", message: "Update Not Added" })
        } else {
            response.json({ status: "OK", message: "Update Added" })
        }
    })
    // response.json({ status: "OK", message: "Update Added" })
})

app.post("/addcontact", (request, response) => {
    if (!(request.body["fname"] === "") && !(request.body["lname"] === "")) {
        sessionInfos = request.session.user_id
        new_fname = request.body["fname"]
        new_lname = request.body["lname"]
        new_phone = request.body["phone"]
        new_address = request.body["address"]
        pgpool.query('insert into contacts(user_id, firstname, lastname, address, phone) values ($1, $2, $3, $4, $5)', [sessionInfos, new_fname, new_lname, new_address, new_phone], (err, res) => {
            if (err) {
                console.log(err);
                response.json({ status: "NOK", message: "Contact Not Added" })
            } else {
                response.json({ status: "OK", message: "Contact Added" })
            }
        })
    } else {
        response.json({ status: "NOK", message: "Required fields not filled" })
    }
    // response.json({ status: "OK", message: "Update Added" })
})
//Code copy ends here
//--------------------------------------------------------------------------------------------------------------------------

app.post("/signup", function(req, resp) {

    if (!(req.body["fname"] === "") && !(req.body["lname"] === "") && !(req.body["user"] === "") && !(req.body["pass"] === "")) {
        pgpool.query('insert into users(username, password, fname, lname) values($1, $2, $3, $4)', [req.body["user"], req.body["pass"], req.body["fname"], req.body["lname"]], (err, res) => {
            if (err) {
                resp.json({ status: "NOK", message: "Signup Failed: Username or Password already in use" })
            } else {
                pgpool.query('SELECT user_id FROM users WHERE username = $1', [req.body["user"]], (err, res) => {
                    req.session.user_id = res.rows[0].user_id
                    resp.json({ status: "OK", url: "hub" })
                })
            }

        })

    } else {
        resp.json({ status: "NOK", message: "Signup Failed: Failed to fill required fields" })
    }
    // resp.json({ status: "OK", url: "hub" })

});

app.listen(3000, (err) => {
    if (err) {
        console.log('Server is down');
        return false;
    }
    console.log('Server is up');
})
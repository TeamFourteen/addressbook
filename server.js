/**
 * @file This file is the server file which is used to pass information to the client side. The main goal of this project is to
 * @author Glenn Parale - Original Creator/Back-end contributor
 * @author Rory Woo - Past Contributor
 * @author Sam Hadavi - FRONT-BACK Communication
 */

/** This is the server file.
 * @module server
 * @requires express
 * @requires body-parser
 * @requires express-session
 * @requires hbs
 * @requires fs
 * @requires pg
 * @requires connect-pg-simple
 * @requires {@link ./module-databaseFunctions.html databaseFunctions }
 */
/**
 * Express module - Used for connecting and communication with client
 * @const
 */
const express = require('express')
/**
 * Body Parser Module - Used for parsing requests from client
 * @const
 */
const bodyParser = require('body-parser')
/**
 * Session Module - Used for creating sessions between the user and the server. This ensures user security
 * @const
 */
const session = require('express-session')
/**
 * Handlebars module - Used for design templating
 * @const
 */
const hbs = require('hbs')
/**
 * File systems module - Used for retrieving HBS files
 * @const 
 */
const fs = require('fs')
/**
 * Database Pool/Client module - Used for Activating the database
 * @const 
 */
const { Pool, Client } = require('pg')
/**
 * Postgres Session Module - Used for storing client session into the database
 * @const 
 */
const pgSession = require('connect-pg-simple')(session)

const dbfunct = require("./private/databaseFunctions.js")

const app = express();

const http = require("http").createServer(app);

const io = require("socket.io").listen(http);

/**
 * @global
 * @name dbUrl
 * @description This is the database port to which the server will communicate to the database
 */
var dbURL = process.env.DATABASE_URL || "postgres://postgres:thegreatpass@localhost:5432/callcenter"; // change this per db name

const pgpool = new Pool({
    connectionString: dbURL,
})

/**
 * @event Static_CSS_JS
 * @desc Designates a directory where CSS and Javascript files are found and used for the webpage
 */
app.use(express.static(__dirname + "/src"))

/**
 * @event Page_reader
 * @desc Reads and compiles hbs files for the main window
 */

app.use((request, response, next) => {
    profile = hbs.compile(fs.readFileSync(__dirname + "/views/radicals/profile.hbs", 'utf8'))
    events = hbs.compile(fs.readFileSync(__dirname + "/views/radicals/event.hbs", 'utf8'))
    chat = hbs.compile(fs.readFileSync(__dirname + "/views/radicals/chat.hbs", 'utf8'))
    chat_sel = hbs.compile(fs.readFileSync(__dirname + "/views/radicals/chat_sel.hbs", 'utf8'))
    chat_main_body = hbs.compile(fs.readFileSync(__dirname + "/views/radicals/chat_main_body.hbs", 'utf8'))
    next();
})


var createContacts = (cont_data) => {
    contacts = hbs.compile(fs.readFileSync(__dirname + "/views/radicals/contacts.hbs", 'utf8'))
    return contacts({
        contacts: cont_data
    })
}
/**
 * @event Body_parser_to_JSON
 * @desc Converts any data retrieved from the client as JSON object.
 */

app.use(bodyParser.json()) //Needed for when retrieving JSON from front-end

/**
 * @event HBS_Template
 * @desc Sets the render engine to Handlebars
 */
app.set('view engine', 'hbs')

/**
 * @event Session_Database_Setup
 * @desc Sets the session database to recieve session cookies.
 */

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

/**
 * @event Front_Page_Route
 * @desc Route for the front page of the website(first thing the user sees.)
 * @param {object} request - Information to be taken from the client
 * @param {object} response - Information to send to the client
 */
app.get("/", (request, response) => {
    response.sendFile(__dirname + "/front_end.html")
})

/**
 * @event Login_Route
 * @desc This route determines if the user can authenticate themselves.
 * @param {object} request - Information to be taken from the client
 * @param {object} response - Information to send to the client
 */
app.post("/login", (request, response) => {
    /**
     * @event getLoginData
     * @desc Checks the database for the user login info
     * @param {string} username - Username required to retrieve user_ID and password
     */
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

/**
 * @event Hub_Page_Route
 * @desc This route displays the page menu.
 * @param {object} request - Information to be taken from the client
 * @param {object} response - Information to send to the client
 */
app.get("/hub", (request, response) => {
    sessionInfos = request.session.user_id
    /**
     * @event getUserData
     * @desc Retrieves the user personal and contact information
     * @param {number} user_id - Needed for user data retrieval
     */
    dbfunct.getUserData(sessionInfos).then((result) => {
        response.render('hub.hbs', {
            fname: result.fname,
            lname: result.lname
        })
    })
})

//-----------------------------------------------------------------------
/**
 * @event Profile_Route
 * @desc This route sends page design for the Profile page.
 * @param {object} request - Information to be taken from the client
 * @param {object} response - Information to send to the client
 */
app.post("/profile", (request, response) => {
    sessionInfos = request.session.user_id
    /**
     * @event getUserData
     * @desc Retrieves the user personal and contact information
     * @param {number} user_id - Needed for user data retrieval
     */
    dbfunct.getUserData(sessionInfos).then((result) => {
        response.send({
            script: '/profile.js',
            style: '/profile.css',
            layout: profile({
                name_id: sessionInfos,
                fname: result.fname,
                lname: result.lname,
                bio: result.bio,
                email: result.email,
                phoneNumber: result.phone_numbers,
                addresses: result.addresses
            })
        })
    })
})
/**
 * @event Profile_Adress_Add_Route
 * @desc This route adds user address to the database.
 * @param {object} require - Information to be taken from the client
 * @param {object} response - Information to send to the client
 */
app.post('/prof_address', (require, response) => {
    sessionInfos = require.session.user_id
    /**
     * @event addUserAddress
     * @desc Adds the user address to the database
     * @param {number} user_id - Required for adding user address
     * @param {string} address - The address to be added
     */
    dbfunct.addUserAddress(sessionInfos, require.body.address).then((result) => {
        response.send({ status: 'OK', url: '/hub' })
    }).catch((err) => {
        response.send({ status: 'NOK' })
    })
});
/**
 * @event Profile_Phone_Add_Route
 * @desc This route adds user address to the database.
 * @param {object} require - Information to be taken from the client
 * @param {object} response - Information to send to the client
 */
app.post('/prof_phones', (require, response) => {
    sessionInfos = require.session.user_id
    /**
     * @event addUserPhone
     * @desc Adds the user phone number to the database
     * @param {number} user_id - Required for adding user phone number
     * @param {string} address - The phone number to be added
     */
    dbfunct.addUserPhone(sessionInfos, require.body.phone, require.body.type).then((result) => {
        response.send({ status: 'OK', url: '/hub' })
    }).catch((err) => {
        response.send({ status: 'NOK' })
    })
});
/**
 * @event Edit_Bio_Route
 * @desc This route edits the bio of the user.
 * @param {object} require - Information to be taken from the client
 * @param {object} response - Information to send to the client
 */
app.post('/prof_bio', (require, response) => {
    sessionInfos = require.session.user_id
    if (require.body.bio.length <= 500) {
        /**
         * @event editUserBio
         * @desc Edits the user biography
         * @param {number} user_id - Required for adding user phone number
         * @param {string} bio - TThe biography/comment to change to
         */
        dbfunct.editUserBio(sessionInfos, require.body.bio).then((result) => {
            response.send({ status: 'OK', url: '/hub' })
        }).catch((err) => {
            response.send({ status: 'NOK' })
        })
    }

});

//-----------------------------------------------------------------------

//-----------------------------------------------------------------------
/**
 * @event Contact_Page_Route
 * @desc This route sends page design for the Contacts Page.
 * @param {object} request - Information to be taken from the client
 * @param {object} response - Information to send to the client
 */
app.post('/contacts', (request, response) => {
    sessionInfos = request.session.user_id
    /**
     * @event getContInfo
     * @desc Retrieves the users' contacts' information
     * @param {number} user_id - Needed for user contacts' data retrieval
     */
    dbfunct.getContInfo(sessionInfos).then((result) => {
        response.send({
            script: 'contacts.js',
            style: 'contacts.css',
            layout: createContacts(result)

        })
    })
})

/**
 * @event Contact_Add_Route
 * @desc This routeadds the contacts to the user's contact list.
 * @param {object} require - Information to be taken from the client
 * @param {object} response - Information to send to the client
 */
app.post("/cont_addcontacts", function(require, response) {
    sessionInfos = require.session.user_id
    /**
     * @event addContact
     * @desc Adds the contact information to the database
     * @param {number} user_id - Needed for user contacts' data retrieval
     * @param {string} fname - Contact's First Name
     * @param {string} lname - Contact's Last Name
     * @param {string} bio - Contact's Biography/Comments
     */
    dbfunct.addContact(sessionInfos, require.body.fname, require.body.lname, require.body.bio).then((result) => {
        response.send({ status: 'OK', url: '/hub' })
    }).catch((err) => {
        response.send({ status: 'NOK' })
    })
})
/**
 * @event Contact_Add_Address_Route
 * @desc This route adds the contact address to the database.
 * @param {object} require - Information to be taken from the client
 * @param {object} response - Information to send to the client
 */
app.post("/cont_addaddress", function(require, response) {
    /**
     * @event addContactAddress
     * @desc Adds the contact's address information to the database
     * @param {number} cont_id - Contact's ID
     * @param {number} user_id - User ID
     * @param {string} address - Contact's Address
     */
    dbfunct.addContactAddress(require.body.cont_id, require.body.user_id, require.body.address).then((result) => {
        response.send({ status: 'OK', url: '/hub' })
    }).catch((err) => {
        response.send({ status: 'NOK' })
    })
})
/**
 * @event Contact_Add_Phone_Route
 * @desc This route adds the contact's phone number to the database.
 * @param {object} require - Information to be taken from the client
 * @param {object} response - Information to send to the client
 */
app.post("/cont_addphone", function(require, response) {
    /**
     * @event addContactPhone
     * @desc Adds the contact's Phone Number to the database
     * @param {number} cont_id - Contact's ID
     * @param {number} user_id - User ID
     * @param {string} phone_number - Contact's phone number
     * @param {string} type - Contact's phone type
     */
    dbfunct.addContactPhone(require.body.cont_id, require.body.user_id, require.body.phone, require.body.type).then((result) => {
        response.send({ status: 'OK', url: '/hub' })
    }).catch((err) => {
        response.send({ status: 'NOK' })
    })
})
/**
 * @event Person_Search
 * @desc This route searches the database for the names and email that contains the keyword.
 * @param {object} require - Information to be taken from the client
 * @param {object} response - Information to send to the client
 */
app.post("/cont_sendKeyword", function(require, response) {
    /**
     * @event getContAccount
     * @desc Gets the contact account information
     * @param {string} keyword - Keyword needed for account data retrieval
     */
    dbfunct.getContAccount(require.body.keyword).then((result) => {
        sendback = []
        for (i = 0; i < result.length; i++) {
            result_info = { user_id: result[i].user_id + '_' + result[i].fname + '_' + result[i].lname, name: result[i].fname + " " + result[i].lname, email: result[i].username }
            sendback.push(result_info)
        }
        response.json(sendback)
    })
})
/**
 * @event Add_Contact_With_Account
 * @desc This route adds the contacts to the user's contact list. However, their user ID is also recorded
 * @param {object} require - Information to be taken from the client
 * @param {object} response - Information to send to the client
 */
app.post("/cont_addcontactswithaccount", function(require, response) {
    sessionInfos = require.session.user_id
    add_info = require.body.cont_info.split("_")
    /**
     * @event addContactwithAccount
     * @desc Adds the contact with user
     * @param {string} user_id - User ID to add the contact to
     * @param fname - Contact First Name
     * @param lname - Contact Last Name
     * @param acct_num - Contact's User ID
     */
    dbfunct.addContactwithAccount(sessionInfos, add_info[1], add_info[2], add_info[0]).then((result) => {
        response.send({ status: 'OK', url: '/hub' })
    }).catch((err) => {
        response.send({ status: 'NOK' })
    })
})
//-----------------------------------------------------------------------

//-----------------------------------------------------------------------
app.post('/chat', function(require, response) {
    SessionInfos = require.session.user_id
    dbfunct.checkChat(SessionInfos).then((result) => {
        response.send({
            script: 'chat.js',
            style: 'chat.css',
            layout: chat({
                chatroom: result,
            })

        })
    })

})

app.post('/chat_adUserDiv', (require, response) => {
    SessionInfos = require.session.user_id
    dbfunct.getContactsWithAccount(SessionInfos).then((result) => {
        response.send(result)
    })
});

app.post('/chat_user', (require, response) => {
    SessionInfos = require.session.user_id
    dbfunct.getUserData(SessionInfos).then((result)=>{
        response.send({ user_id: SessionInfos, user_name: result.fname + " " + result.lname })
    })
    
});

app.post('/chat_newChatRoomDiv', (require, response) => {
    cont_ids = [require.session.user_id]
    for (i = 0; i < require.body.chatroom_users.length; i++) {
        sep = require.body.chatroom_users[i].split("_")
        cont_ids.push(sep[0])
    }
    dbfunct.createChatRoom(require.body.chatroom_name, cont_ids).then((result) => {
        response.send({ message: "OK" })
    }).catch((err) => {
        response.send({ message: "NOK" })
    })

});

io.on('connection', function(socket) {
    socket.emit('reqUser_ID', { request: 'user_id' })

    socket.on('resUser_ID', function(data) {
        userID = data.user_id
        socket.userID = userID
        dbfunct.getUserData(userID).then((resultA) => {
            name_user = resultA.fname + " " + resultA.lname
            dbfunct.checkChat(userID).then((resultB) => {
                socket.emit('room_length' ,  resultB.length)
                for(let i in resultB){
                    socket.join(resultB[i].chatroom_id);
                    io.in(resultB[i].chatroom_id).emit('joinRoom', {room: resultB[i].chatroom_id, message: name_user + " is online."})
                }
            })

        }).catch((err)=>{
            console.log('name problem')
        })
    })

    socket.on("sendMessage", function(data) {
        io.in(data.room).emit('chat', { room: data.room, user: data.user, message: data.message })
    })

    socket.on("update_chatroom", function(data){
        userID = socket.userID
        dbfunct.getUserData(userID).then((resultA) => {
            name_user = resultA.fname + " " + resultA.lname
            dbfunct.checkChat(userID).then((resultB) => {
                resultB.splice(0 ,data.rl_length)
                for(let i in resultB){
                    socket.emit("new_room", {selection: chat_sel({
                        chatroom_id: resultB[i].chatroom_id,
                        chatroom_name: resultB[i].chatroom_name
                    }) , main_body: chat_main_body({
                        chatroom_id: resultB[i].chatroom_id,
                        users: resultB[i].users
                    })})
                }
            })

        }).catch((err)=>{
            console.log('name problem')
        })
    })

    socket.on('disconnect', function() {
        userID = socket.userID
        dbfunct.getUserData(userID).then((resultA) => {
            name_user = resultA.fname + " " + resultA.lname
            dbfunct.checkChat(userID).then((resultB) => {
                socket.emit('room_length' ,  resultB.length)
                for(let i in resultB){
                    socket.leave(resultB[i].chatroom_id);
                    io.in(resultB[i].chatroom_id).emit('joinRoom', {room: resultB[i].chatroom_id, message: name_user + " is offline"})
                }
            })

        }).catch((err)=>{
            console.log('name problem')
        })
    });
})

//-----------------------------------------------------------------------
app.post("/events", function(require, response) {
    response.send({
        script: '',
        style: '',
        layout: events({
            name: 'username',
            number: [{ eventname: 'Stuff', fromtime: '2018-05-01 01:01', endtime: '2018-05-22  01:02', location: 'Vancouver,CA' }, { eventname: 'StuffA', fromtime: '2018-05-02 01:01', endtime: '2018-05-21  01:02', location: 'Burnaby,CA' }]
        })
    })
    // response.render("event.hbs",{
    //     name:'username',
    //     number:[{eventname:'Stuff',fromtime:'2018-05-01 01:01',endtime:'2018-05-22  01:02',location:'Vancouver,CA'},{eventname:'StuffA',fromtime:'2018-05-02 01:01',endtime:'2018-05-21  01:02',location:'Burnaby,CA'}    
    //     ]
    // })
})

//-----------------------------------------------------------------------
//LOGOUT FUNCTION
app.post("/logout", (request, response) => {
    request.session.destroy()
    response.json({ status: "OK", message: "Log out successfully" })
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

/**
 * @event Port_Listener
 * @desc Listens to the designated port number for connection route request
 */
http.listen(3000, (err) => {
    if (err) {
        console.log('Server is down');
        return false;
    }
    console.log('Server is up');
})
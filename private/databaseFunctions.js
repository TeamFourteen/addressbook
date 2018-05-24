/**
 * @file This is the database module which the server will use to retrieve data from the database
 * @author Glenn Parale
 */

/**
 * @module databaseFunctions
 * @desc This is the database functions used to retrieve data from the database
 * @requires pg
 */


const { Pool, Client } = require('pg')

/**
 * A variable used to identify which database to use
 * @var {string} dbURL
 */

var dbURL = process.env.DATABASE_URL || "postgres://postgres:thegreatpass@localhost:5432/callcenter";


const pgpool = new Pool({
    connectionString: dbURL,
})
/**
 * @callback getLoginData
 * @desc This is a function that retrieves user ID (required for user information needs) as well as the password for confirmation purposes.
 * @param {string} username - Username needed to retrieve the user password and user ID.
 * @returns {Promise} Promise object that contains the user password and user ID
 */
var getLoginData = (username) => {
    return new Promise((resolve, reject) => {
        pgpool.query('SELECT password, user_id FROM users WHERE username = $1', [username], (err, res) => {
            if (res.rows.length === 0) {
                reject('Not Found')
            } else {
                resolve(res.rows[0])
            }
        })
    })
}

/**
 * @callback getUserData
 * @desc This function retrieves user data to be used in the Profiles tab.
 * @param {number} user_id - User ID required 
 * @returns {Promise} Promise object that contains the user's official name as well as their bio, phone numbers, and addresses
 */
var getUserData = (user_id) => {
    return new Promise((resolve, reject) => {
        pgpool.query('SELECT fname, lname, username, bio FROM users WHERE user_id = $1', [user_id], (err, res) => {
            if (res.rows.length === 0) {
                reject('Not Found')
            } else {
                user_Data = { fname: res.rows[0].fname, lname: res.rows[0].lname, bio: res.rows[0].bio, email: res.rows[0].username }
                pgpool.query('SELECT * FROM user_phone WHERE user_id = $1', [user_id], (err, res) => {
                    phone_number = []
                    for (i = 0; i < res.rows.length; i++) {
                        phone_data = {
                            phone_id: res.rows[i].user_id + '_' + res.rows[i].p_index + '_phone',
                            phone: res.rows[i].p_number,
                            type: res.rows[i].p_type
                        }
                        phone_number.push(phone_data)
                    }
                    user_Data['phone_numbers'] = phone_number
                    pgpool.query('SELECT * FROM user_address WHERE user_id = $1', [user_id], (err, res) => {
                        addresses = []
                        for (i = 0; i < res.rows.length; i++) {
                            addr_data = {
                                address_id: res.rows[i].user_id + '_' + res.rows[i].addr_index + '_address',
                                addressName: res.rows[i].address
                            }
                            addresses.push(addr_data)
                        }
                        user_Data['addresses'] = addresses
                        resolve(user_Data)

                    })


                })
            }
        })
    })
}
/**
 * @callback getContAccount
 * @desc This function searches the database for names or email starting with keyword
 * @param {string} keyword - Keyword needed to search for names
 * @returns {Promise} Promise object that contains the users who have names starting with.
 */
var getContAccount = (keyword) => {
    return new Promise((resolve, reject) => {
        searchstuff = keyword + '%'
        searchstuff.substring(0).toUpperCase();
        pgpool.query('SELECT user_id, fname, lname, username FROM users WHERE fname like $1 or lname like $1 or username like $1', [searchstuff], function(err, res) {
            if (err) {
                console.log(err)
            }
            if (res.rows.length != 0) {
                resolve(res.rows)
            }
        })
    })
}
/**
 * @callback getContactAddresses
 * @desc This function searches the database for the addresses of the contact
 * @param {number} user_id - User ID to determine which user contacts is needed.
 * @param {number} cont_id - Contact ID to determine the persons contact addresses
 * @returns {Promise} Promise object that contains the contact's addresses.
 */
var getContactAddresses = (user_id, cont_id) => {
    return new Promise((resolve, reject) => {
        pgpool.query('SELECT * FROM contact_address WHERE user_id= $1 and cont_id= $2', [user_id, cont_id], function(err, res) {
            addresses = []
            for (i = 0; i < res.rows.length; i++) {
                addr_info = { addr: res.rows[i].address, cont_id: res.rows[i].user_id + "_" + res.rows[i].cont_id + "_" + res.rows[i].addr_index }
                addresses.push(addr_info)
            }
            resolve(addresses)
        })
    })
}
/**
 * @callback getContactPhone
 * @desc This function searches the database for the phone numbers of the contact
 * @param {number} user_id - User ID to determine which user contacts is needed.
 * @param {number} cont_id - Contact ID to determine the persons contact phone number
 * @returns {Promise} Promise object that contains the contact's phone numbers.
 */
var getContactPhone = (user_id, cont_id) => {
    return new Promise((resolve, reject) => {
        pgpool.query('SELECT p_number, p_type FROM contact_phone WHERE user_id= $1 and cont_id= $2', [user_id, cont_id], function(err, res) {
            numbers = []
            for (i = 0; i < res.rows.length; i++) {
                phone_info = { number: res.rows[i].p_number, type: res.rows[i].p_type }
                numbers.push(phone_info)
            }
            resolve(numbers)
        })
    })
}
/**
 * @callback getContactInfo
 * @desc This function retrieves the contact's personal information
 * @param {number} user_id - User ID to determine which user contacts is needed.
 * @returns {Promise} Promise object that contains the contact's personal information
 */
var getContactsInfo = (user_id) => {
    return new Promise((resolve, reject) => {
        pgpool.query('SELECT cont_id, user_id ,firstname, lastname, with_account, acct_num, bio FROM contacts WHERE user_id = $1', [user_id], (err, res) => {
            if (res.rows.length > 0) {
                resolve(res.rows)
            } else {
                reject('No contacts')
            }
        })

    })
}
/**
 * @callback getContInfo
 * @desc This function combines four other functions(getContactsInfo, getContactAddresses, getContactPhone, getUserData) to create the user's contacts information
 * @param {number} user_id - User ID to determine which user contacts is needed.
 * @returns {Promise} Promise object that contains the contact's overall information
 */
async function getContInfo(user_id) { //A way to call promises "synchronously"
    var x = await getContactsInfo(user_id) //Used the await function for stuff that needs promise pending
    contacts = []
    for (let i in x) { //Do not use the normal for loop otherwise it wouldn't work
        cont_info = { cont_id: x[i].cont_id + '_' + x[i].user_id + '_' + x[i].firstname, fname: x[i].firstname, lname: x[i].lastname, with_account: x[i].with_account }

        if (x[i].with_account === false) {
            cont_info['bio'] = x[i].bio

            var y = await getContactAddresses(user_id, x[i].cont_id)

            cont_info['address'] = y

            var z = await getContactPhone(user_id, x[i].cont_id)

            cont_info['phonenumber'] = z

            contacts.push(cont_info)
        } else {
            var b = await getUserData(x[i].acct_num)
            cont_info['bio'] = b.bio
            cont_info['address'] = b.addresses
            cont_info['phonenumber'] = b.phone_numbers
            contacts.push(cont_info)
        }

    }
    return contacts
}
/**
 * @callback addContactPhone
 * @desc This function adds the contact's phone number to the database
 * @param {number} user_id - User ID to determine which user contacts is needed.
 * @param {number} cont_id - Contact ID to to add the number to.
 * @returns {Promise} Promise object that returns the status of the addition
 */
var addContactPhone = (cont_id, user_id, phone_number, type) => {
    return new Promise((resolve, reject) => {
        if ((/^[0-9]+$/.test(phone_number)) && (phone_number.length == 10)) {
            pgpool.query('INSERT INTO contact_phone(cont_id, user_id, p_number, p_type) VALUES($1,$2,$3,$4);', [cont_id, user_id, phone_number, type], (err, res) => {
                if (err) {
                    reject('Phone Number Not Added')
                }
                resolve('Phone Number Added')
            })
        } else {
            reject('Invalid Number')
        }
        /**/
    })

}
/**
 * @callback addContact
 * @desc This function adds the contact to the database under the user's contact lists
 * @param {number} user_id - User ID to determine which user contacts is needed.
 * @param {string} fname - Contact's First Name
 * @param {string} lname - Contact's Last Name
 * @param {string} bio - Contact's Biography and/or Comments
 * @returns {Promise} Promise object that returns the status of the addition
 */
var addContact = (user_id, fname, lname, bio) => {
    return new Promise((resolve, reject) => {
        pgpool.query('insert into contacts(user_id, firstname, lastname, with_account, bio) values($1, $2, $3, false, $4);', [user_id, fname, lname, bio], (err, res) => {
            if (err) {
                reject('Contact Not Added')
            }
            resolve('Contact Added')
        })
    })
}
/**
 * @callback addContactwithAccount
 * @desc This function adds the contact to the database under the user's contact lists. However, it also stores the contact's user ID.
 * @param {number} user_id - User ID to determine which user contacts is needed.
 * @param {string} fname - Contact's First Name
 * @param {string} lname - Contact's Last Name
 * @param {number} acct_num - Contact's User ID
 * @returns {Promise} Promise object that returns the status of the addition
 */
var addContactwithAccount = (user_id, fname, lname, acct_num) => {
    return new Promise((resolve, reject) => {
        pgpool.query('insert into contacts(user_id, firstname, lastname, with_account, acct_num) values($1, $2, $3, true, $4);', [user_id, fname, lname, acct_num], (err, res) => {
            if (err) {
                reject('Contact Not Added')
            }
            resolve('Contact Added')
        })
    })
}
/**
 * @callback addContactAddress
 * @desc This function adds the contact's Address to the database
 * @param {number} user_id - User ID to determine which user contacts is needed.
 * @param {number} cont_id - Contact ID to determine which contact to add the address to.
 * @param {string} address - The address itself to be added to the database
 * @returns {Promise} Promise object that returns the status of the addition
 */
var addContactAddress = (cont_id, user_id, address) => {
    return new Promise((resolve, reject) => {
        pgpool.query('INSERT INTO contact_address(cont_id, user_id, address) VALUES($1,$2,$3);', [cont_id, user_id, address], (err, res) => {
            if (err) {
                reject('Address Not Added')
            }
            resolve('Address Added')
        })
    })
}

var createAccount = (e_mail, password, fname, lname) => {
    return new Promise((resolve, reject) => {
        if (!(fname === "") && !(lname === "") && !(e_mail === "") && !(password === "")) {
            pgpool.query('insert into users(username, password, fname, lname) values($1, $2, $3, $4)', [e_mail, password, fname, lname], (err, res) => {
                if (err) {
                    reject('Acc_Exist')
                } else {
                    pgpool.query('SELECT user_id FROM users WHERE username = $1', [e_mail], (err, res) => {
                        resolve({user_id: res.rows[0].user_id})
                    })
                }

            })

        } else {
            reject('Req_Fields')
        }
    })
}
//--------------------- User Account Edits And Additions ---------------------
/**
 * @callback addUserAddress
 * @desc This function adds the user Address to the database
 * @param {number} user_id - User ID to add the Address to.
 * @param {string} address - The address itself to be added to the database
 * @returns {Promise} Promise object that returns the status of the addition
 */
var addUserAddress = (user_id, address) => {
    return new Promise((resolve, reject) => {
        pgpool.query('insert into user_address(user_id, address) values($1, $2);', [user_id, address], (err, res) => {
            if (err) {
                reject('Address Not Added')
            }
            resolve('Address Added')
        })
    })
}
/**
 * @callback addUserAddress
 * @desc This function adds the user Address to the database
 * @param {number} user_id - User ID to add the Phone Number to.
 * @param {string} phone_number - The phone itself to be added to the database
 * @param {string} type - The type of the phone itself(can be cellular, home or work)
 * @returns {Promise} Promise object that returns the status of the addition
 */
var addUserPhone = (user_id, phone_number, type) => {
    return new Promise((resolve, reject) => {
        pgpool.query('insert into user_phone(user_id, p_number, p_type) values($1, $2, $3);', [user_id, phone_number, type], (err, res) => {
            if (err) {
                reject('Phone Not Added')
            }
            resolve('Phone Added')
        })
    })
}
/**
 * @callback editUserBio
 * @desc This function updates the user's bio
 * @param {number} user_id - User ID to update the bio.
 * @param {string} new_bio - The new bio to replace the old bio.
 * @returns {Promise} Promise object that returns the status of the addition
 */
var editUserBio = (user_id, new_bio) => {
    return new Promise((resolve, reject) => {
        pgpool.query('UPDATE users SET bio = $1 WHERE user_id = $2;', [new_bio, user_id], (err, res) => {
            if (err) {
                reject('Bio not added')
            }
            resolve('Bio has been updated')
        })
    })
}

var getContactsWithAccount = (user_id) => {
    return new Promise((resolve, reject) => {
        pgpool.query('SELECT acct_num, firstname, lastname FROM contacts where user_id = $1 and with_account = true', [user_id], (err, res) => {
            namelist = []
            for (i = 0; i < res.rows.length; i++) {
                name_info = {
                    fName: res.rows[i].firstname,
                    lName: res.rows[i].lastname,
                    userId: res.rows[i].acct_num + '_' + res.rows[i].firstname + '_' + res.rows[i].lastname
                }
                namelist.push(name_info)
            }
            resolve(namelist)
        })
    })
}

var addChatRoom = (chatroom_name) => {
    return new Promise((resolve, reject) => {
        pgpool.query('INSERT INTO chatrooms(chatr_name) values($1)', [chatroom_name], (err, res) => {
            if (err) {
                reject('Chatroom Name Not Added')
            }
            pgpool.query('SELECT chatr_id FROM chatrooms WHERE chatr_name = $1', [chatroom_name], (err, result) => {
                if (err) {
                    reject(err)
                }
                resolve(result.rows[0].chatr_id)
            })
        })
    })
}

var addPeopleToChat = (chatroom_list) => {
    return new Promise((resolve, reject) => {
        pgpool.query('INSERT INTO chatroom_users(chatr_id, user_id) values ' + chatroom_list.join(', '), (err, res) => {
            if (err) {
                reject(err)
            }
            resolve('All added to chatroom')
        })
    })
}

async function createChatRoom(chatroom_name, chatroom_list) {
    var c = await addChatRoom(chatroom_name);
    var c_list = []
    for (let i in chatroom_list) {
        c_index = '(' + c + ',' + chatroom_list[i] + ')'
        c_list.push(c_index)
    }
    var d = await addPeopleToChat(c_list);
    return d
}

var checkChatRoom = (user_id) => {
    return new Promise((resolve, reject) => {
        pgpool.query('SELECT chatrooms.chatr_id, chatrooms.chatr_name FROM chatroom_users left join chatrooms on chatroom_users.chatr_id = chatrooms.chatr_id where user_id = $1 ', [user_id], (err, res) => {
            if (err) {
                reject(err)
            }
            resolve(res.rows)
        })
    })
}

var checkChatGuest = (chatr_id) => {
    return new Promise((resolve, reject) => {
        pgpool.query('SELECT users.fname, users.lname FROM chatroom_users left join users on chatroom_users.user_id = users.user_id where chatr_id = $1', [chatr_id], (err, res) => {
            if (err) {
                reject(err)
            }
            resolve(res.rows)
        })
    })
}

async function checkChat(user_id) {
    var chatr = await checkChatRoom(user_id)
    var r_chatr = []
    for (let i in chatr) {
        chatroom_info = { chatroom_name: chatr[i].chatr_name, chatroom_id: chatr[i].chatr_id + '_' + chatr[i].chatr_name }
        var chatg = await checkChatGuest(chatr[i].chatr_id)
        r_chatg = []
        for (let j in chatg) {
            chatname = chatg[j].fname + ' ' + chatg[j].lname
            r_chatg.push(chatname)
        }
        chatroom_info['users'] = r_chatg
        r_chatr.push(chatroom_info)
    }
    return r_chatr
}

module.exports = {
    getLoginData,
    getUserData,
    getContInfo,
    getContAccount,
    getContactAddresses,
    getContactPhone,
    getContactsInfo,
    addContactPhone,
    addContactAddress,
    createAccount,
    addUserPhone,
    addUserAddress,
    editUserBio,
    addContact,
    addContactwithAccount,
    getContactsWithAccount,
    createChatRoom,
    checkChat
}
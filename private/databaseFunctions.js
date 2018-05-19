/**
 * @file This is the database module which the server will use to retrieve data from the database
 * @author Glenn Parale
 */
const { Pool, Client } = require('pg')

var dbURL = process.env.DATABASE_URL || "postgres://postgres:thegreatpass@localhost:5432/callcenter";

const pgpool = new Pool({
    connectionString: dbURL,
})

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

var getContAccount = (fname, lname) => {
    return new Promise((resolve, reject) => {
        pgpool.query('SELECT user_id, fname, lname FROM users WHERE fname = $1 and lname= $2', [fname, lname], function(err, res) {
            if (res.rows.length !== 0) {
                resolve(res.rows)
            }
        })
    })
}
var getContactAddresses = (user_id, cont_id) => {
    return new Promise((resolve, reject) => {
        pgpool.query('SELECT * FROM contact_address WHERE user_id= $1 and cont_id= $2', [user_id, cont_id], function(err, res) {
            addresses = []
            for (i = 0; i < res.rows.length; i++) {
                addr_info = {addr: res.rows[i].address, cont_id: res.rows[i].user_id + "_" + res.rows[i].cont_id + "_" + res.rows[i].addr_index}
                addresses.push(addr_info)
            }
            resolve(addresses)
        })
    })
}

var getContactPhone = (user_id, cont_id) => {
    return new Promise((resolve, reject) => {
        pgpool.query('SELECT p_number, p_type FROM contact_phone WHERE user_id= $1 and cont_id= $2', [user_id, cont_id], function(err, res) {
            numbers = []
            for (i = 0; i < res.rows.length; i++) {
                phone_info = {number: res.rows[i].p_number, type: res.rows[i].p_type}
                numbers.push(phone_info)
            }
            resolve(numbers)
        })
    })
}

var getContactsInfo = (user_id) => {
    return new Promise((resolve, reject) => {
        pgpool.query('SELECT cont_id, user_id ,firstname, lastname, with_account, acct_num FROM contacts WHERE user_id = $1', [user_id], (err, res) => {
            if (res.rows.length > 0) {
                resolve(res.rows)
            } else {
                reject('No contacts')
            }
        })

    })
}

async function getContInfo(user_id) { //A way to call promises "synchronously"
    var x = await getContactsInfo(user_id) //Used the await function for stuff that needs promise pending
    contacts = []
    for (let i in x) { //Do not use the normal for loop otherwise it wouldn't work
        cont_info = { cont_id: x[i].cont_id + '_' + x[i].user_id + '_' + x[i].firstname, fname: x[i].firstname, lname: x[i].lastname }

        if (x[i].with_account === false) {
            var y = await getContactAddresses(user_id, x[i].cont_id)

            cont_info['address'] = y

            var z = await getContactPhone(user_id, x[i].cont_id)

            cont_info['phonenumber'] = z

            contacts.push(cont_info)
        } else {
            var b = await getUserData(x[i].acct_num)
            cont_info['address'] = b.addresses
            cont_info['phonenumber'] = b.phone_numbers
            contacts.push(cont_info)
        }

    }
    return contacts
}

var addContactPhone = (cont_id, user_id, phone_number) => {
    return new Promise((resolve, reject) => {
        if ((/^[0-9]+$/.test(phone_number)) && (phone_number.length >= 10) && (phone_number.length < 14)) {
            resolve('Number Has Been Added')
        } else {
            reject('Invalid Number')
        }
        /*pgpool.query('INSERT INTO contact_phone(cont_id, user_id, p_number) VALUES($1,$2,$3);', [cont_id, user_id, phone_number], (err, res) => {
            if (err) {
                reject('Phone Number Not Added')
            }
            resolve('Phone Number Added')
        })*/
    })

}

var addContactAddress = (cont_id, user_id, address) => {
    return new Promise((resolve, reject) => {
        resolve('Address Added')
    })
    /*pgpool.query('INSERT INTO contact_address(cont_id, user_id, address) VALUES($1,$2,$3);', [cont_id, user_id, address], (err, res) => {
            if (err) {
                reject('Address Not Added')
            }
            resolve('Address Added')
        })*/
}

var createAccount = (e_mail, password) => {
    return new Promise((resolve, reject) => {
        resolve('Account Added')
    })
}
//--------------------- User Account Edits And Additions ---------------------
var addUserAddress = (user_id ,address) => {
    return new Promise((resolve, reject) => {
        pgpool.query('insert into user_address(user_id, address) values($1, $2);', [user_id , address], (err, res) => {
            if (err) {
                reject('Address Not Added')
            }
            resolve('Address Added')
        })
    })
}

var addUserPhone = (user_id , phone_number, type) => {
    return new Promise((resolve, reject) => {
        pgpool.query('insert into user_phone(user_id, p_number, p_type) values($1, $2, $3);', [user_id , phone_number, type], (err, res) => {
            if (err) {
                reject('Phone Not Added')
            }
            resolve('Phone Added')
        })
    })
}

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

module.exports = {
    getLoginData,
    getUserData,
    getContInfo,
    getContAccount,
    addContactPhone,
    addContactAddress,
    createAccount,
    addUserPhone,
    addUserAddress,
    editUserBio
}
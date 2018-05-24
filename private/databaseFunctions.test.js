const databaseFun = require('./databaseFunctions')

test('test existing username', () => {
	databaseFun.getLoginData('Thamy@mail.com').then((result) => {
		expect(result).toMatchObject({ password: 'LisiWoo', user_id: 1 })
	})
})

test('test user data', () => {
	databaseFun.getUserData(1).then((result) => {
		expect(result).toMatchObject({ fname: 'Thaman',
  lname: 'Woo',
  bio: 'This is some dip shit',
  email: 'Thamy@mail.com',
  phone_numbers:
   [ { phone_id: '1_1_phone', phone: '6044455286', type: 'Work' },
     { phone_id: '1_2_phone', phone: '6047325286', type: 'Home' } ],
  addresses:
   [ { address_id: '1_1_address', addressName: '555 Seymour Street' },
     { address_id: '1_2_address',
       addressName: 'Scott Road Station, 110th Ave, Surrey, BC' } ] })
	})
})

test('test contact account by first and last name', () => {
	databaseFun.getContAccount('Thaman', 'Woo').then((result) => {
		expect(result).toMatchObject([{
    user_id: 1,
    fname: 'Thaman',
    lname: 'Woo',
    username: 'Thamy@mail.com' } ])
	})
})

test('test addresses of a contact', () => {
	databaseFun.getContactAddresses(1, 2).then((result) => {
		expect(result).toMatchObject([ { addr: '3766 E 1st Ave, Burnaby', cont_id: '1_2_2' },
  { addr: '3766 E 1st Ave, Burnaby', cont_id: '1_2_3' } ])
	})
})

test('test phone of a contact', () => {
	databaseFun.getContactPhone(1, 2).then((result) => {
		expect(result).toMatchObject([ { number: '1232341232', type: 'Cell' } ])
	})
})

test('test contacts of a user', () => {
	databaseFun.getContactsInfo(1).then((result) => {
		expect(result).toMatchObject([ {
    cont_id: 1,
    user_id: 1,
    firstname: 'Li',
    lastname: 'Pho',
    with_account: false,
    acct_num: null,
    bio: null },
  {
    cont_id: 2,
    user_id: 1,
    firstname: 'Sam',
    lastname: 'Pho',
    with_account: false,
    acct_num: null,
    bio: null },
  {
    cont_id: 3,
    user_id: 1,
    firstname: 'Turd',
    lastname: 'Master',
    with_account: true,
    acct_num: 2,
    bio: null } ])
	})
})

test('test getting the contacts for a user', () => {
	databaseFun.getContactsWithAccount(1).then((result) => {
		expect(result).toMatchObject([ { fName: 'Turd', lName: 'Master', userId: '2_Turd_Master' } ])
	})
})

test('test checking a chatroom', () => {
	databaseFun.checkChatRoom(1).then((result) => {
		expect(result).toMatchObject([])
	})
})

test('test check chat guest', () => {
	databaseFun.checkChatGuest(1).then((result) => {
		expect(result).toMatchObject([])
	})
})








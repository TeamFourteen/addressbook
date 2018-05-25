const dataVal = require("./databaseValidation");

// loginDataOutput = { password: 'LisiWoo', user_id: 1 }

test("test login", ()=>{
    expect(dataVal.validateGetLoginData("Thamy@mail.com")).toBeTruthy();
    expect(dataVal.validateGetLoginData("Thamymailcom")).toBeFalsy();
    expect(dataVal.validateGetLoginData("")).toBeFalsy();

})

// getUserDataOutput = { fname: 'Thaman',
// 					  lname: 'Woo',
// 					  bio: 'This is some dip shit',
// 					  email: 'Thamy@mail.com',
// 					  phone_numbers:
// 					   [ { phone_id: '1_1_phone', phone: '6044455286', type: 'Work' },
// 					     { phone_id: '1_2_phone', phone: '6047325286', type: 'Home' } ],
// 					  addresses:
// 					   [ { address_id: '1_1_address', addressName: '555 Seymour Street' },
// 					     { address_id: '1_2_address',
// 					       addressName: 'Scott Road Station, 110th Ave, Surrey, BC' } ] }

test('test user data', () => {
    expect(dataVal.validateGetUserData(1)).toBeTruthy();
    expect(dataVal.validateGetUserData("B")).toBeFalsy();
    expect(dataVal.validateGetUserData()).toBeFalsy();

})

// getContAccountOutput = [{user_id: 1,
// 				    fname: 'Thaman',
// 				    lname: 'Woo',
// 				    username: 'Thamy@mail.com' } ]

test('test contact account by first and last name', () => {
	expect(dataVal.validateGetContAccount('Thaman', 'Woo')).toBeTruthy();
	expect(dataVal.validateGetContAccount(69)).toBeFalsy();
	expect(dataVal.validateGetContAccount("")).toBeFalsy();
})

// getContact

test('test addresses of a contact', () => {
	expect(dataVal.validateGetContactAddresses(1,2)).toBeTruthy();
	expect(dataVal.validateGetContactAddresses("String")).toBeFalsy();
	expect(dataVal.validateGetContactAddresses()).toBeFalsy();
})



test('test phone of a contact', () => {
	expect(dataVal.validateGetContactPhone(1,2)).toBeTruthy();
	expect(dataVal.validateGetContactPhone("String")).toBeFalsy();
	expect(dataVal.validateGetContactPhone()).toBeFalsy();
})

// getContactsInfoOutput = [ {
//     cont_id: 1,
//     user_id: 1,
//     firstname: 'Li',
//     lastname: 'Pho',
//     with_account: false,
//     acct_num: null,
//     bio: null },
//   {
//     cont_id: 2,
//     user_id: 1,
//     firstname: 'Sam',
//     lastname: 'Pho',
//     with_account: false,
//     acct_num: null,
//     bio: null },
//   {
//     cont_id: 3,
//     user_id: 1,
//     firstname: 'Turd',
//     lastname: 'Master',
//     with_account: true,
//     acct_num: 2,
//     bio: null } ]

test('test getting contacts info', () => {
	expect(dataVal.validateGetContactInfo(1)).toBeTruthy();
	expect(dataVal.validateGetContactInfo("B")).toBeFalsy();
	expect(dataVal.validateGetContactInfo()).toBeFalsy();
})

test('test contacts of a user', () => {
	expect(dataVal.validateGetContactsWithAccount(1)).toBeTruthy();
	expect(dataVal.validateGetContactsWithAccount("B")).toBeFalsy();
	expect(dataVal.validateGetContactsWithAccount()).toBeFalsy();
})


test('test checking a chatroom', () => {
	expect(dataVal.validateCheckChatRoom(1)).toBeTruthy();
	expect(dataVal.validateCheckChatRoom("B")).toBeFalsy();
	expect(dataVal.validateCheckChatRoom()).toBeFalsy();
})

test('test check chat guest', () => {
	expect(dataVal.validateCheckChatGuest(1)).toBeTruthy();
	expect(dataVal.validateCheckChatGuest("B")).toBeFalsy();
	expect(dataVal.validateCheckChatGuest()).toBeFalsy();
})


test('test adding new phone for contact', () => {
	expect(dataVal.validateAddContactPhone(1,1,'(604) 944-1158')).toBeTruthy();
	expect(dataVal.validateAddContactPhone(1,1,'1234567890156789012901234567890x')).toBeFalsy();
	expect(dataVal.validateAddContactPhone(1,"D",'Fred')).toBeFalsy();
	expect(dataVal.validateAddContactPhone(1,"D",'Fred')).toBeFalsy();
})

test('test adding contact', () => {
	expect(dataVal.validateAddContact(1, "Gordon", "Barts", "A very large and emtional man.")).toBeTruthy();
	expect(dataVal.validateAddContact("b", 1, 1, 1)).toBeFalsy();
})

test('test adding contact with account', () => {
	expect(dataVal.validateAddContactwithAccount(1, "Gordon", "Barts", 9)).toBeTruthy();
	expect(dataVal.validateAddContactwithAccount("B", 2, 2, "B")).toBeFalsy();
})

test('test adding new address for contact', () => {
	expect(dataVal.validateAddContactAddress(1, 1, '1265 Phillian')).toBeTruthy();
	expect(dataVal.validateAddContactAddress("b", "b", 1)).toBeFalsy();
})

test('test account creation', () => {
	expect(dataVal.validateCreateAccount("name@legitimail.com", "strongpassword!@#$7")).toBeTruthy();
	expect(dataVal.validateCreateAccount(1, 1)).toBeFalsy();
	expect(dataVal.validateCreateAccount("name@legitimail.com", "theveryreallystrongpassword")).toBeFalsy();
	expect(dataVal.validateCreateAccount("Thamymailcom", "")).toBeFalsy();
})

test('test adding a address for user', () => {
	expect(dataVal.validateAddUserAddress(1, "1216 Jameson Avenue")).toBeTruthy();
	expect(dataVal.validateAddUserAddress("Samuel", "1216 Jameson Avenue")).toBeFalsy();
	expect(dataVal.validateAddUserAddress("1216 Jameson Avenue", 1)).toBeFalsy();
})

test('test adding a new phone number', () => {
	expect(dataVal.validateAddUserPhone(1, "6049112373", "cell")).toBeTruthy();
	expect(dataVal.validateAddUserPhone(1, "6049112373", "home")).toBeTruthy();
	expect(dataVal.validateAddUserPhone(1, "6049112373", "work")).toBeTruthy();
	expect(dataVal.validateAddUserPhone("69", 6049112373, 2)).toBeFalsy();
})

test('test user bio editing', () => {
	expect(dataVal.validateEditUserBio(1, "This bio has been edited malicously.")).toBeTruthy();
	expect(dataVal.validateEditUserBio("This is a string", 2)).toBeFalsy();
})

test('test adding a chatroom', () => {
	expect(dataVal.validateAddChatRoom('Chat1')).toBeTruthy();
})
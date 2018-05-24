const databaseFun = require('./databaseFunctions')

test('test adding new phone for contact', () => {
	databaseFun.addContactPhone(1, 1, '12345678901234567890123456789012345678901234567890x').then((result) => {
		expect(result).toBe('Invalid Number')
	})
})

test('test adding contact', () => {
	databaseFun.addContact(1, "Glem", "Bort", "Is not very smart.").then((result) => {
		expect(result).toBe('Contact Added')
	})
})

test('test adding contact with account', () => {
	databaseFun.addContactwithAccount(1, "Fred", 'Boid', 69).then((result) => {
		expect(result).toBe('Contact Added')
	})
})

test('test adding new address for contact', () => {
	databaseFun.addContactAddress(1, 1, '6986 Lovedeath').then((result) => {
		expect(result).toBe('Address Added')
	})
})

test('test account creation', () => {
	databaseFun.createAccount("fun@mail.com", "roodly").then((result) => {
		expect(result).toBe('Account Added')
	})
})

test('test adding a new phone number', () => {
	databaseFun.addUserPhone(1, "6049112373", "cell").then((result) => {
		expect(result).toBe('Phone Added')
	})
})

test('test user bio editing', () => {
	databaseFun.editUserBio(1, "Edited bio").then((result) => {
		expect(result).toBe('Bio has been updated')
	})
})

test('test adding a chatroom', () => {
	databaseFun.addChatRoom('Chat1').then((result) => {
		expect(result).toBe(1)
	})
})
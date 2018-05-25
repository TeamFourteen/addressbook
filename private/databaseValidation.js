function validateSignup(fname, lname, user_mail, password){
	if(fname == null || lname == null || user_mail == null || password == null){
		return false;
	}else if(8 > password > 20){
        return false;
    }else if(/^[a-zA-Z0-9]+$/.test(password)){
    	return false;
    }else if(user_mail.indexOf('@') == -1 || user_mail.indexOf('.') == -1){
    	return false;
    }else if(user_mail.indexOf('@') > user_mail.indexOf('.')){
    	return false;
    }else if(user_mail.length < 2){
        return false;
    }else{
        return true
    }
}

function validateGetLoginData(email){
    if(email == null || email == ''){
        return false;
    }else if(email.indexOf('@') == -1 || email.indexOf('.') == -1){
        return false;
    }else if(email.indexOf('@') > email.indexOf('.')){
        return false;
    }else if(email.length < 2){
        return false;
    }else{
        return true
    }
}

function validateGetUserData(user_id){
    return Number.isInteger(user_id)
}

function validateGetContAccount(keyword){
    if(keyword == null || keyword == ""){
        return false
    }else if (typeof keyword === 'string' || keyword instanceof String){
        return true
    }else{
        return false
    }
}

function validateGetContactAddresses(user_id, cont_id){
    if(Number.isInteger(user_id) && Number.isInteger(cont_id)){
        return true
    }else{
        return false
    }
}

function validateGetContactPhone(user_id, cont_id){
    if(Number.isInteger(user_id) && Number.isInteger(cont_id)){
        return true
    }else{
        return false
    }
}

function validateGetContactInfo(user_id){
    return Number.isInteger(user_id)
}

function validateGetContactsWithAccount(user_id){
    return Number.isInteger(user_id)
}

function validateCheckChatRoom(user_id){
    return Number.isInteger(user_id)
}

function validateCheckChatGuest(chatr_id){
    return Number.isInteger(chatr_id)
}

function validateAddContactPhone(cont_id, user_id, phone_number, type){
    phone_number = phone_number.replace(/((-)|(\()|(\))|( )|(\.))/g, "");
    if(!(/^[0-9]+$/).test(phone_number)){
       return false;
    }else if(phone_number.length !== 10){
        return false;
    }else if(Number.isInteger(user_id) && Number.isInteger(cont_id)){
        return true
    }else{
        return false
    }
}

function validateAddContact(user_id, fname, lname, bio){   
    if(typeof fname === 'string' || fname instanceof String){
        if (typeof lname === 'string' || lname instanceof String){
            if(typeof bio === 'string' || bio instanceof String){
                if(Number.isInteger(user_id)){
                    return true
                }else{return false}
            }else{return false}   
        }else{return false}
    }else{return false}
}


function validateAddContactwithAccount(user_id, fname, lname, acct_num){   
    if(typeof fname === 'string' || fname instanceof String){
        if (typeof lname === 'string' || lname instanceof String){
            if(Number.isInteger(user_id) && Number.isInteger(acct_num)){
                return true
            }else{return false}
        }else{return false}
    }else{return false}
}

function validateAddContactAddress(cont_id, user_id, address){   
    if(typeof address === 'string' || address instanceof String){
        if(Number.isInteger(user_id) && Number.isInteger(cont_id)){
            return true
        }else{return false}
    }else{return false}
}

function validateCreateAccount(e_mail, password){
    if(e_mail == null || password == null || e_mail == '' || password == ''){
        return false;
    }else if(8 > password > 20){
        return false;
    }else if(/^[a-zA-Z0-9]+$/.test(password)){
        return false;
    }else if(e_mail.indexOf('@') < -1 && e_mail.indexOf('.') < -1){
        return false;
    }else if(e_mail.indexOf('@') > e_mail.indexOf('.')){
        return false;
    }else if(e_mail.length < 2){
        return false;
    }else{
        return true
    }
}



function validateAddUserAddress(user_id, address){
    if(typeof address === 'string' || address instanceof String){
        if(Number.isInteger(user_id)){
            return true
        }else{return false}
    }else{return false}
}

function validateAddUserPhone(user_id, phone_number, type){
    phone_number = phone_number.toString()
    phone_number = phone_number.replace(/((-)|(\()|(\))|( )|(\.))/g, "");

    if((/^[0-9]+$/).test(phone_number)){
        if (phone_number.length === 10){
            if(type === "home" || type === "cell" || type === "work"){
                if(Number.isInteger(user_id)){
                    return true
                }else{return false}
            }else{return false}   
        }else{return false}
    }else{return false}
}

function validateEditUserBio(user_id, new_bio){
    if(typeof new_bio === 'string' || new_bio instanceof String){
        if (Number.isInteger(user_id)){
            return true 
        }else{return false}
    }else{return false}
}

function validateAddChatRoom(chatroom_name){
    if(typeof chatroom_name === 'string' || chatroom_name instanceof String){
        return true
    }else{return false}
}

module.exports = {  validateSignup,
                    validateGetLoginData,
                    validateGetUserData,
                    validateGetContAccount,
                    validateGetContactAddresses,
                    validateGetContactPhone,
                    validateGetContactInfo,
                    validateGetContactsWithAccount,
                    validateCheckChatRoom,
                    validateCheckChatGuest,
                    validateAddContactPhone,
                    validateAddContact,
                    validateAddContactwithAccount,
                    validateAddContactAddress,
                    validateCreateAccount,
                    validateAddUserAddress,
                    validateAddUserPhone,
                    validateEditUserBio,
                    validateAddChatRoom}
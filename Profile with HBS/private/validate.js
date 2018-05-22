module.exports = function validatePhone(phoneNumber) {
    try {
        if (phoneNumber != "") {
            phoneNumber = parseInt(phoneNumber)
            if (phoneNumber.toString().length == 10) {
                if (Number.isInteger(phoneNumber) == true) {
                    return true  
            } else if (Number.isInteger(phoneNumber) == false){
                return false
            }
        } else if (Number.isInteger(phoneNumber)) {
            return true
        } else {
            return false
        }
    } 
    } catch(err) {
        return false
    }
}

    


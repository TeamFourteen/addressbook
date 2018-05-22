module.exports = function validatePhone(phoneNumber) {
  if (phoneNumber == "") {
    return false;
  } else if (phoneNumber.length == 10) {
        phoneNumber = parseInt(phoneNumber);
        if(Number.isInteger(phoneNumber) == true) {
           if(phoneNumber.toString().length == 10) {
               return true
           }
       } else {
            return false
        }
  } else {
    return false;
  }
};

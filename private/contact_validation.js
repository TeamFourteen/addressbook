
var validate_phone = (phonenum)=>{
    try{
        if(phonenum != ""){
            console.log(true)
            phonenum = parseInt(phonenum);
            console.log(phonenum)
            if(phonenum.toString().length == 10){
                console.log(true)
                if(Number.isInteger(phonenum)){
                    console.log(true)
                    return true
                }else{
                    console.log(false)
                    return false
                }
            }else{
                console.log(false)
                return false
            }
        }else{
            console.log(false)
            return false
        }
    }catch(err){
        console.log(false)
        return false
}
    
};


var validate_obj = (objs)=>{
    stuff = Object.keys(objs);
    if(stuff.includes("type") && stuff.includes("phone") && stuff.length == 2){
        if(validate_type(objs.type) == true && validate_phone(objs.phone) == true){
            return true
        }else{
            return false
        }
    }else{
        return false
    }
};

var validate_type = (phonetype) => {
    if(phonetype == "cell" || phonetype == "work" || phonetype == "home"){
        return true
    }else{
        return false
    }
};

module.exports = {validate_obj};

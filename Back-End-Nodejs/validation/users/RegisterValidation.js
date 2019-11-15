const validator = require('validator');
const IsEmpty = require('../is-empty');

module.exports = function RegisterValidator(data){

    let error = {}
    data.firstname = !IsEmpty(data.firstname) ? data.firstname : '';
    data.lastname = !IsEmpty(data.firstname) ? data.lastname : '';
    data.Id = !IsEmpty(data.Id) ? data.Id : '';
    data.city = !IsEmpty(data.city) ? data.city : '';
    data.address = !IsEmpty(data.address) ? data.address : '';
    data.birthday = !IsEmpty(data.bday) ? data.birthday : '';
    data.password = !IsEmpty(data.password) ? data.password : '';

 
    if(validator.isEmpty(data.firstname)&&validator.isLength(data.firstname,{min:3})){error.firstname = 'enter firstName'}

    if(validator.isEmpty(data.lastname)&&validator.isLength(data.lastname,{min:3})){error.lastname = 'enter lastName'}

    if(validator.isEmpty(data.Id)){
        error.id = 'enter id'
    }
    else if(!validator.isLength(data.Id,{min: 9,max : 9})){
        error.id = 'id must contain 9 digits'
    }

    return {
        error,
        isVaild : IsEmpty(error)
    }

    
}
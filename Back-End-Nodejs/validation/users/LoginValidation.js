const validator = require('validator');
const IsEmpty = require('../is-empty');

module.exports = function LoginValidator(data){

    let error = {}
    data.Id = !IsEmpty(data.Id) ? data.Id : '';
    data.password = !IsEmpty(data.password) ? data.password : '';

  if(validator.isEmpty(data.password)){error.password = 'enter password'}

    if(validator.isEmpty(data.Id)){
        error.Id = 'enter id'
    }
    else if(!validator.isLength(data.Id,{min: 9,max : 9})){
        error.Id = 'id must contain 9 digits'
    }
   

    
    return {
        error,
        isVaild : IsEmpty(error)
    }

    
}
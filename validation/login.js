const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = validateLoginInput = (data)=>{
    let errors={}
    
    data.email = !isEmpty(data.email)? data.email : '';
    data.password = !isEmpty(data.password)? data.password : '';

    if(!Validator.isEmail(data.email)){
        errors.email = 'Email is not valid';
    }
    if(Validator.isEmpty(data.email)){
        errors.email='Email is required to login';
    }

    if (Validator.isEmpty(data.password)){
        errors.password = "Password is required to login";
    }

};
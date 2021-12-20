const validateEmail = (value) => {
    return String(value)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const validateRequired = (value) => {
    return value === null || value === undefined || value === "" ? false : true;
}

const maxLength=(value,length)=>{
    return;
}

const minLength=(value,length)=>{
    return;
}

const equalTo=(value1,value2)=>{
    return;
}

export const validate = (form) => {
    let formIsValid = true,
        errors = {};

    Object.keys(form).forEach(formElem => {
        var elemObject = form[formElem],
            elemObjectValue = elemObject.value;

        if (elemObject.rules["email"] === true) {
            if (!validateEmail(elemObjectValue)) {
                errors[formElem] = elemObject.messages["email"];
                formIsValid = false;
            }
        }

        if (elemObject.rules["required"] === true) {
            if (!validateRequired(elemObjectValue)) {
                errors[formElem] = elemObject.messages["required"];
                formIsValid = false;
            }
        }
    })

    /* for (var formElem in form) {

         var elemObject = form[formElem],
             elemObjectValue = elemObject.value;

         for (var rules in elemObject.rules) {
             let ruleBool = elemObject.rules[rules];

             if (rules === "email" && ruleBool === true) {
                 validateEmail(elemObjectValue).then((value)=>{
                     if(!value){
                         console.log(formElem,rules,value);
                         errors[formElem] = elemObject.messages[rules];
                         formIsValid = false;
                     }
                 });


                 /!*if (!validateEmail(elemObjectValue)) {
                     errors[formElem] = elemObject.messages[rules];
                     formIsValid = false;
                 }*!/

             }

             if (rules === "required" && ruleBool === true) {
                 console.log(formElem,rules);
                 if (!validateRequired(elemObjectValue)) {
                     errors[formElem] = elemObject.messages[rules];
                     formIsValid = false;
                 }
             }


         }
     }*/

    return {
        formIsValid, errors
    }
}
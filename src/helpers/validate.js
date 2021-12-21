let errors = {};

const defaultMessages = {
    required: "This field is required.",
    remote: "Please fix this field.",
    email: "Please enter a valid email address.",
    url: "Please enter a valid URL.",
    date: "Please enter a valid date.",
    dateISO: "Please enter a valid date (ISO).",
    number: "Please enter a valid number.",
    digits: "Please enter only digits.",
    creditcard: "Please enter a valid credit card number.",
    equalTo: "Please enter the same value again.",
    accept: "Please enter a value with a valid extension.",
    /*    maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
        minlength: jQuery.validator.format("Please enter at least {0} characters."),
        rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
        range: jQuery.validator.format("Please enter a value between {0} and {1}."),
        max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
        min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")*/
};

const sendMessage = (rule, elemObject, formElem) => {
    if (elemObject.messages) {
        if (elemObject.messages[rule] === null || elemObject.messages[rule] === undefined || elemObject.messages[rule] === '') {
            errors[formElem] = defaultMessages[rule];
        } else {
            errors[formElem] = elemObject.messages[rule];
        }
    } else {
        errors[formElem] = defaultMessages[rule];
    }
};

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

const maxLength = (value, length) => {
    return;
}

const minLength = (value, length) => {
    return;
}

const equalTo = (value1, value2) => {
    return;
}

export const validate = (form) => {
    let formIsValid = true;
    errors = {};

    Object.keys(form).forEach(formElem => {
        var elemObject = form[formElem],
            elemObjectValue = elemObject.value;

        if (elemObject.rules) {
            if (elemObject.rules["email"] === true) {
                if (!validateEmail(elemObjectValue)) {
                    let rule = "email";
                    sendMessage(rule, elemObject, formElem);
                    formIsValid = false;
                }
            }

            if (elemObject.rules["required"] === true) {
                if (!validateRequired(elemObjectValue)) {
                    let rule = "required";
                    sendMessage(rule, elemObject, formElem);
                    formIsValid = false;
                }
            }
        }
    });
    return {
        formIsValid, errors
    }
}


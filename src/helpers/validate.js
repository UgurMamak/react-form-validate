import {validateEmail} from "../validate/rules/email";
import {validateRequired} from "../validate/rules/required";
import {maxLength} from "../validate/rules/maxLength";
import {equalTo} from "../validate/rules/equalTo";
import {isNumber} from "../validate/rules/isNumber";
import {rangeLength} from "../validate/rules/rangeLength";

let errors = {};

const defaultMessages = {
    required: "This field is required.",
    isNumber: "Please enter a valid number.",
    email: "Please enter a valid email address.",
    equalTo: "Please enter the same value again.",
    maxLength: "Please enter a value less than or equal to {0}.",
    rangeLength: "Please enter a value between {0} and {1} characters long.",

    remote: "Please fix this field.",
    url: "Please enter a valid URL.",
    date: "Please enter a valid date.",
    dateISO: "Please enter a valid date (ISO).",
    digits: "Please enter only digits.",
    creditcard: "Please enter a valid credit card number.",
    accept: "Please enter a value with a valid extension.",

    /*    maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
        minlength: jQuery.validator.format("Please enter at least {0} characters."),
        rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
        range: jQuery.validator.format("Please enter a value between {0} and {1}."),
        max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
        min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")*/
};


String.prototype.formatUnicorn = String.prototype.formatUnicorn ||
    function () {
        "use strict";
        var str = this.toString();
        if (arguments.length) {
            var t = typeof arguments[0];
            var key;
            var args = ("string" === t || "number" === t) ?
                Array.prototype.slice.call(arguments)
                : arguments[0];

            for (key in args) {
                str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
            }
        }

        return str;
    };

const sendMessage = (rule, elemObject, formElem) => {
    if (elemObject.messages) {
        if (elemObject.messages[rule] === null || elemObject.messages[rule] === undefined || elemObject.messages[rule] === '') {
            if (rule === "maxLength") {
                errors[formElem] = defaultMessages[rule].formatUnicorn(elemObject.rules[rule]);
            } else {
                errors[formElem] = defaultMessages[rule];
            }
        } else {
            errors[formElem] = elemObject.messages[rule];
        }
    } else {
        errors[formElem] = defaultMessages[rule];
    }
};

const sendMessage2 = (rule, elemObject, formElem) => {
    if (elemObject.messages) {
        if (elemObject.messages[rule] === null || elemObject.messages[rule] === undefined || elemObject.messages[rule] === '') {
            errors[formElem] = defaultMessages[rule].formatUnicorn(elemObject.rules[rule]);
        } else {
            errors[formElem] = elemObject.messages[rule].formatUnicorn(elemObject.rules[rule]);
        }
    } else {
        errors[formElem] = defaultMessages[rule].formatUnicorn(elemObject.rules[rule]);
    }
};

export const validate = (form) => {
    let formIsValid = true;
    errors = {};
    
    console.log("validate=",form);

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

            if (elemObject.rules["isNumber"] === true) {
                if (!isNumber(elemObjectValue)) {
                    let rule = "isNumber";
                    sendMessage(rule, elemObject, formElem);
                    formIsValid = false;
                }
            }

            if (elemObject.rules["equalTo"]) {
                if (!equalTo(elemObjectValue, form[elemObject.rules["equalTo"]].value)) {
                    let rule = "equalTo";
                    sendMessage(rule, elemObject, formElem);
                    formIsValid = false;
                }
            }

            if (elemObject.rules["maxLength"] && elemObjectValue !== null) {
                if (!maxLength(elemObjectValue, elemObject.rules.maxLength)) {
                    let rule = "maxLength";
                    sendMessage2(rule, elemObject, formElem);
                    formIsValid = false;
                }
            }

            if(elemObject.rules["rangeLength"] && elemObjectValue!==null){
                if(!rangeLength(elemObjectValue,elemObject.rules.rangeLength)){
                    let rule="rangeLength";
                    sendMessage2(rule, elemObject, formElem);
                    formIsValid=false;
                }
            }

            if (elemObject.rules["required"] === true) {
                console.log(formElem);
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


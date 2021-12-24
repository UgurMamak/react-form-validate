import {validateEmail} from "../validate/rules/email";
import {validateRequired} from "../validate/rules/required";
import {maxLength} from "../validate/rules/maxLength";
import {equalTo} from "../validate/rules/equalTo";
import {isNumber} from "../validate/rules/isNumber";
import {rangeLength} from "../validate/rules/rangeLength";
import defaultMessages from "../validate/messages/messages-en"

let errors = {}, formIsValid = true, formObject = {};

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

export const validate = {

    methods: {
        email: function (value, elemObject, element) {
            if (!validateEmail(value)) {
                let rule = "email";
                sendMessage(rule, elemObject, element);
                formIsValid = false;
            }
        },
        required: function (value, elemObject, element) {
            if (!validateRequired(value)) {
                let rule = "required";
                sendMessage(rule, elemObject, element);
                formIsValid = false;
            }
        },
        isNumber: function (value, elemObject, element) {
            if (!isNumber(value)) {
                let rule = "isNumber";
                sendMessage(rule, elemObject, element);
                formIsValid = false;
            }
        },
        equalTo: function (value, elemObject, element) {
            if (!equalTo(value, formObject[elemObject.rules["equalTo"]].value)) {
                let rule = "equalTo";
                sendMessage(rule, elemObject, element);
                formIsValid = false;
            }
        },
        maxLength: function (value, elemObject, element) {
            if (value !== null) {
                if (!maxLength(value, elemObject.rules.maxLength)) {
                    let rule = "maxLength";
                    sendMessage2(rule, elemObject, element);
                    formIsValid = false;
                }
            }
        },
        rangeLength: function (value, elemObject, element) {
            if (value !== null) {
                if (!rangeLength(value, elemObject.rules.rangeLength)) {
                    let rule = "rangeLength";
                    sendMessage2(rule, elemObject, element);
                    formIsValid = false;
                }
            }
        }
    },

    valid: function (form) {
        formIsValid = true;
        errors = {};
        formObject = form;

        Object.keys(form).forEach(formElem => {
            var elemObject = form[formElem],
                elemObjectValue = elemObject.value;
            if (elemObject.rules) {
                Object.keys(elemObject.rules).forEach(rule => {
                    if (this.methods.hasOwnProperty(rule)) {
                        this.methods[rule](elemObjectValue, elemObject, formElem);
                    }
                });
            }
        });

        return {
            formIsValid, errors
        }
    },

    addMethod: function (name, method, message) {
        defaultMessages[name] = message
        this.addRule(name, method);
    },

    addRule: function (name, method) {
        validate.methods[name] = function (value, elemObject, element) {
            console.log(value, elemObject, element);
            method();
            if (!method(value)) {
                let rule = name;
                sendMessage(rule, elemObject, element);
                formIsValid = false;
            }
        };
    }
}

window.validate = validate;
window.message = defaultMessages;


import {messages} from "../validate/messages/index";
import validateEmail from "../validate/rules/email";
import validateRequired from "../validate/rules/required";
import maxLength from "../validate/rules/maxLength";
import equalTo from "../validate/rules/equalTo";
import isNumber from "../validate/rules/isNumber";
import rangeLength from "../validate/rules/rangeLength";
import minLength from "../validate/rules/minLength";

let formIsValid = true, validateObject = {}, formData = {}
    , defaultMessages = messages('en'),
    customMessages = {};

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


const sendMessage = (rule, elementRules, elementName) => {
    if (validateObject.messages) {
        if (validateObject.messages[elementName][rule] === null || validateObject.messages[elementName][rule] === undefined || validateObject.messages[elementName][rule] === '') {
            validateObject.error = {
                ...validateObject.error,
                [elementName]: defaultMessages[rule].formatUnicorn(elementRules[rule])
            };
        } else {
            validateObject.error = {
                ...validateObject.error,
                [elementName]: validateObject.messages[elementName][rule].formatUnicorn(elementRules[rule])
            };
        }
    } else {
        validateObject.error = {
            ...validateObject.error,
            [elementName]: defaultMessages[rule].formatUnicorn(elementRules[rule])
        };
    }
};

export const validate = {

    methods: {
        email: function (value, elementRules, element) {
            if (!validateEmail(value)) {
                let rule = "email";
                sendMessage(rule, elementRules, element);
                formIsValid = false;
            }
        },
        isNumber: function (value, elementRules, element) {
            if (!isNumber(value)) {
                let rule = "isNumber";
                sendMessage(rule, elementRules, element);
                formIsValid = false;
            }
        },
        equalTo: function (value, elementRules, element) {
            console.log(value, formData, formData[elementRules["equalTo"]], elementRules["equalTo"]);
            if (!equalTo(value, formData[elementRules["equalTo"]])) {
                let rule = "equalTo";
                sendMessage(rule, elementRules, element);
                formIsValid = false;
            }
        },
        maxLength: function (value, elementRules, element) {
            if (value) {
                if (!maxLength(value, elementRules.maxLength)) {
                    let rule = "maxLength";
                    sendMessage(rule, elementRules, element);
                    formIsValid = false;
                }
            }
        },
        rangeLength: function (value, elementRules, element) {
            if (value) {
                if (!rangeLength(value, elementRules.rangeLength)) {
                    let rule = "rangeLength";
                    sendMessage(rule, elementRules, element);
                    formIsValid = false;
                }
            }
        },
        required: function (value, elementRules, element) {
            if (!validateRequired(value)) {
                let rule = "required";
                sendMessage(rule, elementRules, element);
                formIsValid = false;
            }
        },
        minLength: function (value, elementRules, element) {
            if (value) {
                if (!minLength(value, elementRules.minLength)) {
                    let rule = "minLength";
                    sendMessage(rule, elementRules, element);
                    formIsValid = false;
                }
            }
        }
    },

    singleValid:function(validateObj,elementName,elementValue){
        validateObject = validateObj;
        console.log(elementName,validateObj.rules[elementName],validateObj.messages[elementName],elementValue);

        if(validateObject.error){
            validateObject.error[elementName] =''
        }

        Object.keys(validateObj.rules[elementName]).forEach(rule => {
            if (this.methods.hasOwnProperty(rule)) {
                this.methods[rule](elementValue, validateObj.rules[elementName], elementName);
            }
        });

        return {
            formIsValid, validateObject
        }
    },

    valid: function (validateObj, formDataObj) {
        formIsValid = true;
        validateObject = validateObj;
        formData = formDataObj;

        defaultMessages = messages(validateObject.lang);

        defaultMessages = {
            ...defaultMessages,
            ...customMessages
        }

        Object.keys(validateObj.rules).forEach(elementName => {
            var elementRules = validateObject.rules[elementName],
                elementValue = formData[elementName];
            validateObject.error[elementName] = '';

            Object.keys(elementRules).forEach(rule => {
                if (this.methods.hasOwnProperty(rule)) {
                    this.methods[rule](elementValue, elementRules, elementName);
                }
            });

        });

        return {
            formIsValid, validateObject
        }
    },

    addMethod: function (name, method, message) {
        defaultMessages[name] = message;
        customMessages = {
            [name]: message
        };
        this.addRule(name, method);
    },

    addRule: function (name, method) {
        validate.methods[name] = function (value, elementRules, elementName) {
            method();
            if (!method(value)) {
                let rule = name;
                sendMessage(rule, elementRules, elementName);
                formIsValid = false;
            }
        };
    },

    addWithAttr: function (validateObject) {
        var elementList = document.querySelectorAll('[data-validate]');
        if (!elementList.length) return;

        elementList.forEach((item) => {
            let obj = JSON.parse(item.getAttribute('data-validate'));
            validateObject.rules = {
                ...validateObject.rules,
                [item.name]: obj.rules
            };
            validateObject.messages = {
                ...validateObject.messages,
                [item.name]: obj.messages
            }
        });
    }
}

window.validate = validate;
window.message = defaultMessages;
import {messages} from "../validate/messages/index";
import validateEmail from "../validate/rules/email";
import validateRequired from "../validate/rules/required";
import maxLength from "../validate/rules/maxLength";
import equalTo from "../validate/rules/equalTo";
import isNumber from "../validate/rules/isNumber";
import rangeLength from "../validate/rules/rangeLength";
import minLength from "../validate/rules/minLength";

let formIsValid = true, validateObject = {}, formData = {}
,defaultMessages=messages('en');



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

//1
/*const sendMessage = (rule, elementRules, formElem) => {
    if (elementRules.messages) {
        if (elementRules.messages[rule] === null || elementRules.messages[rule] === undefined || elementRules.messages[rule] === '') {
            if (rule === "maxLength") {
                //errors[formElem] = defaultMessages[rule].formatUnicorn(elementRules.rules[rule]);
                validateObject[formElem] = {
                    ...validateObject[formElem],
                    error: defaultMessages[rule].formatUnicorn(elementRules.rules[rule])
                };
            } else {
                //errors[formElem] = defaultMessages[rule];
                validateObject[formElem] = {
                    ...validateObject[formElem],
                    error: defaultMessages[rule]
                };
            }
        } else {
            validateObject[formElem] = {
                ...validateObject[formElem],
                error: elementRules.messages[rule]
            };
        }
    } else {
        //errors[formElem] = defaultMessages[rule];
        validateObject[formElem] = {
            ...validateObject[formElem],
            error: defaultMessages[rule]
        };
    }
};*/

//2
/*const sendMessage = (rule, elementRules, formElem) => {
    if (elementRules.messages) {
        if (elementRules.messages[rule] === null || elementRules.messages[rule] === undefined || elementRules.messages[rule] === '') {
            //errors[formElem] = defaultMessages[rule].formatUnicorn(elementRules.rules[rule]);
            validateObject[formElem] = {
                ...validateObject[formElem],
                error: defaultMessages[rule].formatUnicorn(elementRules.rules[rule])
            };
        } else {
            //errors[formElem] = elementRules.messages[rule].formatUnicorn(elementRules.rules[rule]);
            validateObject[formElem] = {
                ...validateObject[formElem],
                error: elementRules.messages[rule].formatUnicorn(elementRules.rules[rule])
            };
        }
    } else {
        //errors[formElem] = defaultMessages[rule].formatUnicorn(elementRules.rules[rule]);
        validateObject[formElem] = {
            ...validateObject[formElem],
            error: defaultMessages[rule].formatUnicorn(elementRules.rules[rule])
        };
    }
};*/

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
            ;
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

    valid: function (validateObj, formData) {
        formIsValid = true;
        validateObject = validateObj;
        formData = formData;

        defaultMessages=messages(validateObject.lang);

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
        console.log(defaultMessages);
        defaultMessages[name] = message
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

//2
/*export const validate = {

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
            if (!equalTo(value, validateObject[elementRules.rules["equalTo"]].value)) {
                let rule = "equalTo";
                sendMessage(rule, elementRules, element);
                formIsValid = false;
            }
        },
        maxLength: function (value, elementRules, element) {
            if (value) {
                if (!maxLength(value, elementRules.rules.maxLength)) {
                    let rule = "maxLength";
                    sendMessage(rule, elementRules, element);
                    formIsValid = false;
                }
            }
        },
        rangeLength: function (value, elementRules, element) {
            if (value) {
                if (!rangeLength(value, elementRules.rules.rangeLength)) {
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
                console.log("girdi=", value);

                if (!minLength(value, elementRules.rules.minLength)) {
                    let rule = "minLength";
                    sendMessage(rule, elementRules, element);
                    formIsValid = false;
                }
            }
        }
    },

    valid: function (form, formData) {
        formIsValid = true;
        validateObject = form;

        Object.keys(form).forEach(formElem => {
            var elementRules = form[formElem],
                elementRulesValue = formData[formElem];
            elementRules.error = "";

            if (elementRules.rules) {
                Object.keys(elementRules.rules).forEach(rule => {
                    if (this.methods.hasOwnProperty(rule)) {
                        this.methods[rule](elementRulesValue, elementRules, formElem);
                    }
                });
            }
        });

        return {
            formIsValid, validateObject
        }
    },

    addMethod: function (name, method, message) {
        defaultMessages[name] = message
        this.addRule(name, method);
    },

    addRule: function (name, method) {
        validate.methods[name] = function (value, elementRules, element) {
            console.log(value, elementRules, element);
            method();
            if (!method(value)) {
                let rule = name;
                sendMessage(rule, elementRules, element);
                formIsValid = false;
            }
        };
    },

    addWithAttr: function (validateObject) {
        var elementList = document.querySelectorAll('[data-validate]');
        if (!elementList.length) return;
        elementList.forEach((item) => {
            validateObject[item.name] = JSON.parse(item.getAttribute('data-validate'))
        });
    }

}*/


//1
/*export const validate = {

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
            if (!equalTo(value, validateObject[elementRules.rules["equalTo"]].value)) {
                let rule = "equalTo";
                sendMessage(rule, elementRules, element);
                formIsValid = false;
            }
        },
        maxLength: function (value, elementRules, element) {
            if (value !== null) {
                if (!maxLength(value, elementRules.rules.maxLength)) {
                    let rule = "maxLength";
                    sendMessage2(rule, elementRules, element);
                    formIsValid = false;
                }
            }
        },
        rangeLength: function (value, elementRules, element) {
            if (value !== null) {
                if (!rangeLength(value, elementRules.rules.rangeLength)) {
                    let rule = "rangeLength";
                    sendMessage2(rule, elementRules, element);
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
    },

    valid: function (form) {
        formIsValid = true;
        errors = {};
        validateObject = form;

        Object.keys(form).forEach(formElem => {
            var elementRules = form[formElem],
                elementRulesValue = elementRules.value;
            elementRules.error = "";
            if (elementRules.rules) {
                Object.keys(elementRules.rules).forEach(rule => {
                    if (this.methods.hasOwnProperty(rule)) {
                        this.methods[rule](elementRulesValue, elementRules, formElem);
                    }
                });
            }
        });

        return {
            formIsValid, errors, validateObject
        }
    },

    addMethod: function (name, method, message) {
        defaultMessages[name] = message
        this.addRule(name, method);
    },

    addRule: function (name, method) {
        validate.methods[name] = function (value, elementRules, element) {
            console.log(value, elementRules, element);
            method();
            if (!method(value)) {
                let rule = name;
                sendMessage(rule, elementRules, element);
                formIsValid = false;
            }
        };
    },

    addWithAttr: function (validateObject) {
        var elementList = document.querySelectorAll('[data-validate]');
        if(!elementList.length)return;
        elementList.forEach((item) => {
            validateObject[item.name] = JSON.parse(item.getAttribute('data-validate'))
        });
    }

}*/

window.validate = validate;
window.message = defaultMessages;
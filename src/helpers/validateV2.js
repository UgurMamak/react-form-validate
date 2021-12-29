import validateEmail from "../validate/rules/email";
import isNumber from "../validate/rules/isNumber";
import equalTo from "../validate/rules/equalTo";
import maxLength from "../validate/rules/maxLength";
import rangeLength from "../validate/rules/rangeLength";
import validateRequired from "../validate/rules/required";
import minLength from "../validate/rules/minLength";
import {messages} from "../validate/messages";


export default class ValidateV2 {

    formIsValid = true;

    constructor(validateObject, formData) {

        this.validateObject = validateObject;
        this.formData = formData;

        this.defaultMessages = validateObject.lang ? {
                ...messages(validateObject.lang),
                ...this.customMessage
            } :
            {
                ...messages('en'),
                ...this.customMessage
            }
    }

    init() {
    }

    methods() {

        /*var methods2={
            vthis: this,

            email: function (value, elementRules, element) {
                if (!validateEmail(value)) {
                    let rule = "email";
                    this.vthis.sendMessage(rule, elementRules, element);
                    this.vthis.formIsValid = false;
                }
            },

            isNumber: function (value, elementRules, element) {
                if (!isNumber(value)) {
                    let rule = "isNumber";
                    this.vthis.sendMessage(rule, elementRules, element);
                    this.vthis.formIsValid = false;
                }
            },

            equalTo: function (value, elementRules, element) {
                if (!equalTo(value, this.vthis.formData[elementRules["equalTo"]])) {
                    let rule = "equalTo";
                    this.vthis.sendMessage(rule, elementRules, element);
                    this.vthis.formIsValid = false;
                }
            },

            maxLength: function (value, elementRules, element) {
                if (value) {
                    if (!maxLength(value, elementRules.maxLength)) {
                        let rule = "maxLength";
                        this.vthis.sendMessage(rule, elementRules, element);
                        this.vthis.formIsValid = false;
                    }
                }
            },

            rangeLength: function (value, elementRules, element) {
                if (value) {
                    if (!rangeLength(value, elementRules.rangeLength)) {
                        let rule = "rangeLength";
                        this.vthis.sendMessage(rule, elementRules, element);
                        this.vthis.formIsValid = false;
                    }
                }
            },

            required: function (value, elementRules, element) {
                if (!validateRequired(value)) {
                    let rule = "required";
                    this.vthis.sendMessage(rule, elementRules, element);
                    this.vthis.formIsValid = false;
                }
            },

            minLength: function (value, elementRules, element) {
                if (value) {
                    if (!minLength(value, elementRules.minLength)) {
                        let rule = "minLength";
                        this.vthis.sendMessage(rule, elementRules, element);
                        this.vthis.formIsValid = false;
                    }
                }
            }
        }*/

        var methods2 = {

            vthis: this,

            email: function (value, elementRules, element) {
                if (!validateEmail(value)) {
                    let rule = "email";
                    this.vthis.sendMessage(rule, elementRules, element);
                    this.vthis.formIsValid = false;
                }
            },

            isNumber: function (value, elementRules, element) {
                if (!isNumber(value)) {
                    let rule = "isNumber";
                    this.vthis.sendMessage(rule, elementRules, element);
                    this.vthis.formIsValid = false;
                }
            },

            equalTo: function (value, elementRules, element) {
                if (!equalTo(value, this.vthis.formData[elementRules["equalTo"]])) {
                    let rule = "equalTo";
                    this.vthis.sendMessage(rule, elementRules, element);
                    this.vthis.formIsValid = false;
                }
            },

            maxLength: function (value, elementRules, element) {
                if (value) {
                    if (!maxLength(value, elementRules.maxLength)) {
                        let rule = "maxLength";
                        this.vthis.sendMessage(rule, elementRules, element);
                        this.vthis.formIsValid = false;
                    }
                }
            },

            rangeLength: function (value, elementRules, element) {
                if (value) {
                    if (!rangeLength(value, elementRules.rangeLength)) {
                        let rule = "rangeLength";
                        this.vthis.sendMessage(rule, elementRules, element);
                        this.vthis.formIsValid = false;
                    }
                }
            },

            required: function (value, elementRules, element) {
                if (!validateRequired(value)) {
                    let rule = "required";
                    this.vthis.sendMessage(rule, elementRules, element);
                    this.vthis.formIsValid = false;
                }
            },

            minLength: function (value, elementRules, element) {
                if (value) {
                    if (!minLength(value, elementRules.minLength)) {
                        let rule = "minLength";
                        this.vthis.sendMessage(rule, elementRules, element);
                        this.vthis.formIsValid = false;
                    }
                }
            },

            ...this.customValidateRule
        }

        console.log(methods2);

        return methods2;
    }

    sendMessage = function (rule, elementRules, elementName) {
        console.log(elementName);
        if (this.validateObject.messages) {
            if (this.validateObject.messages[elementName][rule] === null || this.validateObject.messages[elementName][rule] === undefined || this.validateObject.messages[elementName][rule] === '') {
                this.validateObject.error = {
                    ...this.validateObject.error,
                    [elementName]: this.defaultMessages[rule].formatUnicorn(elementRules[rule])
                };
            } else {
                this.validateObject.error = {
                    ...this.validateObject.error,
                    [elementName]: this.validateObject.messages[elementName][rule].formatUnicorn(elementRules[rule])
                };
            }
        } else {
            this.validateObject.error = {
                ...this.validateObject.error,
                [elementName]: this.defaultMessages[rule].formatUnicorn(elementRules[rule])
            };
        }
    }

    valid() {
        console.log("===", this.methods());
        Object.keys(this.validateObject.rules).forEach(elementName => {
            var elementRules = this.validateObject.rules[elementName],
                elementValue = this.formData[elementName];
            this.validateObject.error[elementName] = '';

            var validateCont = document.querySelector('[data-validate-name="' + this.validateObject.name + '"] [name="' + elementName + '"] '),
                parentElement = validateCont.closest('[data-validate-wrap]');

            if (parentElement.getAttribute('data-validate-wrap') && window.getComputedStyle(parentElement).display !== "none") {
                Object.keys(elementRules).forEach(rule => {
                    if (this.methods().hasOwnProperty(rule)) {
                        this.methods()[rule](elementValue, elementRules, elementName);
                    }
                });
            }

        });

        return {
            formIsValid: this.formIsValid, validateObject: this.validateObject
        }
    }

    addMethod(name, method, message) {
        this.customMessage = {
            ...this.customMessage,
            [name]: message
        };
        this.customValidateRule = {
            ...this.customValidateRule,
            [name]: function (value, elementRules, elementName) {
                method();
                if (!method(value)) {
                    let rule = name;
                    this.vthis.sendMessage(rule, elementRules, elementName);
                    this.vthis.formIsValid = false;
                }
            }
        }
        this.methods(this.customValidateRule);
    }

    addWithAttr(validateObject) {
        var elementList = document.querySelectorAll('[data-validate]');
        if (!elementList.length) return;

        elementList.forEach((item) => {
            let obj = JSON.parse(item.getAttribute('data-validate'));
            this.validateObject.rules = {
                ...this.validateObject.rules,
                [item.name]: obj.rules
            };
            this.validateObject.messages = {
                ...this.validateObject.messages,
                [item.name]: obj.messages
            }
        });
    }

}


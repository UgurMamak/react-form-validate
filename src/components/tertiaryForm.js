import React, {Component} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {validate} from "../helpers/validate";
import axios from "axios";

class TertiaryForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeStep: 0,
            totalStep: 2,
            form: {
                email: null,
                email2: null,
                password: null,
                password2: null,
                citySelect: null,
                checkbox2: null,
                checkbox1: null,
                count: null,
                formHorizontalRadios: null,
                rangeElement: null,
                password3: null
            },
            validate: {
                name:"stepFormValidate",
                rules: {
                    email: {
                        email: true,
                        required: true
                    },
                    email2: {

                        email: true,
                        required: true

                    },
                    password: {


                        required: true,
                        maxLength: 8


                    },
                    password2: {

                        equalTo: 'password',
                        minLength: 2,
                        required: true


                    },
                    citySelect: {
                        required: true
                    },
                    checkbox2: {


                        required: true

                    },
                    checkbox1: {

                        required: true

                    },
                    count: {

                        isNumber: true

                    },
                    formHorizontalRadios: {

                        required: true

                    },
                    rangeElement: {


                        required: true,
                        rangeLength: [3, 8]

                    },
                    password3: {

                        passwordRegex: true,
                        required: true

                    }
                },
                messages: {
                    email: {


                        required: 'email boş bırakılamaz',
                        email: 'geçersiz email adresi {0}'

                    },
                    email2: {},
                    password: {

                        required: 'password boş bırakılamaz'

                    },
                    password2: {


                        minLength: 'minimum {0} karakter girebilirsiniz'

                    },
                    citySelect: {


                        required: 'şehir boş bırakılamaz'

                    },
                    checkbox2: {


                        required: "checkbox2 boş bırakılamaz"

                    },
                    checkbox1: {},
                    count: {},
                    formHorizontalRadios: {},
                    rangeElement: {
                        rangeLength: "{0} ile {1} arası değer giriniz"
                    },
                    password3: {}
                },
                error: {},
                lang: 'en'
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(event) {
        event.preventDefault();
        var data = {};

        const {formIsValid, validateObject} = validate.valid(this.state.validate, this.state.form);

        this.setState({
            validate: validateObject
        });

        if (formIsValid) {
            console.log("formIsValid ifi", formIsValid);
            Object.keys(this.state.form).forEach(formItem => {
                data[formItem] = this.state.form[formItem]
            });

            axios.post("https://jsonplaceholder.typicode.com/posts/1/comments", data).then(response => {
                console.log(response)
            });
        }

    }

    handleChange(event) {
        var name = event.target.name,
            value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

        this.setState(prevState => ({
            form: {
                ...prevState.form,
                [name]: value
            },
            form2: {
                ...prevState.form2,
                [name]: value
            }
        }));

        /* this.setState(prevState => ({
             form2: {
                 ...prevState.form2,
                 [name]: value
             },
             validate: {
                 ...prevState.validate,
                 [name]: {
                     ...prevState.validate[name],
                     value: value
                 }
             }
         }));*/

    }

    selectChange(event){
        console.log("selectChange=",event);

        var name = event.target.name,
            value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

        const {formIsValid, validateObject} =  validate.singleValid(this.state.validate,name,value);

        console.log("selectChange=",validateObject);

        this.setState(prevState => ({
            form: {
                ...prevState.form,
                [name]: value
            },
            validate: validateObject
        }));
    }

    handleInputBlur(event){
        console.log("blur run=",event);
        var name = event.target.name,
            value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

        const {formIsValid, validateObject} =  validate.singleValid(this.state.validate,name,value);

        console.log("selectChange=",validateObject,formIsValid);

        this.setState(prevState => ({
            form: {
                ...prevState.form,
                [name]: value
            },
            validate: validateObject
        }));
    }

    handleStepAction(action) {
        let {activeStep, totalStep} = this.state;

        let current=activeStep+action;

        if (current < 0) return;

        if (current > totalStep) return;

        const {formIsValid, validateObject} = validate.valid(this.state.validate, this.state.form);

        this.setState({
            validate: validateObject
        });


        if(formIsValid){
            document.querySelector('.step-content-wrap').children[activeStep].setAttribute('data-validate-wrap','false');
            document.querySelector('.step-content-wrap').children[current].setAttribute('data-validate-wrap','true');

            this.setState({
                validate: validateObject,
                activeStep: activeStep + action
            });
        }

    }

    render() {
        let {activeStep} = this.state;

        return (
            <div>
                <Container data-validate-name="stepFormValidate">
                    <Form onSubmit={this.handleSubmit}>
                        <div className="step-content-wrap">

                            <div data-validate-wrap="true" className={activeStep === 0 ? '' : 'd-none'}>
                                <Row className="mb-3 mt-3">
                                    <Form.Group as={Col} md={3} controlId="formGridEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="text" className={'required'}
                                                      data-msg-required="boş bırakmayınız."
                                                      onChange={(e) => this.handleChange(e)}
                                                      onBlur={(e) => this.handleInputBlur(e)}

                                                      name="email" placeholder="Enter email"/>
                                        <span style={{color: "red"}}>{this.state.validate.error.email}</span>
                                    </Form.Group>

                                    <Form.Group as={Col} md={3} controlId="formGridEmail2">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="text" className={'required'}
                                                      data-msg-required="boş bırakmayınız."
                                                      onChange={(e) => this.handleChange(e)}
                                                      name="email2" placeholder="Enter email"/>
                                        <span style={{color: "red"}}>{this.state.validate.error.email2}</span>
                                    </Form.Group>

                                    <Form.Group as={Col} md={3} controlId="formGridPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" name="password"
                                                      onChange={(e) => this.handleChange(e)}
                                                      placeholder="Password"/>
                                        <span style={{color: "red"}}>{this.state.validate.error.password}</span>
                                    </Form.Group>

                                    <Form.Group as={Col} md={3} controlId="formGridPassword2">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" name="password2"
                                                      onChange={(e) => this.handleChange(e)}
                                                      placeholder="Password2"/>
                                        <span style={{color: "red"}}>{this.state.validate.error.password2}</span>
                                    </Form.Group>

                                    <Form.Group as={Col} md={3} controlId="formGridPassword3">
                                        <Form.Label>Password3 (custom validate)</Form.Label>
                                        <Form.Control type="password" name="password3"
                                                      onChange={(e) => this.handleChange(e)}
                                                      placeholder="Password3"/>
                                        <span style={{color: "red"}}>{this.state.validate.error.password3}</span>
                                    </Form.Group>

                                </Row>
                            </div>

                            <div data-validate-wrap="false"  className={activeStep === 1 ? '' : 'd-none'}>
                                <Row className="mb-3 mt-3">
                                    <Form.Group as={Col} md={3} controlId="rangeElement">
                                        <Form.Label>range example</Form.Label>
                                        <Form.Control name="rangeElement"
                                                      onChange={(e) => this.handleChange(e)} placeholder=""/>
                                        <span style={{color: "red"}}>{this.state.validate.error.rangeElement}</span>
                                    </Form.Group>

                                    <Form.Group as={Col} md={3} controlId="formGridAddress1">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control name="address1" data-validate={JSON.stringify({
                                            rules: {
                                                required: true
                                            },
                                            messages: {
                                                required: "test"
                                            }
                                        })}
                                                      onChange={(e) => this.handleChange(e)}
                                                      placeholder="1234 Main St"/>
                                        {
                                            this.state.validate.rules.hasOwnProperty("address1") ?
                                                <span
                                                    style={{color: "red"}}>{this.state.validate.error.address1}</span> : ''
                                        }

                                    </Form.Group>

                                    <Form.Group as={Col} md={3} controlId="formGridAddress2">
                                        <Form.Label>Address 2</Form.Label>
                                        <Form.Control name="address2" onChange={(e) => this.handleChange(e)}
                                                      data-validate={JSON.stringify({
                                                          rules: {
                                                              required: true
                                                          },
                                                          messages: {
                                                              required: "test2"
                                                          }
                                                      })} placeholder="Apartment, studio, or floor"/>
                                        {
                                            this.state.validate.rules.hasOwnProperty("address2") ?
                                                <span
                                                    style={{color: "red"}}>{this.state.validate.error.address2}</span> : ''
                                        }
                                    </Form.Group>

                                    <Form.Group as={Col} md={3} controlId="formGridCity">
                                        <Form.Label>City</Form.Label>
                                        <Form.Control/>
                                    </Form.Group>

                                    <Form.Group as={Col} md={3} controlId="formGridState">
                                        <Form.Label>State</Form.Label>
                                        <Form.Select defaultValue="Choose..." name="citySelect"
                                                     onChange={(e) => this.selectChange(e)}>
                                            <option value="">Choose...</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>
                                        <span style={{color: "red"}}>{this.state.validate.error.citySelect}</span>
                                    </Form.Group>
                                </Row>
                            </div>

                            <div data-validate-wrap="false" className={activeStep === 2 ? '' : 'd-none'}>
                                <Row style={{display:"none"}} className="mb-3 mt-3">
                                    <Form.Group as={Col} md={3} controlId="formGridZip">
                                        <Form.Label>Zip</Form.Label>
                                        <Form.Control/>
                                    </Form.Group>

                                    <Form.Group as={Col} md={3} controlId="count">
                                        <Form.Label>Adet</Form.Label>
                                        <Form.Control name="count" onChange={(e) => this.handleChange(e)}
                                                      placeholder="Adet giriniz."/>
                                        <span style={{color: "red"}}>{this.state.validate.error.count}</span>
                                    </Form.Group>

                                    <Form.Group as={Col} md={3} id="formGridCheckbox1">
                                        <Form.Check type="checkbox" name="checkbox1"
                                                    onChange={(e) => this.handleChange(e)}
                                                    label="checkbox1"/>
                                        <span style={{color: "red"}}>{this.state.validate.error.checkbox1}</span>
                                    </Form.Group>

                                    <Form.Group as={Col} md={3} id="formGridCheckbox2">
                                        <Form.Check type="checkbox" name="checkbox2" onChange={(e) => {
                                            this.handleChange(e)
                                        }} label="checkbox2"/>
                                        <span style={{color: "red"}}>{this.state.validate.error.checkbox2}</span>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label as="legend" column sm={2}>
                                            Radios
                                        </Form.Label>
                                        <Col sm={10}>
                                            <Form.Check
                                                type="radio"
                                                label="first radio"
                                                name="formHorizontalRadios"
                                                id="formHorizontalRadios1"
                                                onChange={(e) => this.handleChange(e)}

                                            />
                                            <Form.Check
                                                type="radio"
                                                label="second radio"
                                                name="formHorizontalRadios"
                                                id="formHorizontalRadios2"
                                                onChange={(e) => this.handleChange(e)}
                                            />
                                            <Form.Check
                                                type="radio"
                                                label="third radio"
                                                name="formHorizontalRadios"
                                                id="formHorizontalRadios3"
                                                onChange={(e) => this.handleChange(e)}
                                            />
                                        </Col>
                                        <span
                                            style={{color: "red"}}>{this.state.validate.error.formHorizontalRadios}</span>
                                    </Form.Group>
                                </Row>
                            </div>
                        </div>

                        <div className="step-footer">
                            <Button variant="primary" type="button" onClick={() => this.handleStepAction(-1)}>
                                geri
                            </Button>
                            <Button variant="primary" type="button" onClick={() => this.handleStepAction(+1)}>
                                ileri
                            </Button>
                            <Button variant="primary" type="submit">
                                gönder
                            </Button>
                        </div>

                    </Form>
                </Container>
            </div>
        );
    }
}

export default TertiaryForm;
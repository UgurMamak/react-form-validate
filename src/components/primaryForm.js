import React, {Component} from 'react';
import {Button, Col, Form, Row, Container} from 'react-bootstrap';
import axios from "axios";
import {validate} from "../helpers/validate";

class PrimaryForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
            },

            validate2:{
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
                lang: 'tr'
            },
            form2:{
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
            }

        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmit2 = this.handleSubmit2.bind(this);
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

    handleSubmit(event) {
        event.preventDefault();
        var data = {};

        const {formIsValid, validateObject} = validate.valid(this.state.validate, this.state.form);

        this.setState({
            validate: validateObject
        });

        console.log("validateObject=", validateObject,formIsValid);

        if (formIsValid) {
            console.log("formIsValid ifi",formIsValid);
            Object.keys(this.state.form).forEach(formItem => {
                data[formItem] = this.state.form[formItem]
            });

            axios.post("https://jsonplaceholder.typicode.com/posts/1/comments", data).then(response => {
                console.log(response)
            });
        }

    }

    handleSubmit2(event) {
        console.log("2.form");
        event.preventDefault();
        var data = {};

        const {formIsValid, validateObject} = validate.valid(this.state.validate2, this.state.form2);

        this.setState({
            validate2: validateObject
        });


        console.log("validateObject=", validateObject);

        if (formIsValid) {
            Object.keys(this.state.form2).forEach(formItem => {
                data[formItem] = this.state.form2[formItem]
            });

            axios.post("https://jsonplaceholder.typicode.com/posts/1/comments", data).then(response => {
                console.log(response)
            });
        }
    }

    componentDidMount() {
        validate.addMethod("passwordRegex", function (value) {
            var regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/
            return regex.test(value);
        }, "parola kurallarına uymuyor");
        validate.addWithAttr(this.state.validate, this.state.form);
        validate.addWithAttr(this.state.validate2, this.state.form2);
    }

    render() {
        return (
            <Container>
                <Form onSubmit={this.handleSubmit}>
                    <Row className="mb-3 mt-3">
                        <Form.Group as={Col} md={3} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" className={'required'} data-msg-required="boş bırakmayınız."
                                          onChange={(e) => this.handleChange(e)}
                                          name="email" placeholder="Enter email"/>
                            <span style={{color: "red"}}>{this.state.validate.error.email}</span>
                        </Form.Group>

                        <Form.Group as={Col} md={3} controlId="formGridEmail2">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" className={'required'} data-msg-required="boş bırakmayınız."
                                          onChange={(e) => this.handleChange(e)}
                                          name="email2" placeholder="Enter email"/>
                            <span style={{color: "red"}}>{this.state.validate.error.email2}</span>
                        </Form.Group>

                        <Form.Group as={Col} md={3} controlId="formGridPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" onChange={(e) => this.handleChange(e)}
                                          placeholder="Password"/>
                            <span style={{color: "red"}}>{this.state.validate.error.password}</span>
                        </Form.Group>

                        <Form.Group as={Col} md={3} controlId="formGridPassword2">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password2" onChange={(e) => this.handleChange(e)}
                                          placeholder="Password2"/>
                            <span style={{color: "red"}}>{this.state.validate.error.password2}</span>
                        </Form.Group>

                        <Form.Group as={Col} md={3} controlId="formGridPassword3">
                            <Form.Label>Password3 (custom validate)</Form.Label>
                            <Form.Control type="password" name="password3" onChange={(e) => this.handleChange(e)}
                                          placeholder="Password3"/>
                            <span style={{color: "red"}}>{this.state.validate.error.password3}</span>
                        </Form.Group>

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
                                          onChange={(e) => this.handleChange(e)} placeholder="1234 Main St"/>
                            {
                                this.state.validate.rules.hasOwnProperty("address1") ?
                                    <span style={{color: "red"}}>{this.state.validate.error.address1}</span> : ''
                            }

                        </Form.Group>

                        <Form.Group as={Col} md={3} controlId="formGridAddress2">
                            <Form.Label>Address 2</Form.Label>
                            <Form.Control name="address2" onChange={(e) => this.handleChange(e)} data-validate={JSON.stringify({
                                rules: {
                                    required: true
                                },
                                messages: {
                                    required: "test2"
                                }
                            })} placeholder="Apartment, studio, or floor"/>
                            {
                                this.state.validate.rules.hasOwnProperty("address2") ?
                                    <span style={{color: "red"}}>{this.state.validate.error.address2}</span> : ''
                            }
                        </Form.Group>

                        <Form.Group as={Col} md={3} controlId="formGridCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control/>
                        </Form.Group>

                        <Form.Group as={Col} md={3} controlId="formGridState">
                            <Form.Label>State</Form.Label>
                            <Form.Select defaultValue="Choose..." name="citySelect"
                                         onChange={(e) => this.handleChange(e)}>
                                <option>Choose...</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                            <span style={{color: "red"}}>{this.state.validate.error.citySelect}</span>
                        </Form.Group>

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
                            <Form.Check type="checkbox" name="checkbox1" onChange={(e) => this.handleChange(e)}
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
                            <span style={{color: "red"}}>{this.state.validate.error.formHorizontalRadios}</span>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Row>
                </Form>
                <Form onSubmit={this.handleSubmit2}>
                    <Row className="mb-3 mt-3">
                        <Form.Group as={Col} md={3} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" className={'required'} data-msg-required="boş bırakmayınız."
                                          onChange={(e) => this.handleChange(e)}
                                          name="email" placeholder="Enter email"/>
                            <span style={{color: "red"}}>{this.state.validate2.error.email}</span>
                        </Form.Group>

                        <Form.Group as={Col} md={3} controlId="formGridEmail2">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" className={'required'} data-msg-required="boş bırakmayınız."
                                          onChange={(e) => this.handleChange(e)}
                                          name="email2" placeholder="Enter email"/>
                            <span style={{color: "red"}}>{this.state.validate2.error.email2}</span>
                        </Form.Group>

                        <Form.Group as={Col} md={3} controlId="formGridPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" onChange={(e) => this.handleChange(e)}
                                          placeholder="Password"/>
                            <span style={{color: "red"}}>{this.state.validate2.error.password}</span>
                        </Form.Group>

                        <Form.Group as={Col} md={3} controlId="formGridPassword2">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password2" onChange={(e) => this.handleChange(e)}
                                          placeholder="Password2"/>
                            <span style={{color: "red"}}>{this.state.validate2.error.password2}</span>
                        </Form.Group>

                        <Form.Group as={Col} md={3} controlId="formGridPassword3">
                            <Form.Label>Password3 (custom validate)</Form.Label>
                            <Form.Control type="password" name="password3" onChange={(e) => this.handleChange(e)}
                                          placeholder="Password3"/>
                            <span style={{color: "red"}}>{this.state.validate2.error.password3}</span>
                        </Form.Group>

                        <Form.Group as={Col} md={3} controlId="rangeElement">
                            <Form.Label>range example</Form.Label>
                            <Form.Control name="rangeElement"
                                          onChange={(e) => this.handleChange(e)} placeholder=""/>
                            <span style={{color: "red"}}>{this.state.validate2.error.rangeElement}</span>
                        </Form.Group>

                        <Form.Group as={Col} md={3} controlId="formGridAddress1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control name="address3" data-validate={JSON.stringify({
                                rules: {
                                    required: true
                                },
                                messages: {
                                    required: "test"
                                }
                            })}
                                          onChange={(e) => this.handleChange(e)} placeholder="1234 Main St"/>
                            {
                                this.state.validate2.rules.hasOwnProperty("address3") ?
                                    <span style={{color: "red"}}>{this.state.validate2.error.address3}</span> : ''
                            }

                        </Form.Group>

                        <Form.Group as={Col} md={3} controlId="formGridAddress2">
                            <Form.Label>Address 2</Form.Label>
                            <Form.Control name="address2" data-validate={JSON.stringify({
                                rules: {
                                    required: true
                                },
                                messages: {
                                    required: "test2"
                                }
                            })} placeholder="Apartment, studio, or floor"/>
                            {/*       <span style={{color: "red"}}>{this.state.errors["address2"]}</span>*/}
                        </Form.Group>

                        <Form.Group as={Col} md={3} controlId="formGridCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control/>
                        </Form.Group>

                        <Form.Group as={Col} md={3} controlId="formGridState">
                            <Form.Label>State</Form.Label>
                            <Form.Select defaultValue="Choose..." name="citySelect"
                                         onChange={(e) => this.handleChange(e)}>
                                <option>Choose...</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                            <span style={{color: "red"}}>{this.state.validate2.error.citySelect}</span>
                        </Form.Group>

                        <Form.Group as={Col} md={3} controlId="formGridZip">
                            <Form.Label>Zip</Form.Label>
                            <Form.Control/>
                        </Form.Group>

                        <Form.Group as={Col} md={3} controlId="count">
                            <Form.Label>Adet</Form.Label>
                            <Form.Control name="count" onChange={(e) => this.handleChange(e)}
                                          placeholder="Adet giriniz."/>
                            <span style={{color: "red"}}>{this.state.validate2.error.count}</span>
                        </Form.Group>

                        <Form.Group as={Col} md={3} id="formGridCheckbox1">
                            <Form.Check type="checkbox" name="checkbox1" onChange={(e) => this.handleChange(e)}
                                        label="checkbox1"/>
                            <span style={{color: "red"}}>{this.state.validate2.error.checkbox1}</span>
                        </Form.Group>

                        <Form.Group as={Col} md={3} id="formGridCheckbox2">
                            <Form.Check type="checkbox" name="checkbox2" onChange={(e) => {
                                this.handleChange(e)
                            }} label="checkbox2"/>
                            <span style={{color: "red"}}>{this.state.validate2.error.checkbox2}</span>
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
                            <span style={{color: "red"}}>{this.state.validate2.error.formHorizontalRadios}</span>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Row>
                </Form>
            </Container>
        );
    }
}

export default PrimaryForm;
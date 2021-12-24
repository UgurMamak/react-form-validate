import React, {Component} from 'react';
import {Button, Col, Form, Row, Container} from 'react-bootstrap';
import axios from "axios";
import {validate} from "../helpers/validate";

class PrimaryForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            form2: {
                email: {
                    value: null,
                    rules: {
                        required: true,
                        email: true
                    },
                    messages: {
                        required: 'email boş bırakılamaz',
                        email: 'geçersiz email adresi'
                    }
                },
                email2: {
                    rules: {
                        email: true,
                        required: true
                    }
                },
                password: {
                    value: null,
                    rules: {
                        required: true,
                        maxLength: 8,
                        minLength: 2
                    },
                    messages: {
                        required: 'password boş bırakılamaz'
                    }
                },
                password2: {
                    rules: {
                        equalTo: 'password'
                    }
                },
                citySelect: {
                    value: '',
                    rules: {
                        required: true
                    },
                    messages: {
                        required: 'şehir boş bırakılamaz'
                    }
                },
                checkbox2: {
                    value: null,
                    rules: {
                        required: true
                    },
                    messages: {
                        required: "checkbox2 boş bırakılamaz"
                    }
                },
                checkbox1: {
                    value: null,
                    rules: {
                        required: true
                    }
                },
                count: {
                    rules: {
                        isNumber: true
                    }
                },
                formHorizontalRadios: {
                    rules: {
                        required: true
                    }
                },
                rangeElement: {
                    value: null,
                    rules: {
                        rangeLength: [3, 8]
                    }
                },
                password3:{
                    rules:{
                        passwordRegex:true
                    }
                }
            },
            errors: {}
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        var name = event.target.name,
            value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

        this.setState(prevState => ({
            form2: {
                ...prevState.form2,
                [name]: {
                    ...prevState.form2[name],
                    value: value
                }
            }
        }));

        /*if(event.target.getAttribute('data-validate')){
            console.log(JSON.parse(event.target.getAttribute('data-validate')));
            this.setState(prevState => ({
                form2: {
                    ...prevState.form2,
                    [name]: JSON.parse(event.target.getAttribute('data-validate'))
                }
            }));
        }else{
            this.setState(prevState => ({
                form2: {
                    ...prevState.form2,
                    [name]: {
                        ...prevState.form2[name],
                        value: value
                    }
                }
            }));
        }*/
    }

    handleSubmit(event) {
        event.preventDefault();
        var data = {};

        var pass = 'aAaaa1aaa';

        validate.addMethod("passwordRegex", function (value,de,a) {
            console.log(value,de,a);
            var regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/
            return regex.test(value);
        }, "parola kurallarına uymuyor");

        const {formIsValid, errors} = validate.valid(this.state.form2);


        this.setState({
            errors
        });

        if (formIsValid) {
            Object.keys(this.state.form2).forEach(formItem => {
                data[formItem] = this.state.form2[formItem]["value"]
            });

            axios.post("https://jsonplaceholder.typicode.com/posts/1/comments", data).then(response => {
                console.log(response)
            });
        }
    }


    render() {
        return (
            <Container>
                <Form onSubmit={this.handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" className={'required'} data-msg-required="boş bırakmayınız."
                                          onChange={(e) => this.handleChange(e)}
                                          name="email" placeholder="Enter email"/>
                            <span style={{color: "red"}}>{this.state.errors["email"]}</span>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridEmail2">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" className={'required'} data-msg-required="boş bırakmayınız."
                                          onChange={(e) => this.handleChange(e)}
                                          name="email2" placeholder="Enter email"/>
                            <span style={{color: "red"}}>{this.state.errors["email2"]}</span>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" onChange={(e) => this.handleChange(e)}
                                          placeholder="Password"/>
                            <span style={{color: "red"}}>{this.state.errors["password"]}</span>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword2">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password2" onChange={(e) => this.handleChange(e)}
                                          placeholder="Password2"/>
                            <span style={{color: "red"}}>{this.state.errors["password2"]}</span>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword3">
                            <Form.Label>Password3 (custom validate)</Form.Label>
                            <Form.Control type="password" name="password3" onChange={(e) => this.handleChange(e)}
                                          placeholder="Password3"/>
                            <span style={{color: "red"}}>{this.state.errors["password3"]}</span>
                        </Form.Group>

                    </Row>

                    <Form.Group className="mb-3" controlId="rangeElement">
                        <Form.Label>range example</Form.Label>
                        <Form.Control name="rangeElement"
                                      onChange={(e) => this.handleChange(e)} placeholder=""/>
                        <span style={{color: "red"}}>{this.state.errors["rangeElement"]}</span>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridAddress1">
                        <Form.Label>Address</Form.Label>
                        <Form.Control name="address1" data-validate={'{"value":null,"rules":{"required":true}}'}
                                      onChange={(e) => this.handleChange(e)} placeholder="1234 Main St"/>
                        <span style={{color: "red"}}>{this.state.errors["address1"]}</span>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridAddress2">
                        <Form.Label>Address 2</Form.Label>
                        <Form.Control placeholder="Apartment, studio, or floor"/>
                    </Form.Group>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>State</Form.Label>
                            <Form.Select defaultValue="Choose..." name="citySelect"
                                         onChange={(e) => this.handleChange(e)}>
                                <option>Choose...</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                            <span style={{color: "red"}}>{this.state.errors["citySelect"]}</span>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label>Zip</Form.Label>
                            <Form.Control/>
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" controlId="count">
                        <Form.Label>Adet</Form.Label>
                        <Form.Control name="count" onChange={(e) => this.handleChange(e)} placeholder="Adet giriniz."/>
                        <span style={{color: "red"}}>{this.state.errors["count"]}</span>
                    </Form.Group>

                    <Form.Group className="mb-3" id="formGridCheckbox1">
                        <Form.Check type="checkbox" name="checkbox1" onChange={(e) => this.handleChange(e)}
                                    label="checkbox1"/>
                        <span style={{color: "red"}}>{this.state.errors["checkbox1"]}</span>
                    </Form.Group>

                    <Form.Group className="mb-3" id="formGridCheckbox2">
                        <Form.Check type="checkbox" name="checkbox2" onChange={(e) => {
                            this.handleChange(e)
                        }} label="checkbox2"/>
                        <span style={{color: "red"}}>{this.state.errors["checkbox2"]}</span>
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
                        <span style={{color: "red"}}>{this.state.errors["formHorizontalRadios"]}</span>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        );
    }
}

export default PrimaryForm;
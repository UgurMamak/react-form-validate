import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Button, Col, Form, Row} from 'react-bootstrap';
import React, {Component} from 'react';
import axios from "axios";
import {sendMessage, validate} from "./helpers/validate";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            form: {
                email: null,
                password: null
            },
            error: {},
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
                password: {
                    value: null,
                    rules: {
                        required: true
                    },
                    messages: {
                        required: 'password boş bırakılamaz'
                    }
                },
            },errors:{}
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        console.log("here");
        var name = event.target.name,
            value = event.target.value;

        /*this.setState({
            [name]:value
        });*/

        this.setState(prevState => ({
            form2: {
                ...prevState.form2,
                [name]: {
                    ...prevState.form2[name],
                    value: value
                }
            }
        }));
    }

    handleSubmit(event) {
        event.preventDefault();
        var data = {
            ...this.state.form
        };

        const {formIsValid, errors} =validate(this.state.form2);

        if (formIsValid) {
            axios.post("https://jsonplaceholder.typicode.com/posts/1/comments", data).then(response => {
                console.log(response)
            });
        }else{
            this.setState(prevState => ({
                errors
              /*  form2: {
                    ...prevState.form2,
                    errors: errors
                }*/
            }));
        }

        /* if (validate) {
             axios.post("https://jsonplaceholder.typicode.com/posts/1/comments", data).then(response => {
                 console.log(response)
             });
         } else {
             //alert("validate false döndü");
         }*/


    }


    /*   validate(form) {
           let formObject = this.state.form2;
           let formIsValid = true,
               errors = {};

           for (var formElem in formObject) {
               var elemObject = formObject[formElem],
                   elemObjectValue = elemObject.value;

               for (var rules in elemObject.rules) {
                   let ruleBool = elemObject.rules[rules];

                    if (rules === "email" && ruleBool === true) {
                        console.log("1111=",elemObject,rules);

                        const validateEmail = (email) => {
                            return String(email)
                                .toLowerCase()
                                .match(
                                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                );
                        };

                        if(!validateEmail(elemObjectValue)){
                            errors[formElem] = elemObject.messages[rules];
                            formIsValid = false;
                        }

                    }

                   if (rules === "required" && ruleBool === true) {
                       console.log("222=",elemObject,rules);
                       if (elemObjectValue === null || elemObjectValue === undefined || elemObjectValue === "") {
                           errors[formElem] = elemObject.messages[rules];
                           formIsValid = false;
                       }
                   }
               }
           }
           this.setState(prevState => ({
               form2: {
                   ...prevState.form2,
                   errors: errors
               }
           }));

           return formIsValid;
       }*/


    render() {
        return (
            <div className="App">
                <div className={this.state.test === false ? 'd-none' : ''}>Lorem ipsum</div>
                <Form onSubmit={this.handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" className={'required'} data-msg-required="boş bırakmayınız."
                                          onChange={(e) => this.handleChange(e)}
                                          name="email" placeholder="Enter email"/>
                            <span style={{color: "red"}}>{this.state.errors["email"]}</span>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" onChange={(e) => this.handleChange(e)}
                                          placeholder="Password"/>
                            <span style={{color: "red"}}>{this.state.errors["password"]}</span>
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" controlId="formGridAddress1">
                        <Form.Label>Address</Form.Label>
                        <Form.Control placeholder="1234 Main St"/>
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
                            <Form.Select defaultValue="Choose...">
                                <option>Choose...</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label>Zip</Form.Label>
                            <Form.Control/>
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" id="formGridCheckbox">
                        <Form.Check type="checkbox" label="Check me out"/>
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
                            />
                            <Form.Check
                                type="radio"
                                label="second radio"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios2"
                            />
                            <Form.Check
                                type="radio"
                                label="third radio"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios3"
                            />
                        </Col>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
}

export default App;
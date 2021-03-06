import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { StringLiteralLike } from "typescript";
import api, { ApiResponse } from "../../api/api";

interface UserRegistrationPageState{
    formData: {
        email: string;
        password: string;
        forename: string;
        surename: string;
        phone: string;
        address: string;
    };

    message?: string;

    isRegistrationComplete: boolean;
}

export class UserRegistrationPage extends React.Component{
    state: UserRegistrationPageState;

    constructor(props: Readonly<{}>){
        super(props);

        this.state = {
            isRegistrationComplete: false,
            formData: {
                email: '',
                password: '',
                forename: '',
                surename: '',
                phone: '',
                address: ''
            }
        }
    }

    private formInputChanged(event: React.ChangeEvent<HTMLInputElement>){
        const newFormData = Object.assign(this.state.formData, {
            [event.target.id]: event.target.value,
        })

        const newState = Object.assign(this.state, {
            formData: newFormData            
        });

        this.setState(newState);
    }

    render(){
        return(
            <Container>  
                <Col md={{ span:8, offset:2 }} >
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <FontAwesomeIcon icon = { faUserPlus } /> User Registration
                            </Card.Title>                            
                                {
                                    (this.state.isRegistrationComplete === false) ?
                                    this.renderForm() :
                                    this.renderRegistrationCompleteMessage()
                                }
                        </Card.Body>
                    </Card> 
                </Col>                 
            </Container>    
        );    
    }

    private renderForm(){
        return(
            <>
                <Form>
                    <Row>
                        <Col md="6">
                            <Form.Group>
                            <Form.Label htmlFor="email">E-mail:</Form.Label>
                                <Form.Control type="email" id="email"
                                            value={ this.state.formData.email }
                                            onChange={ event => this.formInputChanged(event as any) } />
                            </Form.Group>
                        </Col>
                        <Col md="6">
                        <Form.Group>
                            <Form.Label htmlFor="password">Password:</Form.Label>
                                <Form.Control type="password" id="password"
                                            value={ this.state.formData.password }
                                            onChange={ event => this.formInputChanged(event as any) } />
                            </Form.Group>
                        </Col>                    
                    </Row>
                    
                    <Row>
                        <Col md="6">
                            <Form.Group>
                            <Form.Label htmlFor="forename">Forename:</Form.Label>
                                <Form.Control type="text" id="forename"
                                            value={ this.state.formData.forename }
                                            onChange={ event => this.formInputChanged(event as any) } />
                            </Form.Group>
                        </Col>
                        <Col md="6">
                            <Form.Group>
                            <Form.Label htmlFor="surename">Surename:</Form.Label>
                                <Form.Control type="text" id="surename"
                                            value={ this.state.formData.surename }
                                            onChange={ event => this.formInputChanged(event as any) } />
                            </Form.Group>
                        </Col>
                    </Row>
                    
                    <Form.Group>
                        <Form.Label htmlFor="phone">Phone number:</Form.Label>
                            <Form.Control type="phone" id="phone"
                                          value={ this.state.formData.phone }
                                          onChange={ event => this.formInputChanged(event as any) } />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label htmlFor="address">Address:</Form.Label>
                            <Form.Control id="address"
                                          as="textarea" rows={4}
                                          value={ this.state.formData.address }
                                          onChange={ event => this.formInputChanged(event as any) } />
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" onClick={() => {this.doRegister()}}>
                                    Register
                        </Button>
                    </Form.Group>

                </Form>

                <Alert variant="danger" className={ this.state.message ? '' : 'd-none' }>
                    { this.state.message }
                </Alert>
            </>
        );
    }

    private renderRegistrationCompleteMessage(){
        return(
            <p>
                Account has been registered.<br />
                <Link to="/user/login">Click here</Link> to go to the login page.                 
            </p>
        );
    }

    private doRegister(){
        const data = { // ovo je dto objekat iz bekenda
            email: this.state.formData.email,
            password: this.state.formData.password,
            forename: this.state.formData.forename,
            surename: this.state.formData.surename,
            phoneNumber: this.state.formData.phone,
            postalAddress: this.state.formData.address
        }

        api('auth/user/register', 'post', data)
        .then((res: ApiResponse) => {
            console.log(res);

            if(res.status === 'error'){
                this.setErrorMessage('System error... Try again!');
                return;
            }

            if (res.data.status === 'ok') {
                this.handleErrors(res.data);
                return;
            }

            this.registrationComplete();
        })
    }

    private setErrorMessage(message: string) {
        const newState = Object.assign(this.state, {
            message: message,
        });

        this.setState(newState);
    }

    private handleErrors(data: any){
        let message = '';

        switch(data.statusCode){ // -6001 uzet iz bekenda, user.service.ts, register metoda
            case -6001: message = 'This account already exist!'; break;
        } 
        this.setErrorMessage(message);
    }

    private registrationComplete(){
        const newState = Object.assign(this.state, {
            isRegistrationComplete: true,
        });

        this.setState(newState);
    }
}
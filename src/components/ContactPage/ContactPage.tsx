import React from "react";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { Card, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class HomePage extends React.Component {
    render(){
        return (
            <Container>   
                <Card>
                    <Card.Body>
                        <Card.Title>
                            <FontAwesomeIcon icon = { faPhone } /> Contact details
                        </Card.Title>
                        <Card.Text>
                            Contact details will be show here...
                        </Card.Text>
                    </Card.Body>
                </Card>  
            </Container>
        );
    }
}
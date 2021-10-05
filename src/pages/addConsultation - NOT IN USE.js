import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { authMiddleWare } from '../util/auth'
import { consultation } from '../util/consultation';

class addConsultation extends Component {

    constructor(props) {
        super(props);
        console.log("consultations - constructor - props=", props);

    }


    handleSubmit = (event) => {
        event.preventDefault();
        const newConsultationData = consultation;
        newConsultationData.dateOfConsultation = now();
        
        console.log("signup handleSubmit newConsultationData=", newConsultationData);
        authMiddleWare(this.props.history);
        const authToken = localStorage.getItem('AuthToken');
        axios.defaults.headers.common = { Authorization: `${authToken}` };

        axios
            .post('/api/consultation', newConsultationData)
            .then((response) => {
                console.log('addConsultation success response:', response.data);
                this.props.history.push('/consultations');
            })
            .catch((error) => {
                console.log('addConsultation error:', error.response.data);
                this.setState({
                    errors: error.response.data,
                });
                this.props.history.push('/consultations');
            });
    };

    render() {
        console.log("addConsultation ... render");
        return (
            <Container component="main">
                <div>
                    <h1> Add new consultation </h1>
                    <Form noValidate>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                variant="outlined"
                                required
                                id="name"
                                name="name"
                                autoComplete="name"
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                variant="outlined"
                                required
                                id="address"
                                label="Address"
                                name="address"
                                autoComplete="address"
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Telephone/Mobile (Day) </Form.Label>
                            <Form.Control
                                variant="outlined"
                                required
                                id="telephone_day"
                                name="telephone_day"
                                autoComplete="phoneNumber"
                                pattern="[7-9]{1}[0-9]{9}"
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Telephone/Mobile (Night) </Form.Label>
                            <Form.Control
                                variant="outlined"
                                id="telephone_night"
                                name="telephone_night"
                                autoComplete="phoneNumber"
                                pattern="[7-9]{1}[0-9]{9}"
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Profession</Form.Label>
                            <Form.Control
                                variant="outlined"
                                id="profession"
                                label="Profession"
                                name="profession"
                                autoComplete="profession"
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Button
                            type="submit"
                            color="primary"
                            onClick={this.handleSubmit}
                            disabled = {!this.state.name} 
                        >
                            Sign Up
                        </Button>
                    </Form>
                </div>
            </Container>
        );
    };
}
export default addConsultation;
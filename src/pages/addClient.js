import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { authMiddleWare } from '../util/auth'

class addClient extends Component {


    constructor(props) {
        super(props);
        console.log("clients - constructor - props=", props);
        this.state = {
            name: '',
            gender: '',
            address: '',
            telephone_day: '',
            telephone_night: '',
            profession: '',
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const newClientData = {
            name: this.state.name,
            gender: this.state.gender,
            address: this.state.address,
            telephone_day: this.state.telephone_day,
            telephone_night: this.state.telephone_night,
            profession: this.state.profession,
        };
        console.log("signup handleSubmit newClientData=", newClientData);
        authMiddleWare(this.props.history);
        const authToken = localStorage.getItem('AuthToken');
        axios.defaults.headers.common = { Authorization: `${authToken}` };

        axios
            .post('/api/client', newClientData)
            .then((response) => {
                console.log('addClient success response:', response.data);
                this.props.history.push('/clients');
            })
            .catch((error) => {
                console.log('addClient error:', error.response.data);
                this.setState({
                    errors: error.response.data,
                });
                this.props.history.push('/clients');
            });
    };

    render() {
        console.log("addClient ... render");
        return (
            <Container component="main">
                <div>
                    <h1> Add new client </h1>
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
                            <Form.Label>Gender (M/F)</Form.Label>
                            <Form.Control
                                variant="outlined"
                                required
                                id="gender"
                                name="gender"
                                autoComplete="gender"
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
export default addClient;
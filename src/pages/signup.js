import React, { Component } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

class signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            password: '',
            confirmPassword: '',
            errors: [],
        };
    }

    // componentWillReceiveProps(nextProps) {
    componentDidUpdate(nextProps) {
        // if (nextProps.UI.errors) {
        //     this.setState({
        //         errors: nextProps.UI.errors
        //     });
        // }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const newUserData = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        };
        console.log("signup handleSubmit newUserData=", newUserData);
        axios
            .post('/api/signup', newUserData)
            .then((response) => {
                console.log('signup success response:', response.data);
                localStorage.setItem('AuthToken', `${response.data.token}`);
                this.props.history.push('/');
            })
            .catch((error) => {
                console.log('signup error:', error.response.data);
                this.setState({
                    errors: error.response.data,
                });
            });
    };

    render() {
        return (
            <Container component="main">
                <div> 
                    Sign up
                    <Form noValidate>
                        <Form.Group>
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                variant="outlined"
                                required
                                id="firstName"
                                name="firstName"
                                autoComplete="firstName"
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                variant="outlined"
                                required
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lastName"
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Telephone/Mobile</Form.Label>
                            <Form.Control
                                variant="outlined"
                                required
                                id="phoneNumber"
                                name="phoneNumber"
                                autoComplete="phoneNumber"
                                pattern="[7-9]{1}[0-9]{9}"
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                variant="outlined"
                                required
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={this.handleChange}
                            />
                            <Form.Text variant='warning'>
                                {this.state.errors['email']}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                variant="outlined"
                                required
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={this.handleChange}
                            />
                            <Form.Text variant='warning'>
                                {this.state.errors['password']}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control
                                variant="outlined"
                                required
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                id="confirmPassword"
                                autoComplete="current-password"
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Button
                            type="submit"
                            color="primary"
                            onClick={this.handleSubmit}
                        >
                            Sign Up
                        </Button>
                    </Form>
                </div>
            </Container>
        );
    }
}

export default signup;
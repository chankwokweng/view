// Material UI components
import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';

//============ Styles ===========

//============ Login ===========
class login extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            email: '',
            password: '',
            errors: [],
        };
    }

    componentDidUpdate(nextProps) {
        // console.log("login - componentDidUpdate:nextProps=", nextProps);
        try{
            if (nextProps.UI.errors) {
                this.setState({
                    errors: nextProps.UI.errors
                });
            }
        } catch{};
    }

    handleChange = (event) => {
        // console.log("login - handleChange:event=", event);
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        
        console.log('login handleSubmit:userData=', userData);
        axios
            .post('/api/login', userData)
            .then((response) => {
                console.log('login :response.data=', response.data);
                localStorage.setItem('AuthToken', `Bearer ${response.data.token}`);
                this.props.history.push('/clients');
            })
            .catch((error) => {
                console.log('login :error=', error);
                this.setState({
                    errors: error.response.data,
                });
            });
    };

    render() {
        const { errors } = this.state;
        return (
            <Container className="mt-5">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group className="mb-3" value={this.state.email} onChange={this.handleChange}>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control name="email" type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" value={this.state.password} onChange={this.handleChange}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" type="password" placeholder="Password" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        );
    }
}


export default login;
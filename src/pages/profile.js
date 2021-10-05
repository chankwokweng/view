import React, { Component } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';

import { authMiddleWare } from '../util/auth'

class profile extends Component {
    
    constructor(props) {
        super(props);
        console.log("profile - constructor - props=",props);

        this.state = {
            firstName: '',
            lastName: '',
            profilePicture: '',
            uiLoading: true,
            imageLoading: false
        };
    }

    componentDidMount = () => {
        console.log("profile - entering componentWDidMount");

        authMiddleWare(this.props.history);
        const authToken = localStorage.getItem('AuthToken');
        axios.defaults.headers.common = { Authorization: `${authToken}` };
        axios
            .get('/api/user')
            .then((response) => {
                console.log("home:respons.data=", response.data);
                this.setState({
                    firstName: response.data.userCredentials.firstName,
                    lastName: response.data.userCredentials.lastName,
                    email: response.data.userCredentials.email,
                    phoneNumber: response.data.userCredentials.phoneNumber,
                    uiLoading: false,
                    profilePicture: response.data.userCredentials.imageUrl,
                });
            })
            .catch((error) => {
                console.log('home error=', error);
                console.log('home error.response=', error.response);
                if (error.response.status === 403) {
                    this.props.history.push('/login')
                }
                console.log(error);
                this.setState({ errorMsg: 'Error in retrieving the data' });
            });
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };


    updateFormValues = (event) => {
        event.preventDefault();
        this.setState({ buttonLoading: true });
        authMiddleWare(this.props.history);
        const authToken = localStorage.getItem('AuthToken');
        axios.defaults.headers.common = { Authorization: `${authToken}` };
        const formRequest = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumber: this.state.phoneNumber
        };
        axios
            .post('/api/user', formRequest)
            .then(() => {
                this.setState({ buttonLoading: false });
            })
            .catch((error) => {
                if (error.response.status === 403) {
                    this.props.history.push('/login');
                }
                console.log(error);
                this.setState({
                    buttonLoading: false
                });
            });
    };

    render() {
        console.log("home ... render");
        return (
            <Container className="mb-5">
                <Form onSubmit={this.updateFormValues}>
                    <Form.Group>
                        <Form.Label> First Name </Form.Label>
                        <Form.Control name="firstName" type="text" Value={this.state.firstName} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label> Last Name </Form.Label>
                        <Form.Control name="lastName" type="text" Value={this.state.lastName} onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label> Email </Form.Label>
                        <Form.Control name="email" type="text" defaultValue={this.state.email} readOnly />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label> Phone Number </Form.Label>
                        <Form.Control name="phoneNumber" type="text" Value={this.state.phoneNumber} onChange={this.handleChange}/>
                    </Form.Group>
                </Form>
                <Button
                    color="primary"
                    type="submit"
                    onClick={this.updateFormValues}
                >
                    Save details

                </Button>
            </Container>

        );
    }
}

export default profile;

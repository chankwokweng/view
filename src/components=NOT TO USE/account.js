import React, { Component } from 'react';
import { Container, Form, Card, Button, Grid } from 'react-bootstrap';
import clsx from 'clsx';

import axios from 'axios';
import { authMiddleWare } from '../util/auth';

class account extends Component {
    constructor(props) {
        super(props);

        console.log("account - entering");
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            profilePicture: '',
            uiLoading: true,
            buttonLoading: false,
            imageError: ''
        };
    }

    componentDidMount = () => {
        console.log("account - componentDidMount - history=", this.props.history);

        authMiddleWare(this.props.history);
        const authToken = localStorage.getItem('AuthToken');
        axios.defaults.headers.common = { Authorization: `${authToken}` };
        axios
            .get('/api/user')
            .then((response) => {
                console.log("account - componentDidMount - response.data=", response.data);
                this.setState({
                    firstName: response.data.userCredentials.firstName,
                    lastName: response.data.userCredentials.lastName,
                    email: response.data.userCredentials.email,
                    phoneNumber: response.data.userCredentials.phoneNumber,
                    uiLoading: false
                });
            })
            .catch((error) => {
                if (error.response.status === 403) {
                    this.props.history.push('/login');
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

    handleImageChange = (event) => {
        this.setState({
            image: event.target.files[0]
        });
    };

    profilePictureHandler = (event) => {
        event.preventDefault();
        this.setState({
            uiLoading: true
        });
        authMiddleWare(this.props.history);
        const authToken = localStorage.getItem('AuthToken');
        let form_data = new FormData();
        form_data.append('image', this.state.image);
        form_data.append('content', this.state.content);
        axios.defaults.headers.common = { Authorization: `${authToken}` };
        axios
            .post('/api/user/image', form_data, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then(() => {
                window.location.reload();
            })
            .catch((error) => {
                if (error.response.status === 403) {
                    this.props.history.push('/login');
                }
                console.log(error);
                this.setState({
                    uiLoading: false,
                    imageError: 'Error in posting the data'
                });
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
        const { classes, ...rest } = this.props;
        if (this.state.uiLoading === true) {
            return (
                <container className="mb-3">
                    Loading ...
                </container>
            );
        } else {
            return (
                <Container className="mb-5">
                    <Form onSubmit={this.updateFormValues}>
                        <Form.Group value={this.state.firstName} onChange={this.handleChange}>
                            <Form.Label> First Name </Form.Label>
                            <Form.Control name="firstName" type="text" value={this.state.firstName} />
                        </Form.Group>
                        <Form.Group value={this.state.lastName} onChange={this.handleChange}>
                            <Form.Label> Last Name </Form.Label>
                            <Form.Control name="lastName" type="text" value={this.state.lastName}/>
                        </Form.Group>
                        <Form.Group value={this.state.email} readOnly>
                            <Form.Label> Email </Form.Label>
                            <Form.Control name="email" type="text" value={this.state.email} readOnly/>
                        </Form.Group>
                        <Form.Group value={this.state.phoneNumber} onChange={this.handleChange}>
                            <Form.Label> Phone Number </Form.Label>
                            <Form.Control name="phoneNumber" type="text" value={this.state.phoneNumber} />
                        </Form.Group>
                    </Form>
                    <Button
                        color="primary"
                        type="submit"
                        onClick={this.updateFormValues}
                        disabled={
                            this.state.buttonLoading ||
                            !this.state.firstName ||
                            !this.state.lastName    ||
                            !this.state.phoneNumber
                        }
                    >
                        Save details
                        
                    </Button>
                </Container>
            );
        }
    }
}

export default account;


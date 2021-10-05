import React, { Component } from 'react';
import { Table, Row, Col, Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { authMiddleWare } from '../util/auth';
import { Consultations } from './consultations';

class editClient extends Component {


    constructor(props) {
        super(props);
        console.log("viewClient - constructor - props=", props);
        console.log("viewClient - constructor - props.params=", this.props.match.params);

        this.state = {
            uiLoading: true,
            name: '',
            gender: '',
            address: '',
            telephone_day: '',
            telephone_night: '',
            profession: '',
        };
    }

    //--- Retrieve client info
    componentDidMount = () => {
        this.setState({ uiLoading: true });
        authMiddleWare(this.props.history);
        const authToken = localStorage.getItem('AuthToken');
        axios.defaults.headers.common = { Authorization: `${authToken}` };
        const formRequest = {
            clientId: this.props.match.params.id,
        };

        axios
            .get('/api/client/' + this.props.match.params.id, formRequest)
            .then((response) => {
                console.log('editClient getClientInfo success response:', response.data);
                this.setState({ uiLoading: false });
                this.setState( response.data );
                console.log('editClient getClientInfo state:', this.state);
            })
            .catch((error) => {
                if (error.response.status === 403) {
                    console.log('editClient getClientInfo error 403:', error.response.data);
                    this.props.history.push('/login');
                } else {
                    console.log('editClient getClientInfo error:', error.response.data);
                    this.props.history.push('/login');
                    this.setState({
                        uiLoading: false
                    })};
            });
    };

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
            .post('/api/client/' + this.props.match.params.id, newClientData)
            .then((response) => {
                console.log('editClient submit success response:', response.data);
                // this.props.history.push('/clients');
                alert("Saved");
            })
            .catch((error) => {
                console.log('editClient submit error:', error.response.data);
                this.setState({
                    errors: error.response.data,
                });
                this.props.history.push('/login');
            });
    };

    render() {
        if (this.state.uiLoading === true) {
            return (
                <div>
                    Loading ...
                </div>
            );
        } else {
        return (
            <Container component="main"> 
            <div>
                <div className='p-2 my-2 border'>
                    <h1> Client :  {this.state.name} </h1>
                    <Form noValidate>
                        <Row> <Col>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                variant="outlined"
                                required
                                value={this.state.name}
                                id="name"
                                name="name"
                                autoComplete="name"
                                onChange={this.handleChange}
                            />
                        </Col> </Row>
                        <Row> 
                            <Col>
                                <Form.Label>Gender (M/F)</Form.Label>
                                <Form.Control
                                    variant="outlined"
                                    required
                                    value={this.state.gender}
                                    id="gender"
                                    name="gender"
                                    autoComplete="gender"
                                    onChange={this.handleChange}
                                />
                            </Col>
                            <Col>
                                <Form.Label>Profession</Form.Label>
                                <Form.Control
                                    variant="outlined"
                                    value={this.state.profession}
                                    id="profession"
                                    label="Profession"
                                    name="profession"
                                    autoComplete="profession"
                                    onChange={this.handleChange}
                                />
                            </Col>
                        </Row>
                        <Row> <Col>
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                variant="outlined"
                                required
                                value={this.state.address}
                                id="address"
                                label="Address"
                                name="address"
                                autoComplete="address"
                                onChange={this.handleChange}
                            />
                        </Col> </Row>
                        <Row>
                            <Col>
                                <Form.Label>Telephone/Mobile (Day) </Form.Label>
                                <Form.Control
                                    variant="outlined"
                                    required
                                    value={this.state.telephone_day}
                                    id="telephone_day"
                                    name="telephone_day"
                                    autoComplete="phoneNumber"
                                    pattern="[7-9]{1}[0-9]{9}"
                                    onChange={this.handleChange}
                                />
                            </Col>
                            <Col>
                                <Form.Label>Telephone/Mobile (Night) </Form.Label>
                                <Form.Control
                                    variant="outlined"
                                    value={this.state.telephone_night}
                                    id="telephone_night"
                                    name="telephone_night"
                                    autoComplete="phoneNumber"
                                    pattern="[7-9]{1}[0-9]{9}"
                                    onChange={this.handleChange}
                                />
                            </Col>
                        </Row>
                        <Button
                            type="submit"
                            Color="primary"
                            onClick={this.handleSubmit}
                            disabled={!this.state.name}
                        >
                            Save
                        </Button>
                    </Form>
                </div>
                {/* Client Health Records */}
                    <Consultations clientId={this.props.match.params.id} gender={this.state.gender}/>
            </div>
            </Container>
        )};
    };
}
export default editClient;
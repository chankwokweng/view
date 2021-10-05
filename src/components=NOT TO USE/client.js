import React, { Component } from 'react'

import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { authMiddleWare } from '../util/auth';
import { Table, Container, Form, Button, Row } from 'react-bootstrap';

const Transition = React.forwardRef(function Transition(props, ref) {
    console.log('client - Transition:ref=',ref)
//?    return <Slide direction="up" ref={ref} {...props} />;
});


class client extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clients: '',
            name: '',
            telephone_day: '',
            clientId: '',
            errors: [],
            open: false,
            uiLoading: true,
            buttonType: '',
            viewOpen: false
        };

        // this.deleteClientHandler = this.deleteClientHandler.bind(this);
        this.handleEditClickOpen = this.handleEditClickOpen.bind(this);
        this.handleViewOpen = this.handleViewOpen.bind(this);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    componentDidMount = () => {
        console.log('client componentDidMount this.props.history=', this.props.history);
        authMiddleWare(this.props.history);
        const authToken = localStorage.getItem('AuthToken');
        axios.defaults.headers.common = { Authorization: `${authToken}` };
        axios
            .get('/api/clients')
            .then((response) => {
                this.setState({
                    clients: response.data,
                    uiLoading: false
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // deleteClientHandler(data) {
    //     authMiddleWare(this.props.history);
    //     const authToken = localStorage.getItem('AuthToken');
    //     axios.defaults.headers.common = { Authorization: `${authToken}` };
    //     let clientId = data.client.clientId;
    //     axios
    //         .delete(`/api/client/${clientId}`)
    //         .then(() => {
    //             window.location.reload();
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }

    handleEditClickOpen(data) {
        this.setState({
            name: data.client.name,
            telephone_day: data.client.telephone_day,
            clientId: data.client.clientId,
            buttonType: 'Edit',
            open: true
        });
    }

    handleViewOpen(data) {
        this.setState({
            name: data.client.name,
            telephone_day: data.client.telephone_day,
            viewOpen: true
        });
    }

    renderClientList = ()=>{
        return(
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>dd</th>
                    </tr>
                </thead>
                <tbody>
                {
                    this.state.clients.map((client) => (
                        <tr key={client.clientId}>
                            <td onClick={()=>alert(client.clientId)}>{client.name}</td>
                            <td>{client.telephone_day}</td>
                            <td>{client.clientId}</td>
                        </tr>
                    ))
                };    
                </tbody>
            </Table>
        );
    };

    render() {

        dayjs.extend(relativeTime);
        const { classes } = this.props;
        const { open, errors, viewOpen } = this.state;


        const handleClickOpen = () => {
            this.setState({
                clientId: '',
                name: '',
                telephone_day: '',
                buttonType: '',
                open: true
            });
        };

        const handleSubmit = (event) => {
            authMiddleWare(this.props.history);
            event.preventDefault();
            const userClient = {
                name: this.state.name,
                telephone_day: this.state.telephone_day
            };
            let options = {};
            if (this.state.buttonType === 'Edit') {
                options = {
                    url: `/api/client/${this.state.clientId}`,
                    method: 'put',
                    data: userClient
                };
            } else {
                options = {
                    url: '/api/client',
                    method: 'post',
                    data: userClient
                };
            }
            const authToken = localStorage.getItem('AuthToken');
            axios.defaults.headers.common = { Authorization: `${authToken}` };
            axios(options)
                .then(() => {
                    this.setState({ open: false });
                    window.location.reload();
                })
                .catch((error) => {
                    this.setState({ open: true, errors: error.response.data });
                    console.log(error);
                });
        };

        const handleViewClose = () => {
            this.setState({ viewOpen: false });
        };

        // ========== To close the View/Edit of client dialog box ==========
        const handleClose = (event) => {
            this.setState({ open: false });
        };

        if (this.state.uiLoading === true) {
            return (
                <div>
                    Loading ...
                </div>
            );
        } else {
            return (this.renderClientList());
        }
    }
}

export default client;

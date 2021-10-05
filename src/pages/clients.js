import React, { Component } from 'react';
import axios from 'axios';
import { Button, Table, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { authMiddleWare } from '../util/auth'

class ClientRow extends React.Component {
    constructor(props) {
        super(props);
        // console.log("clients - ClientRow props=", this.props);
    }
    render() {
        const id = this.props.client.clientId;
        const name = this.props.client.name;
        const gender = this.props.client.gender;
        const telephone_day = this.props.client.telephone_day;
        const telephone_night = this.props.client.telephone_night;
        const address = this.props.client.address;
        const profession = this.props.client.profession;
        const clientHRef = '/client/' + id;

        return (
            <tr href={clientHRef}>
                <td><Link to={'/client/'+id}>
                    {name}
                </Link></td>
                <td>{gender}</td>
                <td>{telephone_day}</td>
                <td>{telephone_night}</td>
                <td>{profession}</td>
                <td>{address}</td>
            </tr>
        );
    }
}
class ClientTable extends React.Component {
    constructor(props) {
        super(props);
        // console.log("clients - ClientTable props=", this.props);
    }

    render() {
        const filterText = this.props.filterText;

        const rows = [];

        this.props.clients.forEach((client) => {
            if (client.name.indexOf(filterText) === -1) {
                return;
            }
            rows.push(
                <ClientRow
                    client={client}
                    key={client.clientId}
                />
            );
        });

        return (
            <Table striped bordered hover>
                <thead >
                    <tr>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Tel(day)</th>
                        <th>Tel(night)</th>
                        <th>Profession</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        );
    }
}

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    }

    handleFilterTextChange(e) {
        this.props.onFilterTextChange(e.target.value);
    }

    render() {
        return (
            <form>
                <input
                    type="text"
                    placeholder="Search..."
                    value={this.props.filterText}
                    onChange={this.handleFilterTextChange}
                />
            </form>
        );
    }
}

class FilterableClientTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
        };

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    }

    handleFilterTextChange(filterText) {
        this.setState({
            filterText: filterText
        });
    }

    render() {
        // console.log("clients - FilterableClientTable props=", this.props);
        // console.log("clients - FilterableClientTable state=", this.state);

        return (

            <Container>
                <div>
                    <SearchBar
                        filterText={this.state.filterText}
                        onFilterTextChange={this.handleFilterTextChange}
                    />
                    <ClientTable
                        clients={this.props.clients}
                        filterText={this.state.filterText}
                    />
                </div>
            </Container>
        );
    }
}

class clients extends Component {
    
    logoutHandler = (event) => {
        localStorage.removeItem('AuthToken');
        this.props.history.push('/login');
    };

    constructor(props) {
        super(props);
        console.log("clients - constructor - props=",props);
        this.state = {
            uiLoading: true,
        };

        // const test = {
        //     level1: '1',
        //     level2: { 
        //         level2a: '2a',
        //         level2b: '2b'
        //     }
        // }
        // console.log ('test=', test.level2);
        // test.level2.level2a = 'new 2a';
        // console.log('new test=', test.level2);
        // test.level1 = 'new 1';
        // console.log('new test=', test);

    }

    componentDidMount = () => {
        console.log("clients - entering componentWDidMount");

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
                console.log('clients componentDidMount err=',  err);
                if (err.response.status === 403) {
                    this.props.history.push('/login')
                }
            });
    };

    render() {
        console.log("clients ... render");
        if (this.state.uiLoading === true) {
            return (
                <div>
                    Loading ... 
                </div>
            );
        } else {
            return (
                <Container className="p-3">
                    <h1> My Clients </h1>
                    <FilterableClientTable clients={this.state.clients} />
                    <Button  variant="primary" href='addClient' >Add Client</Button>
                </Container>
            );
        }
    }
}

export default clients;

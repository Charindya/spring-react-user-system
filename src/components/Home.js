import React from 'react'
import axios from "axios";
import { Button } from 'reactstrap';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import '../App.css';
import Table from "react-bootstrap/Table";
import {Link} from "react-router-dom";

export class Home extends React.Component {
    state = {
        isLoading: true,
        name: '',
        groups: []
    };
    //
    // async componentDidMount() {
    //   const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    //   const body = await response.json();
    //   this.setState({ groups: body, isLoading: false });
    // }

    componentDidMount() {
        fetch('/users')
            .then(response => response.json())
            .then(json => this.setState({ isLoading: false, groups:json }));

        console.log("yooyoyo");
    }

    deleteUser(e) {
        e.preventDefault();
        console.log("lo");
        console.log(e.target.value);
        axios.delete("user?uemail=" + e.target.value)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
            .catch(error => {
                console.log(error);
                console.log("ERROR!");
            })
    }


    render() {
        const {groups, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }
        return (
            <div>
                <Navbar expand="lg" variant="dark" bg="dark">
                    <Container>
                        <Navbar.Brand href="#">Christmas Checklist</Navbar.Brand>
                    </Container>
                </Navbar>
                <header className="App-header">
                    <Link to="/adduser"><Button color="success">Add User</Button></Link><br/>
                    <div className="App-intro">
                        <h2>Users</h2>
                        <Table className="table table-dark">
                            <tr>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                            {groups.map(item => (
                                <tr>
                                    <td key={item.email}>{item.email}</td>
                                    <td key={item.email}>{item.username}</td>
                                    <td key={item.email}>{item.password}</td>
                                    <td ><Link to={{
                                        pathname: "/edituser",
                                        state: {
                                            name: item.email
                                        }}} ><Button color="warning">Update</Button></Link><br/></td>
                                    <td ><Button  onClick={this.deleteUser}  value={item.email} color="danger">Delete</Button></td>
                                </tr>
                            ))}
                        </Table>

                    </div>
                </header>
            </div>
        )
    }
}

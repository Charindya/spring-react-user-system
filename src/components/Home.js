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
        document.body.classList.add("backgrundyus");

        fetch('/listItems')
            .then(response => response.json())
            .then(json => this.setState({ isLoading: false, groups:json }));

        console.log("yooyoyo");
    }

    deleteUser(e) {
        e.preventDefault();
        console.log("lo");
        console.log(e.target.value);
        axios.delete("listItem?id=" + e.target.value)
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
                <Navbar expand="lg" variant="dark" bg="primary">
                    <Container>
                        <Navbar.Brand href="#">Christmas Checklist</Navbar.Brand>
                    </Container>
                </Navbar>
                <div style={{marginLeft: '1200px', padding:'10px'}}>
                        <Link to="/adduser"><Button color="success">Add User</Button></Link>
                    </div>
                    <div className="App-intro" >
                        <Table className="table table-light ">
                            <thead style={{backgroundColor: "#323E5B", color:"white"}}>
                                <tr>
                                    <th>Id</th>
                                    <th>Description</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            {groups.map(item => (
                                <tr>
                                    <td key={item.id}>{item.id}</td>
                                    <td key={item.id}>{item.description}</td>
                                    <td ><Link to={{
                                        pathname: "/edituser",
                                        state: {
                                            name: item.id
                                        }}} ><Button color="primary">Update</Button></Link><br/></td>
                                    <td ><Button  onClick={this.deleteUser}  value={item.id} color="secondary" variant="primary">Delete</Button></td>
                                </tr>
                            ))}
                        </Table>

                    </div>
            </div>
        )
    }
}

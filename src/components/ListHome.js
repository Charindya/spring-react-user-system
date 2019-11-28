import React from 'react'
import axios from "axios";
import { Button } from 'reactstrap';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import '../App.css';
import Table from "react-bootstrap/Table";
import {Link} from "react-router-dom";

export class ListHome extends React.Component {
    state = {
        isLoading: true,
        listId: '',
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

        fetch('/lists')
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
        const {groups, isLoading, listId} = this.state;

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
                    <Link to="/addlist"><Button color="success">Add List</Button></Link>
                </div>

                <div className="list-group">
                    {groups.map(item => (
                        <Link to={{
                            pathname: "/list",
                            state: {
                                name: item.id
                            }}} ><a href="#" className="list-group-item list-group-item-action">{item.checkListName}</a></Link>
                    ))}
                </div>
            </div>
        )
    }
}

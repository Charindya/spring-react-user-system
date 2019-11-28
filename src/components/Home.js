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
        const name  = this.props.location.state.name;
        fetch('/list?id='+name)
            .then(response => response.json())
            .then(json => this.setState({ isLoading: false, groups:json , listId:json.id}));

        console.log("yooyoyo");
    }

    deleteListItem(e) {
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

    deleteList(e) {
        e.preventDefault();
        console.log("lo");
        console.log(e.target.value);
        axios.delete("list?id=" + e.target.value)
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
                <div style={{display: "inline-block "}}>
                    <Link className="add" to={{
                        pathname: "/adduser",
                        state: {
                            name: this.state.groups.id
                        }}} ><Button id="addTaskButton" color="success">Add Task</Button></Link>
                    <Link className="return" to={{
                        pathname: "/",
                        }} ><Button id="returnHomeButton"  color="warning">Return to Home</Button></Link>
                    </div>

                <Button  onClick={this.deleteList}  value={groups.id} color="secondary" variant="primary">Delete</Button>

                    <div className="App-intro" >
                        <Table className="table table-light ">
                            <thead style={{backgroundColor: "#323E5B", color:"white"}}>
                                <tr>
                                    <th>Task</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            {groups.listItems.map(item => (
                                <tr>
                                    <td key={item.id}>{item.description}</td>
                                    <td ><Link to={{
                                        pathname: "/edituser",
                                        state: {
                                            name: item.id,
                                            event: listId
                                        }}} ><Button color="primary">Update</Button></Link><br/></td>
                                    <td ><Button  onClick={this.deleteListItem}  value={item.id} color="secondary" variant="primary">Delete</Button></td>
                                </tr>
                            ))}
                        </Table>

                    </div>
            </div>
        )
    }
}

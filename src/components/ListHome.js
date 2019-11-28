import React from 'react'
import { Button } from 'reactstrap';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import '../App.css';
import {Link} from "react-router-dom";

export class ListHome extends React.Component {
    state = {
        isLoading: true,
        listId: '',
        name: '',
        groups: []
    };

    componentDidMount() {
        document.body.classList.add("background");
        fetch('/lists')
            .then(response => response.json())
            .then(json => this.setState({ isLoading: false, groups:json }));
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

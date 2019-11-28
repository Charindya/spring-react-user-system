import React from 'react'
import '../App.css';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import {Button} from "reactstrap";
import {Link} from "react-router-dom";
import axios from "axios";
import Alert from 'react-bootstrap/Alert'
export class UpdateUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            description: '',
            pListId : this.props.location.state.event,

        groups: []
        }
    }

    componentDidMount() {
        const name  = this.props.location.state.name;

        console.log("name:" + name);
        fetch('/listItem?id='+name)
            .then(response => response.json())
            .then(json => this.setState({  id:json.id, description:json.description,  groups:json }));
        console.log("yooyoyo");
        console.log(this.state.description);
    }

    changeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    updateHandler = e => {
        e.preventDefault();
        console.log("hi");
        console.log("sup" + this.state.id);
        console.log("PlISTID:" +this.state.pListId);
        axios.put(this.state.pListId +"/listItem", this.state)
            .then(response=> {
                console.log(response);
                this.setState({success: "true"});
                alert("User already exists! Please create a new user!");

            })
            .catch(error => {
                console.log( error);
                this.setState({success: "false"});

            })

    };

    render(){
        const {groups, id, description, pListId} = this.state;

        return(
            <div>
                <Navbar expand="lg" variant="dark" bg="primary">
                    <Container>
                        <Navbar.Brand href="#">Christmas Checklist</Navbar.Brand>
                    </Container>
                </Navbar>
                    <br/>
                <Link to={{
                    pathname: "/list",
                    state: {
                        name: pListId,
                    }}} ><Button color="warning">Return to Home</Button></Link>
                    <br/>

                <form className="form" onSubmit={this.updateHandler}>
                    {/*<div className="form-group">*/}
                        <h3>Update User</h3>
                        <input type="text" className="form-control" name="description" value={description} onChange={this.changeHandler}
                               aria-describedby="emailHelp" /><br/>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    {/*</div>*/}
                </form>

            </div>
        )
    }
}

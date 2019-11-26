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
            groups: []
        }
    }

    componentDidMount() {
        const {name}  = this.props.location.state;
        fetch('/listItem?id='+name)
            .then(response => response.json())
            .then(json => this.setState({  id:json.id, description:json.description,  groups:json }));
        console.log("yooyoyo");
        console.log(name);
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
        axios.put("/listItem/"+this.state.id, this.state)
            .then(response=> {
                console.log(response);
                this.setState({success: "true"});

            })
            .catch(error => {
                console.log(error);
                this.setState({success: "false"});

                // alert("User already exists! Please create a new user!");
            })
    };

    render(){
        const {groups, id, description} = this.state;

        return(
            <div>
                <Navbar expand="lg" variant="dark" bg="dark">
                    <Container>
                        <Navbar.Brand href="#">Christmas Checklist</Navbar.Brand>
                    </Container>
                </Navbar>
                <header className="App-header">
                    <br/>
                    <Link to="/"><Button color="warning">Return to Home</Button></Link>
                    <br/>

                <form onSubmit={this.updateHandler}>
                    {/*<div className="form-group">*/}
                        <h3>Update User</h3>
                        <input type="text"  className="form-control" name="id" value={id} onChange={this.changeHandler}
                               aria-describedby="emailHelp" /><br/>
                        <input type="text" className="form-control" name="description" value={description} onChange={this.changeHandler}
                               aria-describedby="emailHelp" /><br/>
                        <button type="submit" className="btn btn-success">Submit</button>
                    {/*</div>*/}
                </form>
                </header>

            </div>
        )
    }
}

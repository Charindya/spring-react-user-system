import React from 'react'
import '../App.css';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import {Button} from "reactstrap";
import {Link} from "react-router-dom";
import axios from "axios";
import Alert from 'react-bootstrap/Alert'
export class AddUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            description: '',
            success: ''
        }
    }

    changeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    submitHandler = e => {
        e.preventDefault();
        console.log("hi");
        console.log(this.state);
        axios.post("/listItem", this.state)
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
        const {id, description, success} = this.state;
        if(success=="true"){
            console.log("supperino");
            return(<div>
                <Alert variant="success" bg-color="dark">
                    <Alert.Heading>Item successfully added to wishlist! Get shopping!</Alert.Heading>
                </Alert>
                <header className="App-header">

                    <br/>
                    <Link to="/"><Button color="warning">Return to Home</Button></Link>
                    <br/>
                </header>
            </div>)
        } else if(success=="false") {
            return(
                <div>
                    <Alert variant="danger" bg-color="dark">
                        <Alert.Heading>User already exists!</Alert.Heading>
                    </Alert>
                    <Navbar expand="lg" variant="dark" bg="dark">
                        <Container>
                            <Navbar.Brand href="#">Christmas Checklist</Navbar.Brand>
                        </Container>
                    </Navbar>
                    <header className="App-header">
                        <br/>
                        <Link to="/"><Button color="warning">Return to Home</Button></Link>
                        <br/>

                        <form onSubmit={this.submitHandler}>
                            {/*<div className="form-group">*/}
                            <h3>Add User</h3>
                            <input type="email" className="form-control" name="id" value={id} onChange={this.changeHandler}
                                   aria-describedby="emailHelp" placeholder="Enter email"/><br/>
                            <input type="text" className="form-control" name="description" value={description} onChange={this.changeHandler}
                                   aria-describedby="emailHelp" placeholder="Enter username"/><br/>
                            <button type="submit" className="btn btn-success">Submit</button>
                            {/*</div>*/}
                        </form>
                    </header>

                </div>
            )
        }
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

                <form onSubmit={this.submitHandler}>
                    {/*<div className="form-group">*/}
                        <h3>Add User</h3>
                        <input type="text" className="form-control" name="id" value={id} onChange={this.changeHandler}
                               aria-describedby="emailHelp" placeholder="Enter email"/><br/>
                        <input type="text" className="form-control" name="description" value={description} onChange={this.changeHandler}
                               aria-describedby="emailHelp" placeholder="Enter username"/><br/>
                        <button type="submit" className="btn btn-success">Submit</button>
                    {/*</div>*/}
                </form>
                </header>

            </div>
        )
    }
}
import React from 'react'
import '../App.css';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import {Button} from "reactstrap";
import {Link} from "react-router-dom";
import axios from "axios";
import Alert from 'react-bootstrap/Alert'
export class AddList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            checkListName: '',
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
        axios.post("/list", this.state)
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
        const {id, checkListName, success} = this.state;
        if(success=="true"){
            console.log("supperino");
            return(<div>
                <Alert variant="success" bg-color="dark">
                    <Alert.Heading>Item successfully added to wishlist! Get shopping!</Alert.Heading>
                </Alert>

                    <br/>
                    <Link to="/"><Button className="return" color="warning">Return to Home</Button></Link>
                    <br/>
            </div>)
        } else if(success=="false") {
            return(
                <div>
                    <Alert variant="danger" bg-color="dark">
                        <Alert.Heading>User already exists!</Alert.Heading>
                    </Alert>
                    <Navbar expand="lg" variant="dark" bg="primary">
                        <Container>
                            <Navbar.Brand href="#">Christmas Checklist</Navbar.Brand>
                        </Container>
                    </Navbar>
                        <br/>
                        <Link to="/list"><Button className="return" color="warning">Return to Home</Button></Link>
                        <br/>

                        <form onSubmit={this.submitHandler}>
                            {/*<div className="form-group">*/}
                            <h3>Add User</h3>
                            <input type="email" className="form-control" name="id" value={id} onChange={this.changeHandler}
                                   aria-describedby="emailHelp" placeholder="Enter email"/><br/>
                            <input type="text" className="form-control" name="checkListName" value={checkListName} onChange={this.changeHandler}
                                   aria-describedby="emailHelp" placeholder="Enter username"/><br/>
                            <button type="submit" className="btn btn-success">Submit</button>
                            {/*</div>*/}
                        </form>
                </div>
            )
        }
        return(
            <div>
                <Navbar expand="lg" variant="dark" bg="primary">
                    <Container>
                        <Navbar.Brand href="#">Christmas Checklist</Navbar.Brand>
                    </Container>
                </Navbar>
                    <br/>
                    <Link to="/"><Button className="return" color="warning">Return to Home</Button></Link>
                    <br/>

                <form className="form" onSubmit={this.submitHandler} >
                    {/*<div className="form-group">*/}
                        <h3 style={{padding:"10px"}}>Add User</h3>
                    <br/>
                        <input type="text" className="form-control" name="id" value={id} onChange={this.changeHandler}
                               aria-describedby="emailHelp" placeholder="Enter email"/><br/>
                        <input type="text" className="form-control" name="checkListName" value={checkListName} onChange={this.changeHandler}
                               aria-describedby="emailHelp" placeholder="Enter username"/><br/>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    {/*</div>*/}
                </form>

            </div>
        )
    }
}

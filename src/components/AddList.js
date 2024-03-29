import React from 'react'
import '../App.css';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import {Button} from "reactstrap";
import {Link} from "react-router-dom";
import axios from "axios";
import {SuccessAlert} from "./SuccessAlert";
import {FailureAlert} from "./FailureAlert";
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
        console.log(this.state);
        axios.post("/list", this.state)
            .then(response=> {
                console.log(response);
                this.setState({success: "true"});
            })
            .catch(error => {
                console.log(error);
                this.setState({success: "false"});
            })
    };

    render(){
        const {id, checkListName, success} = this.state;
        if(success=="true"){
            return(
                <SuccessAlert message="New list created!" link="/"/>
            )
        } else if(success=="false") {
            return(
                <FailureAlert message="List was not succesfully created - please contact administration."  link="/"/>
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
                        <h3 style={{padding:"10px"}}>Add List</h3>
                    <br/>
                        <input type="text" className="form-control" name="checkListName" value={checkListName} onChange={this.changeHandler}
                               aria-describedby="emailHelp" placeholder="Enter list name"/><br/>
                        <button type="submit" className="btn btn-primary">Submit</button>
                </form>

            </div>
        )
    }
}

import React from 'react'
import '../App.css';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import {Button} from "reactstrap";
import {Link} from "react-router-dom";
import axios from "axios";
import {SuccessAlert} from "./SuccessAlert";
import {FailureAlert} from "./FailureAlert";
export class AddTask extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            pListId : this.props.location.state.name,
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
        console.log(this.state);
        axios.post(this.state.pListId+"/listItem", this.state)
            .then(response=> {
                console.log(response);
                this.setState({success: "true"});
            })
            .catch(error => {
                console.log("Error: " + error);
                this.setState({success: "false"});
            })
    };

    render(){
        const {description, pListId, success} = this.state;
        if(success=="true"){
            return(
                <SuccessAlert message="Item successfully added to wishlist! Get shopping!" pListId={pListId} link="/list"/>
            )
        } else if(success=="false") {
            return(
                <FailureAlert message="Item was not succesfully added - please contact administration." pListId={pListId} link="/list"/>
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
                <Link
                    to={{
                        pathname: "/list",
                        state: {
                            name: pListId
                        }}} ><Button className="return" color="warning">Return to Home</Button>
                </Link><br/>

                <form className="form" onSubmit={this.submitHandler} >
                    <h3 style={{padding:"10px"}}>Add Task</h3><br/>
                    <input type="text" className="form-control" name="description" value={description} onChange={this.changeHandler}
                           aria-describedby="emailHelp" placeholder="Enter username"/><br/>
                    <button type="submit" className="btn btn-primary">Submit</button>
               </form>
            </div>
        )
    }
}

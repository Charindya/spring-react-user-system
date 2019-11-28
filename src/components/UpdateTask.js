import React from 'react'
import '../App.css';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import {Button} from "reactstrap";
import {Link} from "react-router-dom";
import axios from "axios";
import {SuccessAlert} from "./SuccessAlert";
import {FailureAlert} from "./FailureAlert";
export class UpdateTask extends React.Component {
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
        fetch('/listItem?id='+name)
            .then(response => response.json())
            .then(json => this.setState({  id:json.id, description:json.description,  groups:json }));
    }

    changeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    updateHandler = e => {
        e.preventDefault();
        axios.put(this.state.pListId +"/listItem", this.state)
            .then(response=> {
                console.log(response);
                this.setState({success: "true"});
                e.preventDefault();
            })
            .catch(error => {
                console.log( error);
                this.setState({success: "false"});
            })
    };

    render(){
        const {description, pListId, success} = this.state;
        if(success=="true"){
            return(
                <SuccessAlert message="Item was sucessfully updated!" pListId={pListId} link="/list"/>
            )
        } else if(success=="false") {
            return(
                <FailureAlert message="Item was not succesfully updated - please contact administration." pListId={pListId} link="/list"/>
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
                <Link to={{
                    pathname: "/list",
                    state: {
                        name: pListId,
                    }}} ><Button color="warning">Return to Home</Button></Link>
                    <br/>

                <form className="form" onSubmit={this.updateHandler}>
                        <h3>Update User</h3>
                        <input type="text" className="form-control" name="description" value={description} onChange={this.changeHandler}
                               aria-describedby="emailHelp" /><br/>
                        <button type="submit" className="btn btn-primary">Submit</button>
                </form>

            </div>
        )
    }
}

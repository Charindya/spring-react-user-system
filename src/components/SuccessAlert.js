import React from 'react'
import '../App.css';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import {Button} from "reactstrap";
import {Link} from "react-router-dom";
import Alert from 'react-bootstrap/Alert'
export class SuccessAlert extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: this.props.message,
            pListId : this.props.pListId,
            link: this.props.link,
        }
    }

    render(){
        const {message, pListId, link} = this.state;
            return(<div>
                <Alert variant="success" bg-color="dark">
                    <Alert.Heading>{message}</Alert.Heading>
                </Alert>
                <Navbar expand="lg" variant="dark" bg="primary">
                    <Container>
                        <Navbar.Brand href="#">Christmas Checklist</Navbar.Brand>
                    </Container>
                </Navbar> <br/>
                <Link
                    to={{
                        pathname: link,
                        state: {
                            name: pListId
                        }}} ><Button className="return" color="warning">Return to Home</Button>
                </Link><br/>
            </div>
            )
        }

}

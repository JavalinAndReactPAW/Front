import React from "react";
import "./Login.css";
import {Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {Cookies, withCookies} from "react-cookie";
import {instanceOf} from "prop-types";
import {loadBoards} from "../Home/Home";

class Login extends React.Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            modalRegistered: false,
            modal: false,
            logged: false,
            login: '',
            password: ''
        };

        this.toggle = this.toggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.logout = this.logout.bind(this);
        setLogged = setLogged.bind(this);

        this.toggleRegister = this.toggleRegister.bind(this);
        this.handleSubmitRegister = this.handleSubmitRegister.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    toggleRegister() {
        this.setState({
            modalRegistered: !this.state.modalRegistered
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        fetch('http://localhost:7000/login', {
            method: 'POST',
            body: JSON.stringify({login: data.get('login'), password: data.get('password')}),
            credentials: 'include'
        }).then(data => {
            if (data.status === 200) {
                this.setState({
                    logged: true
                });
            }
        }).finally(() => {
            this.toggle();
            loadBoards();
        });
    }

    handleSubmitRegister(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        fetch('http://localhost:7000/register', {
            method: 'POST',
            body: JSON.stringify({login: data.get('login'), password: data.get('password')}),
            credentials: 'include'
        }).finally(() => {
            this.toggleRegister();
        });
    }

    logout() {
        const {cookies} = this.props;
        fetch('http://localhost:7000/logout', {
            method: 'POST',
            credentials: 'include'
        }).finally(() => {
            cookies.remove("Session");
            this.setState({
                logged: false
            });
            loadBoards();
        });
    }

    render() {
        return (
            <>
                {this.state.logged ? <span className="nav-link button-pointer" onClick={this.logout}>Wyloguj</span> :
                    <><span className="nav-item active nav-link button-pointer" onClick={this.toggle}>Zaloguj</span>
                    <span className="nav-item active nav-link button-pointer" onClick={this.toggleRegister}>Zarejestruj</span></>}
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Logowanie</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label for="exampleEmail" sm={2}>Login</Label>
                                <Col sm={10}>
                                    <Input type="login" name="login"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="examplePassword" sm={2}>Hasło</Label>
                                <Col sm={10}>
                                    <Input type="password" name="password"/>
                                </Col>
                            </FormGroup>
                            <Button>Zaloguj</Button>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalRegistered} toggle={this.toggleRegister} className={this.props.className}>
                    <ModalHeader toggle={this.toggleRegister}>Rejestracja</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmitRegister}>
                            <FormGroup row>
                                <Label for="exampleEmail" sm={2}>Login</Label>
                                <Col sm={10}>
                                    <Input type="login" name="login"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="examplePassword" sm={2}>Hasło</Label>
                                <Col sm={10}>
                                    <Input type="password" name="password"/>
                                </Col>
                            </FormGroup>
                            <Button>Zarejestruj</Button>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}

export default withCookies(Login);
let setLogged = function () {
    this.setState({
        logged: true
    });
}
export {setLogged};
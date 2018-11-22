import React from 'react';
import { Button, Form, Modal, ModalHeader, ModalBody, Input, FormGroup, Label } from 'reactstrap';

class CreateList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: this.props.isOpen
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>;

        return (
            <div>
                <Button color="primary" outline onClick={this.toggle}>+</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle} close={closeBtn}>Stwórz Listę</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.requestListCreation}>
                        <FormGroup>
                            <Label for="exampleText">Nazwa Listy</Label>
                            <Input type="textarea" name="text" id="boardName" />
                        </FormGroup>
                        <FormGroup className="text-center">
                            <Button color="primary" type="submit">Stwórz</Button>{' '}
                            <Button color="danger" onClick={this.toggle}>Anuluj</Button>
                        </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }

    requestListCreation(event){
        event.preventDefault();
        const data = new FormData(event.target);
        fetch('http://localhost:7000/list/new', {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json',
                'Access-Control-Allow-Credentials': true, 'Access-Control-Allow-Origin': '*'},
            body: JSON.stringify({id: data.get('boardID'), name: data.get('boardName')}),
            credentials: 'include'
        }).then(data => {
            if (data.status === 200) {
                this.render();
            }
        });

    }
}

export default CreateList;
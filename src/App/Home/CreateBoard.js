import React from 'react';
import { Button, Modal, Form, ModalHeader, ModalBody, Input, FormGroup, Label } from 'reactstrap';

class CreateBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
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
                    <ModalHeader toggle={this.toggle} close={closeBtn}>Stwórz Tablicę</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.requestBoardCreation}>
                        <FormGroup>
                            <Label for="exampleText">Nazwa Tablicy</Label>
                            <Input type="textarea" name="boardName" id="boardName" />
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

    requestBoardCreation(event){
        event.preventDefault();
        const data = new FormData(event.target);
        fetch('http://localhost:7000/boards/new', {
            method: 'POST',
            body: JSON.stringify({name: data.get('boardName')}),
            credentials: 'include'
        }).then(data => {
            if (data.status === 200) {
                window.location.reload();
            }
        });

    }
}

export default CreateBoard;
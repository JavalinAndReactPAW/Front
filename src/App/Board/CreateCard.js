import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label } from 'reactstrap';

class CreateCard extends React.Component {
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
                    <ModalHeader toggle={this.toggle} close={closeBtn}>Stwórz Kartę</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="exampleText">Nazwa Karty</Label>
                            <Input type="textarea" name="text" id="boardName" />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.requestCardCreation}>Stwórz</Button>{' '}
                        <Button color="danger" onClick={this.toggle}>Anuluj</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }

    requestCardCreation(){
        //send request

    }
}

export default CreateCard;
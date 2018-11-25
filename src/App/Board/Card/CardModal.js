import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, FormGroup, Label } from 'reactstrap';

export default class CardModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: this.props.isOpen,
            cardData: this.props.cardData,
            cardName: this.props.cardName
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
        let card = this.state.cardData;
        return (

            <div>
                <Button color="link" onClick={this.toggle}>{this.state.cardName}</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle} close={closeBtn}>{this.state.cardName}</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="exampleText">Zawartość</Label>
                            <p>{card.value}</p>
                        </FormGroup>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}
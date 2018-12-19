import React from 'react';
import './CardModal.css'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label } from 'reactstrap';
import { UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle} from 'reactstrap';

export default class CardModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: this.props.isOpen,
            cardData: this.props.cardData,
            cardName: this.props.cardName,
            cardId: this.props.cardId,
            listId: this.props.listId
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    requestCardDeletion(event){
       // event.preventDefault();
        let boardID= document.location.href.split('/')[4];
        let listId = event.target.attributes.getNamedItem('data-tag1').value;
        let cardId = event.target.attributes.getNamedItem('data-tag2').value;

        fetch('http://localhost:7000/boards/'+boardID+'/lists/'+listId+'/cards/:'+cardId, {
            method: 'DELETE',
            credentials: 'include'
        }).then(data => {
            if (data.status === 200) {
                window.location.reload();
            }
            else{
                console.log("Deletion ERROR");
            }
        });
    }

    returnCardComment(cardComment){
        if(cardComment !== "" && cardComment !== null){
            return cardComment;
        }
        else{
            return <i>Brak komentarza</i>;
        }
    }

    render() {
        const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>;
        let card = this.state.cardData;
        let listId = this.state.listId;
        let cardId = this.state.cardId;
        let cardComment = this.returnCardComment(card.value);

        return (

            <div>
                <Button color="link" onClick={this.toggle}>{this.state.cardName}</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle} close={closeBtn}>{this.state.cardName}</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <p>{cardComment}</p>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <UncontrolledButtonDropdown>
                            <DropdownToggle color="link" size="sm">...</DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem header>Akcje Karty</DropdownItem>
                                <DropdownItem data-tag1={listId} data-tag2={cardId} onClick={this.requestCardDeletion}>Usuń</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
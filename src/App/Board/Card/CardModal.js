import React from 'react';
import './CardModal.css'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap';
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

    requestCardDeletion(event, listId, cardId){
        event.preventDefault();
        let boardID= document.location.href.split('/')[4];

        fetch('http://localhost:7000/boards/'+boardID+'/lists/'+listId+'/cards/'+cardId+'/delete', {
            method: 'POST',
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

    requestCommentDeletion(e, listId, cardId, commentId){
        e.preventDefault();
        let boardID= document.location.href.split('/')[4];

        fetch('http://localhost:7000/boards/'+boardID+'/lists/'+listId+'/cards/'+cardId+"/comments/"+commentId+"/delete", {
            method: 'POST',
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

    returnCardDescription(cardDesc){
        if(cardDesc !== "" && cardDesc !== null){
            return cardDesc;
        }
        else{
            return <i>Brak Opisu</i>;
        }
    }

    returnCardComments(cardComments, listId, cardId){
        if(cardComments.length !== 0 && cardComments !== null){
            let commentsBlock = [];
            for(let i = 0; i < cardComments.length; i++){
                let tmpVal = cardComments[i].value;
                let tmpAuthor = cardComments[i].addedBy;
                const deleteBtn = <button className="close" onClick={(e) => this.requestCommentDeletion(e,listId,cardId,cardComments[i].id)}>&times;</button>;
                commentsBlock.push(<div key={cardId} className="comments-header">{tmpVal}</div>);
                commentsBlock.push(<div key={cardId} className="comments-author">{tmpAuthor}</div>);
                commentsBlock.push(<div key={cardId} className="comments-delete">{deleteBtn}</div>);
                commentsBlock.push(<div key={cardId} className="comments-row"><br/></div>);
            }
            return commentsBlock;
        }
        else{
            return <i><br/>Brak Komentarzy</i>;
        }
    }

    handleCommentInputField = (e,listId, cardId) => {
        if (e.key === 'Enter') {
            if(e.shiftKey){
                e.stopPropagation();
            }else {
                let text = e.target.value;
               // text.replace(/(\r\n\t|\n|\r\t)/gm,"");
               // text.replace(" ","");
                if (text.length > 0) {
                    this.requestCommentAddition(e, listId, cardId);
                    e.target.value = "";
                }
            }
        }
    };

    requestCommentAddition(event, listID, cardID){
        event.preventDefault();
        let boardID= document.location.href.split('/')[4];
        let data = event.target.value;
        console.log(data);

        fetch('http://localhost:7000/boards/'+boardID+'/lists/'+listID+'/cards/'+cardID+"/comments", {
            method: 'POST',
            body: JSON.stringify({value: data}),
            credentials: 'include'
        }).then(data => {
            if (data.status === 200) {
                window.location.reload();
            }
            else{
                console.log("CREATION ERROR");
            }
        });
    }

    render() {
        const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>;
        let card = this.state.cardData;
        let listId = this.state.listId;
        let cardId = this.state.cardId;
        let cardDesc= this.returnCardDescription(card.value);
        let cardComments = this.returnCardComments(card.comments,listId,cardId);

        return (
            <div>
                <Button color="link" onClick={this.toggle}>{this.state.cardName}</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle} close={closeBtn}>{this.state.cardName}</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <div>
                                <p>{cardDesc}</p>
                            </div>
                            <div className="top-border">
                                <div className="comments-title">Komentarze</div>
                                <div className="comments-header-div">
                                {cardComments}
                                </div>
                                <p><textarea className="comment-input" name="a" placeholder="Dodaj Komentarz" onKeyPress={(e) => this.handleCommentInputField(e, listId, cardId)}/></p>
                            </div>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <UncontrolledButtonDropdown>
                            <DropdownToggle color="link" size="sm">...</DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem header>Akcje Karty</DropdownItem>
                                <DropdownItem onClick={(e) => this.requestCardDeletion(e, listId, cardId)}>Usuń</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
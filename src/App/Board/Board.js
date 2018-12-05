import React from 'react'
import './Board.css';
import {Button, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import CreateList from "./CreateList";
import CardModal from "./Card/CardModal";

export default class Board extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            board: [],
            isCreateListOpen: false,
            isCardOpen: false,
            dragCardId: "",
            dragListId: "",
        };
    }
    componentDidMount() {

        fetch('http://localhost:7000/boards/' + this.props.match.params.id , {
            credentials: 'include'
        }).then(result => {
            return result.json();
        }).then(data => this.setState({board: data}))

    }
    createRow() {
        let row = [];
        let list = this.state.board.lists;
        let boardID = this.state.board.id;
        console.log(boardID);

        if(list) {
            for (let i = 0; i < list.length; i++) {
                let cards = list[i].cards;
                row.push(
                    <div className="col-md-3" key={list[i].id} onDragOver={(e) => e.preventDefault()}
                         onDrop={(e) => this.onDrop(e, list[i].id)}>
                        <div className="card">
                            <div className="card-body">
                                <div className="listHeadFlex">
                                    <div className="listName">{list[i].name}</div>
                                    <div className="dotButton">
                                        <UncontrolledButtonDropdown>
                                            <DropdownToggle color="link" size="sm">...</DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem header>Akcje Listy</DropdownItem>
                                                <DropdownItem disabled>Action</DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledButtonDropdown>
                                    </div>
                                </div>
                                {this.fillList(cards,list[i].id)}
                                <Button className="addCard" color="link">Dodaj nową kartę</Button>
                            </div>

                        </div>
                    </div>);
            }
        }
        row.push(
            <div className="col-md-3" key="empty">
                <div className="card">
                    <div className="card-body empty-card-body" align="center">
                        <CreateList id={boardID}/>
                    </div>
                </div>
            </div>)
        return row;
    }

    fillList(cards, listId){
        let row = [];

        for(let i = 0; i < cards.length; i++) {
            row.push(
                <div key={cards[i].id} draggable onDragStart={(e)=>this.onDragStart(e, cards[i].id, listId)}>
                    <div className="list">
                        <div className="list-body">
                            <CardModal isOpen={this.state.isCardOpen} cardName={cards[i].name} cardData={cards[i]}/>
                        </div>
                    </div>
                </div>);
        }
        return row;
    }

    onDragStart(event, cardId, listId) {
        console.log("DRAG START, karta id = " + cardId + " lista id =" + listId)
        this.setState({
            dragCardId: cardId,
            dragListId: listId
        });
    }

    onDrop(event, listId) {
        console.log("DRAG END listid =" + listId);
        console.log(event.target);
        var array = this.state.board;
        var selectedArray = array.lists.find(data => data.id === this.state.dragListId);
        var modifiedIndex = array.lists.indexOf(selectedArray);

        var selectedCard = selectedArray.cards.find(data => data.id === this.state.dragCardId)
        var modifiedCards = selectedArray.cards.filter(data => data.id !== this.state.dragCardId);
        selectedArray.cards = modifiedCards;
        array.lists[modifiedIndex] = selectedArray;

        selectedArray = array.lists.find(data => data.id === listId);
        modifiedIndex = array.lists.indexOf(selectedArray);
        array.lists[modifiedIndex].cards.push(selectedCard);
        console.log(array);
        this.setState({board: array});
    }

    render() {

        return (
            <div>
                <div className="container">
                    <h1 className="mt-5">{this.state.board.name}</h1>
                    <div className="row">
                        {this.createRow()}
                    </div>
                </div>
            </div>
        );
    }
}
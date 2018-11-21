import React from 'react'
import './Board.css';
import {Link} from "react-router-dom";
import {Button, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import CreateList from "./CreateList";
import CardModal from "./Card/CardModal";

export default class Board extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            board: [],
            isCreateListOpen: false,
            isCardOpen: false
        };
    }
    componentDidMount() {

        fetch('http://localhost:7000/board/' + this.props.match.params.id).then(result => {
            return result.json();
        }).then(data => this.setState({board: data}))

    }
    createRow() {
        let row = [];
        let list = this.state.board.lists;

        if(list) {
            for (let i = 0; i < list.length; i++) {
                let cards = list[i].cards;
                row.push(
                    <div className="col-md-3" key={list[i].id}>
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
                                {this.fillList(cards)}
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
                        <CreateList isOpen={this.state.isCreateListOpen}/>
                    </div>
                </div>
            </div>)
        return row;
    }

    fillList(cards){
        let row = [];

        for(let i = 0; i < cards.length; i++) {
            console.log(cards[i]);
            row.push(
                <div key={cards[i].id}>
                    <div className="list">
                        <div className="list-body">
                            <CardModal isOpen={this.state.isCardOpen} cardName={cards[i].name} cardData={cards[i]}/>
                        </div>
                    </div>
                </div>);
        }
        return row;
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
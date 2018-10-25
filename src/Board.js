import React, {Component} from 'react'
import './Board.css';
import {Link} from "react-router-dom";

export default class Board extends Component {

    constructor() {
        super()
        this.state = {
            board: []
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
                                <p className="listName">{list[i].name}</p>
                                {this.fillList(cards)}
                            </div>
                        </div>
                    </div>);
            }
        }
        return row;
    }

    fillList(cards){
        let row = [];
        for(let i = 0; i < cards.length; i++) {
            row.push(
                <div key={cards[i].id}>
                    <Link to={'/card/' + cards[i].id}>
                    <div className="list">
                        <div className="list-body">
                            <p>{cards[i].name}</p>
                        </div>
                    </div>
                    </Link>
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
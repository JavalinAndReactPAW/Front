import React, {Component} from 'react';
import './Home.css';

export default class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            card: []
        };
    }

    componentDidMount() {
        fetch('http://localhost:7000/card/' + this.props.match.params.id).then(result => {
            return result.json();
        }).then(data => this.setState({card: data}));
    }

    createRow() {
        let row = [];
        let card = this.state.card;
        row.push(
            <div className="col-md-3" key={card}>
                <div className="card">
                    <div className="card-body">
                        {card.value}
                     </div>
                </div>
            </div>);
        return row;
    }

    render() {

        return (
            <div>
                <div className="container">
                    <h1 className="mt-5">Karta {this.state.card.name}</h1>
                    <div className="row">
                        {this.createRow()}
                    </div>
                </div>
            </div>
        );
    }
}
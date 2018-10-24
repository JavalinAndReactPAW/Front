import React, {Component} from 'react';
import './Home.css';
import {Link} from "react-router-dom";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tables: []
        };
    }

    componentDidMount() {
        fetch("http://localhost:7000/").then(result => {
            return result.json();
        }).then(data => this.setState({tables: data}));
    }

    createRow() {
        let row = [];
        for (let i = 0; i < this.state.tables.length; i++) {
            row.push(
                <div className="col-md-3" key={this.state.tables[i].id}>
                    <Link to={'/board/' + this.state.tables[i].id}>
                        <div className="card">
                            <div className="card-body">
                                {this.state.tables[i].name}
                            </div>
                        </div>
                    </Link>
                </div>)
        }

        return row;
    }

    render() {
        return (
            <div>

                <div className="container">
                    <h1 className="mt-5">Tablice</h1>
                    <div className="row">
                        {this.createRow()}
                    </div>
                </div>
            </div>
        );
    }
}
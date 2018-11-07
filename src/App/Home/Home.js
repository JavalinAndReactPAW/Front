import React, {Component} from 'react';
import './Home.css';
import {Link} from "react-router-dom";
import {setLogged} from "../Login/Login"

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tables: []
        };
        loadBoards = loadBoards.bind(this);
    }

    componentDidMount() {
        loadBoards();
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
                        {this.state.tables ? this.createRow() : null}
                    </div>
                </div>
            </div>
        );
    }
}

let loadBoards = function () {
    fetch("http://localhost:7000/boards", {
        credentials: 'include'
    }).then(result => {
        if (result.status === 200) {
            setLogged();
            return result.json();
        }
    }).then(data => this.setState({tables: data}));
};
export {loadBoards}
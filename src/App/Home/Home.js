import React, {Component} from 'react';
import './Home.css';
import {Link} from "react-router-dom";
import {setLogged} from "../Login/Login"
import CreateBoard from "./CreateBoard";
import {UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tables: [],
            isCreateBoardOpen: false
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
                    <div className="card">
                        <div className="card-body">
                            <div className="boardHeadFlex">
                                <Link to={'/boards/' + this.state.tables[i].id}>
                                    <div>
                                        {this.state.tables[i].name}</div>
                                </Link>
                                <div className="dotButton">
                                    <UncontrolledButtonDropdown>
                                        <DropdownToggle color="link" size="sm">...</DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem header>Akcje Tablicy</DropdownItem>
                                            <DropdownItem onClick={(e) => this.requestCloseBoard(e)}>Zamknij Tablicę</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledButtonDropdown>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)
        }
        row.push(
            <div className="col-md-3" key="empty">
                    <div className="card">
                        <div className="card-body empty-card-body" align="center">
                            <CreateBoard/>
                        </div>
                    </div>
            </div>)

        return row;
    }

    requestCloseBoard(){
        console.log("CLOSING");
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
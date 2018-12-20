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
            let boardState = this.state.tables[i].boardState;
            console.log(boardState);
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
                                        {this.getDropdownMenuButtons(boardState,this.state.tables[i].id)}
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
            </div>);

        return row;
    }

    getDropdownMenuButtons(boardstate, boardId) {
        if (boardstate === "ACTIVE"){
            return  ( <DropdownMenu>
                            <DropdownItem header>Akcje Tablicy</DropdownItem>
                            <DropdownItem onClick={(e) => this.requestDisableBoard(e, boardId)}>Zamknij Tablicę</DropdownItem>
                            <DropdownItem onClick={(e) => this.requestDeleteBoard(e, boardId)}>Usuń Tablicę</DropdownItem>
                        </DropdownMenu>);
        }
        else if (boardstate === "DISABLED"){
            return  ( <DropdownMenu>
                            <DropdownItem header>Akcje Tablicy</DropdownItem>
                            <DropdownItem onClick={(e) => this.requestEnableBoard(e, boardId)}>Otwórz Tablicę</DropdownItem>
                            <DropdownItem onClick={(e) => this.requestDeleteBoard(e, boardId)}>Usuń Tablicę</DropdownItem>
                        </DropdownMenu>);
        }
    }

    requestDisableBoard(event, boardID){
        event.preventDefault();

        fetch('http://localhost:7000/boards/'+boardID+'/disable', {
            method: 'POST',
            credentials: 'include'
        }).then(data => {
            if (data.status === 200) {
                window.location.reload();
            }
            else{
                console.log("COULDNT DISABLE BOARD "+boardID);
            }
        });
    }

    requestEnableBoard(event, boardID){
        event.preventDefault();

        fetch('http://localhost:7000/boards/'+boardID+'/enable', {
            method: 'POST',
            credentials: 'include'
        }).then(data => {
            if (data.status === 200) {
                window.location.reload();
            }
            else{
                console.log("COULDNT DISABLE BOARD "+boardID);
            }
        });
    }

    requestDeleteBoard(event, boardID){
        event.preventDefault();

        fetch('http://localhost:7000/boards/'+boardID+'/delete', {
            method: 'POST',
            credentials: 'include'
        }).then(data => {
            if (data.status === 200) {
                window.location.reload();
            }
            else{
                console.log("COULDNT DELETE BOARD "+boardID);
            }
        });
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
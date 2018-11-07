import React, {Component} from 'react'
import {Link} from "react-router-dom";
import Login from "../Login/Login";

export default class Nav extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
                <div className="container">
                    <div className="navbar-brand">
                        Trello
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarResponsive"
                            aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon">
                        </span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <Link to="/" className="nav-link">Home
                                    <span className="sr-only">(current)</span>
                                </Link>
                            </li>
                            <li className="nav-item active">
                                <Login/>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Home from "./Home/Home";
import Board from "./Board/Board";
import Nav from "./Nav/Nav";
import Card from "./Board/Card/Card";

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Nav/>
                    <Route exact path="/" component={Home}/>
                    <Route path="/board/:id" component={Board}/>
                    <Route path="/card/:id" component={Card}/>
                </div>
            </Router>
        );
    }
}

export default App;
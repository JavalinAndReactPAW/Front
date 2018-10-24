import React, {Component} from 'react'

export default class Board extends Component {

    constructor() {
        super()
        this.state = {
            board: {}
        }
    }
    componentDidMount() {

        fetch('http://localhost:7000/board/' + this.props.match.params.id).then(result => {
            return result.json();
        }).then(data => this.setState({board: data}))

    }

    render() {
        console.log(this.props.match.params.id);
        console.log(this.state.board);
        return (
            <div>
            </div>
        );
    }
}
import React, { Component } from 'react'
import axios from 'axios'
import Navbar from './components/Navbar'
import Content from './components/Content'
import Bottom from './components/Bottom'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            joke: [],
            uri: 'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_joke',
            facebookID: '150121115544196'
        }
        this._generateJokes = this._generateJokes.bind(this)
    }

    componentDidMount() {
        this._generateJokes()
    } 

    _generateJokes() {
        axios.get(this.state.uri)
            .then((res) => {
                this.setState({
                    joke: res.data
                })
            })
    }

    render() {
        const { joke } = this.state
        const quote = `${joke.setup} - ${joke.punchline}`

        return (
            <div className="wrapper">
                <Navbar />
                <Content data={joke} />
                <Bottom quote={quote} onClick={ this._generateJokes } />
            </div>
        )
    }
}

export default App
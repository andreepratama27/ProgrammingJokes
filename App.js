import Navbar from './components/Navbar'
import React, { Component } from 'react'
import axios from 'axios'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            joke: [],
            uri: 'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_joke'
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

        return (
            <div className="wrapper">
                <Navbar />

                <div className="column">
                    <div className="content">
                        <div className="setup">
                            { joke.setup }
                        </div>
                        <div className="punchline">
                            { joke.punchline }
                        </div>
                        <div className="type">
                            <i>Joke type - { joke.type }</i>
                        </div>
                    </div>
                </div>
                

                <div className="">
                    <div className="bottom-section">
                        <button className="button is-info" onClick={ this._generateJokes }>
                            Generate Jokes
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default App
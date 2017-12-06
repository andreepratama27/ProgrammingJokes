import Navbar from './components/Navbar'

const App = () => {
    return (
        <div className="wrapper">
            <Navbar />

            <div className="column">
                <div className="content">
                    <div className="text">
                        Andre Pratama
                    </div>
                </div>
            </div>
            

            <div className="">
                <div className="bottom-section">
                    <button className="button is-info">
                        Generate Jokes
                    </button>
                </div>
            </div>
            
        </div>
    )
}

export default App
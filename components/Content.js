import PropTypes from 'prop-types'

const Content = (props) => {
    const { data } = props
    return (
        <div className="column">
            <div className="content">
                <div className="setup">
                    { data.setup }
                </div>
                <div className="punchline">
                    { data.punchline }
                </div>
                <div className="type">
                    <i>Joke type - { data.type }</i>
                </div>
            </div>
        </div>
    )
}

Content.propTypes = {
    data: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ]).isRequired
}

export default Content
import { ShareButtons, ShareCounts, generateShareIcon } from 'react-share'
import PropTypes from 'prop-types'

const Bottom = (props) => {
    const { FacebookShareButton } = ShareButtons
    const { quote, onClick } = props

    return (
        <div className="">
            <div className="bottom-section">
                <FacebookShareButton url="andreepratama27.github.io" quote={ quote }>
                    <button className="button facebook">
                        <span className="icon">
                            <i className="fa fa-facebook"></i>
                        </span>
                        Share to Facebook
                    </button>
                </FacebookShareButton>
                <button className="button is-info" onClick={ onClick }>
                    <span className="icon">
                        <i className="fa fa-refresh"></i>
                    </span>
                    Generate Jokes
                </button>
            </div>
        </div>
    )
}

Bottom.propTypes = {
    onClick: PropTypes.func.isRequired,
    quote: PropTypes.string.isRequired
}

export default Bottom
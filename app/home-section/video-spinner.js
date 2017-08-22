// Requires
let React = require( 'react' ),
    ReactDOM = require( 'react-dom' ),
    Globals = require('../modules/global/global.js');

class VideoSpinner extends React.Component {

    constructor() {
        super();
    }
    
    componentDidMount(){

    }

    // Render
    render() {
        let classname = 'home-section home-section-video-spinner';
        if (this.props.settings.size == 'full') classname += ' size-full';
        let heading = '';
        if (this.props.settings.heading != null) heading = Globals.text.strong(this.props.settings.heading);
        
        return(
            <section className={classname}>
                {this.props.settings.heading != null && <h3 className="section-heading" dangerouslySetInnerHTML={{__html: heading}}></h3>}
            </section>
        );
    }

} module.exports = VideoSpinner;
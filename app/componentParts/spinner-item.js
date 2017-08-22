// Requires
let React = require( 'react' ),
    ReactDOM = require( 'react-dom' ),
    Globals = require('../modules/global/global.js');

class SpinnerItem extends React.Component {

    constructor() {
        super();
    }

    
    // Render
    render() {
        let obj = this.props.obj;
        
        const bgImage = (obj.img) ? 'url('+obj.img+')' : 'none';
        
        return(
            <a className="spinner-item" href={ ( obj.url != null ? obj.url : '#') }>
                {obj.label != null && <span className="spinner-item-label">{obj.label}</span>}
                {obj.title != null && <h3 className="spinner-item-title" dangerouslySetInnerHTML={{__html: obj.title}}></h3>}
                <div className="spinner-item-img" style={{backgroundImage : bgImage}}></div>
            </a>
        );
    }

} module.exports = SpinnerItem;
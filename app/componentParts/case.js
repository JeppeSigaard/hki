// Requires
let React = require( 'react' ),
    ReactDOM = require( 'react-dom' ),
    Globals = require('../modules/global/global.js');

class CaseWidget extends React.Component {

    constructor() {
        super();
    }
    
    handleClick(e){}
    
    componentDidMount(){
    }

    // Render
    render() {
        let image = '';
        if(this.props.item.image && this.props.item.image.article ) image = this.props.item.image.article;
        
        return(
            <a href={this.props.item.url} className="case-widget">
                <span className="case-widget-label">Cases</span>
                <h3 className="case-widget-title" dangerouslySetInnerHTML={{__html: this.props.item.title}}></h3>
                <div className="case-widget-img" style={{backgroundImage : 'url('+image+')'}}></div>
            </a>
        );
    }

} module.exports = CaseWidget;
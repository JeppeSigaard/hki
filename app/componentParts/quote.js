// Requires
let React = require( 'react' ),
    ReactDOM = require( 'react-dom' ),
    Globals = require('../modules/global/global.js');

class QuoteBox extends React.Component {

    constructor() {
        super();
    }
    
    handleClick(e){}
    
    componentDidMount(){
    }

    // Render
    render() {
        
        let titleClass = 'quote-box-title';
        if ( this.props.item.image != null ) titleClass += ' has-img';
        
        return(
            <div className="quote-box">
                <svg className="quote-box-icon" viewBox="0 0 32 32"><use xlinkHref="#icon-quote"></use></svg>
                {this.props.item.image && <div className="quote-box-image" style={{backgroundImage : 'url('+this.props.item.image.article+')'}}></div>}
                <span className={titleClass} dangerouslySetInnerHTML={{__html: this.props.item.title}}></span>
                <blockquote className="quote-box-content" dangerouslySetInnerHTML={{__html: this.props.item.quote}}></blockquote>
                <footer className="quote-box-footer">
                    {this.props.item.name && <span className="quote-box-name">{this.props.item.name}</span>}
                    {this.props.item.position && <span className="quote-box-position">{this.props.item.position}</span>}
                </footer>
            </div>
        );
    }

} module.exports = QuoteBox;
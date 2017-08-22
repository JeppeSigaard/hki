// Requires
let React = require( 'react' ),
    ReactDOM = require( 'react-dom' ),
    Globals = require('../modules/global/global.js'),
    _ = require( '../modules/underscore/underscore_main.js' );

class ToolButton extends React.Component {

    constructor() {
        super();
        this.state = {active : false, disabled : false};
        this.hooks = {};
    }
    
    handleClick(e){
        
        if('print' === this.props.elem.action){
            e.preventDefault();
            window.print();
        }
        
        if('size' === this.props.elem.action){
            e.preventDefault();
            let textSize = window._cookielib.read('textSize');
            
            if(!textSize || 'large' != textSize){
                _('body').addClass('large-text');
                window._cookielib.set( 'textSize', 'large', 30 );
            }
            
            else{
                _('body').removeClass('large-text');
                window._cookielib.set( 'textSize', 'small', 30 );
            }
        }
    }
    
    // Render
    render() {
        let classname = 'segmenter-button tool-button';
        
        const href = ( this.props.elem.href != null ) ? this.props.elem.href : '#' ;
        
        return (
            <a target="_blank" href={href} className={classname} onClick={this.handleClick.bind(this)}>
                <svg className="segmenter-button-icon" viewBox="0 0 32 32"><use xlinkHref={this.props.elem.icon}></use></svg>
            </a>
        );
    }

} module.exports = ToolButton;
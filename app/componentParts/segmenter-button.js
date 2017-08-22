// Requires
let React = require( 'react' ),
    ReactDOM = require( 'react-dom' ),
    Globals = require('../modules/global/global.js');

class SegmenterButton extends React.Component {

    constructor() {
        super();
        this.state = {active : false, disabled : false};
        this.hooks = {};
    }

    componentDidMount(){
        
        let cookieSegment = window._cookielib.read('segment');
        if('' == cookieSegment) cookieSegment = null;
        this.handleSegmentToggle(cookieSegment);
        this.handlePageChange();
        
        this.hooks.seg = Globals.hooks.add('change-segment', this.handleSegmentToggle.bind(this));
        this.hooks.page = Globals.hooks.add('change-page', this.handlePageChange.bind(this));
    }
    
    componentWillUnmount(){
        Globals.hooks.remove('change-segment', this.hooks.seg);
        Globals.hooks.remove('change-page', this.hooks.page);
    }
    
    handlePageChange(){
        
        if(Globals.theme_settings.segments == null ) this.setState({disabled : false});
        else if (!Globals.theme_settings.segments[this.props.index]) this.setState({disabled : true});
        else this.setState({disabled : false});
    }
    
    handleSegmentToggle(index){ 
        if(null == index) return;
        if(this.props.index == index)this.setState({active : true}); 
        else this.setState({active : false}); 
    }
    
    handleClick(e){
        e.preventDefault();
        if (this.state.active || this.state.disabled) return;
        
        window._cookielib.set( 'segment', this.props.index, 30 );
        Globals.hooks.trigger('change-segment', this.props.index);
    }
    
    // Render
    render() {
        let classname = 'segmenter-button';
        
        if(this.state.active) classname += ' active';
        if(this.state.disabled) classname += ' disabled';
        
        return (
            <a href="#" className={classname} onClick={this.handleClick.bind(this)}>
                <svg className="segmenter-button-icon" viewBox="0 0 32 32"><use xlinkHref={this.props.elem.icon}></use></svg>
                <span className="segmenter-button-title">{this.props.elem.title}</span>
            </a>
        );
    }

} module.exports = SegmenterButton;
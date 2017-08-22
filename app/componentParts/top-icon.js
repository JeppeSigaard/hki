// Requires
let React = require( 'react' ),
    ReactDOM = require( 'react-dom' ),
    Globals = require('../modules/global/global.js');

class TopIcon extends React.Component {

    constructor() {
        super();
        this.state = {href : '#'};
    }
    
    handleClick(e){}
    
    componentDidMount(){
        
        if(this.props.phone){
            this.setState({href : 'tel:' + this.props.phone});
        }
        
        if(this.props.email){
            this.setState({href : 'mailto:' + this.props.email});
        }
        
    }

    // Render
    render() {
        return(
            <a href={this.state.href} className="site-header-icon" title={this.props.title}>
                <svg viewBox={this.props.viewBox}><use xlinkHref={this.props.icon}></use></svg>
            </a>
        );
    }

} module.exports = TopIcon;
// Requires
let React = require( 'react' ),
    ReactDOM = require( 'react-dom' ),
    Globals = require('../modules/global/global.js');

class Hamburger extends React.Component {

    constructor() {
        super();
        this.open = false;
        this.state = {open : false, label : null};
        this.hooks = {};
    }
    
    hamburgerLabel(title){
        this.setState({label : title});
    }
    
    toggleHamburger(data){

        if(data != null) this.open = false;
        
        else if(this.open) this.open = false;
        
        else this.open = true;
        
        Globals.hooks.trigger('hamburger-toggle', this.open);
        this.setState({open : this.open});
    }
    
    handleClick(e){
        e.preventDefault();
        this.toggleHamburger();
    }
    
    componentDidMount(){
        this.hooks.ham = Globals.hooks.add('hamburger-label', this.hamburgerLabel.bind(this));
        this.hooks.page = Globals.hooks.add('change-page', this.toggleHamburger.bind(this));
    }
    
    componentWillUnmount(){
        Globals.hooks.remove('hamburger-label', this.hooks.ham);
        Globals.hooks.remove('change-page', this.hooks.page);
    }

    // Render
    render() {
        let classname = 'hamburger';
        if(this.state.open) classname += ' open';
        if(this.state.label) classname += ' has-label';
        
        return(
            <a href="#" className={classname} onClick={this.handleClick.bind(this)}>
                {this.state.label != null && 
                <div className='hamburger-label'>
                    <span >{this.state.label}</span> 
                </div>}
                <svg viewBox="0 0 32 32"><use xlinkHref="#icon-hamburger"></use></svg>
            </a>
        );
    }

} module.exports = Hamburger;
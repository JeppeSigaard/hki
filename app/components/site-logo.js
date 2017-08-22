// Requires
let React = require( 'react' ),
    ReactDOM = require( 'react-dom' ),
    Globals = require('../modules/global/global.js');

class SiteLogo extends React.Component {

    constructor() {
        super();
        
        this.state = {site_logo : null, site_name : null, site_description : null}
    }
    
    componentDidMount(){
        
        Globals.api.get('theme_mod',{fields : ['site_url', 'site_logo', 'site_logo_negative', 'site_name', 'site_description']}).then((resp)=>{
            this.setState(resp, () => {
                Globals.hooks.trigger('load-anchors');
            });
        });
        
    }

    // Render
    render() {
        
        let cn = "site-logo";
        if(this.props.negative) cn += ' negative';
        
        let image = (this.props.negative) ? this.state.site_logo_negative : this.state.site_logo;
        
        return (
            <a className={cn} href={(this.state.site_url !=null ? this.state.site_url : '#')}>
                {this.state.site_logo !=null && this.props.image != false &&
                <img className="logo-img" src={image} />}
                {this.state.site_description != null && this.props.description != false &&
                <span className="logo-description"> {this.state.site_description}</span>}
            </a>
        );
    }

} module.exports = SiteLogo;
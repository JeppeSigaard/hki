// Requires
let React = require( 'react' ),
    ReactDOM = require( 'react-dom' ),
    Globals = require('../modules/global/global.js'),
    Sitelogo = require('../components/site-logo.js'),
    Menu = require('../components/menu.js');

class SiteFooter extends React.Component {

    constructor() {
        super();
        this.state = {addr : null, social : null}
    }
    
    componentDidMount(){
        
        // Set Adresses
        let addresses = [], socials = [];
        Globals.api.get('theme_mod',{fields : ['info_adresses','info_social']}).then( (resp) => {
            for (let i in resp.info_adresses){if(resp.info_adresses.hasOwnProperty(i)){
                let a = resp.info_adresses[i];
                
                addresses.push(<address className="footer-address" key={'address-' + i}>
                    <div className="footer-address-inner">
                        <p><strong>{a.info_name}</strong></p>
                        <p>{a.info_address}</p>
                        <p>{a.info_post + ' ' + a.info_by}</p>
                        <p>{'Tlf. ' + a.info_telefon}</p>
                        <p>{a.info_email}</p>
                        <p>{'CVR ' + a.info_cvr}</p>
                    </div>
                </address>);
            }}
            
            for (let i in resp.info_social){ if(resp.info_social.hasOwnProperty(i)){
                socials.push(<li key={'social-' + i}><a href={resp.info_social[i].url}>{resp.info_social[i].text}</a></li>);
            }}
            
            this.setState({addr : addresses, social : socials});
        } );
        
    }

    // Render
    render() {
        
        return (
            <footer className="site-footer" id="site-footer">
                <Sitelogo negative/>
                {this.state.addr != null && <div className="site-footer-addresses">
                    {this.state.addr}
                </div>}
                <div className="site-footer-menu-wrapper">
                    {this.state.social != null && <div className="site-footer-social">
                        <ul>
                            <p><strong>Sociale medier</strong></p>
                            {this.state.social}
                        </ul>
                    </div>}
                    <Menu location='footer-menu'/>
                </div>
            </footer>
        );
    }

} module.exports = SiteFooter;
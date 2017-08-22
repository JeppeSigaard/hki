// Requires
let React = require( 'react' ),
    ReactDOM = require( 'react-dom' ),
    Globals = require('../modules/global/global.js'),
    TopIcon = require('../componentParts/top-icon.js'),
    Menu = require('../components/menu.js');

class SiteHeader extends React.Component {

    constructor() {
        super();
        this.state = {top_icons : null};
    }
    
    componentDidMount(){
        Globals.api.get('theme_mod', {fields : ['info_adresses']}).then((resp) =>{
            let top_icons = [];
            if (!resp.info_adresses || !resp.info_adresses[0]) return;
            
            if(resp.info_adresses[0].info_telefon){
                top_icons.push(<TopIcon phone={resp.info_adresses[0].info_telefon} key="top-icon-phone" icon="#icon-phone" title="Ring til os" viewBox="0 0 32 32" href="#"/>);
            }
            
            if(resp.info_adresses[0].info_email){
                top_icons.push(<TopIcon email={resp.info_adresses[0].info_email} key="top-icon-email" icon="#icon-email" title="Skriv til os" viewBox="0 0 32 32" href="#"/>);
            }

            this.setState({ top_icons: top_icons});
        });
    }

    // Render
    render() {
        
        return (
            <header className="site-header" id="site-header">
                <Menu location="top-menu">
                    {this.state.top_icons !=null &&
                    <div className="site-header-icons">
                        {this.state.top_icons}
                    </div> }
                </Menu>
            </header>
        );
    }

} module.exports = SiteHeader;
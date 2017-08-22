// Requires
let React = require( 'react' ),
    ReactDOM = require( 'react-dom' ),
    Globals = require('../modules/global/global.js');

class Breadcrumbs extends React.Component {

    constructor() {
        super();
        this.state = {crumbs : null};
        this.hooks = {};
        this.prevObj = null;
    }
    
    renderCrumbs(obj){
        if (obj == this.prevObj) return;
        this.prevObj = obj;
        
        let crumbs = [];
        
        
        if('search' === Globals.theme_settings.template){
            
            crumbs.push(<a href={Globals.theme_settings.base_url} key="crumb-front" dangerouslySetInnerHTML={{__html : Globals.theme_settings.site_name}}></a>);
            
            crumbs.push(<a key="crumb-self" href="#">Søg</a>);
            
            this.setState({crumbs : crumbs});
        }
           
        else{
            Globals.api.get('posts/' + obj.post_id, {}).then( (resp) => {

                crumbs.push(<a key="crumb-self" href="#" dangerouslySetInnerHTML={{__html: resp.title}}></a>);

                for (let i in resp.ancestors){if(resp.ancestors.hasOwnProperty(i)){
                    let crumb = resp.ancestors[i];  
                    crumbs.unshift(<a key={'crumb-' + i} href={crumb.url} dangerouslySetInnerHTML={{__html: crumb.title}}></a>);
                }}

                crumbs.unshift(<a href={Globals.theme_settings.base_url} key="crumb-front" dangerouslySetInnerHTML={{__html : Globals.theme_settings.site_name}}></a>);
                this.setState({crumbs : crumbs});
            } );
            
        }
    }
    
    componentDidMount(){
        this.renderCrumbs({ post_id : Globals.theme_settings.post_id});
        this.hooks.page = Globals.hooks.add('change-page',this.renderCrumbs.bind(this));
    }
    
    componentWillUnmount(){
        Globals.hooks.remove('change-page',this.hooks.page);
    }

    // Render
    render() {
        return(
            <div className="site-breadcrumbs">{this.state.crumbs !== null && this.state.crumbs}</div>
        );
    }

} module.exports = Breadcrumbs;
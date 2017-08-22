// Requires
let React = require( 'react' ),
    ReactDOM = require( 'react-dom' ),
    Globals = require('../modules/global/global.js');

class SearchForm extends React.Component {

    constructor() {
        super();
        this.state = {value : '', mobile_show : false};
        this.hooks = {};
        this.timeout = null;
    }
    
    handleChange(e){
        this.setState({value: e.target.value}, () => { this.timedSubmit(); });
        
    }
    
    timedSubmit(){
        if (this.timeout != null) clearTimeout(this.timeout);
        this.timeout = setTimeout( () => {
           this.handleSubmit();
        }, 300);
    }
    
    handleHamburgerToggle(toggle){
        if(toggle)this.setState({mobile_show : true});
        else this.setState({mobile_show : false});
    }
    
    handleSubmit(e){
        if (e != null) e.preventDefault();
        
        const term = encodeURIComponent(this.state.value);
        
        if (term == null || term == '' || term.length < 2) { return; }
        
        Globals.theme_settings.search_term = term;
       
        
        Globals.history.push({
            title : this.state.value + ' · Søgeresultater',
            url : Globals.theme_settings.base_url + '/?s=' + term,
            post_id : '0',
            template : 'search',
        }, () => {
             Globals.hooks.trigger('search', term);
        });
        
    }
    
    componentDidMount(){
        this.hooks.hamburger = Globals.hooks.add('hamburger-toggle',  this.handleHamburgerToggle.bind(this));
        
        this.setState({value : Globals.theme_settings.s});
    }
    
    componentWillUnmount(){
        Globals.hooks.remove('hamburger-toggle',  this.hooks.hamburger);
    }
    
    // Render
    render() {
        
        let classname = 'search-form';
        if (this.state.mobile_show) classname += ' hamburger_active';
        
        return(
            <form className={classname} method="get" action="" onSubmit={this.handleSubmit.bind(this)}>
                <fieldset>
                    <label className="search-label" htmlFor="s">Søg</label>
                    <input className="search-input" name="s" id="s" type="search" placeholder="Søg" value={this.state.value} onChange={this.handleChange.bind(this)}/>
                    <input className="search-submit" type="submit" value="Indsend"/>
                    <svg className="search-icon" viewBox="0 0 32 32"><use xlinkHref="#icon-search"></use></svg>
                </fieldset>
            </form>
        );
    }

} module.exports = SearchForm;
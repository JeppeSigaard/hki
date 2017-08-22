// Requires
let React = require( 'react' ),
    ReactDOM = require( 'react-dom' ),
    Globals = require('../modules/global/global.js'),
    _ = require('../modules/underscore/underscore_main.js'),
    Text = require('../modules/tools/textPreprocessor.js'),


    // Components
    SiteHeader = require( '../components/site-header.js' ),
    SiteFooter = require( '../components/site-footer.js' ),
    Menu = require('../components/menu.js'),
    SearchForm = require('../componentParts/searchform.js'),
    Sitelogo = require('../components/site-logo.js'),
    Hamburger = require('../componentParts/hamburger.js'),
    Breadcrumbs = require('../componentParts/breadcrumbs.js'),
    Segmenter = require('../components/segmenter.js'),
    HomeSpinner = require('../components/home-spinner.js'),


    // Templates
    HomeTemplate = require('./home.js'),
    ArchiveTemplate = require('./archive.js'),
    SingleTemplate = require('./single.js'),
    SearchTemplate = require('./search.js'),
    ErrorTemplate = require('./404.js');

class HomePage extends React.Component {

    constructor() {
        super();
        this.state = {template : null, segment : null};
    }
    
    handleAnchorClick(e){
        
        let anchor = _([this]),
            url = anchor.get()[0].href,
            target = anchor.get()[0].target;
        
        // no nav links
        if(url.indexOf('#') > -1 || url.indexOf('!#') > -1){
            e.preventDefault(); 
            return false;
        }
        
        // Blanks return true
        if(target == '_blank' || target == 'blank'){
            return true;
        }
        
        // Links outside site returns true
        if(url.indexOf(Globals.theme_settings.base_url) < 0){
            return true;
        }
        
        _('body').addClass('loading');
        
        let segment = Globals.urlvar.get('segment', url);
        if (segment != null) {
            segment --;
            window._cookielib.set( 'segment', segment, 30 );
            Globals.hooks.trigger('change-segment', segment);
        }
        
        Globals.api.async(url).then((resp) =>{
            if(resp === false) return true;
            
            else{
                e.preventDefault();
                Globals.history.push({
                    title : resp.title,
                    url : url,
                    post_id : resp.ID,
                    template : resp.template,
                });
            }
        });
        
    }
    
    anchorListen(){
        if (_('a')) {
            _('a').off('click', this.handleAnchorClick);
            _('a').on('click', this.handleAnchorClick);
            
            _('.main-navigation a').off('click', this.handleAnchorClick);
        }
    }
    
    smoothscroll(){
        let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
            window.requestAnimationFrame(this.smoothscroll.bind(this));
            window.scrollTo (0,currentScroll - (currentScroll/5));
        }
    }
    
    handleScroll(scroll){
        if (Globals.theme_settings.template == 'home') return;
        
        const nav = document.getElementById('main-navigation'),
              footer = document.getElementById('site-footer'),
              header = document.getElementById('site-header'),
              nh = nav.offsetHeight,
              hh = header.offsetHeight,
              ft = footer.offsetTop;
        
        if(scroll >= hh){
            nav.classList.add('fixed');
        }
        
        else{
            nav.classList.remove('fixed');
        }
        
        if(window.innerWidth < 880) return;
        
        // Above footer
        if (nh + scroll < ft) {
            nav.classList.remove('absolute');
        }
        
        // Below footer
        else{
            nav.classList.add('absolute');
        }
    }
    
    componentDidMount(){
       
        // Add text to globals
        Globals.text = new Text();
        
        // segment i url
        let URLsegment = Globals.urlvar.get('URLsegment');
        if (URLsegment != null) {
            URLsegment --;
            window._cookielib.set( 'segment', URLsegment, 30 );
            Globals.hooks.trigger('change-segment', URLsegment);
        }
        
        // Replace initial state
        Globals.history.replace({
            title : document.title,
            url : window.location.href,
            post_id : Globals.theme_settings.post_id,
            template : Globals.theme_settings.template,
            post_type : Globals.theme_settings.post_type,
        });
        
        
        // Set template and segment
        let segment = window._cookielib.read('segment');
        if('' == segment){segment = null;}
        this.setState({template : Globals.theme_settings.template, segment : segment});
        
        // Change template on page change
        Globals.hooks.add('change-page', (obj) => {
            
            this.setState({template : obj.template});
            this.smoothscroll();
            
            if(_('.site-main')) _('.site-main').get()[0].focus();
        });
        
        // Manual template changer
        Globals.hooks.add('change-template', (template) => {
            this.setState({template : template});
        });
        
        // Segment change
        Globals.hooks.add('change-segment', (index) => {
            this.setState({segment : index});
        });
        
        // Page scroll
        Globals.hooks.add('scroll', this.handleScroll.bind(this));
        
        // Add anchor listener
        this.anchorListen();
        Globals.hooks.add('load-anchors', this.anchorListen.bind(this));
    }
    
    componentDidUpdate(){
        this.anchorListen();
    }

    // Render
    render() {
        const className = 'page-layout template-' + this.state.template;
        
        if(this.state.template == null) return null;
        
        return (
            <div className={className}>
               
                <SiteHeader/>
                {this.state.template != 'home' && 
                <div className="site-subheader">
                    <div className="site-subheader-bar">
                        <Segmenter tools/>
                    </div>
                    <Breadcrumbs/>
                </div>}
                
                <div className="site-content">
                   
                    {/* big segmenter */}
                    {this.state.segment == null &&
                    <div className="big-segmenter">
                        <Sitelogo description={false}/>
                        <Segmenter description/>
                        <Sitelogo image={false}/>
                    </div>}
                    
                    {/* Main navigation */}
                    <div className="main-navigation" id="main-navigation">
                        <Sitelogo/>
                        <Hamburger/>
                        <Menu location="main-menu"/>
                        <SearchForm/>
                    </div>
                    
                    {this.state.template == 'home' && <HomeSpinner/>}
                    
                    {/* home page content */}
                    {this.state.template == 'home' && <HomeTemplate/>}
                    
                    {/* Archive content */}
                    {this.state.template == 'archive' && <ArchiveTemplate/>}
                    
                    {/* Single template */}
                    { ( this.state.template == 'single' || this.state.template  == 'page' ) && <SingleTemplate/>}
                    
                    {/* Search template */}
                    {this.state.template == 'search' && <SearchTemplate/>}
                    
                    {/* 404 template */}
                    {this.state.template == '404' && <ErrorTemplate/>}
                    
                </div>
                <SiteFooter />
            </div>
        );
    }

} module.exports = HomePage;

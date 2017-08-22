// Requires
let React = require( 'react' ),
    ReactDOM = require( 'react-dom' ),
    Globals = require('../modules/global/global.js'),
    
    
    //Components
    Article = require('../components/article.js'),
    Flickity = require('../componentParts/flickity.js'),
    
    // Sections
    PageSpinner = require('../home-section/page-spinner.js'),
    StatSpinner = require('../home-section/stat-spinner.js'),
    VideoSpinner = require('../home-section/video-spinner.js'),
    HomeArticle = require('../home-section/home-article.js'),
    NewsSection = require('../home-section/news-section.js'),
    FormSection = require('../home-section/form-section.js'),
    ContactList = require('../home-section/contact-list.js'),
    QuoteSection = require('../home-section/quote.js');

class HomeTemplate extends React.Component{
    
    constructor() {
        super();
        this.loadSections = false;
        this.hooks = {};
        this.state = {sections : null}
    }
    
    renderSections(segment){
        
        if (segment == null) return;
        if(!this.loadSections) return;
        
        Globals.api.get('options',{fields : 'segment_settings'}).then((resp) => {
            
            let home_slug = 'home_section_' + (parseInt(segment) + 1),
                sections = [];
            
            const segment_array = resp.segment_settings[home_slug];
            for (let i in segment_array){if (segment_array.hasOwnProperty(i)){
                let segment = segment_array[i];
                if(segment.type == 'page-spinner') sections.push(<PageSpinner key={'home-section-'+i} settings={segment} />);  
                if(segment.type == 'video-spinner') sections.push(<VideoSpinner key={'home-section-'+i} settings={segment} />);  
                if(segment.type == 'stat-spinner') sections.push(<StatSpinner key={'home-section-'+i} settings={segment} />);  
                if(segment.type == 'home-article') sections.push(<HomeArticle key={'home-section-'+i} settings={segment} />);  
                if(segment.type == 'news-list') sections.push(<NewsSection key={'home-section-'+i} settings={segment} />);  
                if(segment.type == 'quote') sections.push(<QuoteSection key={'home-section-'+i} settings={segment} />);  
                if(segment.type == 'form') sections.push(<FormSection key={'home-section-'+i} settings={segment} />);  
                if(segment.type == 'contact-list') sections.push(<ContactList key={'home-section-'+i} settings={segment} />);  
                
                if(this.loadSections) this.setState({sections : sections});
            }}
        });
    }
    
    componentDidMount(){
        this.loadSections = true;
        let segment = window._cookielib.read('segment');
        if (segment != null & segment != '') this.renderSections(segment);
        
        this.hooks.load = Globals.hooks.add('change-segment', this.renderSections.bind(this));
    }
    
    componentWillUnmount(){
        this.loadSections = false;
        Globals.hooks.remove('change-segment',this.hooks.load);
    }
    
    render(){
        return(
            <div className="home-content">
                {this.state.sections != null && this.state.sections}
            </div>
        );
    }
    
} module.exports = HomeTemplate;
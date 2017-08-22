// Requires
let React = require( 'react' ),
    ReactDOM = require( 'react-dom' ),
    Globals = require('../modules/global/global.js'),
    Pie = require('../componentParts/piechart.js');

class Article extends React.Component {

    constructor() {
        super();
        
        this.post = null;
        this.canLoad = false;
        this.state = {content : null, title : null, post_id : null, loading: false};
        this.hooks = {};
    }
    
    handleSegmentToggle(index){
        this.setSegmentContent(this.post.content,index);
    }
    
    setSegmentContent(content, segment){
        
        if(content instanceof Array){
            
            if(null == segment) segment = window._cookielib.read('segment');
            if(null == segment) segment = 0;

            this.setState({content : content[segment]});
        }

        else if(content != null){
            this.setState({content : content});
        }
    }
    
    loadPage(){
        
        let id = Globals.theme_settings.post_id;
        if (id == this.state.post_id) return;
        
        this.setState({loading: true});
        
        Globals.api.get('posts/' + id, {}).then((resp)=>{
            
            if (!this.canLoad) return;
            
            let thumbnail = (resp.image != null && resp.image.article != null) ? resp.image.article : null;
            
            this.setState({title : resp.title, post_id : resp.ID, thumbnail : thumbnail, type : resp.type, post : resp});
            
            this.setSegmentContent(resp.content);
            
            this.post = resp;
            
            setTimeout(function(){

                this.setState({loading: false}, () => {
                    Globals.hooks.trigger('load-anchors');
                });
            
            }.bind(this),50);
        });
    }
    
    componentDidMount(){
        this.canLoad = true;
        this.loadPage();
        
        this.hooks.seg = Globals.hooks.add('change-segment', this.handleSegmentToggle.bind(this));
        this.hooks.page = Globals.hooks.add('change-page', this.loadPage.bind(this));
    }
    
    componentWillUnmount(){
        this.canLoad = false;
        Globals.hooks.remove('change-segment', this.hooks.seg);
        Globals.hooks.remove('change-page', this.hooks.page);
    }
    
    
    // Render
    render() {
        let classname = 'post-article type-' + this.state.type;
        if (this.state.loading) classname += ' loading';
        
        
        return (
            <article className={classname}>
                {this.props.header && 
                <header className="article-header">
                    {this.state.thumbnail && this.props.img &&
                    <div className="header-image-wrapper">
                        <img className="header-image" src={this.state.thumbnail}/>
                    </div>}
                    {this.state.type == 'post' && <span className="post-date">{this.state.post.date}</span>}
                    <h1 className="post-title" dangerouslySetInnerHTML={{__html: this.state.title}}></h1>
                </header>}
                {this.state.type == 'stat' && <div className="single-chart">
                    <Pie obj={this.state.post.chart }/>
                </div>}
                {this.state.content != null && this.state.content != '' && 
                <div className="article-content wp-styles" dangerouslySetInnerHTML={{__html: this.state.content}}></div>}
                <footer className="article-footer"></footer>
            </article>
        );
    }

} module.exports = Article;
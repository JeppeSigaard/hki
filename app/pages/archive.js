// Requires
let React = require( 'react' ),
    ReactDOM = require( 'react-dom' ),
     Article = require('../components/article.js'),
    WidgetArea = require( '../components/widget-area.js' ),
    PostList = require( '../components/post-list.js' ),
    Globals = require('../modules/global/global.js');

class ArchiveTemplate extends React.Component{
    
    constructor() {
        super();
        this.state = {query : null}
        this.hooks = {};
    }
    
    setQuery(){
        
        this.setState({query :{
            type : Globals.theme_settings.post_type
        }});
    }
    
    componentDidMount(){
        this.setQuery();
        this.hooks.page = Globals.hooks.add('change-page',this.setQuery.bind(this));
    }
    
    componentWillUnmount(){
        Globals.hooks.remove('change-page',this.hooks.page);
    }
    
    render(){
        return(
            <div className="archive-content">
                <main className="site-main">
                    <Article header img />
                    {this.state.query != null && <PostList query={this.state.query}/>}
                    <WidgetArea location='bottom'/>
                </main>
                <aside className="site-aside">
                     <WidgetArea location='right'/>
                </aside>
            </div>
        );
    }
    
} module.exports = ArchiveTemplate;
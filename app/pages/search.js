// Requires
let React = require( 'react' ),
    ReactDOM = require( 'react-dom' ),
    Postlist = require( '../components/post-list.js' ),
    Globals = require('../modules/global/global.js');

class SearchTemplate extends React.Component{
    
    constructor() {
        super();
        this.state = {query : null};
        this.hooks = {};
    }
    
    handleSearch(term){
        if (term == null || term == '' || term.length < 2) { this.setState({query : null}); return; }
        this.setState({query : {
            s : term,
            type : 'any',
            per_page : '-1',
        }});
    }
    
    componentDidMount(){
        this.handleSearch(Globals.theme_settings.s);
        this.hooks.search = Globals.hooks.add('search', this.handleSearch.bind(this));
    }
    
    componentWillUnmount(){
        Globals.hooks.remove('search', this.hooks.search);
    }
    
    render(){
        return(
            <div className="search-content">
                <main className="site-main">
                    <Postlist query={this.state.query}/>
                </main>
                <aside className="site-aside"></aside>
            </div>
        );
    }
    
} module.exports = SearchTemplate;
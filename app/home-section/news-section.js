// Requires
let React = require( 'react' ),
    ReactDOM = require( 'react-dom' ),
    Globals = require('../modules/global/global.js'),
    PostList = require('../components/post-list.js');

class NewsSection extends React.Component {

    constructor() {
        super();
        this.query = {
            type : 'post',
            per_page : 3,
            order_by : 'date',
            order : 'desc',
        }
    }
    
    componentDidMount(){

    }

    // Render
    render() {
        
        let classname = 'home-section home-section-news';
        if (this.props.settings.size == 'full') classname += ' size-full';
        
        return(
            <section className={classname}>
                <PostList query={this.query} label="Nyheder" more_link={Globals.theme_settings.blog_url} more="Alle nyheder"/>
            </section>
        );
    }

} module.exports = NewsSection;
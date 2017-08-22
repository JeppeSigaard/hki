// Requires
let React = require( 'react' ),
    ReactDOM = require( 'react-dom' ),
    Globals = require('../modules/global/global.js'),
    Article = require('../components/article.js');

class HomeArticle extends React.Component {

    constructor() {
        super();
    }
    
    componentDidMount(){

    }

    // Render
    render() {
        let classname = 'home-section home-article';
        if (this.props.settings.size == 'full') classname += ' size-full';
        
        return(
            <section className={classname}>
                <Article post_id={Globals.theme_settings.post_id} header />
            </section>
        );
    }

} module.exports = HomeArticle;
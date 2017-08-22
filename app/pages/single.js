// Requires
let React = require( 'react' ),
    ReactDOM = require( 'react-dom' ),
    Globals = require('../modules/global/global.js'),

    // Components
    Article = require('../components/article.js'),
    WidgetArea = require('../components/widget-area.js');

class SingleTemplate extends React.Component{
    
    constructor() {
        super();
    }
    
    componentDidMount(){
        
    }
    
    render(){
        
        return(
            <div className="single-content">
                <main className="site-main">
                    <Article header img />
                    <WidgetArea location='bottom'/>
                </main>
                <aside className="site-aside">
                    <WidgetArea location='right'/>
                </aside>
            </div>
        );
    }
    
} module.exports = SingleTemplate;
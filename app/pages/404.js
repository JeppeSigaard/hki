// Requires
let React = require( 'react' ),
    ReactDOM = require( 'react-dom' ),
    Globals = require('../modules/global/global.js');

class ErrorTemplate extends React.Component{
    
    constructor() {
        super();
    }
    
    componentDidMount(){
        
        
    }
    
    render(){
        return(
            <div className="error-content">
                <main className="site-main">
                Error 404
                </main>
                <aside className="site-aside"></aside>
            </div>
        );
    }
    
} module.exports = ErrorTemplate;
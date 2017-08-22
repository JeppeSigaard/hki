// Requires
let React = require( 'react' ),
    ReactDOM = require( 'react-dom' ),
    Quote = require('../componentParts/quote.js'),
    Globals = require('../modules/global/global.js');

class QuoteSection extends React.Component {

    constructor() {
        super();
        this.state = {quote : null};
    }
    
    setQuote(item){
        return(<Quote item={item}/>);
    }
    
    componentDidMount(){
        Globals.api.get('posts/' + this.props.settings.quote, {}).then( (resp) => {
            this.setState({quote : this.setQuote(resp)});
        } );
    }

    // Render
    render() {
        return(
            <section className="home-section home-section-quote">
                {this.state.quote != null && <div className="quote-container"> {this.state.quote}</div>}
            </section>
        );
    }

} module.exports = QuoteSection;
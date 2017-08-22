// Requires
let React = require( 'react' ),
    ReactDOM = require( 'react-dom' ),
    Form = require( '../form/form.js' ),
    Globals = require('../modules/global/global.js');

class FormSection extends React.Component {

    constructor() {
        super();
        this.state = {form : null}
    }
    
    componentDidMount(){
        this.setState({form : this.props.settings.form});
    }

    // Render
    render() {
        return(
            <section className="home-section home-section-form">
                <div className="home-section-form-inner">
                    {this.props.settings.heading != null && <h3 dangerouslySetInnerHTML={{__html:   Globals.text.strong(this.props.settings.heading)}}></h3>}
                {this.state.form != null && <Form id={this.state.form}/>}
                </div>
            </section>
        );
    }

} module.exports = FormSection;
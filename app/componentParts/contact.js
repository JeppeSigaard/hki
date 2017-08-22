// Requires
let React = require( 'react' ),
    ReactDOM = require( 'react-dom' ),
    Globals = require('../modules/global/global.js');

class Contact extends React.Component {

    constructor() {
        super();
        this.load = false;
    }

    componentDidMount(){
        this.load = true;
    }
    
    componentWillUnmount(){
        this.load = false;
    }
    
    // Render
    render() {
        if (this.props.item == null) return null;
        let item = this.props.item;
        
        return(
            <div className="contact-card">
                <span className="contact-label">Kontakt</span>
                {item.image && item.image.contact && <div className="contact-img" style={{backgroundImage : 'url('+item.image.contact+')'}}></div>}
                {item.name && <span className="contact-name">{item.name}</span>}
                {item.position && <span className="contact-position">{item.position}</span>}
                {item.email && <a href={'mailto:' + item.email} className="contact-email">
                    <svg viewBox="0 0 32 32"><use xlinkHref="#icon-email"></use></svg>
                    <span>{item.email}</span>
                </a>}
                {item.phone && <a href={'tel:' + item.phone} className="contact-phone">
                    <svg viewBox="0 0 32 32"><use xlinkHref="#icon-phone"></use></svg>
                    <span>{item.phone}</span>
                </a>}
            </div>
        );
    }

} module.exports = Contact;
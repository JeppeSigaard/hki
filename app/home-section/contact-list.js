// Requires
let React = require( 'react' ),
    ReactDOM = require( 'react-dom' ),
    Globals = require('../modules/global/global.js'),
    Contact = require('../componentParts/contact.js');

class ContactList extends React.Component {

    constructor() {
        super();
        this.state = {items : null};
    }
    
    componentDidMount(){
        
        Globals.api.get('posts/',{type : 'contact', include : this.props.settings.contact}).then( (resp) => {
            let items = [];
            
            if(resp.length > 1){
                for (let i in resp){if (resp.hasOwnProperty(i)){
                    items.push(<li key={'contact-' + i}><Contact item={resp[i]}/></li>);
                }}
            }
            
            else{
                for (let i in resp){if (resp.hasOwnProperty(i)){
                    items.push(<Contact key={'contact-' + i} item={resp[i]}/>);
                }}
            }
            
            this.setState({items : items});
            
        });
    }

    // Render
    render() {
        let classname = 'home-section home-section-contact';
        if(this.props.size == 'full') classname += 'size-full';
        
        return(
            <section className={classname}>
                <div className="contact-list type-contact">
                    {this.state.items != null && this.state.items.length < 2 && this.state.items}
                    
                    {this.state.items != null && this.state.items.length > 1 && 
                    <ul className="post-list">{this.state.items}</ul>} 
                </div>
            </section>
        );
    }

} module.exports = ContactList;
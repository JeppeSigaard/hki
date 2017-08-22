// Requires
let React = require( 'react' ),
    ReactDOM = require( 'react-dom' ),
    Globals = require('../modules/global/global.js');

class ListItem extends React.Component {

    constructor() {
        super();
    }
    
    handleClick(e){}
    
    componentDidMount(){}

    // Render
    render() {
        
        const item = this.props.item;
        
        const img = (item.image != null ) ? 'url('+item.image.medium +')' : 'none';
        
        return(
            <li className="post-list-item">
                <a href={item.url}>
                    {item.image != null && <span className="post-list-img" style={{backgroundImage : img}}></span>}
                    <span className="post-list-date">{item.date}</span>
                    <span className="post-list-title" dangerouslySetInnerHTML={{__html: item.title}}></span> 
                </a>
            </li>
        );
    }

} module.exports = ListItem;
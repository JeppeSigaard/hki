// Requires
let React = require( 'react' ),
    ReactDOM = require( 'react-dom' ),
    Globals = require('../modules/global/global.js'),
    Flickity = require('../componentParts/flickity.js');

class PageSpinner extends React.Component {

    constructor() {
        super();
        this.state = { spinnerItems : null};
        this.mount = false;
        this.spinnerOptions = {
            wrapAround : false,
            contain: true,
            pageDots : false,
            arrowShape : 'M39.331 85.669l-31.25-31.25c-2.441-2.441-2.441-6.398 0-8.839l31.25-31.25c2.441-2.441 6.398-2.441 8.839 0s2.441 6.398 0 8.839l-20.581 20.581h59.911c3.452 0 6.25 2.798 6.25 6.25s-2.798 6.25-6.25 6.25h-59.911l20.581 20.581c1.22 1.22 1.83 2.82 1.83 4.419s-0.61 3.199-1.83 4.419c-2.441 2.441-6.398 2.441-8.839 0z'
            
        }
    }
    
    componentDidMount(){
        this.mount = true;
        Globals.api.get('posts',{type : 'page', parent : this.props.settings.parent, per_page : '-1'}).then((resp) => {
            let spinnerItems = [];
            for( let i in resp){if (resp.hasOwnProperty(i)){
                const item = resp[i],
                      segment = window._cookielib.read('segment');
                
                if (item.content[segment] == null) continue;
                
                const imageStyle = {
                    backgroundImage : item.image != null ? 'url('+ item.image.article +')' : '',
                };
                
                spinnerItems.push(<a href={item.url} key={'pgsp-' + i} className="page-spinner-item">
                    <div className="page-spinner-item-image" style={imageStyle}></div>
                    <div className="page-spinner-item-text" dangerouslySetInnerHTML={{__html: item.title}}></div>
                </a>);  
                
            }}
            
            if (this.mount) this.setState({spinnerItems : spinnerItems}, () => {
                Globals.hooks.trigger('load-anchors');
            });
            
        });
    }

    componentWillUnmount(){
        this.mount = false;
    }
    
    // Render
    render() {
        let classname = 'home-section home-section-page-spinner';
        if (this.props.settings.size == 'full') classname += ' size-full';
        let heading = '';
        if (this.props.settings.heading != null) heading = Globals.text.strong(this.props.settings.heading);
        
        return(
            <section className={classname}>
                {this.props.settings.heading != null && <h3 className="section-heading" dangerouslySetInnerHTML={{__html: heading}}></h3>}
                {this.state.spinnerItems != null &&
                <Flickity options={this.spinnerOptions} name="page-spinner">
                    {this.state.spinnerItems}
                </Flickity>
                }
            </section>
        );
    }

} module.exports = PageSpinner;
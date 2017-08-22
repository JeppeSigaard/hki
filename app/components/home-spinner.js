// Requires
let React = require( 'react' ),
    ReactDOM = require( 'react-dom' ),
    Globals = require('../modules/global/global.js'),
    
    Segmenter = require( '../components/segmenter.js' ),
    Flickity = require( '../componentParts/flickity.js' ),
    SpinnerItem = require( '../componentParts/spinner-item.js' );

class HomeSpinner extends React.Component {

    constructor() {
        super();
        this.canLoad = false;
        this.state = {spinnerItems : null}
        this.options = {
            wrapAround : true,
            cellSelector : '.spinner-item',
            arrowShape : 'M39.331 85.669l-31.25-31.25c-2.441-2.441-2.441-6.398 0-8.839l31.25-31.25c2.441-2.441 6.398-2.441 8.839 0s2.441 6.398 0 8.839l-20.581 20.581h59.911c3.452 0 6.25 2.798 6.25 6.25s-2.798 6.25-6.25 6.25h-59.911l20.581 20.581c1.22 1.22 1.83 2.82 1.83 4.419s-0.61 3.199-1.83 4.419c-2.441 2.441-6.398 2.441-8.839 0z',
        }
    }
    
    
    componentDidMount(){
        this.canLoad = true;
        Globals.api.get('slides',{}).then((resp)=>{
            if (!this.canLoad) return;
            
            let items = [];
            for(let i in resp){if(resp.hasOwnProperty(i)){
                let item = resp[i];
                
                items.push(<SpinnerItem key={'home-spinner-'+i} obj={item} />);
            }}
            
            if(this.canLoad) this.setState({spinnerItems : items, load : true}, () => {
                Globals.hooks.trigger('load-anchors');
            });
        });
    }
    
    componentWillUnmount(){
        this.canLoad = false;
        
    }

    // Render
    render() {
        return(
            <div className="home-spinner">
                <Segmenter tools/>
                {this.state.spinnerItems != null && 
                <Flickity options={this.options} name="home-spinner-inner">
                   {this.state.spinnerItems}
                </Flickity>}
            </div>
        );
    }

} module.exports = HomeSpinner;
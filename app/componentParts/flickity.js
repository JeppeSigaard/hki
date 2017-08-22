let React = require( 'react' ),
    Flickity = require('flickity');

class FlickityComponent extends React.Component{

    constructor () {
        super();
    }

    updateSelected () {
        const index = this.flkty.selectedIndex;
        this.setState({selectedIndex: index });

        if(typeof this.props.select === 'function') this.props.select(this);
    }

    componentWillUnmount(){
        if (this.flkty) {
            this.flkty.off('cellSelect', this.updateSelected)
            this.flkty.destroy()
        }
    }

    componentDidMount () {
        if(this.props.name == null) return;
        if(this.props.children == null) return;

        this.flkty = new Flickity('#' + this.props.name, this.props.options);
        this.flkty.on('cellSelect', this.updateSelected.bind(this));
    }

    render(){
        if (this.props.name != null) return(
            <div className={this.props.name} id={this.props.name}>
                {this.props.children}
            </div>
        );

        return null;
    }

} module.exports = FlickityComponent;

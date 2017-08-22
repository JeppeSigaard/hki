// Requires
let React = require( 'react' ),
    ReactDOM = require( 'react-dom' ),
    Globals = require('../modules/global/global.js'),
    Widget = require('../componentParts/widget.js');

class WidgetArea extends React.Component {

    constructor() {
        super();
        this.state = {widgets : null, loading : false};
        this.hooks = {};
        this.load = false;
        this.loadedFrom = null;
    }
    
    loadWidgets(){
        if(!this.load) return;
        if(this.loadedFrom == Globals.theme_settings.post_id) return;
        
        this.setState({loading : true});
        
        Globals.api.get('widgets/' + Globals.theme_settings.post_id, {}).then( (resp) => {
            if(!this.load) return;
            
            let jsx_widgets = [];
            for (let i in resp[this.props.location]){if (resp[this.props.location].hasOwnProperty(i)){
                let widget = resp[this.props.location][i];
                jsx_widgets.push(<Widget widget={widget} key={'widget-'+i}/>);
            }}   
            
            if(!this.load) return;
            this.loadedFrom = Globals.theme_settings.post_id;
            this.setState({widgets : jsx_widgets, loading : false});
        }); 
    }
    
    componentDidMount(){
        this.load = true;
        this.loadWidgets();
        
        this.hooks.page = Globals.hooks.add('change-page', this.loadWidgets.bind(this));
    }
    
    componentWillUnmount(){
        this.load = false;
        Globals.hooks.remove('change-page', this.hooks.page);
    }

    // Render
    render() {
        
        let classname = 'widget-area location-' + this.props.location;
        if(this.state.loading) classname += ' loading';
        
        return (
            <div className={classname}>{this.state.widgets != null && this.state.widgets}</div>
        );
    }

} module.exports = WidgetArea;
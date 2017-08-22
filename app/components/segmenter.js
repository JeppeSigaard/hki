// Requires
let React = require( 'react' ),
    ReactDOM = require( 'react-dom' ),
    Globals = require('../modules/global/global.js'),
    SegmenterButton = require('../componentParts/segmenter-button.js'),
    ToolButton = require('../componentParts/tool-button.js'),
    _ = require( '../modules/underscore/underscore_main.js' );

class Segmenter extends React.Component {

    constructor() {
        super();
        this.state = {segments : [], description : null};
    }
    
    renderSegments(){
        Globals.api.get('options', {fields : ['segment_settings']}).then((resp)=>{
            if(resp.segment_settings != null && resp.segment_settings.segment != null){
                let $i = 0, segments = [];
                for ( let segment of resp.segment_settings.segment){
                    
                    segments.push(<SegmenterButton index={$i} key={"segmenter-button-" + $i} elem={segment}/>);   
                    $i++;
                }
                
                let description = Globals.text.nl2pd(Globals.text.strong(resp.segment_settings.segment_text));
                this.setState({segments : segments, description : description});
            }
        });
    }
    
    printWindow(){
        window.print();
    }
    
    renderTools(){
        
        let tools = [];
        
        tools.push(<ToolButton key="tool-button-print" elem={{ icon : '#icon-print', action : 'print'}}/>);
        tools.push(<ToolButton key="tool-button-read" elem={{ icon : '#icon-volume', href : "http://www.adgangforalle.dk/"}}/>);
        tools.push(<ToolButton key="tool-button-letters" elem={{ icon : '#icon-letters', action : 'size'}}/>);
        
        
        this.setState({tools : tools});
    }
    
    componentDidMount(){
        this.renderSegments();
        if (this.props.tools) this.renderTools();
        
        let textSize = window._cookielib.read('textSize');    
        if('large' == textSize) _('body').addClass('large-text');
    }

    // Render
    render() {
        
        return (
            <div className="segmenter">
                {this.props.description != null && this.state.description != null &&
                <span className="segmenter-description" dangerouslySetInnerHTML={{__html: this.state.description}}></span>}
                {this.state.segments != null && this.state.segments} 
                {this.state.tools != null && <div className="segmenter-tools">{this.state.tools}</div>} 
            </div>
        );
    }

} module.exports = Segmenter;
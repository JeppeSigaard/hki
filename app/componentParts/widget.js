// Requires
let React = require( 'react' ),
    ReactDOM = require( 'react-dom' ),
    Globals = require('../modules/global/global.js'),
    Contact = require('../componentParts/contact.js'),
    CaseWidget = require('../componentParts/case.js'),
    PostList = require('../components/post-list.js'),
    QuoteBox = require('../componentParts/quote.js'),
    ListItem = require('../componentParts/list-item.js'),
    Flickity = require('../componentParts/flickity.js'),
    PieChart = require('../componentParts/piechart.js'),
    Form = require('../form/form.js'),
    SpinnerItem = require('../componentParts/spinner-item.js');

class Widget extends React.Component {

    constructor() {
        super();
        this.state = {content : null}
    }
    
    loadContent(props){
        /* post-list */
        if ('post-list' == props.widget.type){
            let items = [];
            for (let i in props.widget.content){if(props.widget.content.hasOwnProperty(i)){
                let item = props.widget.content[i];
                items.push(<ListItem key={'case-widget-' + i} item={item}/>);
            }}

            this.setState({content : items});
        }
        
        /* Case spinner */
        else if ('case' == props.widget.type){
            let items = [];
            for (let i in props.widget.content){if(props.widget.content.hasOwnProperty(i)){
                let item = props.widget.content[i];
                items.push(<CaseWidget key={'case-widget-' + i} item={item}/>);
            }}

            this.setState({content : items});
        }
        
        /* Default */
        else this.setState({content : props.widget.content});
    }
    
    componentWillReceiveProps(props){
        this.loadContent(props);
    }
    
    componentDidMount(){
        this.loadContent(this.props);
    }

    // Render
    render() {
        let classname = 'widget type-' + this.props.widget.type;
        
        return (
            <div className={classname}>
                
                {/* free text */}
                {this.state.content != null && this.props.widget.type == 'text' && <div className="text-widget" dangerouslySetInnerHTML={{__html: this.state.content}}></div>}
                
                {/* Stat */}
                {this.state.content != null && this.props.widget.type == 'stat' && <PieChart header footer obj={this.state.content.chart }/>}
                
                {/* Single contact */}
                {this.state.content != null && this.props.widget.type == 'contact' && <Contact item={this.state.content}/>}
                
                {/* Quote */}
                {this.state.content != null && this.props.widget.type == 'quote' && <QuoteBox item={this.props.widget.content} />}
                
                {/* Case spinner */}
                {this.state.content != null && this.props.widget.type == 'case' && this.state.content.length > 1 &&
                <Flickity name="case-spinner-widget" options={{ prevNextButtons : false, }} children={this.state.content} />
                }
                
                {/* form */}
                {this.props.widget.type == 'form' &&
                <Form id={this.props.widget.form}/>}
                
                {/* Single case */}
                {this.state.content != null && this.props.widget.type == 'case' && this.state.content.length == 1 && this.state.content }
                
                {/* Nyheder */}
                {this.state.content != null && this.props.widget.type == 'post-list' &&
                <PostList label="Nyheder">
                    {this.state.content}
                </PostList>
                }
            
            </div>
        );
    }

} module.exports = Widget;
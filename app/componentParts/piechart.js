// Requires
let React = require( 'react' ),
    ReactDOM = require( 'react-dom' ),
    Globals = require('../modules/global/global.js');

class Piechart extends React.Component {

    constructor() {
        super();
        this.state = {rdy : false, jsxSlices : null, title : null};
    }
    
    renderIndex(obj){
        
        let index = [];
        for (let i in obj.data){if (obj.data.hasOwnProperty(i)){
            const unit = (obj.data[i].unit != null) ? ' ' + obj.data[i].unit : '';
            
            index.push(<li key={'pie-index-'+i} className="pie-chart-index">
                <strong>{obj.data[i].value + unit}</strong>
                <span>{obj.data[i].label}</span>
            </li>);
            
        }}
        
        this.setState({jsxIndex : index});
    }
    
    renderPinSlices(obj){
        let slices = [],
            largest = 0;
        
        for (let i in obj.data){if (obj.data.hasOwnProperty(i)){
            if (parseInt(obj.data[i].value) > largest) largest = parseInt(obj.data[i].value);
        }}
        
        for (let i in obj.data){if (obj.data.hasOwnProperty(i)){
        
            const widthStyle = {width : ( Math.floor( parseInt(obj.data[i].value) / largest * 100 ) ) + '%'};
            const unit = (obj.data[i].unit != null) ? ' ' + obj.data[i].unit : '';
            
            slices.push(
            <div key={'slice-' + i} className="pin" >
                <span>{obj.data[i].label}</span>
                <strong style={widthStyle}>{obj.data[i].value + unit}</strong>
            </div>);
        }}
        
        this.setState({jsxSlices : slices, type : obj.type});
        
        setTimeout(function(){
            this.setState({rdy : true});
        }.bind(this), 50);
    }
    
    renderPieSlices(obj){
       
        if(!obj) return;
        
        let slices = [],
            i = 0,
            from = 0,
            total = 0;
        
        for (let i in obj.data){if (obj.data.hasOwnProperty(i)){
            total += parseInt(obj.data[i].value);
        }}
        
        
        
        if(!total > 0) return;
        
        for (let slice in obj.data){
            if (obj.data.hasOwnProperty(slice)){
                i++;
                
                const size = Math.floor(obj.data[slice].value / total * 3600) / 10,
                      fromStyle = {
                        'MozTransform': 'rotate('+ from +'deg)',
                        'msTransform': 'rotate('+ from +'deg)',
                        'WebkitTransform': 'rotate('+ from +'deg)',
                        'OTransform': 'rotate('+ from +'deg)',
                        'transform':'rotate('+ from +'deg)',
                    },
                      toStyle = {
                        'MozTransform': 'rotate('+ size +'deg)',
                        'msTransform': 'rotate('+ size +'deg)',
                        'WebkitTransform': 'rotate('+ size +'deg)',
                        'OTransform': 'rotate('+ size +'deg)',
                        'transform':'rotate('+ size +'deg)',
                    };
                
                let classname = 'slice';
                if(size > 180) classname += ' gt-50';
        
                slices.push(
                <div key={'slice-' + i} className={classname} style={fromStyle}>
                    <div className="cover-1" style={toStyle}></div>
                    <div className="cover-2"></div>
                </div>);
                
                from += size;
            }
        }
        
        this.setState({jsxSlices : slices, type : obj.type});
        
        setTimeout(function(){
            this.setState({rdy : true});
        }.bind(this), 50); 
        
    }
    
    componentWillReceiveProps(props){
        this.setState({rdy: false, title : props.obj.title, url : props.obj.url});
        
        setTimeout( () => {
            if(props.obj.type == 'pin') this.renderPinSlices(props.obj);
            else {
                this.renderIndex(props.obj);
                this.renderPieSlices(props.obj);
            }
        }, 400)
    }
    
    componentDidMount(){
        this.setState({title : this.props.obj.title, url : this.props.obj.url});
        
        if(this.props.obj.type == 'pin') this.renderPinSlices(this.props.obj);
        else {
            this.renderIndex(this.props.obj);
            this.renderPieSlices(this.props.obj);
        }
    }

    // Render
    render() {
        
        if (this.state.jsxSlices == null) return null;
        
        let classname = 'pie-chart';
        if(this.state.type == 'pin') classname = 'pin-chart';
        if(this.state.rdy) classname += ' ready';
        else classname += ' unready';
        
        return(
            <div className="pie-chart-wrapper">
                {this.props.header &&
                <header className="pie-chart-header">
                    <h3 dangerouslySetInnerHTML={{__html: Globals.text.strong(this.state.title)}}></h3>
                </header>}
                
                {this.state.type == 'pin' && <div className="pin-chart-container">
                    <div className={classname}>
                        {this.state.jsxSlices}
                    </div>
                </div>}
                
                {this.state.type != 'pin' &&
                <div className="pie-chart-container">
                    <div className={classname}>
                        {this.state.jsxSlices}
                    </div>
                </div>}
                
                {this.state.type != 'pin' &&
                <div className="pie-chart-index-container">
                    <ul className="pie-chart-index-list">
                        {this.state.jsxIndex}
                    </ul>
                </div>}
                
                { ( this.props.next && this.props.prev ) &&
                <div className="pie-chart-prev-next">
                    <a href="#" className="pie-chart-prev" onClick={this.props.prev}>
                        <svg viewBox="0 0 32 32"><use xlinkHref="#icon-arrow-left"></use></svg>
                    </a>
                    <a href="#" className="pie-chart-next" onClick={this.props.next}>
                        <svg viewBox="0 0 32 32"><use xlinkHref="#icon-arrow-right"></use></svg>
                    </a>
                </div>}
                
                {this.props.footer && this.state.url != null &&
                <footer className="pie-chart-footer">
                    <a href={this.state.url}>Læs baggrund for denne statistik</a>
                </footer>}
            </div>
        );
    }

} module.exports = Piechart;
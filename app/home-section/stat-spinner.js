// Requires
let React = require( 'react' ),
    ReactDOM = require( 'react-dom' ),
    Piechart = require( '../componentParts/piechart.js' ),
    Globals = require('../modules/global/global.js');

class StatSpinner extends React.Component {

    constructor() {
        super();
        this.state = {data : [], i : 0};
    }
    
    nextStat(e){
        e.preventDefault();
        
        let i = this.state.i,
            len = this.state.data.length - 1;
        
        i ++; if(i > len) i = 0;
        this.setState({i : i});
    }
    
    prevStat(e){
        e.preventDefault();
        
        let i = this.state.i,
            len = this.state.data.length - 1;
        
        i --; if(i < 0) i = len;
        this.setState({i : i});
    }
    
    componentDidMount(){
       Globals.api.get('posts', {type : 'stat', include : this.props.settings.stat}).then( (resp) => {
           
           let data = [];
           
           for (let i in resp){if (resp.hasOwnProperty(i)){ 
               const post = resp[i];
               data.push(post.chart);
           }}

           this.setState({data : data});
       } );
    }

    // Render
    render() {
        
        let classname = 'home-section home-section-stat-spinner';
        if (this.props.settings.size == 'full') classname += ' size-full';
        
        return(
            <section className={classname}>
                { (this.state.data[this.state.i] != null && this.state.data.length > 1 ) &&
                <Piechart next={this.nextStat.bind(this)} prev={this.prevStat.bind(this)} header arrows footer obj={this.state.data[this.state.i]} />}
                
                { (this.state.data[this.state.i] != null && this.state.data.length == 1 ) &&
                    <Piechart header footer obj={this.state.data[this.state.i]} />}
            </section>
        );
    }

} module.exports = StatSpinner;
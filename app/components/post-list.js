// Requires
let React = require( 'react' ),
    ReactDOM = require( 'react-dom' ),
    ListItem = require('../componentParts/list-item.js'),
    Contact = require( '../componentParts/contact.js' ),
    Case = require( '../componentParts/case.js' ),
    Globals = require('../modules/global/global.js');

class PostList extends React.Component {

    constructor() {
        super();
        this.state = {type : null, list_items : null}
        this.oldProps = null;
    }
    
    queryPosts(query){
        
        if(query == null){ Globals.hooks.trigger('load-anchors'); return; }
        
        this.setState({loading : true});
        
        Globals.api.get('posts',query).then((resp) => {
            let list_items = [];
            
            for (let i in resp){if(resp.hasOwnProperty(i)){
                if (query.type == 'post' || query.type == 'any') list_items.push(<ListItem item={resp[i]} key={'post-list' + i} />);
                if (query.type == 'case') list_items.push(<li key={'post-list' + i}><Case item={resp[i]} /></li>);
                if (query.type == 'contact') list_items.push(<li key={'post-list' + i}><Contact item={resp[i]} /></li>);
            }}
            
            this.setState({type : query.type, list_items : list_items, loading : false}, () => {
                Globals.hooks.trigger('load-anchors');
            });
        });
    }
    
    componentWillReceiveProps(newProps){
        
        if(newProps.query == null) return;
        
        if(this.oldProps === newProps) return;
        this.oldProps = newProps;
        this.queryPosts(newProps.query);
    }
    
    componentDidMount(){
        if(this.props.query == null) return;
        this.queryPosts(this.props.query);
    }

    // Render
    render() {
        
        let cls = 'post-list-wrapper';
        
        if ( this.state.type != null ) cls += ' type-' + this.state.type;
        else cls += ' type-post';
        
        if ( this.state.loading ) cls += ' loading';
        
        return (
            <div className={cls}>
                {this.props.label != null && <h3 className="post-list-label">{this.props.label}</h3>}
                <ul className="post-list">
                    {this.state.list_items != null && this.state.list_items}
                    {this.props.children}
                </ul>
                {this.props.more != null && <a href={this.props.more_link} className="post-list-more">{this.props.more}</a>}
            </div>
        );
    }

} module.exports = PostList;
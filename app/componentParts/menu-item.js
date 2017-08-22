// Requires
let React = require( 'react' ),
    ReactDOM = require( 'react-dom' ),
    Globals = require('../modules/global/global.js');

class MenuItem extends React.Component {

    constructor() {
        super();
        this.hooks = {};
        this.state = {classes : [], visible : true};
    }
    
    handleCloseSubMenu(){
        Globals.hooks.trigger('close-sub-menu', this.props.item.menu_item_parent);
    }
    
    closeSubMenu(ID){
        if (ID == this.props.item.ID){
            Globals.hooks.trigger('menu-item-click', this);
        }
        
    }
    
    handleClick(e){
        
        // no nav links
        if(this.props.item.url == '#' || this.props.item.url == '!#'){
            Globals.hooks.trigger('menu-item-click', this);
            e.preventDefault(); 
            return false;
        }
        
        // Blanks return true
        if(this.props.item.target == '_blank'){
            Globals.hooks.trigger('menu-item-click', this);
            return true;
        }
        
        if(this.props.item.object === 'custom'){
            Globals.hooks.trigger('menu-item-click', this);
            return true;
        }
        
        // Links outside site returns true
        if(this.props.item.url.indexOf(Globals.theme_settings.base_url) < 0){
            Globals.hooks.trigger('menu-item-click', this);
            return true;
        }
        
        e.preventDefault();
        const item = this.props.item;
        
        document.body.classList.add('loading');
        
        Globals.history.push({
            post_id : item.object_id,
            post_type : item.type,
            url : item.url,
            template : item.template,
            title : item.title,
            segments: item.segment_content,
        }, () => {
            Globals.hooks.trigger('menu-item-click', this);
        });
    }
    
    hasActiveChild(props, item){
        
        if(props.children != null){
            for (let child of props.children){
                
                if(item == null && child.props.item.menu_item_parent == props.item.ID && child.props.item.object_id === Globals.theme_settings.post_id){
                    return true;
                }
                
                if(item != null && child.props.item.menu_item_parent == props.item.ID && item.ID == child.props.item.ID ){
                     return true;
                }
                
                if(this.hasActiveChild(child.props, item)) {
                    return true;
                }
            }
        }
        
        return false;
    }
    
    handleSegmentToggle(){
        let segment = window._cookielib.read('segment'); if(null == segment) return;
        let segment_content = this.props.item.segment_content; if(null == segment_content) return;
        
        if(segment_content[segment] == false) this.setState({visible : false}); 
        else this.setState({visible : true}); 
        
    }
    
    toggleStateClasses(menu_item){
        const item = (menu_item != null && menu_item.props != null) ? menu_item.props.item : null;
        
        let newState = { 
            classes : [],
            current_menu_item : false,
            has_children : false,
            current_menu_ancestor : false,
            current_menu_parent : false,
            top_level : false,
            open_sub_menu : false,
        }
        
        // Does menu item have children?
        if(this.props.item.menu_item_parent == 0){
            newState.classes.push('top_level');
            newState.top_level = true;
        }
        
        // Does menu item have children?
        if(this.props.children != null){
            newState.classes.push('has_children');
            newState.has_children = true;
        }
         
        // Is menu item curent?
        if(item == null && Globals.theme_settings.post_id == this.props.item.object_id){
            newState.classes.push('current_menu_item');
            newState.current_menu_item = true;
            
            if(this.props.children != null){
                newState.classes.push('open_sub_menu');
                newState.open_sub_menu = true;
            }
            
            if(newState.top_level){Globals.hooks.trigger('hamburger-label', this.props.item.title);}
        }
        
        else if(item !== null && item === this.props.item){
            newState.classes.push('current_menu_item');
            newState.current_menu_item = true;
            
            if(this.props.children != null){
                newState.classes.push('open_sub_menu');
                newState.open_sub_menu = true;
            }
            
            if(newState.top_level){Globals.hooks.trigger('hamburger-label', this.props.item.title);}
        }
        
        // or parent?
        else if(this.props.children != null){
            for (let child of this.props.children){
                if(item == null && child.props.item.menu_item_parent == this.props.item.ID && child.props.item.object_id === Globals.theme_settings.post_id){
                    newState.classes.push('current_menu_parent');
                    newState.current_menu_parent = true;
                    
                    if(child.props.children == null){
                        newState.classes.push('open_sub_menu');
                        newState.open_sub_menu = true;
                    }
                    
                    if(newState.top_level){Globals.hooks.trigger('hamburger-label', this.props.item.title);}
                    break;
                }
                
                else if(item != null && child.props.item.menu_item_parent == this.props.item.ID && child.props.item == item){
                    newState.classes.push('current_menu_parent');
                    newState.current_menu_parent = true;
                    
                    if(child.props.children == null){
                        newState.classes.push('open_sub_menu');
                        newState.open_sub_menu = true;
                    }
                    
                    if(newState.top_level){Globals.hooks.trigger('hamburger-label', this.props.item.title);}
                    break;
                }
            }
        }
        
        // or ancestor?
        if(this.hasActiveChild(this.props, item) && !newState.current_menu_parent && !newState.current_menu_item){
            newState.classes.push('current_menu_ancestor');
            newState.current_menu_ancestor = true;
            if(newState.top_level){Globals.hooks.trigger('hamburger-label', this.props.item.title);}
        }
        
        this.setState(newState);
    }
    
    componentDidMount(){
        
        setTimeout(function(){
            this.toggleStateClasses();
            this.handleSegmentToggle();
        }.bind(this), 200);
        
        this.hooks.seg = Globals.hooks.add('change-segment', this.handleSegmentToggle.bind(this));
        this.hooks.page = Globals.hooks.add('history-pop', this.toggleStateClasses.bind(this));
        this.hooks.click = Globals.hooks.add('menu-item-click', this.toggleStateClasses.bind(this));
        this.hooks.close = Globals.hooks.add('close-sub-menu', this.closeSubMenu.bind(this));
    }
    
    componentWillUnmount(){
        Globals.hooks.remove('change-segment', this.hooks.seg);
        Globals.hooks.remove('history-pop', this.hooks.page);
        Globals.hooks.remove('menu-item-click', this.hooks.click);
        Globals.hooks.remove('close-sub-menu', this.hooks.close);
    }

    // Render
    render() {
        
        const item = this.props.item;
        
        let className = 'menu-item';
        
        for (let classes of item.classes){
            if ('' !== classes) className += ' ' + classes;
        }
        
        for (let classes of this.state.classes){
            if ('' !== classes) className += ' ' + classes;
        }
        
        return (
            <li className={className}>
                {this.state.visible &&
                <a title={item.title} target={item.target} href={item.url} onClick={this.handleClick.bind(this)}>
                        <span dangerouslySetInnerHTML={{__html: item.title}}></span>
                </a>}
                {this.state.visible && this.props.children != null &&
                <svg className="close-sub-menu" viewBox="0 0 32 32" onClick={this.handleCloseSubMenu.bind(this)}>
                        {this.props.item.menu_item_parent != 0 && <use xlinkHref="#icon-close"></use>}
                        {this.props.item.menu_item_parent == 0 && <use xlinkHref="#icon-hamburger"></use>}
                </svg>}
                 {this.state.visible && this.props.children != null && 
                <ul className="sub-menu">
                    {this.props.children}
                </ul>
                }
            </li>
        );
    }

} module.exports = MenuItem;
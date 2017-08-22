// Requires
let React = require( 'react' ),
    ReactDOM = require( 'react-dom' ),
    MenuItem = require( '../componentParts/menu-item.js' ),
    Globals = require('../modules/global/global.js');

class menu extends React.Component {

    constructor() {
        super();
        this.state = {menuItems : null};
        this.hooks = {};
    }
    
    handleMenuClick(menu_item){
        
        if(menu_item.props.children == null && menu_item.props.item.menu_item_parent == 0){
            this.setState({menu_item_active : false});
        }
        
        else this.setState({menu_item_active : true});
        
    }
    
    handleHamburgerToggle(toggle){
        if(toggle)this.setState({mobile_show : true});
        else this.setState({mobile_show : false});
    }
    
    handleCloseSubMenu(id){
        if (0 == id){
            if (this.state.menu_item_active) this.setState({menu_item_active : false}); 
            else this.setState({menu_item_active : true}); 
        }
    }
    
    // Applies children menu items
    applyChildren( item, menu_items ){
        
        let jsx = [];
        
        for (let i in menu_items){
            if (menu_items.hasOwnProperty(i)){
                let child = menu_items[i];
                
                if(item.ID == child.menu_item_parent){
                    
                    // Set menu item active
                    if (child.object_id == Globals.theme_settings.post_id) this.setState({menu_item_active : true});
                    
                    jsx.push(<MenuItem item={child} key={'menu-item-' + child.ID} children={this.applyChildren(child,menu_items)}/>);
                }
            }
        }
        
        // Only return children if applicable
        if (!jsx.length) return null;
        else return jsx;
    }
    
    componentDidMount(){
        Globals.api.get('menu', {theme_location : this.props.location}).then((response) =>{
            
            let jsx = [];
            for (let i in response){
                if(response.hasOwnProperty(i)){
                    let item = response[i];
                    
                    // Apply top level menu items
                    if(0 == item.menu_item_parent){
                        jsx.push(<MenuItem item={item} key={'menu-item-' + item.ID} children={this.applyChildren(item,response)}/>);
                    }
                }
            }
            
            this.setState({menuItems : jsx});
        });

        this.hooks.itemClick = Globals.hooks.add('menu-item-click', this.handleMenuClick.bind(this));
        this.hooks.closeSubtab = Globals.hooks.add('close-sub-menu', this.handleCloseSubMenu.bind(this));
        this.hooks.hamburger = Globals.hooks.add('hamburger-toggle',  this.handleHamburgerToggle.bind(this));
    }
    
    componentWillUnmount(){
        Globals.hooks.remove('menu-item-click', this.hooks.itemClick);
        Globals.hooks.remove('close-sub-menu', this.hooks.closeSubtab);
        Globals.hooks.remove('hamburger-toggle',  this.hooks.hamburger);
    }

    // Render
    render() {
        
        let classname = 'menu ' + this.props.location;
        if (this.state.menu_item_active) classname += ' menu_item_active';
        if (this.state.mobile_show) classname += ' hamburger_active';
        
        return (
            <nav className={classname}>
                { this.state.menuItems != null &&
                <ul>
                    {this.state.menuItems}
                </ul> }
                {this.props.children != null && this.props.children}
            </nav>
        );
    }

} module.exports = menu;
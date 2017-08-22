<?php 

add_theme_support('menus');
register_nav_menus( array(
	'main-menu' => 'Hovedmenu',
	'top-menu' => 'Topmenu',
	'footer-menu' => 'Menu i footer',
) );


function apply_item_children($item, $menu_items){
    $children = array();
    foreach($menu_items as $possible_child){
        if ($possible_child->menu_item_parent === $item->ID){$children[] = $possible_child;}
    }
    return $children;
}

function smamo_rest_menu($data){
    $response = array();
    
    $id = '';
    if(isset($data['id'])){$id = esc_attr($data['id']);}
    elseif(isset($data['theme_location'])){
        $menu_name = esc_attr($data['theme_location']);
        $locations = get_nav_menu_locations();
        $id = isset( $locations[ $menu_name ]) ? $locations[ $menu_name ] : false;
    }

    $menu_items = wp_get_nav_menu_items($id);
    
    if(!$menu_items){return $response;}
    
    
    foreach($menu_items as $item){
        
        $template = $item->object;
        $post_type = get_post_type($item->object_id);

        if('page' === $template){

            $page_template = get_post_meta($item->object_id,'page_template', true);

            if('case' == $page_template){
                $template = 'archive';
                $post_type = 'case';
            }

            if('contact' == $page_template){
                $template = 'archive';
                $post_type = 'contact';
            }

            if('post' == $page_template){
                $template = 'archive';
                $post_type = 'post';
            }

        }
        
        // Basic item settings
        $item_array = array(
            'ID' => $item->ID,
            'object' => $item->object,
            'template' => $template,
            'object_id' => $item->object_id,
            'menu_item_parent' => $item->menu_item_parent,
            'url' => $item->url,
            'classes' => $item->classes,
            'target' => $item->target,
            'title' => $item->title,
            'type' => $post_type,
            'segment_content' => get_active_segments($item->object_id),
            'item' => $item,
        );
        
        // Check for home template
        $frontpage_id = get_option( 'page_on_front' );
        $blog_id = get_option( 'page_for_posts' );
        if($item->object_id == $frontpage_id){
            $item_array['template'] = 'home';
        }
        
        if($item->object_id == $blog_id){
            $item_array['template'] = 'archive';
            $item_array['type'] = 'post';
        }
        
        // check for arcive template
        if($item->type == 'taxonomy' || $item->type == 'post_type_archive'){
            $item_array['template'] = 'archive';
        }
        
        $response[] = $item_array;
    }
    
    return $response;
}


add_action( 'rest_api_init', function () {

    register_rest_route( 'theme', 'menu', array(
		'methods' => 'GET',
		'callback' => 'smamo_rest_menu',
	) );

} );

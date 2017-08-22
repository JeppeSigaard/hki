<?php 


function smamo_parse_widget_content($widget){
    
    // Contact
    if('contact' === $widget['type']){
        return array( 'type' => 'contact', 'content' => smamo_parse_post(get_post($widget['contact'])));
    }
    
    // quote
    if('quote' === $widget['type']){
        return array('type' => 'quote', 'content' => smamo_parse_post(get_post($widget['quote'])));
    }
    
    // stat
    if('stat' === $widget['type']){
        return array('type' => 'stat', 'content' => smamo_parse_post(get_post($widget['stat'])));
    }
    
    // Freeeeeeeee
    if('text' == $widget['type']){
        $content = apply_filters('the_content', do_shortcode($widget['text']));
        return array(
            'type' => 'text', 
            'content' => $content,
        );
    }
    
    // Post list
    if('post-list' === $widget['type']){
        $response = array();
        
        $args = array(
            'post_type' => 'post',
        );
        
        $args['per_page'] = (isset($widget['per_page'])) ? $widget['per_page'] : 3;
        
        foreach(get_posts($args) as $post){
            $response[] = smamo_parse_post($post);
        }
        
        return array('widget' => $widget, 'type' => 'post-list', 'content' => $response);
    }
    
    // Case
    if('case' === $widget['type']){
        $response = array();
        foreach($widget['case'] as $case_id){
            $response[] = smamo_parse_post(get_post($case_id));
            
        }
        
        return array('type' => 'case', 'content' => $response);
    }
    
    return $widget;
}

function smamo_parse_post_widgets($post_id, $meta_key){
    $parents = get_post_ancestors($post_id);
    $widgets = get_post_meta($post_id, $meta_key, true);
    $response = array();
    
    if($widgets && !empty($widgets)){
        foreach($widgets as $key => $widget){
            if($widget['type'] === '0'){
                unset($widgets[$key]);
            }
            
            else $response[] = smamo_parse_widget_content($widget);
        }
    }
    
    if ( ( !$widgets || empty($widgets) ) && !empty($parents) ){
        
        foreach($parents as $parent){
            
            $widgets = get_post_meta($parent, $meta_key, true);
            if($widgets && !empty($widgets)){

                foreach($widgets as $key => $widget){                    
                    if($widget['type'] === '0'){            
                        unset($widgets[$key]);
                    }
                    
                    else $response[] = smamo_parse_widget_content($widget);
                }
            }
            
            if('' !== $widgets && !empty($widgets)){
                break;
            }
        }
    }
    
    if ( !$widgets || empty($widgets)){$widgets = array();}
    //return $widgets;
    return $response;
}


function smamo_rest_widgets($data){
    $r = array();
    if (!isset($data['id'])) {return $r;}
    
    $post_id = esc_attr($data['id']);
    $r['right'] = smamo_parse_post_widgets($post_id, 'widget_right');
    $r['bottom'] = smamo_parse_post_widgets($post_id, 'widget_bottom');

    return $r;
}

add_action( 'rest_api_init', function () {

    register_rest_route( 'theme', 'widgets/(?P<id>\d+)', array(
		'methods' => 'GET',
		'callback' => 'smamo_rest_widgets',
	) );

} );
<?php

get_functions_part(array(
    'scripts',
    'menu',
    'images',
    'strong-shortcode',
    'box-shortcode',
));

get_functions_part(array(
    'case',
    'medarbejder',
    'statistik',
    'quote',
),'post-types');

get_functions_part(array(
    'siteinfo',
), 'kirki');

get_functions_part(array(
    'no-defaults',
    'prefix',
    'theme_mod',
    'options',
    'media',
    'post',
    'slides',
    'widget',
),'api');

get_functions_part(array(
    'segment-settings',
    'dynamic-tabs',
),'piklist');


// get_functions_part([$filnavn],[$undermappe]);
function smamo_include_functions_part_if_exists($fetch, $in = false){
    if ($in){$fetch = $in . '/' . $fetch;}
    $fetch = get_template_directory() . '/functions/' . $fetch . '.php';
    if(file_exists($fetch)){include_once $fetch;}
}

function get_functions_part($fetch, $in = false){
    if(is_array($fetch)){foreach($fetch as $p){smamo_include_functions_part_if_exists($p,$in);}}
    else{smamo_include_functions_part_if_exists($fetch,$in);}
}


add_action( 'init', 'smamo_init_actions' );
function smamo_init_actions() {
  remove_post_type_support( 'post', 'custom-fields' );
  remove_post_type_support( 'page', 'custom-fields' );
    unregister_taxonomy_for_object_type('post_tag', 'post');
}


function get_active_segments($post_id){
    
    if ($post_id === 0) {return null;}
    
    if (!get_post($post_id)) {return null;}
    
    if ('page' !== get_post_type($post_id)){ return null;}
    
    $return = null;
    
    $segment_settings = get_option('segment_settings');
    if(isset($segment_settings['segment']) && is_array($segment_settings['segment'])){

        $return = array();
        $has_content = array();
        $i = 0;
        foreach($segment_settings['segment'] as $segment){
            $i++;
            $has_content[$i] = true; //(get_post_meta($post_id, $i . '_content', true) !== '');
        }
        
        $i = 0;
        foreach($segment_settings['segment'] as $segment){
            $i ++;
            $use = get_post_meta($post_id, $i . '_use', true);
            if(!$use) {$use = '0';}

            // Use own and has content
            if ('0' === $use && $has_content[$i]){$return[] = true; continue;}   

            // Use different segment and has content
            if('none' !== $use && isset($has_content[$use]) && $has_content[$use]){$return[] = true; continue;}

            $return[] = false;
        }

    }  
    
    return $return;
}


function apply_template($post_id = false, $query = false){
    if (!$query && !$post_id) {return;}
    
    if (!$query){$query = new WP_Query(array('page_id' => esc_attr($post_id), 'p' => esc_attr($post_id)));}
    
    $template = array(
        'search'        => $query->is_search(),
        '404'           => $query->is_404() || !$query->have_posts(),
        'home'          => $query->is_front_page(),
        'archive'       => $query->is_home() || $query->is_archive(),
        'page'          => $query->is_page(),
        'single'        => $query->is_singular() || $query->is_single(),
    );
    
    foreach($template as $t => $b){
        if($b){return $t;}
    }
}
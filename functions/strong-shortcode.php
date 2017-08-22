<?php

// [strong] [/strong]
add_shortcode('strong',function($attr,$content){
    return '<strong>'.$content.'</strong>';
});


add_filter('the_title', function($title){
    if(!is_admin()){
        return do_shortcode($title);
    }
    
    else{
        $title = str_replace('[strong]','',$title);
        $title = str_replace('[/strong]','',$title);
        $title = str_replace('<strong>','',$title);
        $title = str_replace('</strong>','',$title);
        return wp_strip_all_tags($title);
    }
});

function filter_handler( $data , $postarr ) {
  $data['post_name'] = str_replace('strong','',$data['post_name']);
  return $data;
}

add_filter( 'wp_insert_post_data', 'filter_handler', '99', 2 );
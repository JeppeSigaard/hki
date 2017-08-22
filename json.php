<?php header('Content-Type: application/json');



global $post;
global $wp_query;
if(!$post) {echo json_encode(array('template' => '404')); }

else{ 
    $data = smamo_parse_post($post);
    
    $frontpage_id = get_option( 'page_on_front' );
    $blog_id = get_option( 'page_for_posts' );
    $post_id = $wp_query->queried_object_id;
    
    $data['ID'] = $post_id;
    
    if($post_id == $frontpage_id){
        $data['template'] = 'home';
    }

    else if($post_id== $blog_id){
        $data['template'] = 'archive';
    }
    
    else if ($wp_query->is_page()){$data['template'] = 'page';}
    else if ($wp_query->is_archive()){$data['template'] = 'archive';}
    else if ($wp_query->is_singular()){$data['template'] = 'single';}
    
    echo json_encode($data);
}


exit;
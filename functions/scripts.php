<?php


add_action('wp_footer',function(){

    global $wp_query;
    $post_id = ($wp_query->post !== NULL && !is_404()) ? $wp_query->post->ID : '0';
    
    $segments = null;
    if('page' == get_post_type($post_id)){
        $segment_settings = get_option('segment_settings');
        if(isset($segment_settings['segment']) && is_array($segment_settings['segment'])){

            $segments = array();
            foreach($segment_settings['segment'] as $segment){

                $slug = sanitize_title($segment['title']);

                // has segment content
                $segments[] = (get_post_meta($post_id, $slug . '_content', true) !== '');
            }
        }  
    }
    
    $find_news_page = get_posts(array('post_type' => 'page', 'meta_key' => 'page_template', 'meta_value' => 'post', 'posts_per_page' => 1));
    $news_page = (isset($find_news_page[0])) ? get_the_permalink($find_news_page[0]->ID) : get_the_permalink(get_option( 'page_for_posts' ));
    
    $template = apply_template(false, $wp_query);
    $post_type = get_post_type($post_id);
    
    if('page' === $template){
        
        $page_template = get_post_meta($post_id,'page_template', true);
        
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

    wp_enqueue_script( 'main');
    wp_localize_script('main', 'theme_settings', array(
        'base_url' => get_bloginfo('url'),
        'blog_url' => $news_page,
        'api_url' => get_rest_url(),
        'ajax_url' => admin_url('admin-ajax.php'),
        'post_id' => $post_id,
        'post_type' => $post_type,
        'template' => $template,
        'site_name' => get_bloginfo('name'),
        'site_description' => get_bloginfo('description'),
        'segments' => get_active_segments($post_id),
        'nonce' => wp_create_nonce( 'smamo_form_nonce' ),
        's' => ('search' === $template) ? esc_attr($wp_query->query['s']) : '' ,
    ));
});

add_action('wp_enqueue_scripts',function(){
    wp_register_script( 'main', get_template_directory_uri() . '/js/script-min.js', null, '1.0', true );
});

add_action('admin_enqueue_scripts','theme_enqueue_admin_scripts');
function theme_enqueue_admin_scripts(){
    //wp_enqueue_style( 'theme-style', get_template_directory_uri() . '/style/admin/admin.css', false, false, 'all' );
    if(isset($_GET['_']['flow_page'])){
        echo '<script> var flow_page = "' . esc_attr($_GET['_']['flow_page']) . '"</script>';
    }
    wp_enqueue_script('admin-script', get_template_directory_uri() . '/js/admin-min.js' , array('jquery'), '1', true);
}

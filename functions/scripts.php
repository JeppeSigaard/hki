<?php
add_action('wp_footer',function(){

    global $wp_query;
    $post_id = ($wp_query->post !== NULL && !is_404()) ? $wp_query->post->ID : '0';

    $post_template = '';
    $template = array(
        '404'           => is_404() || !have_posts(),
        'home'          => is_home(),
        'front-page'    => is_front_page(),
        'search'        => is_search(),
        'archive'       => is_archive(),
        'page'          => is_page(),
        'single'        => is_singular() || is_single(),
    );

    foreach($template as $t => $b){
        if($b){$post_template = $t; break;}
    }

    wp_enqueue_script( 'main');
    wp_localize_script('main', 'theme_settings', array(
        'api_url' => get_rest_url(),
        'ajax_url' => admin_url('admin-ajax.php'),
        'post_id' => $post_id,
        'template' => $post_template,
    ));
});

add_action('wp_enqueue_scripts',function(){
    wp_register_script( 'main', get_template_directory_uri() . '/js/script-min.js', null, '1.0', true );
});

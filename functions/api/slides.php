<?php 

function smamo_rest_slides($data){
    
    $response = array();
    

    $slide_query = new WP_Query(array(
        'post_type' => 'any',
        'posts_per_page' => -1,
        'meta_key' => 'show_in_slide',
        'meta_value' => 'active',
    ));

    if($slide_query) :

    while ($slide_query->have_posts()) : $slide_query->the_post();
        $slide = array();

        // Add custom image, mby
        $cstm_image = get_post_meta(get_the_ID(), 'page_slide_image', true);
        $slide['img'] = wp_get_attachment_image_url( ($cstm_image) ? $cstm_image : get_post_thumbnail_id( get_the_ID() ), 'widescreen');

        // Add custom title, mby
        $cstm_title = get_post_meta(get_the_ID(), 'page_slide_title', true);
        $slide['title'] = ($cstm_title) ? apply_filters('the_title', $cstm_title) : apply_filters('the_title', get_the_title(get_the_ID()));

        // Add url
        $slide['url'] = esc_url(get_the_permalink(get_the_ID()));

        // Add ID
        $slide['ID'] = get_the_ID();

        // Add label
        $type = get_post_type(get_the_ID());
        switch($type){
            case 'page' :
                $slide['label'] = 'Sider';
                break;
                
            case 'case' :
                $slide['label'] = 'Cases';
                break;
            
            case 'post' :
                $slide['label'] = 'Nyheder';
                break;
                
            default :
                $slide['label'] = '';
                break;
        }
    
        // Add template
        $slide['template'] = 'single';

        // Add slide to slides array
        $response[] = $slide;

    endwhile; wp_reset_postdata();
    
    endif;
    
    return $response;
}

add_action( 'rest_api_init', function () {

    register_rest_route( 'theme', 'slides', array(
		'methods' => 'GET',
		'callback' => 'smamo_rest_slides',
	) );

} );
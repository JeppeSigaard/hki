<?php 

function smamo_rest_media($data){
    return wp_get_attachment_image_src(esc_attr($data['id']));
}

add_action( 'rest_api_init', function () {

    register_rest_route( 'theme', 'media/(?P<id>\d+)', array(
		'methods' => 'GET',
		'callback' => 'smamo_rest_media',
	) );

} );
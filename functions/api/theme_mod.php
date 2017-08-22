<?php 

function smamo_rest_theme_mod($data){
    $response = array();
    
    if(isset($data['fields'])){
        $fields = (isset($data['fields'])) ? explode(',', $data['fields']) : false;
        
        foreach($fields as $f){
            $fkey = esc_attr($f);
            
            if('site_name' === $fkey){
                $response[$fkey] =  get_bloginfo('name');
            }
            
            if('site_description' === $fkey){
                $response[$fkey] =  get_bloginfo('description');
            }
            
            if('site_url' === $fkey){
                $response[$fkey] =  get_bloginfo('url');
            }
            
            if('site_logo' === $fkey){
                $custom_logo_id = get_theme_mod( 'custom_logo' );
                $image = wp_get_attachment_image_src( $custom_logo_id , 'full' );
                $response[$fkey] = $image[0];
            }
            
            if(get_theme_mod($fkey)){
                $response[$fkey] = get_theme_mod($fkey);
            }
        }
    }
    
    return $response;
}

add_action( 'rest_api_init', function () {

    register_rest_route( 'theme', 'theme_mod', array(
		'methods' => 'GET',
		'callback' => 'smamo_rest_theme_mod',
	) );

} );
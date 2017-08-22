<?php 

function smamo_rest_options($data){
    $response = array();
    
    if(isset($data['fields'])){
        $fields = (isset($data['fields'])) ? explode(',', $data['fields']) : false;
        
        foreach($fields as $f){
            $fkey = esc_attr($f);
            if(get_option($fkey)){
                $response[$fkey] = get_option($fkey);
            }
        }
    }
    
    return $response;
}

add_action( 'rest_api_init', function () {

    register_rest_route( 'theme', 'options', array(
		'methods' => 'GET',
		'callback' => 'smamo_rest_options',
	) );

} );
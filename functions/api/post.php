<?php 

function smamo_parse_post($post){
    if(!$post) return array();
    
    $response = array(
        'ID' => $post->ID,
        'title' => apply_filters('the_title', $post->post_title),
        'date' => $post->post_date,
        'type' => $post->post_type,
        'url' => get_the_permalink($post->ID),
    );
    
    $segment_settings = get_option('segment_settings');
    
    if('page' === $post->post_type){
        $i = 0;
        foreach($segment_settings['segment'] as $segment){
            $i++;
            
            $use = get_post_meta($post->ID, $i . '_use', true);
            
            if (!$use || '0' == $use){ $use = $i; }
            
            $response['use'][] = $use;
            
            $response['content'][] = apply_filters('the_content', get_post_meta($post->ID, $use . '_content', true));
            $response['excerpt'][] = wp_trim_words( wp_strip_all_tags( get_post_meta($post->ID, $use . '_content', true) ), $num_words = 55, $more = ' ...');
        }
        
        $response['ancestors'] = array();
        foreach(get_post_ancestors($post->ID) as $ancestor){
            $response['ancestors'][] = array(
                'url' => get_the_permalink($ancestor),
                'title' => get_the_title($ancestor),
            );
        };
            
    }
    
    else{
        $response['content']= apply_filters('the_content', $post->post_content);
        $response['excerpt']= wp_trim_words( wp_strip_all_tags($post->post_content), $num_words = 55, $more = ' ...' );
    }
    
    if (has_post_thumbnail($post->ID)){
        
        $sizes = get_intermediate_image_sizes();
        $sizes[] = 'full';
        foreach($sizes as $size){
            $thumb = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), $size);
            $response['image'][$size] = isset($thumb[0]) ? $thumb[0]: false;
        }
    }
    
    if('post' === $post->post_type){
        $response['ancestors'] = array(
            0 => array(
                'url' =>  get_post_type_archive_link('post'),
                'title' => 'Nyheder',
            ),
        );
    }
    
    if('contact' === $post->post_type){
        $response['name'] = get_post_meta($post->ID,'name', true);
        $response['position'] = get_post_meta($post->ID,'position', true);
        $response['email'] = get_post_meta($post->ID,'email', true);
        $response['phone'] = get_post_meta($post->ID,'phone', true);
        
        $response['ancestors'] = array(
            0 => array(
                'url' =>  get_post_type_archive_link('contact'),
                'title' => 'Kontakt',
            ),
        );
        
    }
    
    if('quote' === $post->post_type){
        $response['name'] = get_post_meta($post->ID,'name', true);
        $response['position'] = get_post_meta($post->ID,'position', true);
        $response['quote'] = get_post_meta($post->ID,'quote', true);
        
        $response['ancestors'] = array(
            0 => array(
                'url' =>  get_post_type_archive_link('quote'),
                'title' => 'Citater',
            ),
        );
    }
    
    if('stat' === $post->post_type){
        $response['chart'] = array(
            'type' => get_post_meta($post->ID,'pie_type', true),
            'title' => get_post_meta($post->ID,'pie_heading', true),
            'url' => get_the_permalink($post->ID),
            'data' => array(),
        );
        
        foreach(get_post_meta($post->ID,'pie_slices', true) as $slice){
            $response['chart']['data'][] = array(
                'unit' => $slice['unit'],
                'label' => $slice['label'],
                'value' => $slice['value'][0],
            );
        }
        
    }
    
    return $response;
    
}

function smamo_rest_posts($data){
    
    $response = array();
    $args = array(
        'posts_per_page'   => (isset($data['per_page'])) ? esc_attr($data['per_page']) : get_option( 'posts_per_page' ),
        'offset'           => (isset($data['offset'])) ? esc_attr($data['offset']) : 0,
        'category'         => (isset($data['cat'])) ? esc_attr($data['cat']) : '',
        'category_name'    => (isset($data['cat_name'])) ? esc_attr($data['cat_name']) : '',
        'orderby'          => (isset($data['orderby'])) ? esc_attr($data['orderby']) : 'date',
        'order'            => (isset($data['order'])) ? esc_attr($data['order']) : 'DESC',
        'include'          => (isset($data['include'])) ? esc_attr($data['include']) : '',
        'exclude'          => (isset($data['exclude'])) ? esc_attr($data['exclude']) : '',
        'meta_key'         => (isset($data['meta_key'])) ? esc_attr($data['meta_key']) : '',
        'meta_value'       => (isset($data['meta_value'])) ? esc_attr($data['meta_value']) : '',
        'post_type'        => (isset($data['type'])) ? esc_attr($data['type']) : 'post',
        'post_parent'      => (isset($data['parent'])) ? esc_attr($data['parent']) : '',
        'author'           => (isset($data['author'])) ? esc_attr($data['author']) : '',
        'author_name'	   => (isset($data['author_name'])) ? esc_attr($data['author_name']) : '',
        'post_status'      => (isset($data['status'])) ? esc_attr($data['status']) : 'publish',
        'suppress_filters' => (isset($data['suppress_filters'])) ? esc_attr($data['suppress_filters']) : true,
    );
    
    if (isset($data['s'])){$args['s'] = esc_attr($data['s']); }
    
    foreach(get_posts($args) as $post){
       $response[] = smamo_parse_post($post); 
    }
    
    return $response;
}

function smamo_rest_post($data){
    $post = get_post(esc_attr($data['id']));
    if(!$post) return array();
    return smamo_parse_post($post);
}


add_action( 'rest_api_init', function () {

    register_rest_route( 'theme', 'posts', array(
		'methods' => 'GET',
		'callback' => 'smamo_rest_posts',
	) );

} );

add_action( 'rest_api_init', function () {

    register_rest_route( 'theme', 'posts/(?P<id>\d+)', array(
		'methods' => 'GET',
		'callback' => 'smamo_rest_post',
	) );

} );
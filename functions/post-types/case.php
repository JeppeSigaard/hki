<?php

// Team
add_action( 'init', 'smamo_add_post_type_case' );
function smamo_add_post_type_case() {
	register_post_type( 'case', array(

        'menu_icon' 		 => 'dashicons-archive',
		'public'             => true,
		'publicly_queryable' => true,
		'show_ui'            => true,
		'show_in_menu'       => true,
		'query_var'          => true,
		'rewrite'            => array( 'slug' => 'case' ),
		'capability_type'    => 'post',
		'has_archive'        => true,
		'hierarchical'       => false,
		'menu_position'      => 21,
		'supports'           => array( 'title', 'editor', 'thumbnail'),
        'labels'             => array(
            'name'               => _x( 'Cases', 'post type general name', 'smamo' ),
            'singular_name'      => _x( 'Case', 'post type singular name', 'smamo' ),
            'menu_name'          => _x( 'Cases', 'admin menu', 'smamo' ),
            'name_admin_bar'     => _x( 'Cases', 'add new on admin bar', 'smamo' ),
            'add_new'            => _x( 'Tilføj ny ', 'case', 'smamo' ),
            'add_new_item'       => __( 'Tilføj ny', 'smamo' ),
            'new_item'           => __( 'Ny case', 'smamo' ),
            'edit_item'          => __( 'Rediger', 'smamo' ),
            'view_item'          => __( 'Se case', 'smamo' ),
            'all_items'          => __( 'Se alle', 'smamo' ),
            'search_items'       => __( 'Find case', 'smamo' ),
            'parent_item_colon'  => __( 'Forældre:', 'smamo' ),
            'not_found'          => __( 'Start med at oprette en ny case.', 'smamo' ),
            'not_found_in_trash' => __( 'Papirkurven er tom.', 'smamo' ),
            ),
	   )
    );
}

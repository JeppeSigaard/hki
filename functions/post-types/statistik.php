<?php

// Team
add_action( 'init', 'smamo_add_post_type_stat' );
function smamo_add_post_type_stat() {
	register_post_type( 'stat', array(

        'menu_icon' 		 => 'dashicons-chart-bar',
		'public'             => true,
		'publicly_queryable' => true,
		'show_ui'            => true,
		'show_in_menu'       => true,
		'query_var'          => true,
		'rewrite'            => array( 'slug' => 'stat' ),
		'capability_type'    => 'post',
		'has_archive'        => false,
		'hierarchical'       => false,
		'menu_position'      => 21,
		'supports'           => array( 'title', 'editor'),
        'labels'             => array(
            'name'               => _x( 'Statistik', 'post type general name', 'smamo' ),
            'singular_name'      => _x( 'Statistik', 'post type singular name', 'smamo' ),
            'menu_name'          => _x( 'Statistik', 'admin menu', 'smamo' ),
            'name_admin_bar'     => _x( 'Statistik', 'add new on admin bar', 'smamo' ),
            'add_new'            => _x( 'Tilføj ny ', 'statistik', 'smamo' ),
            'add_new_item'       => __( 'Tilføj ny', 'smamo' ),
            'new_item'           => __( 'Ny statistik', 'smamo' ),
            'edit_item'          => __( 'Rediger', 'smamo' ),
            'view_item'          => __( 'Se statistik', 'smamo' ),
            'all_items'          => __( 'Se alle', 'smamo' ),
            'search_items'       => __( 'Find statistik', 'smamo' ),
            'parent_item_colon'  => __( 'Forældre:', 'smamo' ),
            'not_found'          => __( 'Start med at oprette en ny statistik.', 'smamo' ),
            'not_found_in_trash' => __( 'Papirkurven er tom.', 'smamo' ),
            ),
	   )
    );
}

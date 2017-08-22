<?php 

// Citat
add_action( 'init', 'smamo_add_post_type_citat' );
function smamo_add_post_type_citat() {
	register_post_type( 'quote', array(

        'menu_icon' 		 => 'dashicons-format-quote',
		'public'             => false,
		'publicly_queryable' => false,
		'show_ui'            => true,
		'show_in_menu'       => true,
		'query_var'          => true,
		'rewrite'            => array( 'slug' => 'quote' ),
		'capability_type'    => 'post',
		'has_archive'        => false,
		'hierarchical'       => false,
		'menu_position'      => 21,
		'supports'           => array( 'title','thumbnail'),
        'labels'             => array(
            'name'               => _x( 'Citater', 'post type general name', 'smamo' ),
            'singular_name'      => _x( 'Citat', 'post type singular name', 'smamo' ),
            'menu_name'          => _x( 'Citater', 'admin menu', 'smamo' ),
            'name_admin_bar'     => _x( 'Citat', 'add new on admin bar', 'smamo' ),
            'add_new'            => _x( 'Tilføj nyt ', 'citat', 'smamo' ),
            'add_new_item'       => __( 'Tilføj nyt', 'smamo' ),
            'new_item'           => __( 'Nyt citat', 'smamo' ),
            'edit_item'          => __( 'Rediger', 'smamo' ),
            'view_item'          => __( 'Se citat', 'smamo' ),
            'all_items'          => __( 'Se alle', 'smamo' ),
            'search_items'       => __( 'Find citat', 'smamo' ),
            'parent_item_colon'  => __( 'Forældre:', 'smamo' ),
            'not_found'          => __( 'Start med at oprette en nyt citat.', 'smamo' ),
            'not_found_in_trash' => __( 'Papirkurven er tom.', 'smamo' ),
            ),
	   )
    );
}

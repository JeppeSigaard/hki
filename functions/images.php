<?php

add_theme_support( 'custom-logo', array(
	'height'      => 100,
	'width'       => 400,
	'flex-height' => true,
	'flex-width'  => true,
	'header-text' => array( 'site-title', 'site-description' ),
) );

add_theme_support('post-thumbnails');

add_image_size('icon', 32, 32, true);
add_image_size('article', 600, 350, true);
add_image_size('widescreen', 960, 540, true);
add_image_size('contact', 480, 260, true);
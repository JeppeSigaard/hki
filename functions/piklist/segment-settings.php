<?php

add_filter('piklist_admin_pages', 'smamo_segment_settings');
function smamo_segment_settings($pages){
    $pages[] = array(
        'page_title' => __('Segmenter'),
        'menu_title' => __('Segmenter', 'piklist'),
        'sub_menu' => 'themes.php',
        'capability' => 'manage_options',
        'menu_slug' => 'segment_settings',
        'setting' => 'segment_settings',
        'single_line' => true,
        'default_tab' => 'Basic',
        'save_text' => 'Gem indstillinger',
    );

    return $pages;
}
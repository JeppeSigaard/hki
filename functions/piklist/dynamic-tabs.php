<?php 

add_action('init', function(){
    remove_post_type_support('page', 'editor');
});

add_action( 'updated_option', 'update_segment_options', 10, 1 ); 
function update_segment_options( $option ) { 
    if('segment_settings' !== $option) { return; }
    
    /*
    global $wpdb;
    global $table_prefix;
    $results = $wpdb->get_results( "DELETE FROM `".$table_prefix."options` WHERE `option_name` LIKE ('%\_transient\_%')" );
    file_put_contents(get_template_directory() . '/functions/piklist/log.php', $results);
    */
    
    
    $dynamic_label = '-dyn-';
    
    $tab_template = file_get_contents(get_template_directory() . '/functions/piklist/dynamic-tab-template.php');
    $box_template = file_get_contents(get_template_directory() . '/functions/piklist/dynamic-tab-box-template.php');
    $settings_template = file_get_contents(get_template_directory() . '/functions/piklist/dynamic-tab-settings-template.php');
    $settings_box_template = file_get_contents(get_template_directory() . '/functions/piklist/dynamic-tab-settings-box-template.php');


    $tab_path = get_template_directory() . '/piklist/parts/workflows';
    $box_path = get_template_directory() . '/piklist/parts/meta-boxes';
    $settings_path = get_template_directory() . '/piklist/parts/settings';
    
    $segment_options = get_option('segment_settings');
    if(!$segment_options){ return; }
    
    
    // Delete old files
    $tab_files = glob($tab_path . "/*.php");
    foreach($tab_files as $file){
        if(strpos(strtolower($file), $dynamic_label)) {
            unlink($file);
        }
    }
    
    $box_files = glob($box_path . "/*.php");
    foreach($box_files as $file){
        if(strpos(strtolower($file), $dynamic_label)) {
            unlink($file);
        }
    }
    
    $settings_files = glob($settings_path . "/*.php");
    foreach($settings_files as $file){
        if(strpos(strtolower($file), $dynamic_label)) {
            unlink($file);
        }
    }
    
    // Create new files
    $i = 0; foreach($segment_options['segment'] as $segment){ 
        
        $i++;                                                     
        $title = esc_attr($segment['title']);
        $slug = sanitize_title($segment['title']);
        
        // Set title
        // $new_tab = str_replace('{{title}}', $title, $tab_template);
        $new_box = str_replace('{{title}}', $title, $box_template);
        $new_setting = str_replace('{{title}}', $title, $settings_template);
        $new_setting_box = str_replace('{{title}}', $title, $settings_box_template);
        
        // Set index
        // $new_tab = str_replace('{{index}}', $i, $new_tab);
        $new_box = str_replace('{{index}}', $i, $new_box);
        $new_setting = str_replace('{{index}}', $i, $new_setting);
        $new_setting_box = str_replace('{{index}}', $i, $new_setting_box);
        
        // Set default
        // $new_tab = str_replace('{{default}}', ($i === 1 ? 'true' : 'false') , $new_tab);
        $new_box = str_replace('{{default}}', ($i === 1 ? 'true' : 'false') , $new_box);
        
        // Set slug
        // $new_tab = str_replace('{{slug}}', $slug, $new_tab);
        $new_box = str_replace('{{slug}}', $slug, $new_box);
        $new_setting = str_replace('{{slug}}', $slug, $new_setting);
        $new_setting_box = str_replace('{{slug}}', $slug, $new_setting_box);
        
        // Set order
        // $new_tab = str_replace('{{order}}', $i, $new_tab);
        $new_box = str_replace('{{order}}', $i, $new_box);
        $new_setting = str_replace('{{order}}', $i * 10, $new_setting);
        $new_setting_box = str_replace('{{order}}', $i * 10, $new_setting_box);
    
        // Put the file
        // file_put_contents($tab_path . '/page' . $dynamic_label . $i . '.php', $new_tab);
        file_put_contents($box_path . '/page' . $dynamic_label . $i . '.php', $new_box);
        file_put_contents($tab_path . '/segment-settings' . $dynamic_label . $i . '.php', $new_setting);
        file_put_contents($settings_path . '/segment-settings' . $dynamic_label . $i . '.php', $new_setting_box);
        
    }
};
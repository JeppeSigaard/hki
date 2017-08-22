<?php
/*
Title: Rediger indhold for
Post Type: page
order: 1
Flow: PageTabFlow
Tab: Indhold
priority: high
*/

$arr = array();
$segment_settings = get_option('segment_settings');
if(isset($segment_settings['segment'])){  
    
    $i = 0;
    foreach($segment_settings['segment'] as $segment) {
        $i ++;
        $arr['theme_page_dyn_' . $i] = $segment['title'];
    }
}

 piklist('field', array(
        'columns' => 6,
        'type' => 'select',
        'template' => 'field',
        'field' => 'content_show',
        'label' => 'Rediger indhold for',
        'choices' => $arr,
    ));


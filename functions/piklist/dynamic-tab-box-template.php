<?php 

/*
Title: Indhold til {{title}}
Post type: page
Order: 2
Flow: PageTabFlow
Tab: Indhold
*/

$use_array = array('0' => 'Brug eget indhold');
$segment_settings = get_option('segment_settings');
if(isset($segment_settings['segment'])){  
    $i = 0;
    foreach($segment_settings['segment'] as $segment) {
        $i ++;
        if ('{{title}}' != $segment['title']){
            $use_array[$i] = 'Brug indhold fra ' . $segment['title'];
        }
    }
    $use_array['none'] = 'Skjul for segment';
}

piklist('field', array(
    'type' => 'select',
    'field' => '{{index}}_use',
    'label' => 'indstillinger for indhold',
    'choices' => $use_array,
    'scope' => 'post_meta',
));


piklist('field', array(
    'type' => 'editor',
    'field' => '{{index}}_content',
    'label' => 'Indhold',
    'template' => 'field',
    'scope' => 'post_meta',
    'conditions' => array(
        array(
            'field' => 'page_template',
            'value' => array('post','case'),
            'compare' => '!=',
        ),
    ),
    'options' => array (
        'wpautop' => true,
        'media_buttons' => true,
        'tabindex' => '',
        'editor_css' => '',
        'editor_class' => '',
        'teeny' => false,
        'dfw' => false,
        'tinymce' => true,
        'quicktags' => true,
        'textarea_rows' => 35,
    ),
));
<?php 

/*
Title: Indstillinger for segment
Post Type: page, post
Order: 10
Context: side
*/

$segment_settings = get_option('segment_settings');
if(!isset($segment_settings['segment'])){ return; }

$choices = array('0' => 'Brug eget indhold');
foreach($segment_settings['segment'] as $segment) : 
$slug = sanitize_title($segment['title']);

$choices[$slug] = 'Brug indhold fra ' . $segment['title'];

unset($slug);

endforeach; 

$choices['none'] = 'Skjul for segment';

// foreach($segment_settings['segment'] as $segment) : 
$slug = sanitize_title($segment['title']);


piklist('field', array(
    'type' => 'select',
    'field' => $slug . '_use',
    'label' => 'Visning i ' . $segment['title'],
    'choices' => $choices,
));

// endforeach;
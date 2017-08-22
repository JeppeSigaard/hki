<?php 

/*
Title: Sideattributter
Post Type: page
Meta Box: true
Context: side
Extend: pageparentdiv
Extend Method: before
Flow: PageTabFlow
Tab: Indhold
*/

piklist('field', array(
    'type' => 'select',
    'field' => 'page_template',
    'label' => 'Template',
    'choices' => array(
        'page' => 'Standard',
        'post' => 'Arkivside for nyheder',
        'case' => 'Arkivside for cases',
        'contact' => 'Side med kontaktpersoner',
    ),
));
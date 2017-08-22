<?php
/*
Title: Information
Post type: quote
Order: 2
*/

piklist('field', array(
    'type' => 'textarea',
    'label' => 'Citat',
    'field' => 'quote',
    'columns' => 12,
    'attributes' => array(
        'rows' => 7,
    ),
));


piklist('field', array(
    'type' => 'text',
    'label' => 'Navn',
    'field' => 'name',
));

piklist('field', array(
    'type' => 'text',
    'label' => 'Stilling',
    'field' => 'position',
));
<?php

/*
Title: Diagram
Post Type: stat
order: 2
priority: high
*/

piklist('field', array(
    'type' => 'text',
    'field' => 'pie_heading',
    'label' => 'Overskrift',
    'columns' => 8,
));

piklist('field', array(
    'type' => 'select',
    'field' => 'pie_type',
    'label' => 'Type',
    'columns' => 4,
    'choices' => array(
        'pie' => 'Cirkeldiagram',
        'pin' => 'Pindediagram',
    ),
));

piklist('field', array(
    'type' => 'group',
    'field' => 'pie_slices',
    'add_more' => true,
    'label' => 'Resultat',
    'fields' => array(
        
        array(
            'type' => 'text',
            'field' => 'label',
            'label' => 'Tekst',
            'columns' => 6,
        ),
        
        array(
            'type' => 'number',
            'field' => 'value',
            'label' => 'Værdi',
            'columns' => 4,
            'attributes' => array(
                'min' => 0,
                'max' => 10000,
            ),
        ),
        
        array(
            'type' => 'text',
            'field' => 'unit',
            'label' => 'Enhed',
            'columns' => 2,
        ),
    
    ),
));
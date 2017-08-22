<?php
/*
Title: Opret og rediger segmenter for sider og Forsideindhold
Setting: segment_settings
Tab: Segmenter
Flow: SegmentFlow
*/


piklist('field', array(
    'field' => 'segment_text',
    'type' => 'textarea',
    'label' => 'Beskrivelse',
    'columns' => 12,
    'attributes' => array(
        'rows' => 5,
    ),
));

piklist('field', array(
    'type' => 'group',
    'field' => 'segment',
    'label' => 'Segmenter',
    'add_more' => true,
    'template' => 'field',
    'sortable' => false, 
    'columns' => 5,
    
    'fields' => array(
        
        array(
            'columns' => 3,
            'type' => 'select',
            'field' => 'icon',
            'label' => 'Ikon',
            'choices' => array(
                '#icon-cog' => 'Tandhjul',
                '#icon-cogs' => 'Tandhjul (2)',
                '#icon-person' => 'Personer',
                '#icon-paragraf' => 'Paragraf',
                '#icon-office' => 'Kontor',
                '#icon-building' => 'Kontor (2)',
                '#icon-hammer' => 'Hammer',
                '#icon-library' => 'Bibliotek',
                '#icon-info' => 'Information',
                '#icon-build' => 'Svensknøgle',
                '#icon-handshake' => 'Håndtryk',
            ),
        ),
        
        array(
            'type' => 'text',
            'field' => 'title',
            'label' => 'Titel',
            'columns' => 6,
            'required' => true,
        ),
    ),
));
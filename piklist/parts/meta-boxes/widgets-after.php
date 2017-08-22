<?php

/*
Title: Widgets under indhold
Post Type: case, page
order: 2
Flow: CaseTabFlow, PageTabFlow
Tab: Widgets
priority: high
*/


$quote_array = array(0 => 'Vælg citat');
foreach(get_posts(array('post_type' => 'quote', 'posts_per_page' =>-1)) as $quote){
    $quote_array[$quote->ID] = $quote->post_title;
}

$case_array = array(0 => 'Vælg case');
foreach(get_posts(array('post_type' => 'case', 'posts_per_page' =>-1)) as $case){
    $case_array[$case->ID] = $case->post_title;
}

$stat_array = array(0 => 'Vælg indhold');
foreach(get_posts(array('post_type' => 'stat', 'posts_per_page' =>-1)) as $stat){
    $stat_array[$stat->ID] = $stat->post_title;
}

$contact_array = array(0 => 'Vælg medarbejder');
foreach(get_posts(array('post_type' => 'contact', 'posts_per_page' =>-1)) as $contact){
    $contact_array[$contact->ID] = $contact->post_title;
}

$form_array = array(0 => 'Vælg formular');
foreach(get_posts(array('post_type' => 'smamo_form', 'posts_per_page' => -1)) as $form){
    $form_array[$form->ID] = $form->post_title; 
}

piklist('field', array(
    'type' => 'group',
    'template' => 'field',
    'field' => 'widget_bottom',
    'add_more' => true,
    'label' => 'Widget',
    'fields' => array(
        
        array(
            'type' => 'select',
            'label' => 'Indhold',
            'field' => 'type',
            'columns' => 4,
            'choices' => array(
                '0' => 'Vælg indhold',
                'contact' => 'kontaktperson',
                'youtube' => 'Youtube-video',
                'post-list' => 'Nyheder',
                'quote' => 'Citat',
                'text' => 'Fritekst',
                'stat' => 'Statistik',
                'case' => 'Case',
                'form' => 'Formular',
            ),
        ),
        
        /* Citat */
        array(
            'type' => 'select',
            'label' => 'Citat',
            'field' => 'quote',
            'columns' => 6,
            'choices' => $quote_array,
            'conditions' => array(
                array(
                    'field' => 'widget_bottom:type',
                    'value' => 'quote',
                ),
            ),
        ),
        
        /* Kontakt */
        array(
            'type' => 'select',
            'label' => 'Kontaktperson',
            'field' => 'contact',
            'columns' => 6,
            'choices' => $contact_array,
            'conditions' => array(
                array(
                    'field' => 'widget_bottom:type',
                    'value' => 'contact',
                ),
            ),
        ),
        
        /* Statistik */
        array(
            'type' => 'select',
            'label' => 'Statistik',
            'field' => 'stat',
            'columns' => 6,
            'choices' => $stat_array,
            'conditions' => array(
                array(
                    'field' => 'widget_bottom:type',
                    'value' => 'stat',
                ),
            ),
        ),
        
        /* Formular */
        array(
            'type' => 'select',
            'label' => 'Formular',
            'field' => 'form',
            'columns' => 6,
            'choices' => $form_array,
            'conditions' => array(
                array(
                    'field' => 'widget_bottom:type',
                    'value' => 'form',
                ),
            ),
        ),
        
        /* Case */
        array(
            'type' => 'select',
            'label' => 'Cases',
            'field' => 'case',
            'columns' => 6,
            'add_more' => true,
            'choices' => $case_array,
            'conditions' => array(
                array(
                    'field' => 'widget_bottom:type',
                    'value' => 'case',
                ),
            ),
        ),
        
        /* Youtube */
        array(
            'type' => 'url',
            'label' => 'Link',
            'field' => 'url',
            'columns' => 6,
            'conditions' => array(
                array(
                    'field' => 'widget_bottom:type',
                    'value' => 'youtube',
                ),
            ),
        ),
        
        /* Fritekst */
        array(
            'type' => 'editor',
            'label' => 'Indhold',
            'field' => 'text',
            'columns' => 12,
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
                'textarea_rows' => 15,
            ),
            'attributes' => array(
                'rows' => 10,
            ),
            'conditions' => array(
                array(
                    'field' => 'widget_bottom:type',
                    'value' => 'text',
                ),
            ),
        ),
        
        /* Nyheder */
        array(
            'type' => 'number',
            'label' => 'Antal nyheder',
            'field' => 'per_page',
            'columns' => 3,
            'conditions' => array(
                array(
                    'field' => 'widget_bottom:type',
                    'value' => 'post-list',
                ),
            ),
        ),
        
    ),
));
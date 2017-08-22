<?php 
/*
Title: Tilføj forsidesektioner til segmentet {{title}}
Order: {{order}}
Tab: Segmenter
Flow: SegmentFlow
Setting: segment_settings
*/

$page_array = array(0 => 'Vælg forælderside');
foreach(get_posts(array('post_type' => 'page', 'posts_per_page' =>-1)) as $page){
    $page_array[$page->ID] = $page->post_title;
}

$quote_array = array(0 => 'Intet valgt');
foreach(get_posts(array('post_type' => 'quote', 'posts_per_page' =>-1)) as $quote){
    $quote_array[$quote->ID] = $quote->post_title;
}

$stat_array = array(0 => 'Vælg post');
foreach(get_posts(array('post_type' => 'stat', 'posts_per_page' =>-1)) as $stat){
    $stat_array[$stat->ID] = $stat->post_title;
}

$contact_array = array(0 => 'Vælg post');
foreach(get_posts(array('post_type' => 'contact', 'posts_per_page' =>-1)) as $contact){
    $contact_array[$contact->ID] = $contact->post_title;
}


$form_array = array(0 => 'Vælg formular');
foreach(get_posts(array('post_type' => 'smamo_form', 'posts_per_page' => -1)) as $form){
    $form_array[$form->ID] = $form->post_title; 
}

piklist('field', array(
    'type' => 'group',
    'add_more' => true,
    'label' => 'Forsidesektioner',
    'columns' => 12,
    'field' => 'home_section_{{index}}',
    'fields' => array(
        array(
            'columns' => 5,
            'type' => 'select',
            'field' => 'type',
            'label' => 'Sektion',
            'choices' => array(
                '0' => 'Vælg indhold',
                'page-spinner' => 'Slideshow af undersider',
                'stat-spinner' => 'Slideshow af statistik',
                'video-spinner' => 'Youtube videoer',
                'home-article' => 'Forsideartikel',
                'news-list' => 'Seneste nyt',
                'form' => 'Formular',
                'contact-list' => 'Kontaktpersoner',
                'quote' => 'Citat',
            ),
        ),

        array(
            'columns' => 3,
            'type' => 'select',
            'label' => 'Bredde',
            'field' => 'size',
            'choices' => array(
                'half' => 'Halv bredde',
                'full' => 'Fuld bredde'
            ),
        ),

        array(
            'columns' => 3,
            'type' => 'select',
            'label' => 'Hent undersider fra',
            'field' => 'parent',
            'choices' => $page_array,
            'conditions' => array(
                array(
                    'field' => 'home_section_{{index}}:type',
                    'value' => 'page-spinner',
                ),
            ),
         ),

        array(
            'columns' => 3,
            'type' => 'select',
            'label' => 'Vælg citat',
            'field' => 'quote',
            'choices' => $quote_array,
            'conditions' => array(
                array(
                    'field' => 'home_section_{{index}}:type',
                    'value' => 'quote',
                ),
            ),
         ),

        array(
            'columns' => 6,
            'type' => 'text',
            'field' => 'heading',
            'label' => 'Overskrift',
            'conditions' => array(
                'relation' => 'or',

                array(
                    'field' => 'home_section_{{index}}:type',
                    'value' => 'page-spinner',
                ),

                array(
                    'field' => 'home_section_{{index}}:type',
                    'value' => 'video-spinner',
                ),
                
                array(
                    'field' => 'home_section_{{index}}:type',
                    'value' => 'form',
                ),
            ),
        ),

        array(
            'columns' => 6,
            'type' => 'url',
            'label' => 'Video link',
            'field' => 'video_url',
            'add_more' => 'true',
            'conditions' => array(
                array(
                    'field' => 'home_section_{{index}}:type',
                    'value' => 'video-spinner',
                ),
            ),
        ),


        array(
            'columns' => 6,
            'type' => 'select',
            'label' => 'Statistk',
            'field' => 'stat',
            'choices' => $stat_array,
            'add_more' => 'true',
            'conditions' => array(
                array(
                    'field' => 'home_section_{{index}}:type',
                    'value' => 'stat-spinner',
                ),
            ),
        ),

        array(
            'columns' => 6,
            'type' => 'select',
            'label' => 'Medarbejder',
            'field' => 'contact',
            'choices' => $contact_array,
            'add_more' => 'true',
            'conditions' => array(
                array(
                    'field' => 'home_section_{{index}}:type',
                    'value' => 'contact-list',
                ),
            ),
        ),
        
        array(
            'columns' => 6,
            'type' => 'select',
            'label' => 'Formular',
            'field' => 'form',
            'choices' => $form_array,
            'conditions' => array(
                array(
                    'field' => 'home_section_{{index}}:type',
                    'value' => 'form',
                ),
            ),
        ),
    ),
));
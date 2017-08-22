<?php




add_action( "customize_register", "smamo_theme_customize_register" );
function smamo_theme_customize_register( $wp_customize ) {
    $wp_customize->remove_section('themes');
    $wp_customize->remove_section('static_front_page');
}
if (class_exists('Kirki')){


    Kirki::add_field( 'siteinfo', array(
        'type'        => 'image',
        'settings'    => 'site_logo_negative',
        'label'       => esc_attr__( 'Logo til mørk baggrund', 'smamo' ),
        'section'     => 'title_tagline',
        'default'     => '',
        'priority'    => 8,
    ) );

    Kirki::add_field( 'siteinfo', array(
        'type'        => 'textarea',
        'settings'    => 'info_long_description',
        'label'       => esc_attr__( 'Lang beskrivelse', 'smamo' ),
        'section'     => 'title_tagline',
        'default'     => '',
        'priority'    => 20,
    ) );

    Kirki::add_field( 'siteinfo', array(
        'type' => 'repeater',
        'settings' => 'info_adresses',
        'label' => 'Adresser',
        'section'     => 'title_tagline',
        'default'     => '',
        'priority'    => 100,
        'row_label' => array(
            'type' => 'text',
            'value' => esc_attr__('Adresse', 'my_textdomain' ),
        ),
        'fields' => array(

            'info_name' => array(
                'type'        => 'text',
                'label'       => esc_attr__( 'Firmanavn', 'smamo' ),
                'section'     => 'title_tagline',
                'default'     => '',
                'priority'    => 100,
            ),

            'info_address' => array(
                'type'        => 'text',
                'label'       => esc_attr__( 'Adresse', 'smamo' ),
                'section'     => 'title_tagline',
                'default'     => '',
                'priority'    => 100,
            ),

            'info_post' => array(
                'type'        => 'text',
                'label'       => esc_attr__( 'Postnummer', 'smamo' ),
                'section'     => 'title_tagline',
                'default'     => '',
                'priority'    => 100,
            ),

            'info_by' => array(
                'type'        => 'text',
                'label'       => esc_attr__( 'By', 'smamo' ),
                'section'     => 'title_tagline',
                'default'     => '',
                'priority'    => 100,
            ),

            'info_email' => array(
                'type'        => 'text',
                'label'       => esc_attr__( 'Email', 'smamo' ),
                'section'     => 'title_tagline',
                'default'     => '',
                'priority'    => 100,
            ),

            'info_telefon' => array(
                'type'        => 'text',
                'label'       => esc_attr__( 'Telefonnummer', 'smamo' ),
                'section'     => 'title_tagline',
                'default'     => '',
                'priority'    => 100,
            ),


            'info_cvr' => array(
                'type'        => 'text',
                'label'       => esc_attr__( 'CVR', 'smamo' ),
                'section'     => 'title_tagline',
                'default'     => '',
                'priority'    => 100,
            ),
        ),

    ));

    Kirki::add_field( 'siteinfo', array(
        'type' => 'repeater',
        'settings' => 'info_social',
        'label' => 'Sociale medier',
        'section'     => 'title_tagline',
        'default'     => '',
        'priority'    => 100,
        'row_label' => array(
            'type' => 'text',
            'value' => esc_attr__('Medie', 'my_textdomain' ),
        ),

        'fields' => array(

            'text' => array(
                'type'        => 'text',
                'label'       => esc_attr__( 'Titel', 'smamo' ),
                'section'     => 'title_tagline',
                'default'     => '',
                'priority'    => 100,
            ),

            'url' => array(
                'type'        => 'url',
                'label'       => esc_attr__( 'Link', 'smamo' ),
                'section'     => 'title_tagline',
                'default'     => '',
                'priority'    => 100,
            ),
        ),

    ));
}

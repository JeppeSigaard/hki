<?php
/*
Title: Medarbejder info
Post type: contact
Order: 2
*/

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

piklist('field', array(
    'type' => 'email',
    'label' => 'E-mail',
    'field' => 'email',
));

piklist('field', array(
    'type' => 'text',
    'label' => 'Telefon',
    'field' => 'phone',
));

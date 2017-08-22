<?php 

$format = isset($_GET['format']) ? esc_attr($_GET['format']) : null ;
if('json' === $format && !is_admin()){ get_template_part('json');}
else{get_template_part('site');}
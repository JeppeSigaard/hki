<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
<title><?php wp_title(' · ', true, 'right') ?></title>
<?php wp_head(); ?>
</head>
<body <?php body_class('loading'); ?>>
<?php get_template_part('svg'); ?>
<div id="page-wrapper"></div>
<?php wp_footer(); ?>
</body>
</html>

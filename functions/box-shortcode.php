<?php 

add_shortcode('box',function($attr,$content){
    
    $color = '';
    if(isset($attr['bg']) || isset($attr['color'])){
        $color = 'style="';
        $color .= isset($attr['bg']) ? 'background-color: '. esc_attr($attr['bg']) .';' : '';
        $color .= isset($attr['color']) ? 'color: '. esc_attr($attr['color']) .';' : '';
        $color .= '"';
    }
    
    $heading = (isset($attr['heading'])) ? '<h3 class="content-box-heading">'. esc_attr($attr['heading']) .'</h3>': '';
    
    return '<div class="content-box"'.$color.'>'.$heading.$content.'</div>';
});
var hideables = [ '#postdivrich', '#revisionsdiv', '#slugdiv', '#postcustom', '#commentsdiv', '#commentstatusdiv', '#authordiv', ];jQuery(function($){ if(typeof flow_page !== 'undefined' && flow_page !== 'indhold'){ for (i = 0; i < hideables.length; i++) { $(hideables[i]).hide(); } }});



var hideEditors = ['theme_page_dyn_1','theme_page_dyn_2','theme_page_dyn_3','theme_page_dyn_4','theme_page_dyn_5','theme_page_dyn_6'];
var hide_editors = function(array, showVal){
    for (i = 0; i < array.length; i++) { 
        if (array[i] !== showVal){
            jQuery('#' + array[i]).hide(); 
        }
        
        jQuery('#' + showVal).show().find('.mce-container iframe').css({height : '700px'});
    }
}

jQuery(function($){
    if ($('#_post_meta_content_show_0').length){
        var selector =  $('#_post_meta_content_show_0');
        
        hide_editors(hideEditors, selector.val());
        selector.on('change',function(){
            hide_editors(hideEditors, selector.val());
        });
    }
    
});
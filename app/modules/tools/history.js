const Globals = require('../global/global.js'),
      _ = require('../underscore/underscore_main.js');

class historyHandler {

    constructor( obj ) {

        window.onpopstate = function(event){
            this.pop(event);
        }.bind(this);
    }

    // Replace the current history state
    replace(obj){
        history.replaceState(obj, obj.title, obj.url);
        _('body').removeClass('loading');
    }

    // Add new history state
    push(obj, cb){
        
        if(obj == null) return;
        if(obj.title == null) return;
        if(obj.url == null) return;
        if(obj.post_id == null) return;
        if(obj.template == null) return;

        // Set title
        document.title = obj.title.replace(/(<([^>]+)>)/ig,"") + ' · ' + Globals.theme_settings.site_name;
        
        // Push state        
        history.pushState(obj, obj.title, obj.url);

        // Google analytics send pageview
        if(typeof ga == 'function'){
            ga('send', 'pageview', obj.url);
        }
        
        Globals.theme_settings.post_id = obj.post_id;
        Globals.theme_settings.post_type = obj.post_type;
        Globals.theme_settings.template = obj.template;
        Globals.theme_settings.segments = obj.segments;
        
        
        Globals.hooks.trigger('history-push', obj);
        Globals.hooks.trigger('change-page', obj);
        
        
        _('body').removeClass('loading');
        if (typeof cb == 'function') cb();
    }

    // handles pop state
    pop(event, cb){
        
        if(event.state == null) return;

        Globals.theme_settings.post_id = event.state.post_id;
        Globals.theme_settings.template = event.state.template;
        
        // Set title
        document.title = event.state.title.replace(/(<([^>]+)>)/ig,"") + ' · ' + Globals.theme_settings.site_name;
        
        Globals.hooks.trigger('history-pop', event.state);
        Globals.hooks.trigger('change-page', event.state);
        
        _('body').removeClass('loading');
        if (typeof cb == 'function') cb();
    }

} module.exports = historyHandler;

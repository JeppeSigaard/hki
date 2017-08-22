

// Hook Handler
class HookHandler {

    /* ---- Constructor ---- */
    constructor() {
        this.hooks = { };
        this.hook_counter = 0;
    }

    /* ---- Add hook ---- */
    add( event, func ) {
        this.hook_counter ++;
        if(this.hooks[event] == null) this.hooks[event] = {};
        this.hooks[event][this.hook_counter] = func;
        return this.hook_counter;
    }
    
    /* ---- Trigger ---- */
    trigger( event, data ) {
        if ( this.hooks[event] != null ) {
            for (let key in this.hooks[event]) {
                if (this.hooks[event].hasOwnProperty(key)) {
                    this.hooks[event][key](data);
                }
            }
        }
    }
    
    /* ------Remove hook----- */
    remove(event, key){
        delete this.hooks[event][key];   
    }

} module.exports = HookHandler;

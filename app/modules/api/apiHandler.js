let Globals = require('../global/global.js');
class apiHandler{
    
    constructor(){
        
    }
    
    async(url){
       return new Promise(( resolve, reject ) => {
            
           // Opens new request
            let request = new XMLHttpRequest();
            request.addEventListener( 'load', ( data ) => {
                
                if (request.getResponseHeader('content-type') === 'application/json') resolve ( JSON.parse(data.target.response) );
                else resolve(false);
                
            });

            // Sends request
            request.open( 'GET', url + '?format=json');
            request.send();
        });   
    }
    
    getForm(id){
        return new Promise(( resolve, reject ) => {
            // Opens new request
            let request = new XMLHttpRequest();
            request.addEventListener( 'load', ( data ) => {
                resolve ( JSON.parse(data.target.response) );
            });

            // Sends request
            request.open( 'GET', Globals.theme_settings.api_url + 'smamo-forms/form/' + id);
            request.send();
        });
    }
    
    get(edge, properties){
        return new Promise(( resolve, reject ) => {

            let c = 0, query = '';
            
            // Sets get params using properties
            if ( typeof properties === 'object' ||
                 properties.length < 1 ) {

                // Set query string
                if(properties != null){
                    for(var k in properties){
                        c++; query += (c > 1) ? '&' : '?';
                        if(properties.hasOwnProperty(k)){
                            query += encodeURIComponent(k) + '=' + encodeURIComponent(properties[k]);
                        }
                    }
                }
            }
            
            // Opens new request
            let request = new XMLHttpRequest();
            request.addEventListener( 'load', ( data ) => {
                resolve ( JSON.parse(data.target.response) );
            });

            // Sends request
            request.open( 'GET', Globals.theme_settings.api_url + 'theme/' + edge + query );
            request.send();
        }); 
    }
}

module.exports = apiHandler;
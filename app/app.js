'use strict';
let React = require( 'react' ),
    ReactDOM = require( 'react-dom' ),
    HomePage = require( './pages/main.js' ),
    apiHandler = require( './modules/api/apiHandler.js' ),
    urlvar = require( './modules/tools/urlvar.js' ),
    historyHandler = require( './modules/tools/history.js' ),
    Globals = require('./modules/global/global.js');

require( '../style/style.scss' );

Globals.theme_settings = theme_settings;
Globals.history = new historyHandler;
Globals.api = new apiHandler;
Globals.urlvar = new urlvar;

window.addEventListener('scroll', () => {
    window.requestAnimationFrame( () => {
        Globals.hooks.trigger('scroll', window.scrollY);
    });
});

let root = document.getElementById( 'page-wrapper' );
ReactDOM.render( <HomePage/>, root);

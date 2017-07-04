'use strict';
let React = require( 'react' ),
    ReactDOM = require( 'react-dom' ),
    HomePage = require( './pages/home.js' );

require( '../style/style.scss' );
let root = document.getElementById( 'page-wrapper' );
ReactDOM.render( <HomePage />, root);

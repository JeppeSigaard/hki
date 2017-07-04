// Requires
let React = require( 'react' ),
    ReactDOM = require( 'react-dom' ),
    Global = require('../modules/global/global.js');

class HomePage extends React.Component {

    // Constructor
    constructor() {
        super();
    }

    // Render
    render() {
        return (
            <div id="page-content"></div>
        );
    }

} module.exports = HomePage;

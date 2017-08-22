// Text Processor
const React = require( 'react' );
class TextPreprocessor {

    // NL2P
    nl2p( text ) {
        if (text == null) return '';
        
        let paras = text.split( /[\r\n]+/g ), resp = [];
        for ( let iter = 0; iter < paras.length; iter++ ) {
            resp.push( <p key={ 'esvpara-' + iter } >{ paras[iter] }</p> );
        } return resp;
    };

    // replacement chars
    ripRep (text){
        if(typeof text === 'undefined'|| null === text){return '';}
        return text.replace(/\uFFFD/g, '');
    };
    
    strong(text){
        let n = text.replace(/\[strong\]/g, '<strong>');
        return n.replace(/\[\/strong\]/g,'</strong>')
    };

    
    nl2pd(text){
        let paras = text.split( /[\r\n]+/g ), resp = '';
        for ( let iter = 0; iter < paras.length; iter++ ) {
            resp += '<p>' + paras[iter] + '</p>';
        } return resp;
    };
    
} module.exports = TextPreprocessor;

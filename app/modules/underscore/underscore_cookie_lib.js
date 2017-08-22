

(( ) => {

    // Object
    const underscorecookit = {

        set: ( key, value, expireDays ) => {

            const val = (typeof value === 'object' || typeof value === 'array') ? encodeURIComponent(value) : value;

            let d = new Date(); d.setTime( d.getTime() + expireDays*24*60*60*1000 );
            document.cookie = key+'='+val+';expires='+d.toUTCString()+';path=/;';
        },

        read: key => {
            let cookie = decodeURIComponent(document.cookie),
                splittet = cookie.split(';');

            key = key+'=';
            for ( let iter = 0; iter < splittet.length; iter++ ) {
                while ( splittet[ iter ].charAt(0) == ' ' ) {
                    splittet[ iter ] = splittet[ iter ].substring(1);
                }

                if ( splittet[ iter ].indexOf( key ) == 0 ) {
                    return splittet[ iter ].substring( key.length, splittet[ iter ].length );
                }
            } return '';
        },

    };

    // Sets cookit as object on window
    window._cookielib = underscorecookit;

})();

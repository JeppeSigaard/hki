<?php

add_filter( 'rest_url_prefix', 'buddydev_api_slug');
function buddydev_api_slug( $slug ) {
    return 'api';
}

'use strict';

const path = require('path');

/**
 * Allows to configure aliases for you require loading
 */
module.exports.aliasConfig = {
    // enter all aliases to configure

    alias : {
        base: path.resolve(
            process.cwd(), // eslint-disable-next-line max-len
            '../storefront-reference-architecture/cartridges/app_storefront_base/cartridge/client/default/'
        ),
        core: path.resolve(
            process.cwd(), // eslint-disable-next-line max-len
            '../app-yeti-core/cartridges/app_yeti_core/cartridge/client/default/'
        )//,
        // site: path.resolve(
        //     process.cwd(), // eslint-disable-next-line max-len
        //     '../app-yeti-core/cartridges/app_yeti_site/cartridge/client/default/'
        // )
    }
}

/**
 * Exposes cartridges included in the project
 */
module.exports.cartridges = [
'../storefront-reference-architecture/cartridges/app_storefront_base',
'../app-yeti-core/cartridges/app_yeti_core'//,
//'../app-yeti-core/cartridges/app_yeti_site'
];

'use strict';

var path = require('path');
var webpack = require('sgmf-scripts').webpack;
var ExtractTextPlugin = require('sgmf-scripts')['extract-text-webpack-plugin'];
var jsFiles = require('sgmf-scripts').createJsPath();
var scssFiles = require('sgmf-scripts').createScssPath();

var bootstrapPackages = {
    Alert: 'exports-loader?Alert!bootstrap/js/src/alert',
    // Button: 'exports-loader?Button!bootstrap/js/src/button',
    Carousel: 'exports-loader?Carousel!bootstrap/js/src/carousel',
    Collapse: 'exports-loader?Collapse!bootstrap/js/src/collapse',
    // Dropdown: 'exports-loader?Dropdown!bootstrap/js/src/dropdown',
    Modal: 'exports-loader?Modal!bootstrap/js/src/modal',
    // Popover: 'exports-loader?Popover!bootstrap/js/src/popover',
    Scrollspy: 'exports-loader?Scrollspy!bootstrap/js/src/scrollspy',
    Tab: 'exports-loader?Tab!bootstrap/js/src/tab',
    // Tooltip: 'exports-loader?Tooltip!bootstrap/js/src/tooltip',
    Util: 'exports-loader?Util!bootstrap/js/src/util'
};

module.exports = function (env) {
    var config = [{
        mode: env.dev === true ? 'development' : 'production',
        devtool: env.dev === true ? 'source-map' : undefined,
        stats: 'minimal',
        cache: true,
        performance: {
            hints: false
        },
        name: 'js',
        entry: jsFiles,
        output: {
            path: path.resolve('./cartridges/app_yeti_core/cartridge/static'),
            filename: '[name].js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/env'],
                            plugins: ['@babel/plugin-proposal-object-rest-spread'],
                            cacheDirectory: true
                        }
                    }
                }
            ]
        },
        resolve: {
            alias: {
                // SFRA
                jquery: path.resolve(__dirname, '../storefront-reference-architecture/node_modules/jquery'), // prevents jquery from loading twice
                bootstrap: path.resolve(__dirname, '../storefront-reference-architecture/node_modules/bootstrap'),
                cleave: path.resolve(__dirname, '../storefront-reference-architecture/node_modules/cleave'),
                'flag-icon-css': path.resolve(__dirname, '../storefront-reference-architecture/node_modules/flag-icon-css'),
                'font-awesome': path.resolve(__dirname, '../storefront-reference-architecture/node_modules/font-awesome')
            }
        },
        plugins: [new webpack.ProvidePlugin(bootstrapPackages)]
    }, {
        mode: env.dev === true ? 'development' : 'production',
        devtool: env.dev === true ? 'source-map' : undefined,
        stats: 'minimal',
        cache: true,
        performance: {
            hints: false
        },
        name: 'scss',
        entry: scssFiles,
        output: {
            path: path.resolve('./cartridges/app_yeti_core/cartridge/static'),
            filename: '[name].css'
        },
        module: {
            rules: [{
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: 'css-loader',
                        options: {
                            url: false,
                            sourceMap: (env.dev === true),
                            minimize: (env.dev === false)
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')()
                            ],
                            sourceMap: (env.dev === true),
                            minimize: (env.dev === false)
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            includePaths: [
                                path.resolve('node_modules'),
                                path.resolve('node_modules/flag-icon-css/sass')
                            ],
                            sourceMap: (env.dev === true),
                            minimize: (env.dev === false)
                        }
                    }]
                })
            }]
        },
        plugins: [
            new ExtractTextPlugin({ filename: '[name].css' })
        ]
    }];

    return config;
};

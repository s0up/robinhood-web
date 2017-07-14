const path = require('path');

module.exports = {
	webpack: {
        /***************************************************************************
         *                                                                         *
         * The webpack compilation should finished before this timeout or sails.js *
         * will not start                                                          *
         *                                                                         *
         ***************************************************************************/
        // _hookTimeout: 60000,

        /***************************************************************************
         *                                                                         *
         * A prefix to add to the hook logs                                        *
         *                                                                         *
         ***************************************************************************/
        // logPrefix: 'sails-hook-webpack2:',


        /***************************************************************************
         *                                                                         *
         * Options passed to webpack                                               *
         *                                                                         *
         ***************************************************************************/
		options: {
			context: path.resolve(__dirname, '../webpack/'),
		},

        /***************************************************************************
         *                                                                         *
         * Options for the middlewares used during development                     *
         * - hot: is for (webpack-hot-middleware)                                  *
         *                   [https://github.com/glenjamin/webpack-hot-middleware] *
         * - dev: is for (webpack-dev-middleware)                                  *
         *                     [https://github.com/webpack/webpack-dev-middleware] *
         * - history: is for (connect-history-api-fallback)                        *
         *              [https://github.com/bripkens/connect-history-api-fallback] *
         *                                                                         *
         ***************************************************************************/
        middlewares: {
          hot: { quiet: false },
          dev: { quiet: false },
          history: {}
        },


        /***************************************************************************
         *                                                                         *
         * This get merged with the webpack options by the hook when sails lift    *
         *                                                                         *
         ***************************************************************************/
		production: require('../webpack/build/webpack.prod.conf.js'),
		development: require('../webpack/build/webpack.dev.conf.js'),
        testing: require('../webpack/build/webpack.dev.conf.js')
	}
}
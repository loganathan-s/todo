/* 'require' to import module, used by commonJS  which webpack understand */
const webpack = require('webpack');

/* Application Env  */
const nodeEnv = process.env.NODE_ENV || 'production';

module.exports = {
	devtool: 'source-map',
	/* Where do you want to make entry point for the app, in this app 'app.js' is the entry point */
	entry: {
		"main": "./src/js/app.js"
	},
    /* Where should the webpack output has to be placed,  in this app '_build' is the output destination */
	output: {
		filename: './public/_build/bundle.js'

	},
	module: {
		/* Loaders are transformers, converting any files from one format to another, here babel will convert ES6 to ES5 */
		loaders: [
			{
				/* Files to look for JS compress */
				test: /\.js$/,
				/* exclude node_modules dir for JS transformation */
				exclude: /node_modules/,
				/* loader which does transformation*/
				loader: 'babel-loader',
				query: {
					presets: ['es2015-native-modules']
				}
			}
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
	      compress: {
	        warnings: false
	      },
	      output: {
	        comments: false
	      },
	      sourceMap: true
	    }),
	    new webpack.DefinePlugin({
	      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
	    })
	]
}

const path = require( 'path' );

module.exports = {
	entry: './src/index.ts',
	mode: 'production',
	output: {
		// path: path.resolve( __dirname, 'dist' ),
		path: '/ramdisk/dist',
		filename: '[name].js',
		libraryTarget: 'umd',
		library: 'os3@/fsoft-components',
		umdNamedDefine: true
	},
	resolve: {
		extensions: [ '.ts', '.tsx', '.js', '.jsx' ],
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				options: {
					transpileOnly: true,
				},
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ],
			},
		],
	}
};
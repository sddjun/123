var path = require("path");
module.exports = {
	debug:true,
	entry:{
		index : "./src/main.js"
	},
	output:{
		path:"./app",
		filename:"index.js",
	},
	module:{
		loaders:[
			{test: /\.vue$/,loader:"vue"},
			{test: /\.css$/,loader:"style!css"},
			{test: /\.(gif|jpg|png|svg)$/, loader: "url?limit=8192&name=[path][name].[ext]"},
			{test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,loader: "url-loader?limit=10000&name=[path][name].[ext]&minetype=application/font-woff"},
			{test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,loader: "file-loader?name=[path][name].[ext]"},
		]
	}
}

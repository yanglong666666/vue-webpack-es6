/**
 * Created by dell on 2017/9/26.
 */
var webpack=require('webpack');
module.exports = {

    entry: "./app/runoob1.js",
    output: {
        path: __dirname,
        filename: "app/bundle.js"
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "es2015"//, "react"
                        ]
                    }
                },
                exclude: /node_modules/
            }
        ],
        loaders: [
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
        ]
    },
    plugins:[
        new webpack.BannerPlugin('菜鸟教程 webpack 实例')
    ]
};

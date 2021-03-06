const path = require('path');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');

module.exports = {
    entry: {
        index: './index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name][hash:4].bundle.js'
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [{
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|svg|gif)$/,
                use: [{
                        loader: 'url-loader',
                        options: {
                            name: '[name][hash:4].[ext]',
                            limit: 100,
                            outputPath: 'img'
                        }
                    },
                    {
                        loader: 'img-loader',
                        options: {
                            plugins: [
                                require('imagemin-mozjpeg')({
                                    progressive: true,
                                    arithmetic: false
                                }),
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            attrs:['img:src']
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'img-process',
            filename: 'index.html',
            template: './index.html',

            minify: {
                // 清理注释
                removeComments: true,
                collapseWhitespace: true  
            }
        }),
        new Webpack.HotModuleReplacementPlugin()
    ],
    // mode: "development",
    devServer: {
        port: '9091',
        contentBase:'dist',
        hot: true
    }
}
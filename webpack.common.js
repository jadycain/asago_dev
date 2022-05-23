const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ASSET_PATH = process.env.ASSET_PATH || '../';
const VueLoaderPlugin = require('vue-loader/lib/plugin')


module.exports = {
    target: 'web',
    entry: {
        index: './src/main.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './js/[name].[hash].js',
    },
    module: {
        rules: [
            // {
            //     test: /\.vue$/,
            //     loader: 'vue-loader'
            // },
            {
                test: /\.s[ac]ss$/i,
                use:[
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: ASSET_PATH,
                        },
                    },
                    'css-loader', 'sass-loader'
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use:[
                    {
                        loader: 'babel-loader',
                        // options: {
                        //     presets: ['@babel/preset-env']
                        // }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp)$/i,
                exclude: /node_modules/,
                use:[
                    {
                        loader: 'url-loader',
                        options: {
                            name: './img/[name].[ext]',
                            limit: 1000, 
                        },
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|)$/,
                use:[
                    {
                        loader: 'file-loader',
                        options: {
                            name: './font/[name].[ext]',
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        // extensions: ['.vue', '.mjs', '.js', '.json'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@img': path.resolve(__dirname, 'src/img'),
            // vue$: 'vue/dist/vue.runtime.esm.js',
        },
    },
    plugins: [
        new CleanWebpackPlugin(),
        // new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: './css/[name].[hash].css',
            chunkFilename: "./css/[name].[hash].css"
        }),
        new CopyWebpackPlugin({
            patterns:[
                {
                    from: path.join(__dirname, 'src/assets/'),
                    to: 'img'
                }
            ]
        }),
        
        // new CopyWebpackPlugin({
        //     patterns:[
        //         {
        //             from: path.join(__dirname, 'src/json/'),
        //             to: 'json'
        //         }
        //     ]
        // }),
        new CopyWebpackPlugin({
            patterns:[
                {
                    from: path.join(__dirname, 'src/vendor/'),
                    to: 'vendor'
                }
            ]
        }),
        new HtmlWebpackPlugin({
            // template: './src/public/index.html',
            template: './src/index.html',
            filename: 'index.html',
        }),

        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    autoprefixer()
                ]
            }
        }),
    ],
};
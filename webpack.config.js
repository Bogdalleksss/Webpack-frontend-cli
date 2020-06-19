const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const PATH = {
    dist: path.resolve(__dirname, 'public'),
    src: path.resolve(__dirname, 'src')
}

module.exports = {
    context: PATH.src,
    entry: {
        main: ['@babel/polyfill', './index.js']
    },
    output: {
        filename: './js/[name].js',
        path: PATH.dist,
    },
    resolve: {
        extensions: ['.js', '.sass', '.css'],
        alias: {
            '@' : PATH.src
        }
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    devServer: {
        port: 4300
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.pug',
            filename: 'index.html'
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/img'),
                    to: path.resolve(__dirname, 'public/img')
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: `css/[name].css`
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader, 
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: {
                                path: 'postcss.config.js'
                            }
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                loader: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ]
                    }
                }
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader, 
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: {
                                path: 'postcss.config.js'
                            }
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }   
                ]
            },
            {
                test: /\.pug$/,
                use: ['pug-loader']
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            }
        ]
    }
}
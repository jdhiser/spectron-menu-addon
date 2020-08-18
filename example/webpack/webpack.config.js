var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var path = require('path')
var libraryName = 'SpectronMenuAddon'

function DtsBundlePlugin(libraryName) {
  this.libraryName = libraryName
}
DtsBundlePlugin.prototype.apply = function(compiler) {
  compiler.plugin(
    'done',
    function(params) {
      var dts = require('dts-bundle')

      dts.bundle({
        name: this.libraryName,
        main: 'dist/index.d.ts',
        out: 'index.d.ts',
        removeSource: true,
        outputAsModuleFolder: true // to use npm in-package typings
      })
    }.bind(this)
  )
}

module.exports =  [
{
  target: 'electron-main',
  mode: 'development',
  devtool: 'source-map',

  node: {
    __dirname: false
  },

  entry: {
    main: './main.ts',
  },

  output: {
    filename: '[name].js',
    publicPath: '',
    path: path.resolve(__dirname, '../dist'),
    libraryTarget: 'umd',
    library: libraryName,
    umdNamedDefine: true
  },

  context: path.resolve(__dirname, '../src'),

  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: ['ts-loader']
      },
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'ts-loader',
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
},
{
  target: 'electron-renderer',
  mode: 'development',
  devtool: 'source-map',

  node: {
    __dirname: false
  },

  entry: {
    renderer: './renderer.tsx'
  },

  output: {
    filename: '[name].js',
    publicPath: '',
    path: path.resolve(__dirname, '../dist'),
    libraryTarget: 'umd',
    library: libraryName,
    umdNamedDefine: true
  },

  context: path.resolve(__dirname, '../src'),

  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: ['ts-loader']
      },
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'ts-loader',
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
}
]

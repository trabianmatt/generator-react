var webpack = require('webpack');

module.exports = {

  output: {
    filename: '[name].js',
    path: './build'
  },

  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/dev-server',
      './src/index.jsx'
    ],
<% if (includeCosmos) { -%>
    playground: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/dev-server',
      './node_modules/cosmos-js/component-playground/entry.js'
    ]
<% } %>
  },

  module: {
    preLoaders: [
      {test: /\.jsx?$/, loader: 'eslint-loader', exclude: /node_modules/}
    ],
    loaders: [
      { test: /\.jsx?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style-loader!css-loader?module&localIdentName=[name]__[local]___[hash:base64:5]&importLoaders=1!postcss-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style-loader!css-loader!postcss-loader?pack=nodeModules', include: /node_modules/ }
    ]
  },

  devServer: {
    contentBase: './build',
    hot: true
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  postcss: {
    nodeModules: [],
    defaults: [
      require('postcss-nested'),
      require('postcss-import'),
      require('postcss-simple-vars'),
      require('postcss-calc')(),
      require('postcss-color-function')(),
      require('autoprefixer-core')({ browsers: ['last 2 versions']})
    ]
  },

  resolve: {
<% if (includeCosmos) { -%>
    alias: {
      components: __dirname + '/src/components',
      fixtures: __dirname + '/dev/fixtures'
    },
<% } %>
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules'<% if (includeCosmos) { %>, 'components'<% } %>]
  }

};

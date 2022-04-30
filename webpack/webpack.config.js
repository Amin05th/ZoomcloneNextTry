const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, '..', './src/Meetingroomindex.tsx'),
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, '..', './Meetingbuild'),
    filename: 'BundleMeeting.js',
  },
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(
        __dirname,
        '..',
        './src/HtmlFiles/Meetingroom.html'
      ),
      filename: 'Meetingroom.html',
    }),
  ],
}

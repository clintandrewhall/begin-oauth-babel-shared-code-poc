const path = require('path');
const fs = require('fs');
const CopyPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const lib = path.resolve(__dirname, 'lib/http');
const entry = {};
const copies = [];
const externals = [nodeExternals()];

fs.readdirSync(lib).forEach(mod => {
  if (mod.startsWith('.')) {
    return;
  }

  const lib = `./lib/http/${mod}`;
  const src = `src/http/${mod}`;

  entry[`${src}/index`] = lib;

  // Add copying rules
  copies.push({
    from: lib,
    to: src,
    ignore: ['*.ts'],
  });

  // Add externals rules
  externals.push(nodeExternals({ modulesDir: `${lib}/node_modules` }));
});

module.exports = {
  mode: 'development',
  entry,
  output: {
    libraryTarget: 'commonjs',
    path: __dirname,
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  externals,
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [new CopyPlugin(copies)],
};

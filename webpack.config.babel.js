import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import packageJson from './package.json';

const main = () => {
  const PROD = process.argv.includes('-p');
  const min = PROD ? '.min' : '';

  return {
    entry: { [packageJson.name]: './src/js/index.js' },
    output: {
      filename: `[name]${min}.js`,
      path: path.resolve(__dirname, 'dist'),
      library: 'CoveredVideoPlayer',
      libraryTarget: 'umd',
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: `${packageJson.name} demo`,
        filename: path.resolve(__dirname, 'index.html'),
        template: path.resolve(__dirname, 'src/html/index.html'),
      }),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    'env',
                    {
                      targets: {
                        browsers: ['> 1%', 'last 5 versions'],
                      },
                    },
                  ],
                  'stage-0',
                ],
              },
            },
          ],
        },
      ],
    },
    devtool: PROD ? false : 'source-maps',
  };
};

export default main;

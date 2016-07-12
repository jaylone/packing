import path from 'path';
import webpack from 'webpack';
import CleanPlugin from 'clean-webpack-plugin';
// import CopyWebpackPlugin from 'copy-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ReplaceHashWebpackPlugin from 'replace-hash-webpack-plugin';
import RevWebpackPlugin from 'packing-rev-webpack-plugin';
import strip from 'strip-loader';
import autoprefixer from 'autoprefixer';
import glob from 'glob';
import packing from './packing.config';

const {
  dist,
  templates,
  entries,
  assets,
  assetsDist,
  templatesDist,
  templatesPages,
} = packing.path;
const { templateExtension } = packing;
const cwd = process.cwd();

/**
 * 根据文件的目录结构生成entry配置
 */
const initConfig = () => {
  // const jsExt = '.js';
  const entryConfig = {};

  glob.sync(`**/*${templateExtension}`, {
    cwd: path.resolve(cwd, templatesPages)
  }).forEach(page => {
    const key = page.replace(templateExtension, '');
    const value = `./${entries}/${key}/entry.js`;

    // 写入页面级别的配置
    entryConfig[key] = value;
  });
  // console.log(entryConfig);
  return entryConfig;
};

/**
 * options:
 * options.hot
 * options.release
 * options.longTermCaching
 * options.build
 * options.progress
 * options.devtool
 * options.minimize
 */
const webpackConfig = (options) => {
  const entryConfig = initConfig();
  const projectRootPath = path.resolve(__dirname, '../');
  const assetsPath = path.resolve(projectRootPath, `./${dist}/assets`);
  const chunkhash = options.longTermCaching ? '-[chunkhash:8]' : '';

  const devtool = options.devtool ? 'inline-source-map' : 'source-map';
  const progress = options.progress;
  const context = path.resolve(__dirname, '..');

  const entry = entryConfig;

  const output = {
    chunkFilename: `[name]${chunkhash}.js`,
    filename: `[name]${chunkhash}.js`,
    // prd环境静态文件输出地址
    path: assetsPath,
    // dev环境下数据流访问地址
    publicPath: '',
    // publicPath: '/assets/'
  };

  /* eslint-disable */
  let moduleConfig = {
    loaders: [
      { test: /\.js?$/, loaders: [strip.loader('debug'), 'babel'], exclude: /node_modules/},
      { test: /\.less$/, loader: ExtractTextPlugin.extract('style', 'css?importLoaders=2!postcss!less?outputStyle=expanded&sourceMapContents') },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css?importLoaders=2!postcss!sass?outputStyle=expanded&sourceMapContents') },
      { test: /\.json$/, loader: 'json' },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
      { test: /\.jpg$/, loader: 'url?name=[name]-[hash:8].[ext]&limit=10240' },
      { test: /\.jade$/, loader: 'jade' },
      { test: /\.html$/, loader: 'html' },
      { test: /\.ejs$/, loader: 'ejs' },
      { test: /\.tpl$|.smart$/, loader: 'smarty' },
      { test: /\.handlebars$/, loader: 'handlebars' },
      { test: /\.mustache$/, loader: 'mustache' },
    ]
  };

  const postcss = () => [autoprefixer];

  const resolve = {
    alias: {
      'env-alias': path.resolve(__dirname, '../src/config/env', process.env.NODE_ENV)
    },
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js', '.jsx']
  };

  const plugins = [
    new CleanPlugin([dist], {
      root: projectRootPath
    }),

    // replace hash时也会将template生成一次，这次copy有些多余
    // new CopyWebpackPlugin([{
    //   context: templates,
    //   from: '**/*',
    //   to: path.resolve(cwd, templatesDist),
    // }]),

    // css files from the extract-text-plugin loader
    new ExtractTextPlugin(`[name]${chunkhash}.css`, {
      allChunks: true
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),

    new ReplaceHashWebpackPlugin({
      assetsDomain: process.env.CDN_ROOT,
      cwd: templates,
      src: `**/*${templateExtension}`,
      dest: templatesDist,
    }),

    new RevWebpackPlugin({
      cwd: assets,
      src: '**/*',
      dest: assetsDist,
    }),

  ];

  // 从配置文件中获取并生成webpack打包配置
  if (packing.commonChunks) {
    const chunkKeys = Object.keys(packing.commonChunks);
    chunkKeys.forEach((key) => {
      entry[key] = packing.commonChunks[key];
    });

    // 扩展阅读 http://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
    plugins.push(
      new webpack.optimize.CommonsChunkPlugin({ names: chunkKeys })
    );
  }


  if (options.minimize) {
    plugins.push(
      // optimizations
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          drop_debugger: true,
          drop_console: true,
        },
        comments: /^!/,
      })
    );
  }

  return {
    devtool,
    context,
    progress,
    entry,
    output,
    module: moduleConfig,
    postcss,
    resolve,
    plugins,
  };
};

export default webpackConfig({
  devtool: false,
  progress: true,
  longTermCaching: true,
  minimize: true,
});

const merge = require("webpack-merge")
const commonMod = require("./webpack.sw.common.config")
const path = 

module.exports = (env) => {
  const common = commonMod(env);
  return merge(common, {
    mode: "production",
    output: {
      chunkFilename: 'dist/[name].js',
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            {loader: 'postcss-loader', options: {config: {path: "./"}}}
          ]
        }
      ]
    }
  })
};

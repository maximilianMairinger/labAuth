const merge = require("webpack-merge")
const commonMod = require("./webpack.replApp.common.config")
const path = 

module.exports = (env) => {
  const common = commonMod(env);
  return merge(common, {
    mode: "production",
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

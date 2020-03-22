const merge = require("webpack-merge")
const commonMod = require("./webpack.common.config.cjs")

module.exports = (env) => {
  const common = commonMod(env);
  return merge(common, {
    mode: "development",
    devtool: 'inline-source-map'
  })
};

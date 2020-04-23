const merge = require("webpack-merge")
const commonMod = require("./webpack.replServer.common.config")
const path = 

module.exports = (env) => {
  const common = commonMod(env);
  return merge(common, {
    mode: "production"
  })
};

import merge from "webpack-merge"
import commonMod from "./rollup.server.common.config"


export default merge(commonMod, {
  watch: {
    include: 'replServer/src/**',
    exclude: 'node_modules/**'
  }
})
const InjectPlugin = require("webpack-inject-plugin")
const path = require("path")

module.exports = () => {
    return {
        entry: './serviceWorker/index.ts',
        output: {
            filename: 'public/dist/sw/sw.js',
            chunkFilename: 'dist/[name].js',
            path: path.resolve(path.dirname('')),
            publicPath: "/"
        },
        resolve: {
            extensions: ['.ts', '.js']
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'ts-loader',
                        options: {
                            configFile: "tsconfig.app.json"
                        }
                    },
                }
            ]
        }
    }
};

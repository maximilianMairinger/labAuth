const InjectPlugin = require("webpack-inject-plugin")
const path = require("path")

module.exports = () => {
    return {
        entry: './serviceWorker/app.ts',
        output: {
            filename: 'sw.js',
            chunkFilename: 'sw.[name].js',
            path: path.resolve(path.dirname(''), "public"),
            publicPath: "/"
        },
        resolve: {
            extensions: ['.ts', '.js']
        },
        module: {
            rules: [
                {
                    test: /([a-zA-Z0-9\s_\\.\-\(\):])+\.static\.([a-zA-Z0-9])+$/,
                    use: 'raw-loader',
                },
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

const InjectPlugin = require("webpack-inject-plugin")
const path = require("path")

module.exports = () => {
    return {
        entry: './app/index.ts',
        output: {
            filename: 'dist/app.js',
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
                },
                {
                    test: /\.css$/,
                    use: ['to-string-loader', 'css-loader'],
                },
                {
                    
                    test: /\.(png|jpg|gif|jpeg|woff|woff2|eot|ttf|svg)$/,
                    loader: 'url-loader?limit=100000'
                },
                {
                    test: /\.pug$/,
                    loader: ['raw-loader', 'pug-html-loader']
                }
            ]
        }
    }
};

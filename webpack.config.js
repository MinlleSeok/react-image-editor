module.exports = {
    mode: 'development',

    // Entry Point
    entry: './src/index.tsx',

    // Build Result => build/main.js
    output: {
        filename: 'main.js',
        path: __dirname + '/build',
    },

    // Source Mapping
    devtool: 'source-map',

    resolve: {
        // File Extension
        extensions: ['.ts', '.tsx', '.js'],
    },

    module: {
        rules: [
            // ts-loader => .ts .tsx
            { test: /\.tsx?$/, loader: 'ts-loader' },
            { test: /\.s[ac]ss$/i, use: ['style-loader', 'css-loader', 'sass-loader']}
        ],
    },
    devServer: {
        contentBase: './',
        publicPath: '/build',
    },
};

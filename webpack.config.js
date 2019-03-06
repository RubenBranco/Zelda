const path = require('path');

const baseSrcPath = path.resolve(
    __dirname,
    'src',
    'deps',
    'src',
);

const baseStaticPath = path.resolve(
    __dirname,
    'src',
    'deps',
    'static',
);

const baseJs = path.resolve(
    baseSrcPath,
    'common',
    'base.js',
);

module.exports = {
    entry: {
        frontpage: [
            baseJs,
            path.resolve(
                baseSrcPath,
                'common',
                'frontpage.js',
            )
        ],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(
            baseStaticPath,
            'js',
        ),
    },
    module: {
        rules: {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
            }
        },
    },
}

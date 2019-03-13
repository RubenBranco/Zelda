const path = require('path');
const glob = require('glob');


const baseSrcPath = path.resolve(
    'src',
    'zelda',
    'deps',
    'src',
);

const baseStaticPath = path.resolve(
    'src',
    'zelda',
    'deps',
    'static',
);

module.exports = {
    mode: 'production',
    entry: glob.sync(path.resolve(baseSrcPath, "Pages", "*.jsx")),
    output: {
        filename: '[name].js',
        path: path.resolve(
            baseStaticPath,
            'js',
        ),
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
            }
        }],
    },
    watch: true
}

const path = require('path');


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
    entry: {
        login: path.resolve(baseSrcPath, "Pages", "login.jsx"),
        frontpage: path.resolve(baseSrcPath, "Pages", "frontpage.jsx"),
        profattendances: path.resolve(baseSrcPath, "Pages", "profattendances.jsx"),
        userprofile: path.resolve(baseSrcPath, "Pages", "userprofile.jsx"),
    },
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

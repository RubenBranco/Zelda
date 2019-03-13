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
        // frontpage: [
        //     baseJs,
        //     path.resolve(
        //         baseSrcPath,
        //         'Pages',
        //         'frontpage.js',
        //     )
        // ],
        login: path.resolve(baseSrcPath, 'Pages', 'login.jsx'),
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

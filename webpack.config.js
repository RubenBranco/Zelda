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
        profcheckshiftlessstudents: path.resolve(baseSrcPath, "Pages", "profcheckshiftlessstudents.jsx"),
        userprofile: path.resolve(baseSrcPath, "Pages", "userprofile.jsx"),
        courseinfo: path.resolve(baseSrcPath, "Pages", "courseinfo.jsx"),
        studentattendances: path.resolve(baseSrcPath, "Pages", "studentattendances.jsx"),
        subjectinfo: path.resolve(baseSrcPath, "Pages", "subjectinfo.jsx"),
    },
    output: {
        filename: '[name].js',
        path: path.resolve(
            baseStaticPath,
            'js',
        ),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            }
        ],
    },
    watch: true
}

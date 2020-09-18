const path = require('path')
module.exports = {
    mode:'development', //开发模式，改善开发经历，
    entry: './src/app.ts', //输入入口
    output: {
        filename: 'bundle.js', //输出入口
        // filename:'bundle.[contenthash].js' //带有hash的
        path: path.resolve(__dirname, 'dist'),
        publicPath:'dist'
    },
    devtool:'inline-source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude:/node_modules/
            }
        ]
    },
    resolve: {
        extensions:['.ts','.js']
    }

}

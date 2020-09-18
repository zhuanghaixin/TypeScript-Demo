const path = require('path')
const CleanPlugin=require('clean-webpack-plugin')
module.exports = {
    mode:'production', //生产模式
    entry: './src/app.ts', //输入入口
    output: {
        filename: 'bundle.js', //输出入口
        // filename:'bundle.[contenthash].js' //带有hash的
        path: path.resolve(__dirname, 'dist'),
        publicPath:'dist'
    },
    devtool:'none',
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
    },
    plugins: [
        new CleanPlugin.CleanWebpackPlugin()
    ]

}

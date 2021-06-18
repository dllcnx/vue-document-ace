module.exports = {
    // 基本路径
    publicPath: process.env.NODE_ENV == 'production' ? '/DocumentAce/' : '/',
    // 输出文件目录
    outputDir: "dist",
    // eslint-loader 是否在保存的时候检查
    lintOnSave: false,
    // webpack-dev-server 相关配置
    devServer: {
        https: false,
        hotOnly: false
    },
};

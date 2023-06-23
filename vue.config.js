const { defineConfig } = require('@vue/cli-service')
const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = defineConfig({
    transpileDependencies: true,
    publicPath: '/dining/',
    chainWebpack: (config) => {
        config.resolve.alias.set('~$', resolve('./')).set('@$', resolve('src'))

        // images /admin/ 으로 경로 수정
        // config.module
        //   .rule('images')
        //   .use('url-loader')
        //   .tap((options) => {
        //     options.fallback.options.name = 'static/[name].[hash:8].[ext]'
        //     options.fallback.options.outputPath = 'static'
        //     // options.fallback.options.name = 'static/img/[name].[hash:8].[ext]'
        //     // options.fallback.options.outputPath = 'static/img'
        //     options.fallback.options.publicPath = '/admin/'
        //     return options
        //   })

        // other static files /admin/ 으로 경로 수정
        // config.module
        //   .rule('other')
        //   .test(/\.(pdf|doc|zip)$/i)
        //   .use('file-loader')
        //   .tap((options) => {
        //     options.name = 'static/files/[name].[hash:8].[ext]'
        //     options.outputPath = 'static/files'
        //     options.publicPath = '/admin/'
        //     return options
        //   })
    },
})

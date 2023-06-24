const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const baseUrl = process.env.VUE_APP_BASE_URL

function resolve(dir) {
    console.log(path.join(__dirname, dir))
    return path.join(__dirname, dir)
}

console.log('### baseUrl', baseUrl)
// path.resolve(__dirname, 'public/img')

module.exports = defineConfig({
    devServer: {
        port: 5503,
    },
    transpileDependencies: true,
    publicPath: baseUrl,
    // publicPath: '/dining/',
    outputDir: 'dist',
    // assetsDir: 'static', // 설정 안할 경우 public 폴더에서 셋팅
    // runtimeCompiler: true,
    configureWebpack: {
        resolve: {
            alias: {
                '#': resolve('/'),
                '@': resolve('src'),
                '@img': resolve('public/img'),
            },
        },
    },
    chainWebpack: (config) => {
        // config.module
        //     .rule('css')
        //     .oneOf('vue')
        //     .use('vue-style-loader')
        //     .tap((options) => {
        //         options.base = '/dining/'
        //         return options
        //     })
        // images  으로 경로 수정
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

//
// },

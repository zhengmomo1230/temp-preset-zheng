const webpack = require('webpack')
const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}

// vue.config.js
module.exports = {
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@$', resolve('src'))
            .set('@api', resolve('src/api'))
            .set('@assets', resolve('src/assets'))
            .set('@comp', resolve('src/components'))
            .set('@views', resolve('src/views'))
            .set('@layout', resolve('src/layout'))
            .set('@static', resolve('src/static'))
            .set('@mobile', resolve('src/modules/mobile'))

        config.plugin("provide").use(webpack.ProvidePlugin, [
            {
                $: "jquery",
                jquery: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery"
            }
        ])

    },
    // 打包app时放开该配置
    publicPath: './',
    css: {
        loaderOptions: {
            less: {
                lessOptions: {
                    modifyVars: {
                        'primary-color': '#13C2C2',
                        'link-color': '#13C2C2',
                        'border-radius-base': '2px',
                        'font-size-base': '14px'
                    },
                    javascriptEnabled: true,
                },
            },
        },
    },
}

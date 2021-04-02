module.exports = {
    chainWebpack: config => {
        config.module
            .rule('raw')
            .test(/\.(?:aff|dic)$/)
            .use('raw-loader')
            .loader('raw-loader')
            .end()
    },
    css: {
        loaderOptions: {
            sass: {
                additionalData: `
@import "@/assets/sass/variables.sass"
                `
            }
        }
    }
}

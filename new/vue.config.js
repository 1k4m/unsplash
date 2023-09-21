const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true
})

module.exports = {
    css: {
        extract: {
            filename: 'css/style.css',
          },
        loaderOptions: {
            sass: {
                additionalData: ' @import "@/assets/styles.scss"; '
            }
        }
    }
};

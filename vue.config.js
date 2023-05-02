const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: '../src/main/resources/static',
  devServer:{
    port: 4000,
        // '/api': {
        //     target: 'http://localhost:8080'
        // }
        proxy: {
          '/v1/completions': {
            target: 'https://api.openai.com',
            changeOrigin: true,
            pathRewrite: { '^/gpt/v1': '/v1' }
          }
      }
    },
  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  }
})
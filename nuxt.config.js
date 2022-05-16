const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: "Web Development Blog",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: "https://fonts.googleapis.com/css?family=Open+Sans" }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070', duration: 5000 },
  // loadingIndicator: {
  //   name: 'circle',
  //   color: 'red'
  // }

  /*
  ** Global CSS
  */
  css: [
    '~assets/styles/main.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/core-components.js',
    '~plugins/date-filter.js'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
  ],
  // axios: {
  //   baseURL: 'https://nuxt-blog-e0b7b-default-rtdb.europe-west1.firebasedatabase.app'
  // },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    }
  },
  env: {
    baseUrl: 'https://nuxt-blog-e0b7b-default-rtdb.europe-west1.firebasedatabase.app',
    fbAPIKey: 'AIzaSyDg-KCJ_cMis8Ypv2k1HAWn1mQOVFJ27GA'
  },
  // rootDir: '/my-app/'
  // router: {
  //   extendRoutes(routes, resolve) {
  //     routes.push({
  //       path: '#',
  //       component: resolve(__dirname, 'pages/index.vue')
  //     })
  //   }
  // },
  // srcDir: 'client-app/'
  transition: {
    name: 'fade',
    mode: 'out-in'
  },
  // router: {
  //   middleware: 'log'
  // }
  // serverMiddleware: [

  // ]
}

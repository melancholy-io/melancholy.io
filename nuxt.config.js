import path from 'path'
import pkg from './package'

export default {
  mode: 'universal',

  router: {
    linkActiveClass: 'link-active',
    linkExactActiveClass: 'link-exact-active',
  },

  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  loading: false,

  css: ['~/assets/css/main.scss'],

  plugins: [],

  modules: [],

  build: {
    extend(config) {
      config.resolve.alias.Root = path.resolve(__dirname, 'assets/js')
      config.resolve.alias.Utils = path.resolve(__dirname, 'assets/js/_libs')
    },

    // transpile: ['gsap', 'three'],

    postcss: {
      preset: {
        autoprefixer: {
          grid: true,
        },
      },
    },

    generate: {
      fallback: false,
    },
  },
}

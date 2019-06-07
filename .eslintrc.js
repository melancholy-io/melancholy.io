module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'prettier/vue'
  ],
  plugins: [
    'prettier'
  ],
  // add your custom rules here
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'warn',
    'no-undef': 'warn',
    'vue/no-unused-components': 'warn',
    'vue/singleline-html-element-content-newline': 'off',
  },
}

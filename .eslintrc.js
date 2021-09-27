module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/no-unused-components': 'off',
    'comma-dangle': 'off',
    'no-unused-vars': 'off',
    'no-trailing-spaces': 'off',
    'template-curly-spacing': 'off',
    'vue/valid-v-else-if': 'off'
  }
}

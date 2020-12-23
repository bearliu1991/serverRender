module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'vue/attributes-order': 0,
    'no-console': 0,
    'vue/no-v-html': 0,
    'prettier/prettier': 1,
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-underscore-dangle': 0,
    'no-plusplus': 0,
    'no-param-reassign': 0,
    'no-lonely-if': 0,
    'no-shadow': 0,
    'func-names': 0,
    'max-len': [
      'error',
      {
        code: 500,
      },
    ],
    'no-use-before-define': 0,
    'no-unused-expressions': [
      2,
      {
        allowShortCircuit: true,
        allowTernary: false,
      },
    ],
    'no-unused-vars': [
      2,
      {
        vars: 'local',
        args: 'none',
      },
    ],
    // 'import/extensions': [
    //   'error',
    //   'always',
    //   {
    //     js: 'never',
    //     vue: 'never',
    //   },
    // ],
    semi: [0],
    // 待改正
    'no-undef': 0,
    'comma-dangle': 0,
    camelcase: 0,
    'prefer-destructuring': 0,
    'object-curly-newline': 0,
  },
}

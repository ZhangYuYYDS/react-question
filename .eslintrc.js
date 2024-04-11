module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended', // 用于eslint推荐规则
    'plugin:prettier/recommended', // 用于prettier推荐规则
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'comma-dangle': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
  },
}

module.exports = {
  root: true,
  plugins: ['prettier'],
  extends: ['standard-with-typescript', 'prettier'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
    include: ['./**/*.ts', './**/*.js', './.*.js', './.*.ts'],
  },
  rules: {
    '@typescript-eslint/no-floating-promises': 'off',
  },
};

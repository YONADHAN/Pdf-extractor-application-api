export default [
  {
    files: ['**/*.ts', '**/*.js'],
    languageOptions: {
      parser: (await import('@typescript-eslint/parser')).default,
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': (await import('@typescript-eslint/eslint-plugin'))
        .default,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-console': 'warn',
    },
  },
];

module.exports = {
  settings: {
    react: {
      version: 'detect'
    }
  },
  extends: [
    //...other extended config
    'plugin:jsx-a11y/recommended',
    '@agilecontent/eslint-config/frontend',
  ],
  rules: {
    //Add you own rules here
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'react/react-in-jsx-scope': 'off',
    'prefer-spread': 'off',
    'arrow-body-style': 'off',
    'prefer-const': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-empty-function': 'off'
  },
};

module.exports = {
  'env': {
    'browser': true,
    'amd': true,
    'node': true
  },
  'extends': [
    'next',
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 12,
    'sourceType': 'module'
  },
  'plugins': [
    'react'
  ],
  'rules': {
    'indent': [
      'error',
      2,
      {
        'SwitchCase': 1,
        'VariableDeclarator': 'first',
        'MemberExpression': 1,
        'FunctionDeclaration': {
          'body': 1,
          'parameters': 'first'
        },
        'CallExpression': {
          'arguments': 'first'
        },
        'ArrayExpression': 'first',
        'ObjectExpression': 'first',
        'ImportDeclaration': 'first',
        'flatTernaryExpressions': false,
        'offsetTernaryExpressions': false,
        'ignoreComments': true
      }
    ],
    'space-before-function-paren': [
      'error',
      {
        'anonymous': 'always',
        'named': 'never',
        'asyncArrow': 'always'
      }
    ],
    'react/prop-types': 'off',
    'linebreak-style': [
      'error',
      'windows'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ]
  }
};
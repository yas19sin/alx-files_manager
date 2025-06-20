module.exports = {
    env: {
        browser: false,
        es6: true,
        jest: true,
        mocha: true,
    },
    extends: [
        'airbnb-base',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: [],
    rules: {
        'max-classes-per-file': 'off',
        'no-underscore-dangle': 'off',
        'no-console': 'off',
        'no-shadow': 'off',
        'no-restricted-syntax': [
            'error',
            'LabeledStatement',
            'WithStatement',
        ],
        'import/extensions': 'off',
        'indent': ['error', 4],
    },
    overrides: [
        {
            files: ['*.js'],
            excludedFiles: 'babel.config.js',
        },
        {
            files: ['tests/**/*.js'],
            env: {
                mocha: true,
            },
            rules: {
                'import/no-extraneous-dependencies': 'off',
                'no-unused-expressions': 'off',
            },
        },
    ]
};

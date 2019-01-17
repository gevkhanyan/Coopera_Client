module.exports = {
    extends: 'airbnb',
    rules: {
        'indent': [ 'error', 4 ],
        'react/jsx-indent': [ 'error', 4 ],
        'react/jsx-indent-props': [ 'error', 4 ],
        'react/jsx-filename-extension': 0,
        'react/prop-types': 0,
        'react/destructuring-assignment': 0,
        'no-console': 0,
    },
    globals: {
        document: 1
    },
    parser: 'babel-eslint',
    env: {
        browser: 1
    }
};

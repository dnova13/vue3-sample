/* eslint-env node */

module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    extends: [
        'plugin:vue/essential',
        'plugin:vue/recommended',
        // '@vue/prettier',
    ],
    rules: {
        'no-console': 'off',
        'no-debugger': 'off',
        'no-unused-vars': 1,
        'vue/max-attributes-per-line': 'off',
        'vue/html-self-closing': 'off',
        'vue/no-v-html': 'off',
        'vue/no-v-text': 'off',
        'vue/no-v-text-v-html-on-component': 'off',
        'vue/require-default-prop': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/html-indent': 'off',
        // 'vue/html-indent': [
        //     'error',
        //     type,
        //     {
        //         attribute: 1,
        //         baseIndent: 1,
        //         closeBracket: 0,
        //         alignAttributesVertically: true,
        //         ignores: [],
        //     },
        // ],
        'vue/html-closing-bracket-newline': [
            'error',
            {
                singleline: 'never',
                multiline: 'always',
            },
        ],
    },
    // parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@babel/eslint-parser',
        sourceType: 'module',
    },
}

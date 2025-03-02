/* eslint spaced-comment: ["error", "always", { "block": { "balanced": true }}], semi: ["error", "always"], space-in-parens: ["error", "always"], "indent": ["error", 4], no-trailing-spaces: ["error", { "skipBlankLines": true, "ignoreComments": true }] */

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import pkg from './package.json' with { type: 'json' };
import postcss from 'rollup-plugin-postcss';
import cssnano from 'cssnano';
import stylelint from 'stylelint';
import reporter from 'postcss-reporter';

const production = !process.env.ROLLUP_WATCH;

export default {
    input: 'src/index.js',
    output: {
        sourcemap: true,
        format: 'iife',
        name: 'jsOopTemplate',
        file: production ? 'dist/js-oop-template.min.js' : 'build/js-oop-template.js'
    },
    plugins: [
        replace( {
            $VERSION: pkg.version,
            delimiters: ['', ''],
            preventAssignment: true
        } ),
        postcss( {
            plugins: [
                stylelint(),
                reporter({ clearReportedMessages: true }),
                cssnano()
            ],
            extensions: [ '.css' ]
        } ),
        resolve(),
        commonjs(),
        production && terser()
    ],
    watch: {
        clearScreen: false
    }
};

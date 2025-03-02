/* eslint spaced-comment: ["error", "always", { "block": { "balanced": true }}], semi: ["error", "always"], space-in-parens: ["error", "always"], "indent": ["error", 4], no-trailing-spaces: ["error", { "skipBlankLines": true, "ignoreComments": true }] */

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import pkg from './package.json' with { type: "json" };
import html from 'rollup-plugin-html';

const production = !process.env.ROLLUP_WATCH;

export default {
    input: 'src/index.js',
    output: {
        sourcemap: true,
        format: 'iife',
        name: 'jsWebComponentTemplate',
        file: production ? 'dist/js-webcomponent-template.min.js' : 'build/js-webcomponent-template.js'
    },
    plugins: [
        replace( {
            $VERSION: pkg.version,
            delimiters: ['', ''],
            preventAssignment: true
        } ),
        html( {
            include: '**/*.html',
            htmlMinifierOptions: { // https://github.com/kangax/html-minifier#options-quick-reference
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                conservativeCollapse: true,
                minifyJS: true,
                minifyCSS: {
                    level: 1
                },
                removeComments: true
            }
        } ),
        resolve(),
        commonjs(),
        production && terser()
    ],
    watch: {
        clearScreen: false
    }
};

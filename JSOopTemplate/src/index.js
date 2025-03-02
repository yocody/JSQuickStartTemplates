/*
 * js oop template
 */

/* global console */

/* eslint object-curly-newline: ["error", { "consistent": true }], spaced-comment: ["error", "always", { "block": { "balanced": true }}], semi: ["error", "always"], space-in-parens: ["error", "always"], "indent": ["error", 4], no-trailing-spaces: ["error", { "skipBlankLines": true, "ignoreComments": true }], one-var: ["error", { var: "always", let: "always", const: "never" }] */

'use strict';

import { DummyObject } from './DummyObject.js';

import './main.css';

let myDummyObject = null;

const init = () => {
    if ( myDummyObject === null ) {
        try {
            myDummyObject = new DummyObject();
        } catch ( err ) {
            console.error( 'Error in main entry point for dummy object - Name: ' + err.name + ' - Message: ' + err.message + ' Stack: ' + err.stack );
        }
    }
};

export { init };

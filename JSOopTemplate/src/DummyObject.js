/*
 * DummyObject
 */

/* global console, document, setTimeout */

/* eslint spaced-comment: ["error", "always", { "block": { "balanced": true }}], semi: ["error", "always"], space-in-parens: ["error", "always"], "indent": ["error", 4, { "SwitchCase": 1 }], no-trailing-spaces: ["error", { "skipBlankLines": true, "ignoreComments": true }], no-unused-vars: ["error"], dot-notation: 0, object-shorthand: [2, "consistent"], quote-props: ["error", "consistent"], no-extra-semi: "off" */
/* eslint-env es6 */

import { DummyError } from './DummyError.js';

class DummyObject {
    /**
     * @private
     */
    #mainElement = null;
    #debugMode = 1;
     
    /**
     * @constructor
     */
    constructor () {
        try {
            this.#addDomContent();
        } catch ( err ) {
            new DummyError( 'Global error in dummy object constructor', err );
        }
    };
    
    /**
     * add content to the dom
     *
     * @private
     */
    #addDomContent () {
        try {
            const main = document.querySelector( 'main' );
            const overlayHtml = `<div class="main-overlay"><span>Hello World</span></div>`;
            const content = document.createRange().createContextualFragment( overlayHtml );
            main.append( content );
            
            setTimeout( () => {
                const overlay = document.querySelector( 'div.main-overlay' );
                overlay.classList.add( 'open' );
                setTimeout( () => {
                    const text = document.querySelector( '.main-overlay span' );
                    text.classList.add( 'open' );
                }, 600 );
            }, 50 );
        } catch ( err ) {
            if ( this.#debugMode > 0 ) {
                console.error( err );
            }
            throw new Error( 'Error in addDomContent', { cause: err } );
        }
    };
}
    
export { DummyObject };

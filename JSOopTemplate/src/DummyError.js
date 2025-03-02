/*
 * Dummy Error
 */

/* global console */

/* eslint spaced-comment: ["error", "always", { "block": { "balanced": true }}], semi: ["error", "always"], space-in-parens: ["error", "always"], "indent": ["error", 4, { "SwitchCase": 1 }], no-trailing-spaces: ["error", { "skipBlankLines": true, "ignoreComments": true }], no-unused-vars: ["error"], dot-notation: 0, object-shorthand: [2, "consistent"], quote-props: ["error", "consistent"], no-extra-semi: "off" */
/* eslint-env es6 */

class DummyError {
    constructor ( message, err ) {
        this.message = message;
        if ( err !== null ) {
            if ( err.name !== null && typeof err.name !== 'undefined' ) {
                this.name = err.name;
            } else {
                this.name = '';
            }
            this.error = err;
            this.#handleAsError();
        } else {
            this.#handleAsMessage();
        }
    }
    
    #handleAsError () {
        if ( this.error.stack !== null && typeof this.error.stack !== 'undefined' ) {
            console.error( 'Global DummyError: ' + this.name + ' - Message: ' + this.message + ' Stack: ' + this.error.stack + ' Error: ' + this.error );
        } else {
            console.error( 'Global DummyError: ' + this.name + ' - Message: ' + this.message + ' Error: ' + this.error );
        }
    };
    
    #handleAsMessage () {
        console.error( 'Global DummyError - Message: ' + this.message );
    };
}

export { DummyError };

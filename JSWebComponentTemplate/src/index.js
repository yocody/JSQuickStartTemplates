/*
 * js WebComponent template
 */

/* eslint spaced-comment: ["error", "always", { "block": { "balanced": true }}], semi: ["error", "always"], space-in-parens: ["error", "always"], "indent": ["error", 4], no-trailing-spaces: ["error", { "skipBlankLines": true, "ignoreComments": true }], one-var: ["error", { var: "always", let: "always", const: "never" }], object-shorthand: ["error", "never"] */

'use strict';

// import templates
import topbarTemplate from './components/Topbar.html';
import { defineTopbar } from './components/Topbar.js';
import stageTemplate from './components/Stage.html';
import { defineStage } from './components/Stage.js';

let domElementsAdded = false,
    topbar = null,
    stage = null,
    customElementsDefined = false;
    
const init = ( route ) => {
    // console.log( 'core init reached. Route requested: ' + route );
    if ( !customElementsDefined ) {
        try {
            defineTopbar( topbarTemplate );
            defineStage( stageTemplate );
            customElementsDefined = true;
        } catch ( err ) {
            console.log( 'Error defining custom elements - Name: ' + err.name + ' - Message: ' + err.message + ' Stack: ' + err.stack );
        }
    }
    
    if ( !domElementsAdded ) {
        addDomElements()
            .then( () => {
                startApplication();
            } )
            .catch( ( err ) => {
                console.log( 'Promise rejected: ' + err.name + ' - Message: ' + err.message + ' - ' + err.stack );
            } );
    }
};

const addDomElements = () => {
    return new Promise( ( resolve, reject ) => {
        const fragment = document.createDocumentFragment();
        const mainStageWrapper = document.createElement( 'div' );
        mainStageWrapper.id = 'main-stage-wrapper';
    
        topbar = document.createElement( 'my-topbar' );
        topbar.setAttribute( 'parentstate', 'closed' );
        mainStageWrapper.appendChild( topbar );
    
        stage = document.createElement( 'my-stage' );
        stage.setAttribute( 'parentstate', 'closed' );
        mainStageWrapper.appendChild( stage );
    
        fragment.appendChild( mainStageWrapper );
        const main = document.querySelector( 'main' );
        main.appendChild( fragment );
        requestAnimationFrame( () =>
            setTimeout( () => {
                topbar.setAttribute( 'parentstate', 'open' );
                stage.setAttribute( 'parentstate', 'open' );
                resolve();
            }, 100 )
        );
        
        domElementsAdded = true;
    } );
};

const startApplication = () => {

};

export { init };

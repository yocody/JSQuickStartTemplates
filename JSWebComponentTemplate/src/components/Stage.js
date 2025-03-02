/*
 * Component: stage
 */

/* eslint spaced-comment: ["error", "always", { "block": { "balanced": true }}], semi: ["error", "always"], space-in-parens: ["error", "always"], "indent": ["error", 4, { "SwitchCase": 1 }], no-trailing-spaces: ["error", { "skipBlankLines": true, "ignoreComments": true }], no-useless-return: 0, object-shorthand: ["error", "never"], no-unused-vars: ["error"], dot-notation: 0 */

const defineStage = ( html ) => {
    class MyStage extends HTMLElement {
        constructor () {
            super();
            this.shadow = this.attachShadow( { mode: 'open' } );
            const template = document.createElement( 'template' );
            template.innerHTML = html;
            this.shadowRoot.appendChild( template.content.cloneNode( true ) );
            this.stageWrapper = this.shadow.querySelector( '#stage-wrapper' );
            this.isTablet = false;
            this.isMobile = false;
        }
        
        connectedCallback () {
            if ( window.matchMedia && window.matchMedia( '(max-width: 669px)' ).matches ) {
                this.isTablet = false;
                this.isMobile = true;
            } else if ( window.matchMedia && window.matchMedia( '(max-width: 939px) and (min-width: 670px)' ).matches ) {
                this.isTablet = true;
                this.isMobile = false;
            }
            
            this.initHandlers();
        }
        
        /* -------------- */
        /* event handlers */
        /* -------------- */
        initHandlers () {
            // resize
            window.addEventListener( 'resize', this.handleResizeStage.bind( this ) );
        }
        
        /* ----------- */
        /* util */
        /* ----------- */
        handleResizeStage () {
            if ( window.matchMedia && window.matchMedia( '(max-width: 669px)' ).matches ) {
                this.isTablet = false;
                this.isMobile = true;
            } else if ( window.matchMedia && window.matchMedia( '(max-width: 939px) and (min-width: 670px)' ).matches ) {
                this.isTablet = true;
                this.isMobile = false;
            } else {
                this.isTablet = false;
                this.isMobile = false;
            }
        };
        
        /* ----------- */
        /* attributes setter / getter / onchanged */
        /* ----------- */
        static get observedAttributes () {
            return ['parentstate'];
        }
        
        set parentstate ( value ) {
            this._value = value;
            this.setAttribute( 'parentstate', this._value );
            if ( this._value === 'open' ) {
                requestAnimationFrame( () =>
                    setTimeout( () => {
                        this.stageWrapper.classList.add( 'open' );
                    }, 100 )
                );
            } else if ( this._value === 'closed' ) {
                this.stageWrapper.classList.remove( 'open' );
            }
        }
        
        get parentstate () {
            return this._value;
        }
        
        attributeChangedCallback ( property, oldValue, newValue ) {
            if ( oldValue === newValue ) return;
            this[property] = newValue;
        }
    }
    
    customElements.define( 'my-stage', MyStage );
};

export { defineStage };

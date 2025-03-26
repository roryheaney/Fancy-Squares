/**
 * FancySquaresModal (Vanilla JS)
 *
 * Features:
 * - data-fs-toggle="modal" for open triggers
 * - data-fs-target="#someModalId" to reference the .fs-modal
 * - data-fs-dismiss="modal" for close triggers
 * - Clicking outside the .fs-modal-dialog closes
 * - Esc key closes
 * - Locks body scroll
 * - Traps focus
 * - Dispatches fsModalShow, fsModalShown, fsModalHide, fsModalHidden
 */

class FancySquaresModal {
	constructor() {
		this.currentModal = null;
		this.lastFocusedElement = null;

		// Listen globally for open triggers
		document.addEventListener( 'click', ( evt ) => {
			const openTrigger = evt.target.closest(
				'[data-fs-toggle="modal"]'
			);
			if ( openTrigger ) {
				evt.preventDefault();
				const modalSelector =
					openTrigger.getAttribute( 'data-fs-target' );
				if ( modalSelector ) {
					const modalElem = document.querySelector( modalSelector );
					if ( modalElem ) {
						this.lastFocusedElement = openTrigger;
						this.show( modalElem );
					}
				}
			}

			// Listen for close triggers
			const closeTrigger = evt.target.closest(
				'[data-fs-dismiss="modal"]'
			);
			if ( closeTrigger && this.currentModal ) {
				evt.preventDefault();
				this.hide( this.currentModal );
			}
		} );

		// ESC key closes
		document.addEventListener( 'keydown', ( evt ) => {
			if ( this.currentModal && evt.key === 'Escape' ) {
				evt.preventDefault();
				this.hide( this.currentModal );
			}
		} );

		// Focus trap
		document.addEventListener( 'keydown', ( evt ) => {
			if ( this.currentModal && evt.key === 'Tab' ) {
				this.trapFocus( evt );
			}
		} );
	}

	/**
	 * Show a modal and set up event listeners and focus management.
	 *
	 * @param {HTMLElement} modal The modal element to be shown.
	 */
	show( modal ) {
		// Dispatch "fsModalShow"
		modal.dispatchEvent(
			new CustomEvent( 'fsModalShow', { bubbles: true } )
		);

		this.currentModal = modal;

		// Lock body scroll
		document.body.classList.add( 'fs-modal-open' );

		// Show the modal
		modal.style.display = 'flex';
		modal.classList.add( 'show' );
		// Force reflow for fade effect
		void modal.offsetWidth;

		// If user clicks anywhere outside .fs-modal-dialog => close
		modal.addEventListener( 'click', this.outsideClickHandler );

		// After fade, focus inside
		setTimeout( () => {
			const focusable = this.getFocusableElements( modal );
			if ( focusable.length ) {
				focusable[ 0 ].focus();
			} else {
				modal.focus();
			}
			// Dispatch "fsModalShown"
			modal.dispatchEvent(
				new CustomEvent( 'fsModalShown', { bubbles: true } )
			);
		}, 300 );
	}

	/**
	 * Hide the currently open modal and restore focus.
	 *
	 * @param {HTMLElement} modal The modal element to be hidden.
	 */
	hide( modal ) {
		// Dispatch "fsModalHide"
		modal.dispatchEvent(
			new CustomEvent( 'fsModalHide', { bubbles: true } )
		);

		// Remove the click listener
		modal.removeEventListener( 'click', this.outsideClickHandler );

		// Unlock body scroll
		document.body.classList.remove( 'fs-modal-open' );

		// Fade out
		modal.classList.remove( 'show' );

		setTimeout( () => {
			// Fully hide
			modal.style.display = 'none';

			// Return focus to last trigger
			if ( this.lastFocusedElement ) {
				this.lastFocusedElement.focus();
			}
			this.currentModal = null;

			// Dispatch "fsModalHidden"
			modal.dispatchEvent(
				new CustomEvent( 'fsModalHidden', { bubbles: true } )
			);
		}, 300 );
	}

	/**
	 * Close the modal if user clicks outside .fs-modal-dialog
	 *
	 * @param {MouseEvent} evt The click event.
	 */
	outsideClickHandler = ( evt ) => {
		// .fs-modal-dialog or any of its children => do NOT close
		if ( ! evt.target.closest( '.fs-modal-dialog' ) ) {
			// They clicked outside => hide
			if ( this.currentModal ) {
				this.hide( this.currentModal );
			}
		}
	};

	/**
	 * Trap focus within the current modal when Tab key is pressed.
	 *
	 * @param {KeyboardEvent} event The keydown event.
	 */
	trapFocus( event ) {
		const focusable = this.getFocusableElements( this.currentModal );
		if ( ! focusable.length ) {
			event.preventDefault();
			this.currentModal.focus();
			return;
		}
		const firstElem = focusable[ 0 ];
		const lastElem = focusable[ focusable.length - 1 ];
		// Avoid global activeElement; use the event's target ownerDocument
		const activeElem = event.target.ownerDocument.activeElement;

		if ( event.shiftKey && activeElem === firstElem ) {
			// Shift+Tab on first => jump to last
			event.preventDefault();
			lastElem.focus();
		} else if ( ! event.shiftKey && activeElem === lastElem ) {
			// Tab on last => jump to first
			event.preventDefault();
			firstElem.focus();
		}
	}

	/**
	 * Return all elements that can receive focus within a container.
	 *
	 * @param {HTMLElement} container The element in which to find focusable items.
	 * @return {HTMLElement[]} Array of focusable elements.
	 */
	getFocusableElements( container ) {
		return Array.from(
			container.querySelectorAll(
				'a[href], button:not([disabled]), textarea:not([disabled]), input:not([type="hidden"]):not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
			)
		);
	}
}

// Initialize once on DOMContentLoaded
document.addEventListener( 'DOMContentLoaded', () => {
	new FancySquaresModal();
} );

//   document.getElementById('test123')
//   .addEventListener('fsModalShown', (e) => {
//     console.log('Modal is fully visible!', e.target);
//   });

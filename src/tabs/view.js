/**
 * Updated view.js for FancySquaresTabs
 * Supports vertical/horizontal orientation, fade transitions, open/close events.
 */

class FancySquaresTabs {
	/**
	 * Create a FancySquaresTabs instance.
	 *
	 * @param {HTMLElement} tabsContainer - The outer .wp-block-fs-blocks-tabs container.
	 */
	constructor( tabsContainer ) {
		// The outer .wp-block-fs-blocks-tabs container
		this.tabsContainer = tabsContainer;

		// Try to find the tablist
		this.tabList = this.tabsContainer.querySelector( '[role="tablist"]' );
		if ( ! this.tabList ) {
			// If no tablist found, abort
			return;
		}

		// Orientation: read from data-fs-orientation, default "horizontal"
		this.orientation =
			this.tabList.getAttribute( 'data-fs-orientation' ) || 'horizontal';

		// All tab elements (role="tab")
		this.tabs = Array.from(
			this.tabList.querySelectorAll( '[role="tab"]' )
		);

		// Map each tab to its associated panel (role="tabpanel") via aria-controls
		this.panels = this.tabs.map( ( tab ) => {
			const panelId = tab.getAttribute( 'aria-controls' );
			return document.getElementById( panelId );
		} );

		this.initEvents();
		this.ensureSingleActiveTab();
	}

	/**
	 * Attach click and keyboard events for tab navigation.
	 */
	initEvents() {
		// Handle clicks on any tab
		this.tabs.forEach( ( tab ) => {
			tab.addEventListener( 'click', () => {
				this.activateTab( tab );
			} );
		} );

		// Handle arrow key navigation in the tablist
		this.tabList.addEventListener( 'keydown', ( event ) => {
			switch ( event.key ) {
				case 'ArrowRight':
				case 'ArrowLeft':
					// Only handle left/right if orientation is "horizontal"
					if ( this.orientation === 'horizontal' ) {
						event.preventDefault();
						if ( event.key === 'ArrowRight' ) {
							this.moveFocusNext();
						} else {
							this.moveFocusPrev();
						}
					}
					break;

				case 'ArrowUp':
				case 'ArrowDown':
					// Only handle up/down if orientation is "vertical"
					if ( this.orientation === 'vertical' ) {
						event.preventDefault();
						if ( event.key === 'ArrowDown' ) {
							this.moveFocusNext();
						} else {
							this.moveFocusPrev();
						}
					}
					break;

				case 'Home':
					event.preventDefault();
					this.focusFirstTab();
					break;

				case 'End':
					event.preventDefault();
					this.focusLastTab();
					break;

				default:
					// Let other keys (including Tab) behave naturally
					break;
			}
		} );
	}

	/**
	 * If multiple tabs are .active, keep only the first.
	 * If none, activate the first.
	 */
	ensureSingleActiveTab() {
		const activeTabs = this.tabs.filter( ( t ) =>
			t.classList.contains( 'active' )
		);
		if ( activeTabs.length === 0 && this.tabs.length > 0 ) {
			this.activateTab( this.tabs[ 0 ], false );
		} else if ( activeTabs.length > 1 ) {
			for ( let i = 1; i < activeTabs.length; i++ ) {
				this.deactivateTab( activeTabs[ i ], false );
			}
		}
	}

	/*
	 * Activate a specific tab, deactivating any currently active tab.
	 * Dispatch show/hide events and handle fade transitions if present.
	 *
	 * @param {HTMLElement} newTab   - The tab to activate.
	 * @param {boolean} [focusTab]   - Whether to move focus to the newly activated tab.
	 */
	activateTab( newTab, focusTab = true ) {
		if ( ! newTab ) {
			return;
		}

		// Find currently active tab
		const oldTab = this.tabs.find( ( t ) =>
			t.classList.contains( 'active' )
		);

		if ( oldTab === newTab ) {
			// Already active
			return;
		}

		// Identify old/new panels
		const oldPanel = oldTab
			? document.getElementById( oldTab.getAttribute( 'aria-controls' ) )
			: null;
		const newPanel = document.getElementById(
			newTab.getAttribute( 'aria-controls' )
		);

		// Dispatch "fsTabHide" if there's an old tab
		if ( oldTab ) {
			this.dispatchEvent( 'fsTabHide', {
				oldTab,
				oldPanel,
				newTab,
				newPanel,
			} );
		}

		// Dispatch "fsTabShow" for the new tab
		this.dispatchEvent( 'fsTabShow', {
			oldTab,
			oldPanel,
			newTab,
			newPanel,
		} );

		// Deactivate old tab
		if ( oldTab ) {
			this.deactivateTab( oldTab, false, false );
		}

		// Activate new tab's ARIA
		newTab.classList.add( 'active' );
		newTab.setAttribute( 'aria-selected', 'true' );
		newTab.setAttribute( 'tabindex', '0' );

		// Fade in the new panel
		this.showPanel( newPanel, () => {
			// Dispatch "fsTabShown" once the fade-in completes
			this.dispatchEvent( 'fsTabShown', {
				oldTab,
				oldPanel,
				newTab,
				newPanel,
			} );
		} );

		// Focus the new tab if requested
		if ( focusTab ) {
			newTab.focus( { preventScroll: true } );
		}
	}

	/*
	 * Deactivate a tab and hide its panel (with fade if applicable).
	 *
	 * @param {HTMLElement} tabToDeactivate - The tab to deactivate.
	 * @param {boolean} [focusTab]          - Whether to focus the tab after deactivation.
	 * @param {boolean} [skipAnimation]     - If true, hide the panel immediately (no fade).
	 */
	deactivateTab( tabToDeactivate, focusTab = false, skipAnimation = false ) {
		tabToDeactivate.classList.remove( 'active' );
		tabToDeactivate.setAttribute( 'aria-selected', 'false' );
		tabToDeactivate.setAttribute( 'tabindex', '-1' );

		const panelId = tabToDeactivate.getAttribute( 'aria-controls' );
		const panel = document.getElementById( panelId );

		if ( panel ) {
			this.hidePanel( panel, skipAnimation, () => {
				// Dispatch "fsTabHidden" after fade-out
				this.dispatchEvent( 'fsTabHidden', {
					oldTab: tabToDeactivate,
					oldPanel: panel,
					newTab: null,
					newPanel: null,
				} );
			} );
		}

		if ( focusTab ) {
			tabToDeactivate.focus();
		}
	}

	/*
	 * Show a panel with fade transition if it has `.fade`.
	 * Calls callback() once the transition finishes (or immediately if no `.fade`).
	 *
	 * @param {HTMLElement} panel    - The panel to show.
	 * @param {Function} [callback]  - A callback executed after the panel finishes showing.
	 */
	showPanel( panel, callback ) {
		if ( ! panel ) {
			if ( callback ) {
				callback();
			}
			return;
		}

		panel.removeAttribute( 'hidden' );
		panel.classList.add( 'active' ); // ensures display: block or similar

		// If the panel has .fade, do the fade-in
		if ( panel.classList.contains( 'fade' ) ) {
			// Force reflow to restart transition
			void panel.offsetWidth;

			panel.classList.add( 'show' );

			const onTransitionEnd = ( e ) => {
				if ( e.target === panel ) {
					panel.removeEventListener(
						'transitionend',
						onTransitionEnd
					);
					if ( callback ) {
						callback();
					}
				}
			};
			panel.addEventListener( 'transitionend', onTransitionEnd );
		} else {
			// No fade => show immediately
			panel.classList.add( 'show' );
			if ( callback ) {
				callback();
			}
		}
	}

	/*
	 * Hide a panel with fade transition if `.fade` is present, or immediately if not.
	 *
	 * @param {HTMLElement} panel      - The panel to hide.
	 * @param {boolean} skipAnimation  - If true, hide immediately (no fade).
	 * @param {Function} [callback]    - A callback executed after the panel finishes hiding.
	 */
	hidePanel( panel, skipAnimation, callback ) {
		if ( ! panel || ! panel.classList.contains( 'active' ) ) {
			if ( callback ) {
				callback();
			}
			return;
		}

		// If skipping or no fade class, hide immediately
		if ( skipAnimation || ! panel.classList.contains( 'fade' ) ) {
			panel.classList.remove( 'active', 'show' );
			panel.setAttribute( 'hidden', 'true' );
			if ( callback ) {
				callback();
			}
			return;
		}

		// Otherwise fade out
		panel.classList.remove( 'show' );
		const onTransitionEnd = ( e ) => {
			if ( e.target === panel ) {
				panel.removeEventListener( 'transitionend', onTransitionEnd );
				panel.classList.remove( 'active' );
				panel.setAttribute( 'hidden', 'true' );
				if ( callback ) {
					callback();
				}
			}
		};
		panel.addEventListener( 'transitionend', onTransitionEnd );
	}

	/**
	 * Move focus to the next tab in the list (wraps around).
	 */
	moveFocusNext() {
		const currentIndex = this.tabs.findIndex( ( t ) =>
			t.classList.contains( 'active' )
		);
		if ( currentIndex < 0 ) {
			this.activateTab( this.tabs[ 0 ] );
			return;
		}
		let newIndex = currentIndex + 1;
		if ( newIndex >= this.tabs.length ) {
			newIndex = 0; // wrap
		}
		this.activateTab( this.tabs[ newIndex ] );
	}

	/**
	 * Move focus to the previous tab in the list (wraps around).
	 */
	moveFocusPrev() {
		const currentIndex = this.tabs.findIndex( ( t ) =>
			t.classList.contains( 'active' )
		);
		if ( currentIndex < 0 ) {
			this.activateTab( this.tabs[ 0 ] );
			return;
		}
		let newIndex = currentIndex - 1;
		if ( newIndex < 0 ) {
			newIndex = this.tabs.length - 1; // wrap
		}
		this.activateTab( this.tabs[ newIndex ] );
	}

	/**
	 * Focus the first tab in the tab list.
	 */
	focusFirstTab() {
		if ( this.tabs.length > 0 ) {
			this.activateTab( this.tabs[ 0 ] );
		}
	}

	/**
	 * Focus the last tab in the tab list.
	 */
	focusLastTab() {
		if ( this.tabs.length > 0 ) {
			this.activateTab( this.tabs[ this.tabs.length - 1 ] );
		}
	}

	/*
	 * Dispatch custom events from the tabsContainer element.
	 *
	 * @param {string} eventName        - The name of the event.
	 * @param {Object} detailObj        - An object with additional details.
	 */
	dispatchEvent( eventName, detailObj ) {
		this.tabsContainer.dispatchEvent(
			new CustomEvent( eventName, {
				bubbles: true,
				detail: detailObj,
			} )
		);
	}
}

// Auto-initialize on DOMContentLoaded
document.addEventListener( 'DOMContentLoaded', () => {
	const allTabsContainers = document.querySelectorAll(
		'.wp-block-fs-blocks-tabs'
	);
	allTabsContainers.forEach( ( tabsEl ) => {
		new FancySquaresTabs( tabsEl );
	} );
} );

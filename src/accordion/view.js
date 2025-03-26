// view.js
class FancySquaresAccordion {
	/**
	 * Initialize the FancySquaresAccordion.
	 *
	 * @param {HTMLElement} accordionElement The main container of the accordion.
	 */
	constructor( accordionElement ) {
		this.accordionElement = accordionElement;
		// Keep track of which panel was last closed
		this.lastClosedPanel = null;

		// Gather all toggle buttons
		this.buttons = accordionElement.querySelectorAll(
			'[data-fs-toggle="collapse"]'
		);
		this.buttons.forEach( ( btn ) => {
			btn.addEventListener( 'click', ( event ) => {
				event.preventDefault();
				this.togglePanel( btn );
			} );
		} );
	}

	/*
	 * Decide whether to open or close the panel.
	 *
	 * @param {HTMLElement} trigger The toggle button that triggers open/close.
	 */
	togglePanel( trigger ) {
		const targetSelector = trigger.getAttribute( 'data-fs-target' );
		const panel = document.querySelector( targetSelector );
		if ( ! panel ) {
			return;
		}

		const isExpanded = trigger.getAttribute( 'aria-expanded' ) === 'true';

		if ( isExpanded ) {
			this.closePanel( trigger, panel );
		} else {
			// If there's a parent, close other panels under that parent
			const parentSelector = panel.getAttribute( 'data-fs-parent' );

			if ( parentSelector ) {
				const parentElem = document.querySelector( parentSelector );
				if ( parentElem ) {
					const openPanels = parentElem.querySelectorAll(
						'.fs-accordion-collapse.show'
					);
					openPanels.forEach( ( openPanel ) => {
						if ( openPanel !== panel ) {
							// Find the controlling button
							const ctrlBtn = parentElem.querySelector(
								`[aria-controls="${ openPanel.id }"]`
							);
							if ( ctrlBtn ) {
								this.closePanel( ctrlBtn, openPanel );
							}
						}
					} );
				}
			}
			this.openPanel( trigger, panel );
		}
	}

	/**
	 * Animate panel open. Dispatch "fsAccordionOpen"/"fsAccordionOpened".
	 *
	 * @param {HTMLElement} trigger The element that triggered the open.
	 * @param {HTMLElement} panel   The panel to open.
	 */
	openPanel( trigger, panel ) {
		// 1) Fire the "fsAccordionOpen" event on the accordion container
		this.accordionElement.dispatchEvent(
			new CustomEvent( 'fsAccordionOpen', {
				bubbles: true,
				detail: {
					panel,
				},
			} )
		);

		// 2) Update ARIA
		trigger.setAttribute( 'aria-expanded', 'true' );
		trigger.classList.remove( 'collapsed' );

		// 3) Prepare the panel for animation
		panel.classList.remove( 'collapse', 'show' );
		panel.classList.add( 'collapsing' );
		panel.style.height = '0px';

		// Force reflow
		void panel.offsetHeight;

		// 4) Now set final height so it animates from 0
		const panelHeight = panel.scrollHeight;
		panel.style.height = panelHeight + 'px';

		// 5) Transition end callback
		const handleTransitionEnd = () => {
			panel.removeEventListener( 'transitionend', handleTransitionEnd );

			panel.classList.remove( 'collapsing' );
			panel.classList.add( 'collapse', 'show' );
			panel.style.height = '';

			// 6) Fire "fsAccordionOpened" on the accordion container
			// Include the lastClosedPanel in the detail
			this.accordionElement.dispatchEvent(
				new CustomEvent( 'fsAccordionOpened', {
					bubbles: true,
					detail: {
						newlyOpened: panel,
						lastClosed: this.lastClosedPanel,
					},
				} )
			);
		};

		panel.addEventListener( 'transitionend', handleTransitionEnd );
	}

	/**
	 * Animate panel close. Dispatch "fsAccordionClose"/"fsAccordionClosed".
	 *
	 * @param {HTMLElement} trigger The element that triggered the close.
	 * @param {HTMLElement} panel   The panel to close.
	 */
	closePanel( trigger, panel ) {
		// 1) Fire "fsAccordionClose"
		this.accordionElement.dispatchEvent(
			new CustomEvent( 'fsAccordionClose', {
				bubbles: true,
				detail: {
					panel,
				},
			} )
		);

		// 2) Update ARIA
		trigger.setAttribute( 'aria-expanded', 'false' );
		trigger.classList.add( 'collapsed' );

		// 3) Get current height, so we can animate to 0
		const panelHeight = panel.scrollHeight;
		panel.style.height = panelHeight + 'px';

		// Force reflow
		void panel.offsetHeight;

		// 4) Switch to "collapsing" state
		panel.classList.add( 'collapsing' );
		panel.classList.remove( 'collapse', 'show' );

		// 5) Animate to height 0
		panel.style.height = '0px';

		// 6) Transition end callback
		const handleTransitionEnd = () => {
			panel.removeEventListener( 'transitionend', handleTransitionEnd );

			panel.classList.remove( 'collapsing' );
			panel.classList.add( 'collapse' );
			panel.style.height = '';

			// Keep track of the last closed panel
			this.lastClosedPanel = panel;

			// Fire "fsAccordionClosed"
			this.accordionElement.dispatchEvent(
				new CustomEvent( 'fsAccordionClosed', {
					bubbles: true,
					detail: {
						panel,
					},
				} )
			);
		};

		panel.addEventListener( 'transitionend', handleTransitionEnd );
	}
}

// Instantiate on DOMContentLoaded
document.addEventListener( 'DOMContentLoaded', () => {
	const allAccordions = document.querySelectorAll( '.fs-accordion' );
	allAccordions.forEach( ( accordionEl ) => {
		new FancySquaresAccordion( accordionEl );
	} );
} );

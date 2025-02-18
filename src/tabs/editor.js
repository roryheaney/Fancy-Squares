import { useEffect } from '@wordpress/element';

export function useActiveTabClass( clientId, activeTab ) {
	useEffect( () => {
		const container = document.querySelector(
			`[data-block="${ clientId }"]`
		);
		if ( ! container ) return;

		// Add/remove active class to tab items
		container
			.querySelectorAll( '.wp-block-fs-blocks-tab-item' )
			.forEach( ( tab ) => {
				const tabClientId = tab.dataset.block;
				tab.classList.toggle( 'is-active', tabClientId === activeTab );
			} );
	}, [ activeTab, clientId ] );
}

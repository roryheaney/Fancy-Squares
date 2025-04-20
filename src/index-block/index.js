import { registerBlockType } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';
import { useBlockProps } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';

registerBlockType('fs-blocks/index-block', {
    attributes: {
        blockIndex: {
            type: 'number',
            default: -1,
        },
    },

    edit: ({ clientId, attributes, setAttributes }) => {
        // Find column’s position among siblings
        const parentIds = useSelect(
            (select) => select('core/block-editor').getBlockParents(clientId),
            [clientId]
        );
        const columnsContainerId = parentIds.length >= 2 ? parentIds[parentIds.length - 2] : '';
        const thisColumnId = parentIds.length ? parentIds[parentIds.length - 1] : '';
        const siblings = useSelect(
            (select) => select('core/block-editor').getBlocks(columnsContainerId),
            [columnsContainerId]
        );
        const zeroBased = siblings.findIndex((b) => b.clientId === thisColumnId);
        const oneBased = zeroBased + 1;

        // Persist index as attribute
        useEffect(() => {
            if (attributes.blockIndex !== oneBased) {
                setAttributes({ blockIndex: oneBased });
            }
        }, [oneBased]);

        // Show index in editor
        return (
            <div {...useBlockProps()}>
                {oneBased}
            </div>
        );
    },

    // Optional: Can be removed since render_callback is used
    save: () => null,
});

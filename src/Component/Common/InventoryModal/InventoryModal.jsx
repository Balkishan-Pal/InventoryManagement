import React from 'react';
import { createPortal } from 'react-dom';

import './InventoryModal.scss';

const InventoryModal = (props) => {
	const { children, noBackdrop, open, onClose } = props;

	return (
		<>
			{open &&
				createPortal(
					<div className='model-wrapper'>
						{!noBackdrop && <div className='backdrop' onClick={onClose} />}

						{children}
					</div>,
					document.body
				)}
		</>
	);
};

export default InventoryModal;

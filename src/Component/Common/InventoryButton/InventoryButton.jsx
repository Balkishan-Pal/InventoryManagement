import React from 'react'
import './InventoryButton.scss';

function InventoryButton(props) {
  const {buttonText , onClick, disabled, typeOfbutton} = props;
  return (
    <button type='button' onClick={onClick} disabled={disabled}  className={typeOfbutton}>
      {buttonText}
    </button>
  )
}

export default InventoryButton

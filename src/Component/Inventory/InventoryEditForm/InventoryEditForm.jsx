import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "./InventoryEditForm.scss";
import InventoryButton from "../../Common/InventoryButton/InventoryButton";
import { calculateInventoryValues } from "../../Common/Utils/Utils";

function InventoryEditForm(props) {
  const { openEditModal, setEditModal ,inventoryData,setInventoryData} = props;
  const [editData, setEditData] = useState(openEditModal?.data);

  const handleCloseModal = () => {
    setEditModal({ open: false, data: {} });
  };
  const handelSave = () => {
    let updateInventoryData = { ...inventoryData };
    let apiData = updateInventoryData?.apiData;
    apiData[openEditModal?.data?.index] = editData;
    localStorage.setItem(
      "inventoryData",
      JSON.stringify(updateInventoryData?.apiData)
    );
    const customizedData = calculateInventoryValues({ apiData: updateInventoryData?.apiData });
    setInventoryData(customizedData);
    handleCloseModal();
  };
  const handelEditForm = (event) => {
    const { name, value } = event.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };
  return (
    <div className="inventory-form-top-wrapper">
      <div className="heading-close-wrapper">
        <h3>Edit Product</h3>
        <button type="button" onClick={handleCloseModal}>
          <CloseIcon fontSize="small" color="#E5FC72" />
        </button>
      </div>

      <h5>{openEditModal?.data?.name}</h5>

      <div className="form-wrapper-footer-wrapper">
        <div className="actual-form-lines">
          <span className="option-wrapper">
            <span>Category</span>
            <input
              type="text"
              name="category"
              value={editData?.category}
              onChange={handelEditForm}
            />
          </span>

          <span className="option-wrapper">
            <span>Price</span>
            <input
              type="number"
              name="price"
              value={editData?.price}
              onChange={handelEditForm}
            />
          </span>
        </div>

        <div className="actual-form-lines">
          <span className="option-wrapper">
            <span>Quantitiy</span>
            <input
              type="number"
              name="quantity"
              value={editData?.quantity}
              onChange={handelEditForm}
            />
          </span>

          <span className="option-wrapper">
            <span>Value</span>
            <input
              type="number"
              name="value"
              value={editData?.value}
              onChange={handelEditForm}
            />
          </span>
        </div>

        <div className="footer-butns-wrapper">
          <InventoryButton
            type="button"
            buttonText="Save"
            onClick={handelSave}
            disabled={
              !editData?.value ||
              !editData?.quantity ||
              !editData?.price ||
              !editData?.category
            }
            typeOfbutton="primary-button"
          >
            Save
          </InventoryButton>
          <InventoryButton
            type="button"
            buttonText="Cancel"
            onClick={handleCloseModal}
            typeOfbutton="secondary-button"
          >
            Cancel
          </InventoryButton>
        </div>
      </div>
    </div>
  );
}

export default InventoryEditForm;

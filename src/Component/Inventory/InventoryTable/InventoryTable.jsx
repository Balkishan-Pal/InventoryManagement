import React, { useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import "./InventoryTable.scss";
import InventoryModal from "../../Common/InventoryModal/InventoryModal";

function InventoryTable(props) {
  const { isUser, inventoryData, setInventoryData } = props;
  console.log(inventoryData, "inventoryData");
  const [openEditModal, setEditModal] = useState({ open: false, data: {} });

  const handleEdit = (invData) => {
    setEditModal({ open: true, data: invData });
  };

  const handleCloseModal = () => {
    setEditModal({ open: false, data: {} });
  };
  const handleDisable = (disableData) => {
    let updateInventoryData = { ...inventoryData };
    let apiData = updateInventoryData?.apiData;

    const dataToBeDisabledIndex = updateInventoryData.apiData.findIndex(
      (findData) => findData?.name === disableData.name
    );

    apiData[dataToBeDisabledIndex] = {
      ...apiData?.[dataToBeDisabledIndex],
      isDisabled: !apiData?.[dataToBeDisabledIndex]?.isDisabled,
    };

    console.log(updateInventoryData, "updateInventoryData");
    localStorage.setItem("inventoryData", JSON.stringify(updateInventoryData));
    setInventoryData(updateInventoryData);
  };

  return (
    <>
      {openEditModal && (
        <InventoryModal
          noBackdrop={false}
          open={openEditModal?.open || false}
          onClose={handleCloseModal}
        >
          <div style={{ border: "10px solid white" }}>component</div>
        </InventoryModal>
      )}

      <table>
        <thead>
          <td>
            <div>Name</div>
          </td>
          <td>
            <div>Category</div>
          </td>
          <td>
            <div>Price</div>
          </td>
          <td>
            <div>Quantity</div>
          </td>
          <td>
            <div>Value</div>
          </td>
          <td>
            <div>Action</div>
          </td>
        </thead>
        <tbody>
          {inventoryData?.apiData?.map((invData, index) => (
            <tr key={index}>
              <td>{invData?.name}</td>
              <td>{invData?.category}</td>
              <td>{invData?.price}</td>
              <td>{invData?.quantity}</td>
              <td>{invData?.value}</td>
              <td>
                <div className="action-itens-wrapper">
                  <button
                    typeof="button"
                    disabled={!isUser}
                    onClick={() => handleEdit(invData)}
                  >
                    <EditIcon />
                  </button>
                  <button
                    disabled={!isUser}
                    onClick={() => handleDisable(invData)}
                    typeof="button"
                  >
                    {invData?.isDisabled ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </button>
                  <button disabled={!isUser} typeof="button">
                    <DeleteIcon />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default InventoryTable;

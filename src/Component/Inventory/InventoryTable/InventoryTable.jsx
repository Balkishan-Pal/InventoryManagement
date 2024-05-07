import React, { useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import "./InventoryTable.scss";
import InventoryModal from "../../Common/InventoryModal/InventoryModal";
import InventoryEditForm from "../InventoryEditForm/InventoryEditForm";
import { calculateInventoryValues } from "../../Common/Utils/Utils";

function InventoryTable(props) {
  const { isUser, inventoryData, setInventoryData } = props;
  const [openEditModal, setEditModal] = useState({ open: false, data: {} });

  const handleEdit = (invData, index) => {
    setEditModal({ open: true, data: { ...invData, index } });
  };

  const handleCloseModal = () => {
    setEditModal({ open: false, data: {} });
  };

  const handleDisable = (index) => {
    let updateInventoryData = { ...inventoryData };
    let apiData = updateInventoryData?.apiData;

    apiData[index] = {
      ...apiData?.[index],
      isDisabled: !apiData?.[index]?.isDisabled,
    };
    localStorage.setItem(
      "inventoryData",
      JSON.stringify(updateInventoryData?.apiData)
    );
    setInventoryData(updateInventoryData);
  };

  const handledelete = (index) => {
    let updateInventoryData = { ...inventoryData };
    let apiData = updateInventoryData?.apiData;

    let filteredData = apiData?.filter((_, _index) => index !== _index);
    updateInventoryData.apiData = filteredData;
    localStorage.setItem(
      "inventoryData",
      JSON.stringify(updateInventoryData?.apiData)
    );
    const customizedData = calculateInventoryValues({ apiData: filteredData });
    setInventoryData(customizedData);
  };

  return (
    <>
      {openEditModal && (
        <InventoryModal
          noBackdrop={false}
          open={openEditModal?.open || false}
          onClose={handleCloseModal}
        >
          <InventoryEditForm
            openEditModal={openEditModal}
            setEditModal={setEditModal}
            {...props}
          />
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
              <td>${invData?.price}</td>
              <td>{invData?.quantity}</td>
              <td>${invData?.value}</td>
              <td>
                <div className="action-itens-wrapper">
                  <button
                    typeof="button"
                    disabled={isUser}
                    onClick={() => handleEdit(invData, index)}
                  >
                    <EditIcon />
                  </button>
                  <button
                    disabled={isUser}
                    onClick={() => handleDisable(index)}
                    typeof="button"
                  >
                    {invData?.isDisabled ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </button>
                  <button
                    disabled={isUser}
                    onClick={() => handledelete(index)}
                    typeof="button"
                  >
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

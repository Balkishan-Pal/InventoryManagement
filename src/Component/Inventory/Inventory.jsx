import React, { useEffect, useMemo, useState } from "react";

import NavBar from "./NavBar/NavBar";

import "./Inventory.scss";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import Widgets from "../Common/Widgets/Widgets";
import { fetchInventoryData } from "./API";
import { calculateInventoryValues } from "../Common/Utils/Utils";
import InventoryTable from "./InventoryTable/InventoryTable";

function Inventory() {
  const [inventoryData, setInventoryData] = useState({});
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        let getData;
        const storedData = localStorage.getItem("inventoryData");

        if (storedData) {
          getData = JSON.parse(storedData);
        } else {
          getData = await fetchInventoryData();
          localStorage.setItem("inventoryData", JSON.stringify(getData));
        }
        const customizedData = calculateInventoryValues({ apiData: getData });
        setInventoryData(customizedData);
      } catch (error) {
        console.log(error, "problem in fetching data");
      }
    }
    fetchData();
  }, []);

  return (
    <div className="inventory-top-wrapper">
      <NavBar isUser={isUser} setIsUser={setIsUser} />

      <h1>Inventory stats</h1>

      <div className="widgets-wrapper">
        <Widgets
          icon={<ShoppingCartIcon />}
          textHeading="Total Product"
          value={inventoryData?.apiData?.length}
        />

        <Widgets
          icon={<CurrencyExchangeIcon />}
          textHeading="Total store value"
          value={inventoryData?.totalValue}
        />

        <Widgets
          icon={<RemoveShoppingCartIcon />}
          textHeading="Out of stock"
          value={inventoryData?.outOfStockItems}
        />

        <Widgets
          icon={<CategoryIcon />}
          textHeading="No of category"
          value={inventoryData?.noOfCategories}
        />
      </div>
      <div className="inventory-table-wrapper">
        <InventoryTable
          isUser={isUser}
          inventoryData={inventoryData}
          setInventoryData={setInventoryData}
        />
      </div>
    </div>
  );
}

export default Inventory;

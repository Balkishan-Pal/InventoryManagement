import React, { useState } from "react";
import NavBar from "./NavBar/NavBar";

import "./Inventory.scss";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import Widgets from "../Common/Widgets/Widgets";

function Inventory() {
  const [isUser, setIsUser] = useState(false);
  return (
    <div className="inventory-top-wrapper">
      <NavBar isUser={isUser} setIsUser={setIsUser} />

      <h1>Inventory stats</h1>

      <div className="widgets-wrapper">
        <Widgets
          icon={<ShoppingCartIcon />}
          textHeading="Total Product"
          value="9"
        />

        <Widgets
          icon={<CurrencyExchangeIcon />}
          textHeading="Total store value"
          value="30550  "
        />

        <Widgets
          icon={<RemoveShoppingCartIcon />}
          textHeading="Out of stock"
          value="2"
        />

        <Widgets icon={<CategoryIcon />} textHeading="Out of stock" value="2" />
      </div>
    </div>
  );
}

export default Inventory;

import React from "react";

import Switch from "@mui/material/Switch";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import "./NavBar.scss";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#E5FC72",
    },
  },
});

function NavBar(props) {
  const { isUser, setIsUser } = props;

  const handleSwitch = (e) => {
    const { checked } = e.target;
    setIsUser(checked);
  };
  return (
    <section className="nabar-wrapper">
      <span className="logout-wrap">
        <LogoutRoundedIcon />
      </span>
      <div className="switch-wrapper">
        <span>Admin</span>

        <span>
          <ThemeProvider theme={theme}>
            <Switch onChange={handleSwitch} checked={isUser} size="small" />
          </ThemeProvider>
        </span>
        <span>User</span>
      </div>
    </section>
  );
}

export default NavBar;

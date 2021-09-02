import React from "react";
import useStyles from "../Styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Button,
} from "@material-ui/core";

import { AccountCircle, Menu as MenuIcon } from "@material-ui/icons";

export default function Header({ pageTitle }) {
  const classes = useStyles();
  const [userMenuAnchor, setUserMenuAnchor] = React.useState(null);
  const userMenuOpen = Boolean(userMenuAnchor);
  const [pageMenuAnchor, setPageMenuAnchor] = React.useState(null);
  const pageMenuOpen = Boolean(pageMenuAnchor);
  const [loggedIn, setLoggedIn] = React.useState(false);

  const openUserMenu = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const closeUserMenu = () => {
    setUserMenuAnchor(null);
  };

  const openPageMenu = (event) => {
    setPageMenuAnchor(event.currentTarget);
  };

  const closePageMenu = () => {
    setPageMenuAnchor(null);
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogOut = () => {
    closeUserMenu();
    setLoggedIn(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            onClick={openPageMenu}
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={pageMenuAnchor}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={pageMenuOpen}
            onClose={closePageMenu}
          >
            <MenuItem onClick={closePageMenu}>Home</MenuItem>
            <MenuItem onClick={closePageMenu}>Ranking</MenuItem>
            <MenuItem onClick={closePageMenu}>Record Matches</MenuItem>
          </Menu>
          <Typography variant="h6" className={classes.title}>
            {pageTitle}
          </Typography>
          {loggedIn ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={openUserMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={userMenuAnchor}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={userMenuOpen}
                onClose={closeUserMenu}
              >
                <MenuItem onClick={closeUserMenu}>Profile</MenuItem>
                <MenuItem onClick={closeUserMenu}>My account</MenuItem>
                <MenuItem onClick={handleLogOut}>Log out</MenuItem>
              </Menu>
            </div>
          ) : (
            <Button color="inherit" onClick={handleLogin}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

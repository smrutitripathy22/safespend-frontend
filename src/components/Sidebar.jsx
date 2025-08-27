import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SettingsIcon from "@mui/icons-material/Settings";
import { useLocation, useNavigate } from "react-router-dom";

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, link: "/dashboard" },
  {
    text: "Budget Planning",
    icon: <AccountBalanceWalletIcon />,
    link: "/expense-tracking",
  },
  { text: "Transaction Log", icon: <ReceiptIcon />, link: "/transaction-logs" },
  
  { text: "Account Setting", icon: <SettingsIcon />, link: "/settings" },
];

const Sidebar = () => {

  const location = useLocation();
  const navigate = useNavigate();

 
  const currentIndex = menuItems.findIndex(item => item.link === location.pathname);

  const [selectedIndex, setSelectedIndex] = useState(currentIndex !== -1 ? currentIndex : 0);

  const handleListItemClick = (item, index) => {
    setSelectedIndex(index);
    navigate(item.link);
  };

  return (
    <Box
      width={280}
      height="97vh"
      bgcolor="#fff"
      p={1.2}
      sx={{
        borderRight: "1px solid #e0e0e0",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        scrollbarWidth: "thin",
            bgcolor:'#f7fcfc',
        "&::-webkit-scrollbar": { width: "4px" },
        "&::-webkit-scrollbar-thumb": {
     
          borderRadius: "4px",
        },
      }}
    >
      <Box sx={{ mb: 1 }}>
        {/* Row for logo + text */}
        <Box
          sx={{ display: "flex", gap: 1, alignItems: "center", mb: 1, pl: 1 }}
        >
          <Box
            component="img"
            src={'icon1.png'}
            alt="Safe Spend Logo"
            sx={{ width: 18, height: 18 }}
          />
          <Typography variant="subtitle1" fontWeight="bold" color="#1976d2">
            Safe Spend
          </Typography>
        </Box>

        {/* Divider on its own line */}
        <Divider sx={{ borderColor: "#e0e0e0" }} />
      </Box>

      {/* Menu */}
      <List sx={{ p: 0, m: 0 }}>
        {menuItems.map((item, index) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              selected={selectedIndex === index}
              onClick={() => handleListItemClick(item, index)}
              sx={{
                borderRadius: "6px",
                minHeight: 34,
                px: 1.2,
                "&.Mui-selected": {
                  backgroundColor: "#42a5f5",
                  color: "#fff",
                  "& .MuiListItemIcon-root": { color: "#fff" },
                  "&:hover": { backgroundColor: "#1e88e5" },
                },
                "&:hover": { backgroundColor: "#f0f0f0" },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 28,
                  color: selectedIndex === index ? "#fff" : "#666",
                  fontSize: 16,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                
                  fontWeight: selectedIndex === index ? 600 : 400,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;

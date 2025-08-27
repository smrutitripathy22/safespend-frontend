import { AppBar, Box, Divider, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#fff",
        color: "#000",
        boxShadow: "none",
        height: "50px",
        justifyContent: "center",
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          minHeight: "unset",
          px: 2,
          height: "50px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Box
            component="img"
            alt="custom icon"
            sx={{ width: 20, height: 20 }}
          />
          <Typography variant="subtitle1" fontWeight="bold">
            Safe Spend
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

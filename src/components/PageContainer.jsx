import React from "react";
import Header from "./Header";
import { Box, Container, Stack } from "@mui/material";
import Sidebar from "./Sidebar";

const PageContainer = ({ children }) => {
  return (
    <Box height={"100%"} display={"flex"}>
      <Sidebar />
        <Stack spacing={0.5} p={1} width={'100%'}>{children}</Stack>

    </Box>
  );
};

export default PageContainer;

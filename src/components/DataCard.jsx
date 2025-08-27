import { Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";

const DataCard = ({index,icon,title,value,minWidth=210}) => {
  return (
    <Card
      key={index}
      sx={{
        // flex: "1 1 160px",
        minWidth: minWidth,
        boxShadow: 1,
        borderLeft: "4px solid",
        borderColor: "info.main",
      }}
    >
      <CardContent sx={{ p: 1 }}>
        <Stack alignItems="center" spacing={0.5}>
          {icon}
          <Typography variant="body2" color="text.secondary">
           {title}
          </Typography>
          <Typography variant="subtitle2">
           {value}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default DataCard;

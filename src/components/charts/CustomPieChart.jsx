import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { dummyExpenseBreakdown } from "../../pages/dummyData";
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const CustomPieChart = ({ data }) => {
  return (
   <PieChart width={300} height={300}>
      <Pie
        data={data}
        dataKey="amount"
        nameKey="categoryName"
        cx="50%"
        cy="50%"
        outerRadius={80}
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

export default CustomPieChart;

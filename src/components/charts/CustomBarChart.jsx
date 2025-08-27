import { Box, Paper, Typography } from '@mui/material';
import React from 'react'

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { dummyPlannedVsActual } from '../../pages/dummyData';

const CustomBarChart = ({data}) => {
    

  return (

    
    <BarChart data={data} height={300} width={700}>
                   <CartesianGrid strokeDasharray="3 3" />
                   <XAxis dataKey="categoryName" />
                   <YAxis />
                   <Tooltip/>
                   <Legend />
                   <Bar dataKey="plannedAmount" name={'Planned'} fill="#0088FE" />
                   <Bar dataKey="spendAmount" name={'Actual'} fill="#00C49F" />
                 </BarChart>
              
            
  )
}

export default CustomBarChart
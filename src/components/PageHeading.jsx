import { Typography } from '@mui/material'
import React from 'react'

const PageHeading = ({header}) => {
  return (
    <div>
        
        <Typography
          color="info"
          variant="h6"
          sx={{ fontWeight: "bold", mb: 0.5 }}
        >
          {header}
        </Typography>
      
    </div>
  )
}

export default PageHeading
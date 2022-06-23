import { Card, CardContent, Typography, Grid } from '@mui/material';
import React from 'react'

function NoData({ content }) {
  return (
    <Grid container spacing={2} justifyContent="center" p={10}>
      <Card sx={{ minWidth: 100 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            No {content} yet
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default NoData;
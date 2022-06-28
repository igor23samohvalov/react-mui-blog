import React from 'react';
import { useSelector } from 'react-redux';
import { selector as authorsSelector } from '../slices/authorsSlice.js';
import { Grid, List } from '@mui/material';
import NoData from '../components/NoData.jsx';
import Author from '../components/Author.jsx';

function AuthorsPage() {
  const authors = useSelector(authorsSelector.selectAll)

  if (authors.length === 0) return (<NoData content="authors" />)
  return (
    <Grid container spacing={2} justifyContent="flex-start" p={10}>
      <List
        sx={{
          width: '100%',
          maxWidth: 400,
          bgcolor: 'background.paper'
        }}
      >
        {authors.map((data) => (
          <Author {...data} key={data.id}/>
        ))}
      </List>
    </Grid>
  )
}

export default AuthorsPage;

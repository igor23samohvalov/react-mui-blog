import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selector as postsSelector } from '../slices/postsSlice.js';
import { selector as commentsSelector } from '../slices/commentsSlice.js';
import { selector as authorsSelector } from '../slices/authorsSlice.js';
import {
  Grid,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider
} from '@mui/material';
import authPlaceholder from '../assets/placeholder-avatar.jpg';
import NoData from '../components/NoData.jsx';

function AuthorsPage() {
  const [postsCount, setPosts] = useState(0);
  const [commentsCount, setComments] = useState(0);

  const authors = useSelector(authorsSelector.selectAll)
  const posts = useSelector(postsSelector.selectAll);
  const comments = useSelector(commentsSelector.selectAll);


  if (authors.length === 0) return (<NoData content="authors" />)

  return (
    <Grid container spacing={2} justifyContent="center" p={10}>
      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper'
        }}
      >
        {authors.map(({ author, id}) => (
          <React.Fragment key={id}>
            <ListItem alignItems="flex-start" >
              <ListItemAvatar>
                <Avatar alt="avatar placeholder" src={authPlaceholder} />
              </ListItemAvatar>
              <ListItemText
                primary={author}
                secondary={`Posts: ${postsCount} | Comments: ${commentsCount}`}
              >
              </ListItemText>
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </Grid>
  )
}

export default AuthorsPage;

import React from 'react';
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
import HighlightOff from '@material-ui/icons/HighlightOff';
import { useDispatch } from 'react-redux';
import authPlaceholder from '../assets/placeholder-avatar.jpg';
import NoData from '../components/NoData.jsx';
import { actions as authorsActions } from '../slices/authorsSlice.js';


const getAuthsStats = (array, incAuthor) => {
  return array.filter(({ author }) => author === incAuthor).length;
}

function AuthorsPage() {
  const dispatch = useDispatch();

  const posts = useSelector(postsSelector.selectAll)
  const comments = useSelector(commentsSelector.selectAll);
  const authors = useSelector(authorsSelector.selectAll)

  const handleRemove = (author, id) => {
    dispatch(authorsActions.removeAuthor(id));

    const comments = JSON.parse(localStorage.getItem('comments'));
    const newComments = comments.filter((c) => c.author !== author);
    localStorage.setItem('comments', JSON.stringify(newComments));

    const posts = JSON.parse(localStorage.getItem('posts'));
    const newPosts = posts.filter((p) => p.author !== author);
    localStorage.setItem('posts', JSON.stringify(newPosts));

    const authors = JSON.parse(localStorage.getItem('authors'));
    const newAuthors = authors.filter((a) => a.author !== author);
    localStorage.setItem('authors', JSON.stringify(newAuthors));
  }

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
        {authors.map(({ author, id }) => (
          <React.Fragment key={id}>
            <ListItem alignItems="flex-start" >
              <ListItemAvatar>
                <Avatar alt="avatar placeholder" src={authPlaceholder} />
              </ListItemAvatar>
              <ListItemText
                primary={author}
                secondary={`Posts: ${getAuthsStats(posts, author)} | Comments: ${getAuthsStats(comments, author)}`}
              >
              </ListItemText>
              <HighlightOff
                color='error'
                className="pointer"
                style={{ alignSelf: 'center', fontSize: '30px'}}
                onClick={() => handleRemove(author, id)}
                />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </Grid>
  )
}

export default AuthorsPage;

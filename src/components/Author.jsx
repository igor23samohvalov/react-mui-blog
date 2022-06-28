import React from 'react';
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from '@mui/material';
import HighlightOff from '@material-ui/icons/HighlightOff';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selector as postsSelector } from '../slices/postsSlice.js';
import { selector as commentsSelector } from '../slices/commentsSlice.js';
import { actions as authorsActions } from '../slices/authorsSlice.js';
import localStore from '../utilityFns/localStore.js';

const getAuthsStats = (array, incAuthor) => {
  return array.filter(({ author }) => author === incAuthor).length;
}

function Author({ author, id }) {
  const dispatch = useDispatch();

  const posts = useSelector(postsSelector.selectAll)
  const comments = useSelector(commentsSelector.selectAll);

  const handleRemove = (author, id) => {
    dispatch(authorsActions.removeAuthor(id));

    localStore['remove']('comments', author, 'author');
    localStore['remove']('posts', author, 'author');
    localStore['remove']('authors', author, 'author');
  }

  return (
    <React.Fragment>
      <ListItem alignItems="flex-start" divider>
        <ListItemAvatar>
          <Avatar alt="avatar placeholder" src="./placeholder-avatar.jpg" />
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
    </React.Fragment>
  )
}

export default Author
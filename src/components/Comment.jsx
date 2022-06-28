import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { actions as commentsActions } from '../slices/commentsSlice.js';
import localStore from '../utilityFns/localStore.js';


function Comment({ author, commentText, id }) {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(commentsActions.removeComment(id));

    localStore['remove']('comments', id, 'id');
  };

  return (
    <Card>
      <CardHeader 
        title={`by ${author}`}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {commentText}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="error" onClick={handleRemove}>
          Remove comment
        </Button>
      </CardActions>
    </Card>
  )
}

export default Comment;
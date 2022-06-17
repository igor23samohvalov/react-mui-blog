import React from 'react';
import { Box, TextField, Button } from '@mui/material';
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { actions as commentsActions } from '../slices/commentsSlice.js';
import { selector as commentsSelector } from '../slices/commentsSlice.js';

const errorComments = {
  author: {
    required: 'The field is required',
  },
  commentText: {
    required: 'The field is required',
  },
}

function AddComment({ postId, setAddComment, setComments }) {
  const dispatch = useDispatch();
  const commentsIds = useSelector((commentsSelector.selectIds))
  const lastCommentId = commentsIds.length === 0
    ? 0
    : commentsIds[commentsIds.length - 1];

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm();

  const onSubmit = (values) => {
    const newComment = { ...values, id: lastCommentId + 1, postId };
  
    dispatch(commentsActions.addComment(newComment));
    reset();

    if (localStorage.getItem('comments')) {
      const tempComments = JSON.parse(localStorage.getItem('comments'));
      tempComments.push(newComment);
      localStorage.setItem('comments', JSON.stringify(tempComments));
    } else {
      localStorage.setItem('comments', JSON.stringify([newComment]));
    }
    
    setAddComment(false);
    setComments(true);
  }

  return (
    <Box component="form" sx={{ p: 2 }} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="author"
        defaultValue=""
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            label="Author"
            placeholder="Author"
            margin="dense"
            size="small"
            error={Boolean(errors.commentAuthor)}
            helperText={errorComments['author'][errors.commentAuthor?.type]}
            {...field}
          />
        )}
      />
      <Controller
        name="commentText"
        defaultValue=""
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            label="Comment"
            placeholder="Leave your comment"
            multiline
            rows={2}
            size="small"
            margin="dense"
            fullWidth
            error={Boolean(errors.commentText)}
            helperText={errorComments['commentText'][errors.commentText?.type]}
            {...field}
          />
        )}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{ my: 1 }}
      >
        Submit
      </Button>
    </Box>
  )
}

export default AddComment;
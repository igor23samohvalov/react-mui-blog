import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  Button,
  Collapse,
  CardMedia,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { actions as postsActions } from '../slices/postsSlice.js';
import { selector as commentsSelector } from '../slices/commentsSlice.js';
import AddComment from './AddComment.jsx';
import Comment from './Comment.jsx';


function Post({ title, author, post, id, img }) {
  const dispatch = useDispatch();

  const [isAddComment, setAddComment] = useState(false);
  const [isComments, setComments] = useState(false);

  const [commentsNum, setCommentsNum] = useState(0);
  const comments = useSelector((commentsSelector.selectAll)).filter((c) => {
    return c.postId === id;
  })

  useEffect(() => {
    setCommentsNum(comments.length);
  }, [comments])
  
  const handleRemove = () => {
    dispatch(postsActions.removePost(id));
  };
  const handleExpandClick = (e) => {
    switch (e.target.id) {
      case 'addComment':
        if (isComments) setComments(false)
        setAddComment(!isAddComment);
        break;
      case 'showComments':
      default:
        if (isAddComment) setAddComment(false)
        setComments(!isComments);
        break;
    }
  };

  return (
    <Card sx={{ width: 1, my: 2 }} elevation={6}>
      <CardHeader 
        title={title}
        subheader={`by ${author}`}
      />
      <CardMedia
        component="img"
        height="140"
        image={img}
        alt={title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post}
        </Typography>
      </CardContent>
      <CardActions sx={{ px: '16px' }}>
        <Button size="small" color="error" onClick={handleRemove}>
          Remove post
        </Button>
        <Button
          size="small"
          color="primary"
          id="addComment"
          onClick={handleExpandClick}
          aria-expanded={isAddComment}
          aria-label="show more"
        >
          Add Comment
        </Button>
        <Button
          size="small"
          color="primary"
          id="showComments"
          onClick={handleExpandClick}
          aria-expanded={isComments}
          aria-label="show more"
        >
          Show Comments {`(${commentsNum})`}
        </Button>
      </CardActions>
      <Collapse in={isAddComment} timeout="auto" unmountOnExit sx={{ width: 0.75 }}>
        <AddComment  postId={id} setAddComment={setAddComment} setComments={setComments} />
      </Collapse>
      <Collapse in={isComments} timeout="auto" unmountOnExit>
        {comments.map((c) => <Comment key={c.id} {...c} />)}
      </Collapse>
    </Card>
  );

}

export default Post
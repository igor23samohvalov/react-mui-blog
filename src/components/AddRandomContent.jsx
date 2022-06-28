import React from 'react';
import { Button } from '@mui/material'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selector as postsSelector } from '../slices/postsSlice.js';
import { selector as commentsSelector } from '../slices/commentsSlice.js';
import { selector as authorsSelector } from '../slices/authorsSlice.js';
import { actions as postsActions } from '../slices/postsSlice.js';
import { actions as authorsActions } from '../slices/authorsSlice.js';
import { actions as commentsActions } from '../slices/commentsSlice.js';
import { createRndPost, createRndComment } from '../utilityFns/createRandomContent.js';
import localStore from '../utilityFns/localStore.js';

function AddRandomContent() {
  const dispatch = useDispatch();
  const isOldAuthor = (authors, newAuthor) => {
    return authors.find(({ author }) => author === newAuthor);
  }

  const posts = useSelector(postsSelector.selectAll);
  const authors = useSelector(authorsSelector.selectAll);
  const comments = useSelector(commentsSelector.selectAll);

  let lastCommentId = comments[comments.length - 1]?.id ?? -1;
  let lastPostId = posts[posts.length - 1]?.id ?? -1;
  let lastAuthorId = authors[authors.length - 1]?.id ?? -1;

  const handleClick = {
    posts: () => {
      const newPost = createRndPost(lastPostId + 1);
      newPost.authorId = authors
        .find(({ author }) => author === newPost.author)?.id ?? lastAuthorId + 1;

      dispatch(postsActions.addPost(newPost));
      localStore['update']('posts', newPost);

      if (!isOldAuthor(authors, newPost.author)) {
        const newAuthor = { author: newPost.author, id: newPost.authorId };
        dispatch(authorsActions.addAuthor(newAuthor))

        localStore['update']('authors', newAuthor);
      }
    },
    comments: () => {
      const newComment = createRndComment(lastCommentId + 1, posts.length);
      newComment.authorId = authors
        .find(({ author }) => author === newComment.author)?.id ?? lastAuthorId + 1;

      dispatch(commentsActions.addComment(newComment));
      localStore['update']('comments', newComment);

      if (!isOldAuthor(authors, newComment.author)) {
        const newAuthor = { author: newComment.author, id: newComment.authorId };
        dispatch(authorsActions.addAuthor(newAuthor))
  
        localStore['update']('authors', newAuthor);
      }
    },
  }

  return (
    <div className="absolute-rnd">
      <Button
        color="secondary"
        variant="contained"
        onClick={() => handleClick['posts']()}
      >
        Add Random Post
      </Button>
      <Button
        color="secondary"
        variant="contained"
        onClick={() => handleClick['comments']()}
      >
        Add Random Comment
      </Button>
    </div>
  )
}

export default AddRandomContent;
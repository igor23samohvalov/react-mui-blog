import React from 'react';
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { Box, TextField, Button, Typography } from '@mui/material';
import { selector as postsSelector } from '../slices/postsSlice.js';
import { selector as authorsSelector } from '../slices/authorsSlice.js';
import { actions as postsActions } from '../slices/postsSlice.js';
import { actions as authorsActions } from '../slices/authorsSlice.js';

const errorPosts = {
  author: {
    required: 'The field is required',
  },
  post: {
    required: 'The field is required',
  },
  title: {
    required: 'The field is required',
  },
}

const isOldAuthor = (authors, newAuthor) => {
  return authors.find(({ author }) => author === newAuthor);
}

function AddPost() {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
    register
  } = useForm();

  const posts = useSelector(postsSelector.selectAll);
  const authors = useSelector(authorsSelector.selectAll);
  let lastPostId = posts[posts.length - 1]?.id ?? 0;
  let lastAuthorId = authors[authors.length - 1]?.id ?? 0;

  const onSubmit = (values) => {
    const { picture, ...rest } = values;

    const reader = new FileReader();
    reader.readAsDataURL(picture[0]);
    reader.onload = () => {
      const newPost = { ...rest, id: lastPostId += 1, img: reader.result };
      const newAuthor = { author: values.author, id: lastAuthorId + 1 };
    
      dispatch(postsActions.addPost(newPost))
      dispatch(authorsActions.addAuthor(newAuthor))
      reset();
    
      if (localStorage.getItem('posts')) {
        const tempPosts = JSON.parse(localStorage.getItem('posts'));
        tempPosts.push(newPost);
        localStorage.setItem('posts', JSON.stringify(tempPosts));
      } else {
        localStorage.setItem('posts', JSON.stringify([newPost]));
      }

      // TODO: one FN for every addToLocalStorage
      if (!isOldAuthor(authors, values.author)) {
        

        if (localStorage.getItem('authors')) {
          const tempAuthors = JSON.parse(localStorage.getItem('authors'));
          tempAuthors.push(newAuthor);
          localStorage.setItem('authors', JSON.stringify(tempAuthors));
        } else {
          localStorage.setItem('authors', JSON.stringify([newAuthor]));
        }
      }
    }  
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography
        variant="h5"
        component="div"
        sx={{ bgcolor: '#1976d2', borderRadius: '10px', color: '#fff' }}
        p={1}
      >
        CREATE POST
      </Typography>
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
            sx={{ marginRight: '10px' }}
            error={Boolean(errors.author)}
            helperText={errorPosts['author'][errors.author?.type]}
            {...field}
          />
        )}
      />
      <Controller 
        name="title"
        defaultValue=""
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            label="Title"
            placeholder="Title"
            margin="dense"
            error={Boolean(errors.title)}
            helperText={errorPosts['title'][errors.title?.type]}
            {...field}
          />
        )}
      />
      <Controller
        name="post"
        defaultValue=""
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            multiline
            rows={4}
            label="Post"
            placeholder="Enter your post"
            margin="dense"
            error={Boolean(errors.post)}
            helperText={errorPosts['post'][errors.post?.type]}
            fullWidth 
            {...field}
          />
        )}
      />
      <div className="file-input">
        <input type="file" {...register('picture')} id="addFile" accept="image/*" />
        <label htmlFor="addFile">Select file</label>
        <Button
          variant="contained"
          type="submit"
          sx={{ my: 1 }}
        >
        Submit
      </Button>
      </div>
    </Box>
  )
}

export default AddPost;

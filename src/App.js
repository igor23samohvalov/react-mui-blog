import React, { useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { selector as postsSelector } from './slices/postsSlice.js';
import { actions as postsActions } from './slices/postsSlice.js';
import {
  Grid,
  Box,
  TextField,
  Button,
  Typography
} from '@mui/material';
import Post from './components/Post.jsx';

let ids = 0;
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

function App() {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
    register
  } = useForm();  
  useEffect(() => {
    if (localStorage.getItem('posts')) {
      JSON.parse(localStorage.getItem('posts')).forEach((p) => {
        dispatch(postsActions.addPost(p));
      })
    }
  }, [dispatch]);

  const posts = useSelector(postsSelector.selectAll);

  const onSubmit = (values) => {
    const { picture, ...rest } = values;

    const reader = new FileReader();
    reader.readAsDataURL(picture[0]);
    reader.onload = () => {
      dispatch(postsActions.addPost({...rest, id: ids += 1, img: reader.result }))
      if (localStorage.getItem('posts')) {
        const tempPosts = JSON.parse(localStorage.getItem('posts'));
        tempPosts.push({...rest, id: ids += 1, img: reader.result });
        localStorage.setItem('posts', JSON.stringify(tempPosts));
      } else {
        localStorage.setItem('posts', JSON.stringify([{...rest, id: ids += 1, img: reader.result }]));
      }
    }  
    reset();
  }

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={12} md={5}>
        <Typography
          variant="h5"
          component="div"
          sx={{ bgcolor: '#1976d2', borderRadius: '10px', color: '#fff' }}
          p={1}
        >
          CREATE POST
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
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
          <input type="file" {...register('picture')}/>
          <Button
            variant="contained"
            type="submit"
            sx={{ my: 1 }}
          >
            Submit
          </Button>
        </Box>
        {posts.map((p) => <Post key={p.id} {...p} />)}
      </Grid>
    </Grid>
  );
}

export default App;

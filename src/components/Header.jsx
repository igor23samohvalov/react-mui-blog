import React from 'react';
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  Button,
} from '@mui/material';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import { NavLink } from 'react-router-dom';

const pages = [
  {
    title: 'Authors',
    link: 'authors',
  },
  {
    title: 'Posts',
    link: 'posts',
  },
  {
    title: 'Comments',
    link: 'comments',
  },
];

function Header() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AllInboxIcon sx={{ display: { md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: {  md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <NavLink to="">BLOG</NavLink> 
          </Typography>
          <Box sx={{ display: { md: 'flex' }, marginLeft: 'auto' }}>
            {pages.map(({ link, title }) => (
              <Button
                key={title}
                sx={{ color: 'white', display: 'block' }}
              >
                <NavLink to={link}>{title}</NavLink>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header;
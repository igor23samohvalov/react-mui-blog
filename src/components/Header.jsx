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

const pages = ['Authors', 'Posts', 'Comments'];

function Header() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AllInboxIcon sx={{ display: { md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
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
            BLOG
          </Typography>
          <Box sx={{ flexGrow: 1, display: { md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header;
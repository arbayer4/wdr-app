import React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://bloomingtonwdr.com">
        BloomingtonWDR
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Footer(props) {
  return (
    <Copyright sx={{ mt: 8, mb: 4 }} />
  );
}

export default Footer;
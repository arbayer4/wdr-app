import {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import { Link as BRLink } from "react-router-dom";
import Box from '@mui/material/Box';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import API from "../services/api-config";



const theme = createTheme();

export default function PasswordRecovery(props) {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [emailSent, setEmailSent] = useState(false)

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const {email} = formData;

    API.post("/password-reset",
    {
      user: {
        email: email,
      }
    },
    {withCredentials: false}
    )
    .then(response => {
      setEmailSent(true)
      if(emailSent) {
        // do something
      }
    })
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'red[500]' }}>
            <SportsSoccerIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Password Recovery
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
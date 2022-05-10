
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function NotVerified() {
    return (
      <Card sx={{ minWidth: "80vw" }}>
        <CardContent>
          <Typography variant="h5" component="div" sx={{margin: "20px"}}>
            User Not Verified
          </Typography>
          <Typography variant="body2" color="text.secondary">
            A site admin needs to approve your signup. Please <a href="mailto:bloomingtonwdr@gmail.com">email us</a> with any questions
          </Typography>
        </CardContent>
      </Card>
  );
}

export default NotVerified;
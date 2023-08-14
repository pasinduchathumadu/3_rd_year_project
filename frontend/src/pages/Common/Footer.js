import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import {
  Facebook,
  Instagram,
  Twitter,
  WhatsApp,
  YouTube,
} from "@mui/icons-material";
import { Avatar, Box } from "@mui/material";
import Logo from "../../assests/logo.png";

export default function Footer() {
  return (
    <Box
      component="footer"
      p={6}
      sx={{
        backgroundColor: "white",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mx: "auto", // Center the Box horizontally
              }}
            >
              <Avatar
                alt="Remy Sharp"
                src={Logo}
                sx={{ width: 80, height: 80 }}
              />
            </Box>
            <Typography variant="h6" color="black" gutterBottom>
              Legal
            </Typography>
            <Typography fontWeight="bold">
              <Link href="#" color="inherit" variant="body2">
                Terms and Conditions
              </Link>
            </Typography>
            <Typography fontWeight="bold">
              <Link href="#" color="inherit" variant="body2">
                Privacy Policy
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              123 Main Street, Anytown, USA
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: info@example.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: +1 234 567 8901
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Follow Us
            </Typography>
            <Link href="https://www.facebook.com/" color="inherit">
              <Facebook />
            </Link>
            <Link
              href="https://www.instagram.com/"
              color="inherit"
              sx={{ pl: 1, pr: 1 }}
            >
              <Instagram />
            </Link>
            <Link href="https://www.twitter.com/" color="inherit">
              <Twitter />
            </Link>
            <Link
              href="https://www.youtube.com/"
              color="inherit"
              sx={{ pl: 1, pr: 1 }}
            >
              <YouTube />
            </Link>
            <Link href="https://www.whatsapp.com/" color="inherit">
              <WhatsApp />
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://happytails.com/">
              Happy Tails
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

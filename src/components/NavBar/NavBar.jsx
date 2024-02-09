import { AppBar, Avatar, Box, Container, Toolbar, Tooltip, Typography } from "@mui/material";
import "./NavBar.css"
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { refreshPage } from "../../utils/utils";

export const NavBar = () => {
const loggedInUser = useContext(UserContext)
    return (
        <AppBar  style={{ background: '#ffffff', borderRadius:"8px", maxWidth: "100%"}} position="static">
        <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-evenly' }}>
            <Link to="/" style={{ textDecoration: 'none' }} onClick={ refreshPage }>
            <Typography variant="h6" noWrap component="div" color="text.primary" sx={{ ml: 2, mr: 2, flexGrow: 1 }}>
                    Home
          </Typography>
          </Link>
          <Box sx={{ flexGrow: 0, ml: 2 }}>
          <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
          <Tooltip title={`Logged in as: ${loggedInUser.username}`}>
          <Avatar sx={{m:1}}alt={loggedInUser.username} src={loggedInUser.avatar_url}
          size="medium"/>
          </Tooltip>
          <Typography variant="caption"  display="block" gutterBottom sx={{ ml: 1 }} color="text.primary">
        User: {loggedInUser.username}
      </Typography> 
      </Box>
          </Box>
          </Toolbar>
          </Container>
            </AppBar> 
    )
}
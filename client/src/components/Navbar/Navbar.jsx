import React, { useEffect, useState } from 'react';
import { AppBar, Typography,Toolbar,Button, Avatar } from "@material-ui/core";

import { Link, useLocation,useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import  decode  from 'jwt-decode';
//user-defined 
import useStyles from "./styles";
import memories from '../../images/memories.png';
import { SignOut } from '../../slices/authSlice';
const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
   useEffect(() => {
       const token = user?.token;
       if (token) {
           const decodedToken = decode(token);
           if (decodedToken.exp * 1000 < new Date().getTime()) {
               logout();
           }
       }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);
    const logout = () => {
        dispatch(SignOut());
        history.push('/')
        setUser(null);
    }
	return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">
				Memories
			</Typography>
			<img className={classes.image} src={memories} alt="icon" height="60" />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} src={user.result.imageUrl} alt={user.result.name}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Log Out</Button>
                    </div>
                ): (<Button variant="contained" color="primary" component={Link} to="/auth">Sign In</Button>)}
            </Toolbar>
             
			
		</AppBar>
	);
};

export default Navbar;

import React, { useState } from 'react'
import { Avatar, Paper, Grid, Container, Button, Typography} from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
//user-defined 
import { signin,signup } from '../../slices/authSlice';
import useStyles from './styles';
import Input from './Input';
import Icon from './icon';
const Auth = () => {
    const initialState = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',

    }
    const classes = useStyles();
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const [formData,setFormData] = useState(initialState);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignUp) {
            dispatch(signup(formData, history));
        } else {
            dispatch(signin(formData, history));
        }


    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
        


    }
    const switchMode = () => {
        setFormData(initialState);
        setIsSignUp((previsSignUp) => !previsSignUp)
        handleShowPassword(false);
    }
    const handleShowPassword = () => setShowPassword(!showPassword)
    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
            
            dispatch(signin({ result, token }))
            history.push('/')
            
        } catch (error) {
            console.log(error);
        }
        


    }
    const googleFailure = (error) => {
        console.log(error);
        console.log("Google Sign in was Unsuccessful")

    }
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlined/>
                </Avatar>
                <Typography variant="h5" component="h1">{isSignUp ? 'Sign Up' : "Sign In"}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half/> 
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        {isSignUp &&
                            <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange}  handleShowPassword={handleShowPassword} type="password" />
                        }
                                               
                    </Grid>
                    <GoogleLogin
                        clientId="855303332481-iupl3l3tscgr8m6467setrjbi2ju5e04.apps.googleusercontent.com"
                        render={renderProps => (
                            <Button color="primary" fullWidth className={classes.googleButton} onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon/>} variant="contained">Google Sign In</Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignUp ? 'Sign up ': 'Sign In'}
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>{isSignUp ? "Already have an account? Sign In": "Dont have an account? Sign Up"}</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
       </Container>
    )
}

export default Auth

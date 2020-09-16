import { MDBBtn } from 'mdbreact';
import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './Login.css'
import { nameChecking, emailChecking, passwordChecking } from './FormValidation';
import { googleSignIn, googleSignOut, signInWithFb, createUserWithEmailAndPassword, signInWithEmailAndPassword, initializeFirebaseLogin } from './LogInManager';
import { UserContext } from '../../App';
import google from '../../Images/icons/google.png';
import fb from '../../Images/icons/fb.png';

const Login = () => {
    initializeFirebaseLogin();

    const [nameWarning, setNameWarning] = useState("")
    const [emailWarning, setEmailWarning] = useState("")
    const [passwordWarning, setPasswordWarning] = useState("")
    const [passConfMessage, setPassConfMessage] = useState("")
    const [errmsg, setErrMsg] = useState("")

    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isLogIn: false,
        displayName: '',
        photo: '',
        email: '',
        password: '',
        confirmPassword: false,
        success: false,
        error: ''
    })
    const [loggedInUser, setLoggedInUser] = useContext(UserContext); //------- global logged in user
    const [loader, setLoader] = useState(false);

    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } }


    const handleResponse = (res, redirect) => { //---------------- Handle response from firebase
        console.log(res.error)
        if (res.error) {
            document.getElementById("form").reset();
            newUser && setErrMsg(res.error)
            !newUser && setErrMsg(res.error)
        } else {
            console.log(res.displayName)
            setUser(res);
            setLoggedInUser(res)
            setLoggedInUser(res)
            setLoader(false)
            redirect && history.replace(from);

            newUser && setErrMsg("")
            !newUser && setErrMsg("")
        }
    }
    const googleSignInClick = () => { //------------------- Google Sign In
        googleSignIn()
            .then(res => {
                console.log(res)
                res && handleResponse(res, true);
            })
    }

    const fbSignInClick = () => { //--------------------- facebook login
        signInWithFb()
            .then(res => {
                handleResponse(res, true)
            })
    }
    const handleSubmit = (e) => {
        console.log("submitting.....", user)
        
        setErrMsg("")
        setLoader(true);
        setTimeout(() => {
            setLoader(false);
        }, 3000)

        if (newUser && user.name && user.email && user.password) { //------------- create new user with email password
            if (user.confirmPassword) {
                createUserWithEmailAndPassword(user.name, user.email, user.password)
                    .then(res => {
                        handleResponse(res, true);
                    })
            }
        }
        if (!newUser && user.password && user.email) { //--------------------- Log in with email password
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                })
        }
        e.preventDefault();
    }

    //------- form validation starting ----------

    const saveFormData = (e) => { //------------------- save valid input data in user object
        const newUserInfo = { ...user };
        newUserInfo[e.target.name] = e.target.value;
        setUser(newUserInfo);
        console.log("updated info", user, newUserInfo)
    }
    const clearInputData = (e, msg) => { //------------------- reset input data from user object
        const newUserInfo = { ...user };
        newUserInfo[e.target.name] = "";
        setUser(newUserInfo);
    }
    const nameCheck = (e) => { //------------------- check valid name
        const valid = nameChecking(e);
        const msg = "Name is too small!"
        if (valid) {
            saveFormData(e)
            setNameWarning("")
        } else {
            clearInputData(e, msg)
            setNameWarning(msg)
        }
    }
    const emailCheck = (e) => { //------------------- check valid email
        const valid = emailChecking(e);
        if (valid) {
            saveFormData(e)
            setEmailWarning("")
        } else {
            clearInputData(e)
            setEmailWarning("Invalid Email!")
        }
    }

    const passwordCheck = (e) => { //------------------- check valid password
        const valid = passwordChecking(e);
        if (valid) {
            saveFormData(e)
            setPasswordWarning("")
        } else {
            clearInputData(e)
            setPasswordWarning("Password minimum length 6 and must include number!")
        }
    }

    const confirmPasswordCheck = (e) => { //------------------- check confirm password
        if (e.target.value === user.password) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = true;
            setUser(newUserInfo);
            setPassConfMessage("");
        } else {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = false;
            setUser(newUserInfo);
            setPassConfMessage("Password doesn't match!");
        }
    }




    return (
        <div className="login d-flex justify-content-center p-5">
            <div className="login-form w-50 p-5">

                <div className="center float-left">
                    {newUser ? <h4>Create an account</h4> : <h4>Log In</h4>} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {
                        loader &&
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    }
                    <br/><br/>
                </div>



                <form onSubmit={handleSubmit} id="form">
                    {newUser && <> <input className="form-control" onChange={nameCheck} name="name" type="text" placeholder="Name" required /><br />
                        {nameWarning.length > 0 ? <small style={{ color: 'red' }}>{nameWarning} <br /><br /></small> : <small></small>}
                    </>}

                    <input className="form-control" onChange={emailCheck} name="email" type="text" placeholder="Email" required />  <br />
                    {emailWarning.length > 0 ? <small style={{ color: 'red' }}>{emailWarning} <br /><br /></small> : <small></small>}

                    <input className="form-control" onChange={passwordCheck} name="password" type="password" placeholder="Password" required />  <br />
                    {passwordWarning.length > 0 ? <small style={{ color: 'red' }}>{passwordWarning} <br /><br /></small> : <small></small>}

                    {newUser && <> <input className="form-control" onChange={confirmPasswordCheck} name="confirmPassword" type="password" placeholder="Confirm Password" required /><br />
                        {passConfMessage.length > 0 ? <small style={{ color: 'red' }}>{passConfMessage} <br /><br /></small> : <small></small>}
                    </>}

                    {!newUser && <><input type="checkbox" /> <small> Remember me </small></>}
                    {errmsg && <p style={{ color: 'red' }}>{errmsg}</p>}

                    <MDBBtn className="w-100" color="amber" type="submit">
                        {newUser ? 'Create New Account' : 'Log In'}
                    </MDBBtn>

                    {
                        newUser
                            ?
                            <> <span>Already have an account?</span> <button className="button" type="button" style={{ color: 'orange' }} onClick={() => setNewUser(!newUser)}>Login</button> </>
                            :
                            <> <span>Don't have an account?</span> <button className="button" type="button" style={{ color: 'orange' }} onClick={() => setNewUser(!newUser)}>Create an account</button> </>
                    }

                </form>

                <br />
                <div className="d-flex justify-content-center text-mute">Or</div>
                <br />
                <div className="social-login px-5 py-2">
                    <button className="button ml-3" onClick={fbSignInClick}>
                        <img src={fb} height="28" alt="" /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Continue with Facebook
                    </button>
                </div>
                <br />
                <div className="social-login px-5 py-2">
                    <button className="button ml-3" onClick={googleSignInClick}>
                        <img src={google} height="25" alt="" /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Continue with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
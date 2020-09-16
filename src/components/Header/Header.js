import React, { useContext } from "react";
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBIcon, MDBFormInline, MDBContainer
} from "mdbreact";
import {Link} from 'react-router-dom';
import logo from '../../Images/icons/logo.png';
import { UserContext } from "../../App";
import './Header.css'
import { googleSignOut } from "../Login/LogInManager";



const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    //console.log(loggedInUser, "header")

    const logOut =()=>{
        googleSignOut();
        window.location.reload();
    }
    return (
        <MDBContainer>
            <MDBNavbar color="inherit" dark expand="sm">
                <MDBNavbarBrand>
                    {/* <strong className="white-text">Navbar</strong> */}
                    <Link to="/">
                        <div>
                            <img src={logo} alt="" height="50" style={{ padding: '4px 4px', background: 'white', borderRadius: '15px' }} />
                        </div>
                    </Link>
                </MDBNavbarBrand>
                <MDBNavbarNav right>
                    <MDBNavItem>
                        <MDBFormInline waves>
                            <div className="md-form my-0">
                                <MDBIcon icon="search" className="ml-4" style={{ color: "white" }} />
                                <input className="form-control mr-sm-2" type="text" placeholder="Search Your Destination" aria-label="Search" />
                            </div>
                        </MDBFormInline>
                    </MDBNavItem>
                </MDBNavbarNav>

                <MDBNavbarToggler />
                <MDBCollapse id="navbarCollapse3" navbar>
                    <MDBNavbarNav right>
                        <MDBNavItem>
                            <MDBNavLink to="#!">News</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to="#!">Destination</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to="#!">Blog</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to="#!">Contact</MDBNavLink>
                        </MDBNavItem>
                        {
                            loggedInUser.email
                                ?
                                <>
                                    <MDBNavItem>
                                        <MDBNavLink to="#!">{loggedInUser.displayName}</MDBNavLink>
                                    </MDBNavItem>
                                    <MDBNavItem>
                                        <MDBNavLink to="#!" onClick={logOut}>Log Out</MDBNavLink>
                                    </MDBNavItem>
                                </>
                                :
                                <MDBNavLink to="/login">Login</MDBNavLink>
                        }
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
        </MDBContainer>
    );
}

export default Header;
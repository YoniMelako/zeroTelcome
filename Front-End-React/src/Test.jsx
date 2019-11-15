import React from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBContainer, MDBMask, MDBView ,MDBIcon,MDBDropdown,MDBDropdownMenu,MDBDropdownItem,MDBDropdownToggle} from 'mdbreact';
import { BrowserRouter as Router, Route, Redirect, NavLink } from 'react-router-dom';
import './navbar.css'


const nav = [
    {
        path: '/Home',
        component: '',
        name: 'Home'
    }, {
        path: '/UserList',
        component: '',
        name: 'Users List'
    },
    {
        path: '/About',
        component: '',
        name: 'About'
    }
]



class FullPageIntroWithFixedNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            isWideEnough: false
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.setState({
            collapse: !this.state.collapse
        });
    }



    render() {


        let navbar = nav.map((path) => {
            if (path != nav[0]) {
                return <MDBNavItem active>
                    <MDBNavLink to={path.path}>{path.name}</MDBNavLink>
                </MDBNavItem>
            }
        })

        let Routers = nav.map((route) => {

            return <Route path={route.path} component={route.component} />
        })




        return (
            <div>
                <header>
                    <Router>
                        <MDBNavbar color="indigo" dark expand="md" fixed="top">
                            <MDBNavbarBrand href="/">
                                <strong>ZeroTellcom</strong>
                            </MDBNavbarBrand>
                            {!this.state.isWideEnough && <MDBNavbarToggler onClick={this.onClick} />}
                            <MDBCollapse  isOpen={this.state.collapse} navbar>
                                <MDBNavbarNav left>
                                    {navbar}
                                </MDBNavbarNav>

                                <MDBNavbarNav right>
                                    <MDBNavItem>
                                        <MDBDropdown>
                                            <MDBDropdownToggle nav caret>
                                                <MDBIcon  icon="user" />
                                            </MDBDropdownToggle>
                                            <MDBDropdownMenu className="dropdown-default">
                                                <MDBDropdownItem href="#!"><MDBIcon  icon="user-plus" /> Register</MDBDropdownItem>
                                                <MDBDropdownItem href="#!"><MDBIcon  icon="sign-in-alt" /> Login</MDBDropdownItem>
                                            </MDBDropdownMenu>
                                        </MDBDropdown>
                                    </MDBNavItem>
                                </MDBNavbarNav>
                            </MDBCollapse>
                        </MDBNavbar>
                    </Router>

                    <MDBView src="https://mdbootstrap.com/img/Photos/Others/img%20(50).jpg">
                        <MDBMask overlay="black-light" className="flex-center flex-column text-white text-center">
                           <h2>Welcome to ZeroTellcom Company</h2>
                            <h5>Our company provides service experience and products among the best in the market</h5>
                            <br />
                            <p>You can register in register area</p>
                        </MDBMask>
                    </MDBView>

                    
                </header>

                <main>
                    <MDBContainer className="text-center my-5">
                        <p align="justify">Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </MDBContainer>
                </main>
            </div >
        );
    }
}

export default FullPageIntroWithFixedNavbar;

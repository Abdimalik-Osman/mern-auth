import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavLink, Button } from 'reactstrap';
import { AuthContext } from './contextApi/authContext';
import { Navigate  } from 'react-router-dom';
const Navigation = () => {
    const { user, logout } = useContext(AuthContext);
    if(!user){
        return <Navigate to='/login' replace/>  
    }
    return (
        <Navbar color="light" light expand="md">
            <Nav className="mr-auto" navbar>
                <NavItem>
                    <NavLink tag={Link} to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to="/dashboard">Dashboard</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to="/reports">Reports</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to="/settings">Settings</NavLink>
                </NavItem>
                <NavItem>
                    {user ? (<Button onClick={()=>logout()}>Logout</Button>):(    <NavLink tag={Link} to="/login">Login</NavLink>)}
                
                </NavItem>
            </Nav>
        </Navbar>
    );
};

export default Navigation;

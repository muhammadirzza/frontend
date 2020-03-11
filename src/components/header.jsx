import React, { Component } from "react";
import {
MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBBtn
} from "mdbreact";
import { BrowserRouter as Router } from 'react-router-dom';
import { Redirect } from 'react-router-dom';



class Header extends Component {
state = {
  isOpen: false,
  navigate:false,
}

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

logout = (e) => {
  localStorage.clear()
  
  this.setState({navigate:true})
  console.log(localStorage)
  // if(this.state.navigate===true){
  //   return <Redirect to='/login' />
}


render() {
  // console.log(this.state.navigate)
  return (
    // <Router>
      <MDBNavbar color="indigo" dark expand="md">
        <MDBNavbarBrand href='/'>
          <strong className="white-text">Minimales</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem active>
              <MDBNavLink to="/manageadmin">Manage Admin</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              {/* <MDBNavLink to="#!">Features</MDBNavLink> */}
            </MDBNavItem>
            <MDBNavItem>
              {/* <MDBNavLink to="#!">Pricing</MDBNavLink> */}
            </MDBNavItem>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <span className="mr-2">Dropdown</span>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
            <MDBBtn rounded onClick={this.logout}>Logout</MDBBtn>
          </MDBNavbarNav>
          {/* <MDBNavbarNav right>
            <MDBNavItem>
              <MDBFormInline waves>
                <div className="md-form my-0">
                  <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                </div>
              </MDBFormInline>
            </MDBNavItem>
          </MDBNavbarNav> */}
        </MDBCollapse>
      </MDBNavbar>
    // </Router>
    );
  }
}

export default Header;
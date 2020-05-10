import React, { Component } from "react";
import {
MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBBtn, MDBIcon
} from "mdbreact";
import {IsHome,NotHome,Keyword} from './../redux/actions';
import {connect} from 'react-redux';
import {FaUserCircle} from 'react-icons/fa';
import {capitalfirst} from './../supports/sentencecase';
import {Link, Redirect} from 'react-router-dom';
import {countCart} from './../redux/actions';
import {FiShoppingCart} from 'react-icons/fi'



class Header extends Component {
state = {
  isOpen: false,
  keyword:''
}

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

logout = () => {
  localStorage.clear()
  
}

onKeyChange= (e) =>{
  this.setState({keyword:e.target.value})
  
}

onSearchClick=()=>{
  this.refs.keyword.value=""
}


render() {

  return (
      <MDBNavbar className="" color="navbarhome" dark expand="md" fixed="top" scrolling transparent={this.props.Header}>
        <MDBNavbarBrand href='/'>
          <strong className="white-text" ><i className="fas fa-cat" style={{fontSize:'30px'}}></i>&nbsp;Minimales</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem>
              {/* <MDBFormInline waves> */}
                {/* <div > */}
                  <form className="d-flex p-2" style={{justifyContent:"spaceBetween"}}>
                    <Link to={`/search/${this.state.keyword}`} onClick={this.onSearchClick}>
                      <MDBIcon icon="search" className="ml-4 p-2 warnaicon" style={{fontSize:20}}/>
                    </Link>
                    <input 
                      defaultvalue={this.state.keyword} 
                      className="form-control" 
                      type="text" 
                      placeholder="Search" 
                      aria-label="Search" 
                      name="keyword"
                      ref="keyword"
                      onChange={this.onKeyChange}
                      style={{width:"500px"}}
                      />          
                  </form>
              </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem className="d-flex align-items-center">
              {
                this.props.User.role === 'admin'?
                <MDBNavLink to="/managetransaction">
                  Manage Transaction
                </MDBNavLink>
                :
                null
              }
              {
                this.props.User.role === 'admin'?
                <MDBNavLink to="/manageadmin">
                  Manage Admin
                </MDBNavLink>
                :
                null
              }
            </MDBNavItem>
            <MDBNavItem className="d-flex align-items-center" fontSize="20px">
              {
                this.props.User.role === "" ?
                <MDBNavLink to="/login">Sign In</MDBNavLink>
                :
                null
              }
            </MDBNavItem>
            {
              this.props.User.role==="user"?
              <MDBNavItem className="d-flex align-items-center">
                <MDBNavLink to='/cart'>
                    {this.props.Total.cart} <FiShoppingCart style={{fontSize:20}}/> Cart
                </MDBNavLink>
              </MDBNavItem>
              :
              null
            }
            <MDBNavItem className="d-flex align-items-center">
              {
                this.props.User.username?
                <MDBDropdown>
                  <MDBDropdownToggle nav caret>
                    <FaUserCircle/> hallo, {capitalfirst(this.props.User.username)} 
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem >
                      <Link to='/forgot'>
                        Change Password
                      </Link>
                    </MDBDropdownItem>
                    <MDBDropdownItem >
                      <Link to='/history'>
                        History
                      </Link>
                    </MDBDropdownItem>
                    <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
                :
                null
              }
            </MDBNavItem>
            {
              this.props.User.islogin?
              <MDBBtn onClick={this.logout} className="rounded-pill #ffab00 amber accent-4" href="/">Logout</MDBBtn>
              :
              <MDBBtn  className="#ffab00 amber accent-4 rounded-pill" href="/signup">Sign Up</MDBBtn>
            }
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}

const MapstatetoProps=(state)=>{
  return{
      User:state.Auth,
      Header:state.Header.ishome,
      Total:state.Total
  }
}

export default connect(MapstatetoProps,{IsHome,NotHome,Keyword,countCart})(Header);


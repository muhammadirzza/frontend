import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import Login from './pages/login';
import Header from './components/header';
import Home from './pages/home';
import { Switch, Route } from 'react-router-dom';
import Axios from 'axios';
import { API_url } from './supports/APIurl';
import {KeepLogin} from './redux/actions';
import { connect } from 'react-redux';
import ManageAdmin from './pages/manageadmin';
import Loadingdiv from './components/loading';
import NotFound from './components/nofound';
import ProductDetail from './pages/productdetail';
import Cart from './pages/cart';
import SearchPage from './pages/searcpage';
import Allproducts from './pages/allproducts';
import Signup from './pages/signup';
import Forgotpassword from './pages/forgotpassword';
import ManageTrans from './pages/manageatransaction';
import History from './pages/history'



function App({KeepLogin}) {

  const [Loading, setLoading]=useState(true)

  useEffect(()=>{
    var id = localStorage.getItem('iduser')
    if(id) {
      Axios.get(`${API_url}/users/${id}`)
      .then(res => {
        KeepLogin(res.data)
        console.log(res.data)
      }).catch((err)=>{
        console.log(err)
      }).finally(()=>{
        setLoading(false)
      })
    }else{
      setLoading(false)
    }
  },[])

  if (Loading) {
    return (
      <div className="mt-5" style={{display:"flex", height:"50vh", justifyContent:"center", alignItems:"center"}}>
        <Loadingdiv/>
      </div>      
    )
  }
  return (
    <div>
      <Header/>
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/login' exact component={Login}/>
        <Route path='/manageadmin' exact component={ManageAdmin}/>
        <Route path='/managetransaction' exact component={ManageTrans}/>
        <Route path='/allproducts' exact component={Allproducts}/>
        <Route path='/productdetail/:idprod' exact component={ProductDetail}/>
        <Route path='/cart' exact component={Cart}/>
        <Route path='/signup' exact component={Signup}/>
        <Route path='/forgot' exact component={Forgotpassword}/>
        <Route path='/history' exact component={History}/>
        <Route path='/search/:keyword' exact component={SearchPage}/>
        <Route path='/*' exact component={NotFound}/>
      </Switch>
    </div>
  );
}

export default connect(null, {KeepLogin}) (App);

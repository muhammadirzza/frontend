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
import NotFound from './components/nofound'

function App({KeepLogin}) {

  const [Loading, setLoading]=useState(false)

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
        <Route path='/notfound' exact component={NotFound}/>

      </Switch>
    </div>
  );
}

export default connect(null, {KeepLogin}) (App);

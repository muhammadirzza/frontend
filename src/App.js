import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Login from './pages/login'
import Header from './components/header'
import Home from './pages/home'
import { Switch, Route } from 'react-router-dom'

function App() {
  return (
    <div>
      <Header/>
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/login' exact component={Login}/>
      </Switch>
    </div>
  );
}

export default App;

import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.min.css'
import Router from './components/Router';
import Nav from './components/nav/Index';
import Footer from './components/footer/Index'
import authService from './services/auth-service';
import { observer } from 'mobx-react-lite';
import { useStores } from './store/MobXProvider';



function App() {
  const { authStore } = useStores()
  useEffect(() => {
    authService.refresh().then((response) => {
      if (response.status === 200) {
        authStore.setAuth(true)
        authStore.setUser(response.data)
      }
    }).catch(() => {

    })
  }, [])
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <div className="page-content" style={{paddingBottom:80}}>
          <Router />
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default observer(App);

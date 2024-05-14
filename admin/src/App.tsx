import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import Aside from './components/aside/Index';
import { useStores } from './store/MobXProvider';
import LoginPage from './pages/auth/Index';
import { observer } from 'mobx-react-lite';
import authService from './services/auth-service';

function App() {

  const { authStore } = useStores()

  useEffect(()=>{
    authService.refresh().then((response)=>{
      authStore.setAuth(true)
      authStore.setUser(response.data)
    }).catch((error)=>{
      authStore.setAuth(false)
      console.log(error)
    })
  },[])

  return (
    <div className='body-container'>


      <BrowserRouter>
        {
          authStore.isAuth ? <>
            <Aside />
            <main>
              <Container className='ms-0 py-4'>
                <Router />
              </Container>
            </main>
          </> :
            <LoginPage />
        }
      </BrowserRouter>

    </div>
  );
}

export default observer(App);

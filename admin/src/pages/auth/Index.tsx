import React from 'react'
import LoginForm from './components/LoginForm'
import { Container } from 'react-bootstrap'
import APP_CONFIG from '../../app.config'

type Props = {}

const Index = (props: Props) => {
  return (
    <div className="login">
      <Container>
        <div className="row">
          <div className="col-md-6">

            <h2>Авторизация</h2>
            <LoginForm />
          </div>
          <div className="col-md-6">
            <div className="brand">
              <img src={APP_CONFIG.LOGO} alt="" />
              <h3>FruVeg | Админ</h3>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Index
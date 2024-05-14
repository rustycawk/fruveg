import React from 'react'
import { Badge, Container, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AuthStatus from './AuthStatus'
import APP_CONFIG from '../../app.config'
import { useStores } from '../../store/MobXProvider'
import { observer } from 'mobx-react-lite'

type Props = {}

const Index = (props: Props) => {
  const { basketStore } = useStores()
  return (
    <Navbar className="bg-white shadow-sm">
      <Container>
        <Link className='navbar-brand' to='/'>
          <img src={APP_CONFIG.LOGO} style={{ width: 50 }} alt="" />
          <span className="ms-3 fw-bold">FruVeg</span>
        </Link>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-between">
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            marginLeft:50,
            display: 'flex',
            gap:14,
            alignItems: 'center'
          }}>
            <li><Link to="/catalog" className='my-nav-link'><div>
              Каталог</div></Link></li>
          </ul>
          <div className="d-flex align-items-center">
            <Link to="/basket" className='me-5'><i className="fa-solid fa-cart-shopping text-success" style={{ fontSize: 24 }}></i>
              {
                basketStore.getBasketProductsCount() > 0 && <Badge bg="success">{basketStore.getBasketProductsCount()}</Badge>
              }
            </Link>
            <AuthStatus />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default observer(Index)
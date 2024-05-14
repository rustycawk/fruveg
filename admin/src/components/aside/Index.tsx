import React from 'react'
import { Link } from 'react-router-dom';
import APP_CONFIG from '../../app.config';
import Menu from './Menu';

type Props = {}

const Index = (props: Props) => {
  return (
    <aside>

      <Link to="/">
        <div className="brand">
          <img src={APP_CONFIG.LOGO} alt="" />
          <h3>FruVeg | Админ</h3>
        </div>
      </Link>

      <Menu />

    </aside>
  );
}

export default Index
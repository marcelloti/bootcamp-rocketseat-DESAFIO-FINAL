import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Container, Content, Profile, MenuItem } from './styles';
import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/logo-header.png';

export default function Header() {
  const dispatch = useDispatch();

  function logout() {
    dispatch(signOut());
  }

  const [routeNow, setRouteNow] = useState('');
  const location = useLocation();
  React.useEffect(() => {
    setRouteNow(location.pathname);
  }, [location]);

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="GymPoint" />
        </nav>
        <aside>
          <MenuItem selected={routeNow === '/students'}>
            <Link to="/students">ALUNOS</Link>
          </MenuItem>
          <MenuItem selected={routeNow === '/plans'}>
            <Link to="/plans">PLANOS</Link>
          </MenuItem>
          <MenuItem selected={routeNow === '/enrolments'}>
            <Link to="/enrolments">MATRÍCULAS</Link>
          </MenuItem>
          <MenuItem selected={routeNow === '/help-orders'}>
            <Link to="/help-orders">PEDIDOS DE AUXÍLIO</Link>
          </MenuItem>
          <Profile>
            <div>
              <strong>Marcello Costa</strong>
              <button type="button" onClick={logout}>
                sair do sistema
              </button>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}

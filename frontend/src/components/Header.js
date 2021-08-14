import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { logout } from '../actions/userActions';
import { changeCurrency } from '../actions/currencyActions';

const Header = () => {
  const [currencyIcon, setCurrencyIcon] = useState('Local$');
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const currencyList = useSelector((state) => state.currencyList);
  const { currency } = currencyList;

  useEffect(() => {
    if (!currency.selected) {
      dispatch(changeCurrency('local'));
    } else {
      setCurrencyIcon(genCurrencyIcon(currency.selected));
    }
  }, [dispatch, currency]);

  const logoutHandler = () => {
    dispatch(logout());
  };

  const curencyHandler = (value) => {
    const currency = value.substring(1);
    dispatch(changeCurrency(currency));
  };

  const genCurrencyIcon = (currencyText) => {
    if (currencyText === 'gbp') {
      return `£${currencyText}`;
    } else {
      return `$${currencyText}`;
    }
  };

  return (
    <header>
      <Navbar
        bg='secondary'
        variant='dark'
        expand='md'
        collapseOnSelect
        sticky='top'
        className='py-3'
      >
        <Container>
          <LinkContainer to='/explore'>
            <Navbar.Brand>Green Metals</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <NavDropdown
                title='Explore Companies'
                id='username'
                className='mr-2'
              >
                <LinkContainer to='/explore/lithium'>
                  <NavDropdown.Item>Lithium</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/explore/rees'>
                  <NavDropdown.Item>REEs</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/explore/nickel'>
                  <NavDropdown.Item>Nickel</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/explore/copper'>
                  <NavDropdown.Item>Copper</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>

              <NavDropdown
                className='mr-0 text-right'
                title={currencyIcon}
                id='username'
                style={{ minWidth: '77px' }}
              >
                {['$local', '$usd', '£gbp', '$aud', '$cad'].map(
                  (item, index) => (
                    <NavDropdown.Item
                      key={index}
                      onClick={(e) => curencyHandler(item)}
                    >
                      {item.toUpperCase()}
                    </NavDropdown.Item>
                  )
                )}
              </NavDropdown>
              <LinkContainer to='/compare'>
                <Nav.Link>
                  <i className='fas fa-chart-pie'></i> Compare
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>

                  {userInfo && userInfo.isAdmin && (
                    <>
                      <LinkContainer to='/admin/userlist'>
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/companylist'>
                        <NavDropdown.Item>Companies</NavDropdown.Item>
                      </LinkContainer>
                    </>
                  )}

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

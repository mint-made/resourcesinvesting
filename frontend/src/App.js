import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import CompanyScreen from './screens/CompanyScreen';
import CompareScreen from './screens/CompareScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import UserListScreen from './screens/UserListScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/register' component={RegisterScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/company/:id' component={CompanyScreen} />
          <Route path='/compare' component={CompareScreen} />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>

      <Footer />
    </Router>
  );
};

export default App;

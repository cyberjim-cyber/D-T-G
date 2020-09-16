import React, { createContext, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import { MDBContainer } from 'mdbreact';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Booking from './components/Booking/Booking';
import Hotels from './components/Hotels/Hotels';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import NotFound from './components/NotFound/NotFound';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <div className="App">
        <div className="Home">
          <MDBContainer>
            <BrowserRouter>
              <Header />
              <Switch>
                <Route path="/" exact><Home /></Route>
                <Route path="/travel/:id"><Booking /></Route>
                <PrivateRoute path="/hotels/:name" exact> <Hotels /> </PrivateRoute>
                <Route path="/login"><Login /> </Route>

                <Route path="*"> <NotFound/> </Route>
              </Switch>
            </BrowserRouter>

          </MDBContainer>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;

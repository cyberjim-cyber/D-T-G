import React, { createContext, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import { MDBContainer } from 'mdbreact';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <div className="App">
        <div className="Home">
          <MDBContainer>
              <Header/>
              <Home/>
          </MDBContainer>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;

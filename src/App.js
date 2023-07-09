import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import Home from "./ui/pages/Home";
import Collection from './ui/pages/Collection';
import Header from './ui/components/Header';
import { UserContext } from "./Hooks/UserContext";
import Prodect from './ui/pages/Product';
import Cart from './ui/pages/Cart';
import UserInfo from './Hooks/UserInfo';
import { useCookies } from 'react-cookie';
import Order from './ui/pages/Order';
import getCollections from './Hooks/getCollections';

function App() {
  const [user, setUser] = useState()
  const [token, setToken, removeToken] = useCookies(['token']);
  const [collections, setCollection] = useState()
  useEffect(() => {
    getCollections(setCollection)
    if (token?.token) {
      UserInfo(token.token, setUser)
    }

  }, [])
  return (
    <div className="App">

      <Router>
        <UserContext.Provider value={{ user, setUser, token, setToken, removeToken, collections }}>
          <Header></Header>
          <Routes  >
            <Route element={<Home></Home>} path='/'></Route>
            <Route element={<Collection />} path='/collection/*'></Route>
            <Route element={<Prodect />} path='/product/*'></Route>
            <Route element={<Cart />} path='/Cart/'></Route>
            <Route element={<Order />} path='/order/*'></Route>
          </Routes>
        </UserContext.Provider>
      </Router>

    </div>
  );
}

export default App;

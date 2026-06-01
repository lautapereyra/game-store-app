import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Login from './components/auth/login/Login'
import Protected from './components/routing/protected/Protected';
import NotFound from './components/ui/notFound/NotFound'
import Dashboard from './components/dashboard/Dashboard';
import Catalog from './components/pages/catalog/Catalog';
import AddGame from './components/pages/gameAdd/AddGame';
import Register from './components/auth/register/Register';
import Users from './components/pages/users/users';

import Home from './components/pages/home/Home';
import GameDetails from './components/pages/gameDetails/GameDetails';

import Carrito from './components/pages/carrito/Carrito';



function App() {
  const [count, setCount] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  const [loaded, setLoaded] = useState(false);

  // Cargar carrito
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    setLoaded(true);
  }, []);

  // Guardar SOLO después de cargar
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, loaded]);

  const handleLogIn = (userData) => {
    setLoggedIn(true);
    setUser(userData);
  };

  const handleLogOut = () => {
    setLoggedIn(false);
    setUser(null)
  };

  const addToCart = (game) => {
    setCart([...cart, game]);
  };

  const deleteGame = (indexToDelete) => {
    setCart(cart.filter((_, index) => index !== indexToDelete));
  };

  const clearCart = () => {
    setCart([]);
  };


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/addGame/*" element={<AddGame />} />
          <Route path="/home/*" element={<Dashboard onLogOut={handleLogOut} user={user} />} />
          <Route path="/" element={<Navigate to="home" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login onLogin={handleLogIn} user={user}/>} />
          <Route path="/game/:id" element={<GameDetails addToCart={addToCart} loggedIn={loggedIn} user={user}/>} />
          <Route path="/catalog/*" element={<Catalog addToCart={addToCart} loggedIn={loggedIn} user={user}/>} />
          <Route path="/cart/*" element={<Carrito cart={cart} deleteGame={deleteGame} clearCart={clearCart} />} />
          <Route path="*" element={<NotFound />} />
          <Route path= "/users" element={<Users/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App


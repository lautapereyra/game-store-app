import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Login from './components/pages/login/Login'
import Protected from './components/routing/protected/Protected';
import NotFound from './components/ui/notFound/NotFound'
import Dashboard from './components/dashboard/Dashboard';
import Catalog from './components/pages/catalog/Catalog';
import AddGame from './components/pages/gameAdd/AddGame';

import Home from './components/pages/home/Home';
import GameDetails from './components/pages/gameDetails/GameDetails';

import Carrito from './components/pages/carrito/Carrito';



function App() {
  const [count, setCount] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);

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

  const handleLogIn = () => {
    setLoggedIn(true);
  };

  const handleLogOut = () => {
    setLoggedIn(false);
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
          <Route path="/home/*" element={<Dashboard onLogOut={handleLogOut} />} />
          <Route path="/" element={<Navigate to="home" />} />
          <Route path="/login" element={<Login onLogin={handleLogIn} />} />
          <Route path="/game/:id" element={<GameDetails addToCart={addToCart} loggedIn={loggedIn} />} />
          <Route path="/catalog/*" element={<Catalog addToCart={addToCart} loggedIn={loggedIn} />} />
          <Route path="/cart/*" element={<Carrito cart={cart} deleteGame={deleteGame} clearCart={clearCart} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App


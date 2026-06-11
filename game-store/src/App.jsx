import { useState, useEffect } from 'react';
import { Navigate, BrowserRouter, Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './components/auth/autProvider/AuthProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import Login from './components/auth/login/Login';
import Protected from './components/routing/protected/Protected';
import NotFound from './components/ui/notFound/NotFound';
import Dashboard from './components/dashboard/Dashboard';
import Catalog from './components/pages/catalog/Catalog';
import AddGame from './components/pages/gameAdd/AddGame';
import AddNews from './components/news/addNews/AddNews';
import Register from './components/auth/register/Register';
import Users from './components/pages/users/users';
import GameDetails from './components/pages/gameDetails/GameDetails';
import Carrito from './components/pages/carrito/Carrito';
import News from './components/news/News';
import NewsDetails from './components/news/newsDetails/NewsDetails';
import EditNews from './components/news/editNews/EditNews';

function App() {
  const [cart, setCart] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (!user) {
      setCart([]);
      setLoaded(true);
      return;
    }

    const savedCart = localStorage.getItem(`cart_${user.id}`);

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    } else {
      setCart([]);
    }

    setLoaded(true);
  }, [user]);

  useEffect(() => {
    if (loaded && user) {
      localStorage.setItem(
        `cart_${user.id}`,
        JSON.stringify(cart)
      );
    }
  }, [cart, loaded, user]);

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
    <BrowserRouter>
      <Routes>

        {/* Públicas */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home/*" element={<Dashboard addToCart={addToCart} />} />
        <Route
          path="/catalog/*"
          element={<Catalog addToCart={addToCart} />}
        />
        <Route
          path="/game/:id"
          element={<GameDetails addToCart={addToCart} />}
        />
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<NewsDetails />} />

        {/* Protegidas */}
        <Route
          path="/cart/*"
          element={
            <Protected>
              <Carrito
                cart={cart}
                deleteGame={deleteGame}
                clearCart={clearCart}
              />
            </Protected>
          }
        />
        <Route
          path="/addGame/*"
          element={
            <Protected allowedRoles={["ADMIN"]}>
              <AddGame />
            </Protected>
          }
        />
        <Route
          path="/news/add"
          element={
            <Protected allowedRoles={["ADMIN", "MODERATOR"]}>
              <AddNews />
            </Protected>
          }
        />
        <Route
          path="/users"
          element={
            <Protected allowedRoles={["ADMIN"]}>
              <Users />
            </Protected>
          }
        />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/news/edit/:id"
          element={
            <Protected allowedRoles={["ADMIN", "MODERATOR"]}>
              <EditNews />
            </Protected>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
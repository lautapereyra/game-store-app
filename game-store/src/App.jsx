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
import AddGame from './components/pages/gameForms/AddGame';
import AddNews from './components/news/addNews/AddNews';
import Register from './components/auth/register/Register';
import Users from './components/pages/users/users';
import GameDetails from './components/pages/gameDetails/GameDetails';
import Carrito from './components/pages/carrito/Carrito';
import News from './components/news/News';
import NewsDetails from './components/news/newsDetails/NewsDetails';
import EditNews from './components/news/editNews/EditNews';
import EditGame from './components/pages/gameForms/EditGame';
import Checkout from './components/pages/checkout/CheckOut';


function App() {
  // Estado global del carrito de compras
  const [cart, setCart] = useState([]);

  // Indica cuaando se terminó de cargar el carrito desde localStorage
  const [loaded, setLoaded] = useState(false);

  // Obtiene el usuario autenticado desde el contexto
  const { user } = useContext(AuthContext);

  // Carga el carrito correspondiente al usuario al iniciar sesion
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

  // Guarda automaticamente el carrito en localStorage cuando cambia
  useEffect(() => {
    if (loaded && user) {
      localStorage.setItem(
        `cart_${user.id}`,
        JSON.stringify(cart)
      );
    }
  }, [cart, loaded, user]);

  // Agrega un juego al carrito
  const addToCart = (game) => {
    setCart([...cart, game]);
  };

  // Elimina un juego del carrito segun su posición
  const deleteGame = (indexToDelete) => {
    setCart(cart.filter((_, index) => index !== indexToDelete));
  };

  // Vacia completamente el carrito
  const clearCart = () => {
    setCart([]);
  };

  return (
    <BrowserRouter>
      <Routes>

        {/* Rutas públicas: accesibles para cualquier usuario */}
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

        {/* Rutas protegidas: requieren un usuario autenticado */}
        <Route
          path="/cart/*"
          element={
            <Protected>
              <Carrito cart={cart}
                deleteGame={deleteGame}
                clearCart={clearCart} />
            </Protected>}
        />

        {/* Solo ADMIN y MODERATOR pueden gestionar videojuegos */}
        <Route
          path="/addGame"
          element={
            <Protected
              allowedRoles={["ADMIN", "MODERATOR",]}>
              <AddGame />
            </Protected>
          }
        />

        <Route
          path="/games/edit/:id"
          element={
            <Protected
              allowedRoles={["ADMIN", "MODERATOR",]}>
              <EditGame />
            </Protected>
          }
        />

        {/* Solo ADMIN y MODERATOR pueden administrar noticias */}
        <Route
          path="/news/add"
          element={
            <Protected allowedRoles={["ADMIN", "MODERATOR"]}>
              <AddNews />
            </Protected>
          }
        />
        <Route
          path="/news/edit/:id"
          element={
            <Protected allowedRoles={["ADMIN", "MODERATOR"]}>
              <EditNews />
            </Protected>
          }
        />

        {/* Solo el ADMIN puede gestionar usuarios */}
        <Route
          path="/users"
          element={
            <Protected allowedRoles={["ADMIN"]}>
              <Users />
            </Protected>
          }
        />

        {/* Checkout accesible solo para usuarios autenticados */}
        <Route
          path="/checkout"
          element={
            <Protected>
              <Checkout
                cart={cart}
                clearCart={clearCart}
              />
            </Protected>
          }
        />

        {/* Página de error para rutas inexistentes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
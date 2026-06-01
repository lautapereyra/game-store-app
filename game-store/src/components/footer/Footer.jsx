import "./footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">

                <div className="footer-section">
                    <h3 className="footer-title">GameStore</h3>
                    <p className="footer-text">
                        Tu tienda digital para descubrir, comprar y disfrutar
                        los mejores videojuegos.
                    </p>
                </div>

                <div className="footer-section">
                    <h4 className="footer-subtitle">Navegación</h4>
                    <ul className="footer-links">
                        <li><a href="/">Inicio</a></li>
                        <li><a href="/catalog">Catálogo</a></li>
                        <li><a href="/cart">Carrito</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4 className="footer-subtitle">Contacto</h4>
                    <p>info@gamestore.com</p>
                    <p>Rosario, Argentina</p>
                </div>

            </div>

            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} GameStore. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;
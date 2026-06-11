import Home from '../pages/home/Home';
import "./dashboard.css"
const Dashboard = ({
    user,
    onLogout,
    games,
    addToCart
}) => {
    return (
        <div>
            <div className="app-container">
                <Home addToCart={addToCart} />
            </div>
        </div>
    );
};

export default Dashboard;
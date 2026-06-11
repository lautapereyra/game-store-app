import Home from '../pages/home/Home';

const Dashboard = ({
    user,
    onLogout,
    games,
    addToCart
}) => {
    return (
        <div>
            <Home addToCart={addToCart} />
        </div>
    );
};

export default Dashboard;
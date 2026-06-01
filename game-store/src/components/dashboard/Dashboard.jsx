import Home from '../pages/home/Home';

const Dashboard = ({
    user,
    onLogout,
    games,
    addToCart
}) => {
    return (
        <div>
            <Home
                user={user}
                onLogout={onLogout}
                games={games}
                addToCart={addToCart}
            />
        </div>
    );
};

export default Dashboard;
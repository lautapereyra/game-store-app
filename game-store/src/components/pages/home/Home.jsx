import React from 'react';
import Navbar from '../../navbar/Navbar';
import Hero from '../hero/Hero';
import TopRated from '../../topRated/TopRated';
import Footer from '../../footer/Footer';
import LatestNews from '../../news/latestNews/LatestNews'
const Home = ({
    user,
    onLogout,
    games = [],
    addToCart
}) => {
    return (
        <div>
            <Navbar
                user={user}
                onLogOut={onLogout}
            />

            <Hero />

            <TopRated addToCart={addToCart} />

            <LatestNews />

            <Footer />
        </div>
    );
};

export default Home;
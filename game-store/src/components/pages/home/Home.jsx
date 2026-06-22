import React, { useEffect, useState } from 'react';
import Navbar from '../../navbar/Navbar';
import Hero from '../hero/Hero';
import TopRated from '../../topRated/TopRated';
import Footer from '../../footer/Footer';
import LatestNews from '../../news/latestNews/LatestNews';

const Home = ({
    user,
    onLogout,
    games = [],
    addToCart
}) => {

    const [news, setNews] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/news")
            .then(res => res.json())
            .then(data => setNews(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <Navbar
                user={user}
                onLogOut={onLogout}
            />

            <Hero />

            <TopRated addToCart={addToCart} />

            <LatestNews news={news} />

            <Footer />
        </div>
    );
};

export default Home;
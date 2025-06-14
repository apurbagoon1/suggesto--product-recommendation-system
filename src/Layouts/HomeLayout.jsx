import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import AuthModal from '../Components/AuthModal';
import Loading from '../Pages/Loading';
import { AuthContext } from '../provider/AuthProvider';

const HomeLayout = () => {
    const { isAuthModalOpen, setIsAuthModalOpen } = useContext(AuthContext);
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const timeout = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timeout);
    }, [location]);

    return (
        <div>
            <header>
                <Navbar></Navbar>
            </header>
            {loading ? <Loading /> : <Outlet />}
            <footer>
                <Footer></Footer>
            </footer>
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

        </div>
    );
};

export default HomeLayout;
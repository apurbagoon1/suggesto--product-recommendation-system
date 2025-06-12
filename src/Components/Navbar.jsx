import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router';
import { Menu, X, Search, User, ArrowLeft } from 'lucide-react';
import logo from '../assets/idea.png';

const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'QUERIES', path: '/queries' },
    { name: 'MY QUERIES', path: '/myQueries' },
];

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isRecommendationOpen, setIsRecommendationOpen] = useState(false);


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* Top Navbar */}
            <header
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
                    ? 'backdrop-blur-md'
                    : 'bg-transparent'
                    }`}
            >
                <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-8 lg:px-2 py-6">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <img src={logo} alt="Logo" className="h-10 md:h-12 lg:h-14" />
                        <div className="">
                            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-orange-500 tracking-wider mb-1 logo-text">Suggesto</h1>
                            <p className="text-xs lg:text-sm font-extralight tracking-wider">PRODUCT RECO. SYSTEM</p>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <nav className="hidden lg:flex items-center gap-6 relative">
                        {navItems
                            .filter(item => item.name !== 'RECOMMENDATION')
                            .map(item => (
                                <NavLink
                                    key={item.name}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'bg-gradient-to-tr from-yellow-600 to-orange-700 text-gray-200 px-3 py-1 rounded'
                                            : 'text-white hover:text-orange-500 font-semibold'
                                    }
                                >
                                    {item.name}
                                </NavLink>
                            ))}

                        {/* Recommendation Dropdown */}
                        <div className="relative group">
                            <button className="text-white hover:text-orange-500 font-semibold px-3 py-1 rounded">
                                RECOMMENDATION
                            </button>

                            {/* Dropdown Menu */}
                            <div className="absolute top-full left-0 mt-1 w-56 bg-gray-900 shadow-lg rounded-md invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50">
                                <NavLink
                                    to="/myRecommendations"
                                    className="block px-4 py-2 text-white hover:bg-gray-700"
                                >
                                    My Recommendations
                                </NavLink>
                                <NavLink
                                    to="/recommendationsForMe"
                                    className="block px-4 py-2 text-white hover:bg-gray-700"
                                >
                                    Recommendations For Me
                                </NavLink>
                            </div>
                        </div>
                    </nav>

                    <div className="hidden lg:flex gap-3 items-center">
                        <button className="rounded-full border-2 border-orange-500 p-2 hover:bg-orange-500 cursor-pointer">
                            <User className="text-white text-2xl" size={20} />
                        </button>
                        <button className="rounded-full border-2 border-orange-500 p-2 hover:bg-orange-500 cursor-pointer">
                            <Search className="text-white" size={20} />
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="lg:hidden cursor-pointer" onClick={() => setIsSidebarOpen(true)}>
                        <Menu size={30} className='text-orange-500' />
                    </button>
                </div>
            </header>

            {/* Sidebar for Mobile */}
            <div className={`fixed top-0 left-0 h-full w-72 bg-black z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:hidden`}>
                <div className="flex justify-between px-4 py-6">
                    <Link to="/" className="text-center mx-auto space-y-2 mt-8">
                        <img src={logo} alt="Logo" className="h-10 mx-auto" />
                        <div>
                            <h1 className="text-xl tracking-wider mb-2 logo-text">Suggesto</h1>
                            <p className="text-xs text-orange-500 font-extralight tracking-wider">PRODUCT RECOMMENDATION</p>
                        </div>
                    </Link>

                    <button onClick={() => setIsSidebarOpen(false)}>
                        <ArrowLeft size={25} className="text-orange-500 relative -top-14 cursor-pointer" />
                    </button>
                </div>

                <div className="px-4">
                    <div className="relative mb-4">
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full p-2 pl-3 rounded bg-gray-800 text-white"
                        />
                        <Search className="absolute top-2.5 right-3 text-orange-500" size={18} />
                    </div>

                    <ul className="space-y-2 mt-4 text-left pl-2">
                        {navItems
                            .filter(item => item.name !== 'RECOMMENDATION')
                            .map(item => (
                                <li key={item.name}>
                                    <NavLink
                                        to={item.path}
                                        onClick={() => setIsSidebarOpen(false)}
                                        className={({ isActive }) =>
                                            `block px-4 py-2 rounded hover:bg-gray-800 ${isActive ? 'text-orange-500 font-semibold text-sm' : 'text-white text-sm'}`
                                        }
                                    >
                                        {item.name}
                                    </NavLink>
                                </li>
                            ))}

                        <li>
                            <div
                                className="px-4 py-2 rounded text-white hover:bg-gray-800 cursor-pointer flex justify-between items-center"
                                onClick={() => setIsRecommendationOpen(prev => !prev)}
                            >
                                <span>RECOMMENDATION</span>
                                <span>{isRecommendationOpen ? '▲' : '▼'}</span>
                            </div>

                            {isRecommendationOpen && (
                                <ul className="ml-4 mt-1">
                                    <li>
                                        <NavLink
                                            to="/myRecommendations"
                                            onClick={() => setIsSidebarOpen(false)}
                                            className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                                        >
                                            My Recommendations
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/recommendationsForMe"
                                            onClick={() => setIsSidebarOpen(false)}
                                            className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                                        >
                                            Recommendations For Me
                                        </NavLink>
                                    </li>
                                </ul>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Navbar;
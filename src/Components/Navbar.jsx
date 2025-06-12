import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router';
import { Menu, X, Search, User, ArrowLeft } from 'lucide-react';
import logo from '../assets/idea.png';

const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'QUERIES', path: '/queries' },
    { name: 'RECOMMENDATION', path: '/recommendation' },
    { name: 'MY QUERIES', path: '/myQueries' },
    { name: 'BLOGS', path: '/blogs' },
];

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
                    ? 'bg-[#1f1f1f] bg-opacity-90 shadow-md backdrop-blur-md'
                    : 'bg-transparent'
                    }`}
            >
                <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-8 lg:px-2 py-6">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <img src={logo} alt="Logo" className="h-10 md:h-12"/>
                        <div className="">
                            <h1 className="text-xl md:text-2xl font-bold text-orange-500 tracking-wide">Suggesto</h1>
                            <p className="text-xs md:text-sm font-light tracking-wider">PRODUCT RECOMMENDATION</p>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <nav className="hidden lg:flex items-center gap-6">
                        {navItems.map(item => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                className={({ isActive }) =>
                                    isActive
                                        ? 'bg-gradient-to-tr from-orange-400 to-orange-700 text-gray-200 px-3 py-1 rounded'
                                        : 'text-white hover:text-orange-500 font-semibold'
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}
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
                        <Menu size={30} className='text-orange-500'/>
                    </button>
                </div>
            </header>

            {/* Sidebar for Mobile */}
            <div className={`fixed top-0 left-0 h-full w-72 bg-black z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:hidden`}>
                <div className="flex justify-between px-4 py-6">
                    <Link to="/" className="text-center mx-auto space-y-2 mt-8">
                        <img src={logo} alt="Logo" className="h-10 mx-auto" />
                        <div>
                            <h1 className="text-xl tracking-wide mb-2">Suggesto</h1>
                            <p className="text-xs text-orange-500 font-light tracking-wider">PRODUCT RECOMMENDATION</p>
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
                        {navItems.map(item => (
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
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Navbar;
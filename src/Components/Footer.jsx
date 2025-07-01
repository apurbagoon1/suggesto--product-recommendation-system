import React from 'react';
import { Link, NavLink } from 'react-router';
import logo from '../assets/idea.png';

import {
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Youtube,
    Mail,
    Phone,
    MapPin
} from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-base-200 text-base-content pt-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-10 md:px-24 py-12">

                <div>
                    <Link to='/' className="flex items-center gap-2 mb-4">
                        <img src={logo} alt="Logo" className="h-10" />
                        <h2 className="text-2xl font-bold text-orange-500 logo-text">Suggesto</h2>
                    </Link>
                    <p className="text-sm leading-relaxed max-w-sm">
                        Get personalized product recommendations powered by smart insights - quick, easy, and tailored to you.
                    </p>
                </div>

                {/* Navigation */}
                <div>
                    <h6 className="footer-title mb-4 text-lg font-semibold">Navigation</h6>
                    <div className="space-y-2">
                        <NavLink to="/" className="block hover:text-orange-500 transition">Home</NavLink>
                        <NavLink to="/about" className="block hover:text-orange-500 transition">About</NavLink>
                        <NavLink to="/queries" className="block hover:text-orange-500 transition">Queries</NavLink>
                    </div>
                </div>

                {/* Contact */}
                <div>
                    <h6 className="footer-title mb-4 text-lg font-semibold">Contact Us</h6>
                    <div className="space-y-3 text-sm">
                        <p className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-orange-500" />
                            +880134568910
                        </p>
                        <p className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-orange-500" />
                            support@suggesto.com
                        </p>
                        <p className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-orange-500" />
                            123 Main St, Gazipur, Dhaka
                        </p>
                    </div>
                </div>
            </div>

            <div className='border-b border-orange-500/50 mx-20'></div>

            <div className="pt-6 pb-10 px-10 md:px-24 flex flex-col md:flex-row items-center justify-between gap-6">
                <p className="text-sm text-center md:text-left">
                    © {new Date().getFullYear()} <span className="font-bold text-orange-500 logo-text">Suggesto</span>. All rights reserved.
                </p>
                <div className="flex gap-4">
                    <a href="#" aria-label="Facebook"><Facebook className="hover:text-orange-500 transition" /></a>
                    <a href="#" aria-label="Twitter"><Twitter className="hover:text-orange-500 transition" /></a>
                    <a href="#" aria-label="Instagram"><Instagram className="hover:text-orange-500 transition" /></a>
                    <a href="#" aria-label="LinkedIn"><Linkedin className="hover:text-orange-500 transition" /></a>
                    <a href="#" aria-label="YouTube"><Youtube className="hover:text-orange-500 transition" /></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

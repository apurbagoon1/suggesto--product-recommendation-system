import React from 'react';
import { Link, NavLink } from 'react-router';
import logo from '../assets/idea.png';

import {
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Youtube,
} from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-base-200 text-base-content pt-10 border-t">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 px-10 md:px-24 py-12">
                <div className='md:mr-10'>
                    <Link to='/'>
                        <img src={logo} alt="Logo" className="h-10 mb-2" />
                        <h2 className="text-xl font-bold text-orange-500 mb-2 logo-text">Suggesto</h2>
                    </Link>

                    <p className="text-sm leading-relaxed mt-3">
                        Get personalized product recommendations powered by smart insights  -  quick, easy, and tailored to you.
                    </p>
                </div>

                <div className='space-y-1'>
                    <h6 className="footer-title mb-2">Navigation</h6>
                    <NavLink to="/" className="link link-hover block">Home</NavLink>
                    <NavLink to="/queries" className="link link-hover block">Queries</NavLink>
                    <NavLink to="/recommendation" className="link link-hover block">Recommendation</NavLink>
                    <NavLink to="/myQueries" className="link link-hover block">My Queries</NavLink>
                </div>

                <div className='space-y-1'>
                    <h6 className="footer-title mb-2">Company</h6>
                    <a className="link link-hover block">About Us</a>
                    <a className="link link-hover block">Contact</a>
                    <a className="link link-hover block">Careers</a>
                    <a className="link link-hover block">Blog</a>
                </div>

                <div className='space-y-1'>
                    <h6 className="footer-title mb-2">Legal</h6>
                    <a className="link link-hover block">Terms of use</a>
                    <a className="link link-hover block">Privacy policy</a>
                    <a className="link link-hover block">Cookie policy</a>
                </div>
            </div>

            <div className="border-t border-base-300 pt-6 pb-10 px-10 md:px-24 flex flex-col md:flex-row items-center justify-between gap-6">
                <aside className="text-center md:text-left">
                    <p className="text-sm">
                        © {new Date().getFullYear()} <span className="font-bold text-orange-500 logo-text">Suggesto</span>. All rights reserved.
                    </p>
                </aside>
                <nav className="flex gap-4">
                    <a href="#" aria-label="Facebook"><Facebook className="hover:text-orange-500 transition" /></a>
                    <a href="#" aria-label="Twitter"><Twitter className="hover:text-orange-500 transition" /></a>
                    <a href="#" aria-label="Instagram"><Instagram className="hover:text-orange-500 transition" /></a>
                    <a href="#" aria-label="LinkedIn"><Linkedin className="hover:text-orange-500 transition" /></a>
                    <a href="#" aria-label="YouTube"><Youtube className="hover:text-orange-500 transition" /></a>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
import React from 'react';
import CoverImage from '../assets/cover.jpg'
import { Link } from 'react-router';

const Cover = ({ title, highlighted, current }) => {
    return (
        <div>
            <div
                className="relative bg-cover bg-center h-[65vh]"
                style={{ backgroundImage: `url("${CoverImage}")` }}
            >
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white mt-14">
                    <h4 className="text-xl md:text-2xl font-bold text-orange-500 mb-4 logo-text tracking-wider">{title}</h4>
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-wide mb-4">
                        Suggesto 
                    </h1>
                    <span className="text-orange-500 text-3xl md:text-5xl font-extrabold tracking-wider mb-2">{highlighted}</span>
                    <div className="mt-4 flex items-center gap-3">
                        <Link to='/'><span className="font-bold tracking-wide">Home</span></Link>
                        <span>|</span>
                        <span className='tracking-wide'>{current}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cover;
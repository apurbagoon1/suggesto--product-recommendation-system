import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import Email from '../assets/lotties/Email.json'
import Swal from 'sweetalert2';

const NewsletterSection = () => {
    return (
        <section className="bg-gradient-to-r from-orange-100 via-yellow-50 to-orange-100 py-20 px-6 md:px-14 lg:px-24">
            <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">

                <div className="w-full md:w-2/4 space-y-6">
                    <h2 className="text-2xl md:text-4xl font-bold text-orange-500 tracking-wide">
                        Stay Updated!
                    </h2>
                    <p className="md:text-lg tracking-wide text-gray-600">
                        Subscribe to our newsletter and get the latest tips, blogs, and insights right in your inbox.
                    </p>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.target.reset();
                            Swal.fire({
                                title: 'Subscribed!',
                                text: 'You have successfully subscribed to our newsletter.',
                                icon: 'success',
                                confirmButtonColor: '#fb923c',
                            });
                        }}
                        className="space-y-4"
                    >
                        <input
                            type="email"
                            required
                            placeholder="Enter your email"
                            className="w-full px-5 py-3 rounded-lg border border-gray-400 text-gray-500 focus:outline-none focus:ring focus:ring-orange-500 placeholder:text-gray-500"
                        />
                        <button
                            type="submit"
                            className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-semibold shadow-md hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>

                <div className="w-full md:w-1/2">
                    <Player
                        autoplay
                        loop
                        src={Email}
                        style={{ height: '300px', width: '100%' }}
                    />
                </div>
            </div>
        </section>
    );
};

export default NewsletterSection;

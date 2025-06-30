import React from 'react';
import promoImg from '../assets/promo-side-image.jpg'; 

const PromoSection = () => {
  return (
    <section className="relative bg-gradient-to-tr from-orange-200 via-yellow-100 to-orange-200 py-20 px-4 md:px-12 lg:px-24 overflow-hidden">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
        
        {/* Left Content */}
        <div className="lg:w-2/5 text-center lg:text-left space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-orange-500 leading-snug tracking-wide">
            Make Smarter Choices Every Time You Shop
          </h2>
          <p className="text-gray-600 md:text-lg leading-relaxed">
            Let Suggesto guide your decisions with intelligent, personalized product suggestions. Simplify your journey and explore with confidence.
          </p>
          <a
            href="/allQueries"
            className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-semibold shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
          >
            Start Exploring
          </a>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-xl">
            <div className="absolute rounded-xl"></div>
            <img
              src={promoImg}
              alt="Promo Visual"
              className="w-full rounded-xl shadow-lg object-cover"
            />
          </div>
        </div>
      </div>

      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse -z-10"></div>
    </section>
  );
};

export default PromoSection;

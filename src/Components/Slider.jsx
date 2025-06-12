import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import slider1 from '../assets/Slider-1.jpg'
import slider2 from '../assets/Slider-2.jpg'
import slider3 from '../assets/Slider-3.jpg'

const slides = [
    {
        id: 1,
        image: slider1,
        title: 'Discover Smarter Choices',
        description: 'Unlock personalized product recommendations tailored to your needs and preferences.',
        buttonText: 'Explore Now',
        link: '/',
    },
    {
        id: 2,
        image: slider2,
        title: 'Intelligent Picks Made Simple',
        description: 'Say goodbye to endless searching — get smart recommendations instantly based on your input.',
        buttonText: 'Get Started',
        link: '/',
    },
    {
        id: 3,
        image: slider3,
        title: 'Your Preferences, Our Priority',
        description: 'Save time and make better decisions with recommendations designed just for you.',
        buttonText: 'Try It Out',
        link: '/',
    },
];

const Slider = () => {
    return (
        <div className="relative h-screen w-full z-0">
            <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                showIndicators={true}
                interval={5000}
                transitionTime={1000}
                swipeable={true}
                emulateTouch
            >
                {slides.map((slide) => (
                    <div
                        key={slide.id}
                        className="h-screen w-full bg-cover bg-center flex items-center justify-center text-white"
                        style={{
                            backgroundImage: `url(${slide.image})`,
                        }}
                    >
                        <div className="p-8 rounded text-center space-y-4 md:space-y-6 mt-10">
                            <div className='max-w-2xl'>
                                <h1 className="text-4xl md:text-6xl font-extrabold tracking-wider md:font-[1000] mb-6 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent">{slide.title}</h1>
                                <p className="md:text-xl capitalize tracking-wide w-[90%] mx-auto">{slide.description}</p>
                            </div>
                            <a
                                href={slide.link}
                                className="inline-block mt-3 px-7 py-3 text-sm md:text-base bg-gradient-to-bl from-yellow-500 to-orange-700  text-white uppercase tracking-wider font-semibold rounded-3xl hover:scale-105 transition-transform"
                            >
                                {slide.buttonText}
                            </a>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Slider;
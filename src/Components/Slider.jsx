import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Player } from '@lottiefiles/react-lottie-player';
import slider1 from '../assets/Slider-1.jpg';
import slider2 from '../assets/Slider-2.jpg';
import slider3 from '../assets/Slider-3.jpg';
import animationData from '../assets/lotties/Product.json'; 

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

const CustomArrow = ({ onClick, direction }) => (
  <button
    onClick={onClick}
    className={`absolute top-1/2 transform -translate-y-1/2 z-30 px-4 py-3 rounded-full bg-orange-500 opacity-50 hover:opacity-100 text-white text-xl transition-all shadow-md ${
      direction === 'left' ? 'left-4' : 'right-4'
    }`}
  >
    {direction === 'left' ? '‹' : '›'}
  </button>
);

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
        swipeable
        emulateTouch
        renderArrowPrev={(onClick) => <CustomArrow onClick={onClick} direction="left" />}
        renderArrowNext={(onClick) => <CustomArrow onClick={onClick} direction="right" />}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="relative h-screen w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black/30 z-10" />

            <div className="relative z-20 flex flex-col md:flex-row items-center justify-between h-full px-6 md:px-24 lg:pt-16 gap-6">
              <div className="text-center md:text-left text-white max-w-2xl space-y-3 md:space-y-6 lg:ml-4 mt-28 md:mt-0">
                <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl mx-auto md:mx-0 w-[80%] font-medium leading-relaxed">
                  {slide.description}
                </p>
                <a
                  href={slide.link}
                  className="inline-block px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg text-white font-medium uppercase tracking-wide shadow-md hover:scale-105 transition-transform"
                >
                  {slide.buttonText}
                </a>
              </div>

              {/* Right side: Lottie Animation */}
              <div className="max-w-sm md:max-w-md">
                <Player
                  autoplay
                  loop
                  src={animationData}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;

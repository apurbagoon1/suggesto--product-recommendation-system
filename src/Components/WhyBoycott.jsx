import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { Tooltip } from 'react-tooltip';

const WhyBoycott = () => {
  const [boycott, setBoycott] = useState([]);

  useEffect(() => {
    fetch('/boycott.json')
      .then((res) => res.json())
      .then((data) => setBoycott(data));
  }, []);

  return (
    <section className="py-8 md:py-12 lg:py-16 px-4 bg-gradient-to-r from-orange-400 to-orange-400 via-orange-300">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-orange-600 mb-4 pacifico-regular tracking-wide">Why Boycott Matters!</h2>
        <p className="md:text-xl mb-8 tracking-wider">Hover to Learn how your choices can drive ethical change in industries worldwide.</p>

        <div className="relative overflow-visible">
          <button className="custom-prev absolute top-44 -left-4 z-20 -translate-y-1/2 text-orange-500 opacity-50 hover:opacity-100 bg-orange-100 rounded-full shadow-md p-2 transition cursor-pointer">
            <HiChevronLeft size={30} />
          </button>
          <button className="custom-next absolute top-44 -right-4 z-20 -translate-y-1/2 text-orange-500 opacity-50 hover:opacity-100 bg-orange-100 rounded-full shadow-md p-2 transition cursor-pointer">
            <HiChevronRight size={30} />
          </button>

          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{
              nextEl: '.custom-next',
              prevEl: '.custom-prev',
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            spaceBetween={16}
            slidesPerView={4}
            centeredSlides={true}
            loop={true}
            className="overflow-visible"
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 1.5 },
              1024: { slidesPerView: 3 },
            }}
          >
            {boycott.map((boycott, index) => (
              <SwiperSlide key={index} className="pt-4 mb-10">
                <div
                  className="bg-white p-2 pb-4 rounded shadow hover:shadow-md transition"
                  data-tooltip-id="boycott-tip"
                  data-tooltip-content={boycott.tooltip}
                >
                  <img
                    src={boycott.image}
                    alt={boycott.name}
                    className="w-full h-60 object-cover rounded"
                    onError={(e) => (e.target.style.display = 'none')}
                  />
                  <h3 className="mt-4 text-xl font-semibold text-orange-500">{boycott.name}</h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <Tooltip id="boycott-tip" place="top" className="z-50" />
      </div>
    </section>
  );
};

export default WhyBoycott;
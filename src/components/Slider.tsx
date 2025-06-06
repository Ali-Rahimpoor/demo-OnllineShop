// src/components/MySwiper.tsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
const Slide_url = "/src/assets/img/";
const MySwiper = () => {
  return (

    <div className='xl:w-[1000px] shadow-xl rounded mx-auto relative'>
    <Swiper
      modules={[Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}

    >
      <SwiperSlide>
        <span className='absolute sm:inline hidden top-2 md:top-22 p-5 rounded-3xl right-2 md:right-20 bg-white/75 text-xl md:text-5xl font-MorabbaLight'>دوربین عکاسی</span>
        <img src={Slide_url+"1.png"} alt="Slide 1" />
      </SwiperSlide>
      <SwiperSlide>
          <span className='absolute sm:scale-125 sm:inline hidden top-10 md:top-22 p-5 rounded-3xl right-2 md:right-20 bg-white/75 text-xl md:text-4xl font-MorabbaLight'>ساعت مچی</span>
        <img src={Slide_url+"2.png"} alt="Slide 2" />
      </SwiperSlide>
      <SwiperSlide>
          <span className='sm:absolute sm:inline hidden md:top-10 top-2 p-5 rounded-3xl right-2 md:right-20 bg-white/75 text-xl md:text-5xl font-MorabbaLight'>پلیستیشن 5</span>
        <img src={Slide_url+"3.png"} alt="Slide 3" />
      </SwiperSlide>
    </Swiper>
    </div>
  );
};

export default MySwiper;

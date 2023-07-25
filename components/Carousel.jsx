import Image from 'next/image'
import React from 'react'
import Title from './ui/Title'
import Slider from "react-slick";

const Carousel = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        appenDots: (dots) => (
            <div>
                <ul>{dots}</ul>
            </div>
        ),
        customPaging: (i) => (
            <div className='w-3 h-3 border bg-white rounded-full m-14'></div>
        )
      };

  return (
    <div className='h-screen w-full container mx-auto -mt-[88px]'>
        <div className='absolute top-0 left-0 w-full h-full'>
            <div className='relative h-full w-full'>
                <Image src="/images/hero-bg.jpg" alt='' 
                fill objectFit='cover' priority/>
            </div>
        </div>
        <Slider {...settings}>
            <div>
                <div className='mt-60 text-white flex flex-col items-start gap-y-6'>
                    <Title addClass={'sm:text-6xl text-4xl'}>Fast Food Restaurant</Title>
                    <p className='sm:text-sm text-xs sm:w-1/3'>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                        Voluptatem architecto enim atque, quibusdam totam similique 
                        perspiciatis maxime odit placeat suscipit aliquid ut, repellat, 
                        eius itaque? Quis ipsum est recusandae.
                    </p>
                    <button className='btn-primary'>Order Now</button>
                </div>
            </div>
            <div>
                <div className='mt-60 text-white flex flex-col items-start gap-y-6'>
                    <Title addClass={'sm:text-6xl text-4xl'}>Fast Food Restaurant</Title>
                    <p className='sm:text-sm text-xs sm:w-1/3'>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                        Voluptatem architecto enim atque, quibusdam totam similique 
                        perspiciatis maxime odit placeat suscipit aliquid ut, repellat, 
                        eius itaque? Quis ipsum est recusandae.
                    </p>
                    <button className='btn-primary'>Order Now</button>
                </div>
            </div>
        </Slider>
    </div>
  )
}

export default Carousel
import React from 'react'
import Title from '../ui/Title'
import CustomerItem from './CustomerItem'
import Slider from 'react-slick';
import {GrPrevious, GrNext} from 'react-icons/gr'

const Customers = () => {

  function NextBtn({onClick}) {
    return (
      <button className='bg-primary !rounded-full absolute 
      -bottom-14 left-1/2 flex items-center justify-center w-10 h-10' onClick={onClick}>
        <GrNext />
      </button>
    )
  }
  function PrevBtn({onClick}) {
    return (
      <button className='bg-primary !rounded-full absolute 
      -bottom-14 right-1/2 flex items-center justify-center w-10 h-10 mr-5' onClick={onClick}>
        <GrPrevious />
      </button>
    )
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    autoplayspeed: 3500,
    arrows: true,
    nextArrow: <NextBtn />,
    prevArrow: <PrevBtn />,
    responsive: [
      { 
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className='container mx-auto my-20'>
        <Title addClass={"text-[40px] text-center mb-6"}>What Says Our Customers</Title>
        <div className='mb-10'>
          <Slider {...settings}>
              <CustomerItem imgSrc={"/images/client1.jpg"}/>
              <CustomerItem imgSrc={"/images/client2.jpg"}/>
              <CustomerItem imgSrc={"/images/client1.jpg"}/>
              <CustomerItem imgSrc={"/images/client2.jpg"}/>
          </Slider>

        </div>
    </div>
  )
}

export default Customers
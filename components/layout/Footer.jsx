import React, { useEffect, useState } from 'react'
import Title from '../ui/Title'
import axios from 'axios';

const Footer = () => {

  const [footer,setFooter] = useState([]);

  useEffect(() => {
    const getFooter = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/footer`);
        setFooter(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    }
    getFooter();
  }, []);

  console.log(footer);

  return (
    <div className='bg-secondary text-white'>
      <div className='container mx-auto pt-16'> 

        <div className='flex flex-wrap justify-center gap-10'>
            <div className='md:flex-1 text-center'>
                <Title addClass={"text-[30px]"}>Contact Us</Title>
                <div className='flex flex-col gap-y-2 mt-6'>
                    <a href={footer?.location} target='_blank' 
                      className='flex gap-2 items-center justify-center'>
                      <i class="fas fa-map-marker-alt"></i>
                      <span>Location</span>
                    </a>
                    <a href={`tel:${footer?.phoneNumber}`} 
                      className='flex gap-2 items-center justify-center'>
                      <i class="fa fa-phone"></i>
                      <span>Call +90 1234567890</span>
                    </a>
                    <a href={`mailto:${footer?.email}`} 
                      className='flex gap-2 items-center justify-center'>
                      <i class="fa fa-envelope"></i>
                      <span>demo@gmail.com</span>
                    </a>   
                </div>
            </div>
            <div className='md:flex-1 text-center'>
                <Title addClass={"text-[30px]"}>Feane</Title>
                <div className='flex flex-col gap-y-2 mt-6'>
                    <div className='flex gap-2 items-center justify-center'>
                      <p>
                         {footer?.description}
                      </p>
                    </div>
                     {/* SOCİAL MEDİA İCONS */}
                    <div className='flex gap-2 items-center justify-center'>
                          {
                            footer?.socialMedia?.map((item) => (
                              <a
                                  href={item.link}
                                  key={item._id}
                                  target='_blank'
                                  className="w-8 h-8 grid place-content-center bg-white text-secondary rounded-full "
                                >
                                  <i className={item.icon}></i>
                            </a>
                            ))
                          }
                    </div>
                </div>
            </div>
            <div className='md:flex-1 text-center'>
                <Title addClass={"text-[30px]"}>Opening Hours</Title>
                <div className='flex flex-col gap-y-2 mt-6'>
                    <div className='flex gap-2 items-center justify-center'>
                      <span>{footer?.openingHours?.day}</span>
                    </div>
                    <div className='flex gap-2 items-center justify-center'>
                      <span>{footer?.openingHours?.hour}</span>
                    </div> 
                </div>
            </div>
        </div> 

        <div className='bg-primary h-[1px] w-full mt-10'></div>

        <div>
          <p className="text-center text-white mt-10 pb-5">
            © 2022 All Rights Reserved By Free Html Templates
          </p>
        </div>

      </div>
    </div>
  )
}

export default Footer
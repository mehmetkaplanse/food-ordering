import Title from '@/components/ui/Title'
import Image from 'next/image'
import React, { useState } from 'react'
import { addProduct } from '@/redux/cartSlice'
import { useDispatch,useSelector } from 'react-redux'
import axios from 'axios'

const Index = ({food}) => {

    const [prices, setPrices] = useState(food.prices);
    const [price, setPrice] = useState(prices[0]);
    const [size, setSize] = useState(0);
    const [extraItems, setExtraItems] = useState(food?.extraOptions);
    const [extras, setExtras] = useState([]);
    const cart = useSelector((state) => state.cart);

    const dispatch = useDispatch()


    const handleSize = (sizeIndex) => {
        const difference = prices[sizeIndex] - prices[size];
        setSize(sizeIndex);
        changePrice(difference);
    }

    const changePrice = (number) => {
        setPrice(price+number);
    }

    const handleChange = (e, item) => {
        const checked = e.target.checked;
        if(checked) {
            changePrice(item.price);
            setExtras([...extras,item]);
        }
        else {
            changePrice(-item.price);
            setExtras(extras.filter((extra) => extra.id !== item.id))
        }
    }


    const handleClick = () => {
        dispatch(addProduct({...food,extras, price, quantity: 1}))
    }
    

  return (
    <div className='flex gap-10 items-center md:h-[calc(100vh-88px)] py-10 flex-wrap'>
        <div className='relative md:flex-1 md:w-[80%] md:h-[80%] w-36 h-36 mx-auto'>
            <Image src={food?.img} alt='' layout='fill' objectFit='contain' />
        </div> 
        <div className='border md:h-3/4 md:w-[1px] w-3/4 mx-auto'></div>
        <div className='flex md:flex-1 justify-center items-center'>
            <div className='flex flex-col md:items-start items-center gap-y-2 md:w-2/3'>
                <Title addClass={"sm:text-6xl text-4xl"}>{food?.title}</Title>
                <span className='text-primary text-2xl font-bold underline my-4'>${price}</span>
                <p className='text-sm sm:mx-auto mx-4'>
                    {food?.description}
                </p>
                {
                    food.category === "pizza" && (
                        <div className='flex flex-col my-5'>
                            <h4 className='text-xl font-semibold my-4 md:text-start text-center'>Choose the size</h4>
                            <div className='flex gap-x-10 items-center'>
                                <div className='relative cursor-pointer w-8 h-8' onClick={() => handleSize(0)}>
                                    <Image src={"/images/size.png"} alt='' layout='fill' />
                                    <span className='absolute -top-1 -right-5 bg-primary 
                                        rounded-full text-xs px-[5px] font-medium'>Small</span>
                                </div>
                                <div className='relative cursor-pointer w-12 h-12' onClick={() => handleSize(1)}>
                                    <Image src={"/images/size.png"} alt='' layout='fill' />
                                    <span className='absolute top-0 -right-8 bg-primary 
                                        rounded-full text-xs px-[5px] font-medium'>Medium</span>
                                </div>
                                <div className='relative cursor-pointer w-16 h-16' onClick={() => handleSize(2)}>
                                    <Image src={"/images/size.png"} alt='' layout='fill' />
                                    <span className='absolute top-0 -right-2 bg-primary 
                                        rounded-full text-xs px-[5px] font-medium'>Large</span>
                                </div>
                            </div>
                        </div>
                    )
                }
                <div className='flex gap-x-5 my-5'> 
                    {
                        extraItems.map((item) => (
                            <label htmlFor="" className='flex items-center gap-x-1' key={item._id}>
                                <input type="checkbox" className='w-5 h-5 accent-primary' 
                                    onChange={(e) => handleChange(e, item)}/>
                                <span className='text-sm font-semibold ml-1'>{item.text}</span>
                            </label>
                        ))
                    }
                </div>
                <button className='btn-primary' onClick={handleClick}>Add to Cart</button>
            </div>
        </div>
    </div>
  )
}

export default Index

export const getServerSideProps = async (context) => {
    const id = context.params.id;
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
  
    return {
      props: {
        food: res.data ? res.data : null,
      }
    }
  }

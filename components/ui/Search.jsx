import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import OutsideClickHandler from 'react-outside-click-handler'
import Title from './Title'
import {GiCancel} from 'react-icons/gi'
import axios from 'axios'
import Input from '../form/Input'
import { useRouter } from 'next/router'
import PulseLoader from "react-spinners/PulseLoader";

const Search = ({setIsSearchModal}) => {

    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [filtered, setFiltered] = useState([]);

    useEffect(() => {
        try {
            const getProducts = async () => {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
                setProducts(res.data);
                setFiltered(res.data.slice(0,5));
            }
            setTimeout(() => {
                getProducts();
            }, 1000);
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleSearch = (e) => {
        setSearch(e.target.value);
        const searchFilter = products.filter((product) => 
            product.title.toLowerCase().includes(e.target.value.toLowerCase()))
            .slice(0,5);

        setFiltered(searchFilter);

    }


  return (
    <div class="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10">
        <OutsideClickHandler onOutsideClick={() => setIsSearchModal(false)}>
        <div className='w-full h-full grid place-content-center'>
                <div className='relative z-50 md:w-[500px] w-[370px] bg-white border-2 p-5 rounded-3xl'>
                    <Title addClass="text-[40px] text-center" >Search</Title>
                    <Input placeholder="Search..." onChange={handleSearch} />
                    {
                        products.length>0 ? (
                            <ul className='mt-10'>
                                {   
                                    filtered.length > 0 ?
                                    filtered.map((prd) => (
                                    <li className='flex justify-between items-center border
                                        p-2 px-4 hover:bg-primary transition-all mt-2 cursor-pointer'
                                        key={prd?._id}
                                        onClick={() => {
                                            setIsSearchModal(false);
                                            router.push(`/product/${prd?._id}`)
                                        }}>
                                        <div className='relative flex'>
                                            <Image src={prd?.img} alt={prd?.title} width={48} height={48}/>
                                        </div>
                                        <span className='font-medium'>{prd?.title}</span>
                                        <span className='font-bold'>${prd?.prices[0]}</span>
                                    </li>
                                    )) : <p className='text-center text-red-600 font-semibold'>No results found!</p>
                                }
                            </ul>
                        ) : <div className='flex justify-center items-center mt-10'> <PulseLoader color='#fca311'/> </div>
                    }
                    <button className='absolute top-5 right-5' onClick={() => setIsSearchModal(false)}>
                        <GiCancel size={25}/>
                    </button>
                </div>
            </div>
        </OutsideClickHandler>
    </div>
  )
}

export default Search


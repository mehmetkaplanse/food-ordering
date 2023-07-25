import React, { useState } from 'react'
import Logo from '../ui/Logo'
import {FaUserAlt, FaShoppingCart} from 'react-icons/fa'
import {BiSearch} from 'react-icons/bi'
import Search from '../ui/Search'
import {GiCancel, GiHamburgerMenu} from 'react-icons/gi'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useSelector } from 'react-redux'

const Header = () => {

    const [isSearchModal, setIsSearchModal] = useState(false);
    const [isMenuModal, setIsMenuModal] = useState(false);
    const cart = useSelector((state) => state.cart);

    const [active,setActive] = useState();



    const router = useRouter();


    return (
        <div className={`h-[5.5rem] z-40 relative w-full
        ${router.asPath === "/" ? 'bg-transparent' : 'bg-secondary'}`} id='navbar'>
            <div className="container mx-auto text-white flex justify-between items-center h-full">
                <Logo/>
                <nav className={`sm:static absolute top-0 left-0  
                     sm:text-white text-black sm:bg-transparent h-screen
                     bg-white sm:w-auto sm:h-auto w-full sm:flex hidden z-50 
                     ${isMenuModal === true && "!grid place-content-center"}`}>
                    <ul className='flex gap-x-3 sm:flex-row flex-col items-center
                        sm:gap-0 gap-y-5 sm:font-normal font-bold'>
                        <li className={`px-[5px] py-[10px] uppercase ${
                            router.asPath==="/" && 'text-primary'
                        }`}  onClick={()=> setIsMenuModal(false)}>
                            <Link href={"/"} >Home</Link>
                        </li>
                        <li className={`px-[5px] py-[10px] uppercase ${
                            router.asPath==="/menu" && 'text-primary'
                        }`} onClick={()=> setIsMenuModal(false)}>
                            <Link href={"/menu"} >Menu</Link>
                        </li>
                        <li className={`px-[5px] py-[10px] uppercase ${
                            router.asPath==="/about" && 'text-primary'
                        }`}  onClick={()=> setIsMenuModal(false)}>
                            <Link href={"/about"} >About</Link>
                        </li>
                        <li className={`px-[5px] py-[10px] uppercase ${
                            router.asPath==="/reservation" && 'text-primary'
                        }`}  onClick={()=> setIsMenuModal(false)}>
                            <Link href={"/reservation"} >Book Table</Link>
                        </li>
                        <li className={`px-[5px] py-[10px] uppercase ${
                            router.asPath==="/admin" && 'text-primary'
                        }`}  onClick={()=> setIsMenuModal(false)}>
                            <Link href={"/admin"} >Admin</Link>
                        </li>
                    </ul>
                    {isMenuModal && (
                        <button className='absolute top-5 right-5' onClick={() => setIsMenuModal(false)}>
                            <GiCancel size={25}/>
                        </button>
                    )}
                </nav>
                <div className='flex gap-x-4 items-center'>
                    <Link href={"/auth/login"}>
                        <FaUserAlt className={`${(router.asPath.includes("profile") || router.asPath.includes("auth"))  
                            && 'text-primary'} cursor-pointer transition-all`}/>
                    </Link>
                    <Link href={"/cart"}>
                        <span className='relative'>
                            <FaShoppingCart className={`${router.asPath==="/cart" && 'text-primary'} cursor-pointer transition-all`}/> 
                            <span className='w-4 h-4 bg-primary rounded-full text-sm font-bold
                                grid place-content-center absolute -top-2 -right-3 text-black'>{cart.products.length}</span>
                        </span>
                    </Link>
                    <button onClick={() => setIsSearchModal(true)}>
                        <BiSearch size={20} className='hover:text-primary cursor-pointer transition-all'/>
                    </button>
                    <Link href={"/order"} className='cursor-pointer transition-all md:inline-block hidden hover:text-primary'>
                        <button className='btn-primary'>
                            Order Online
                        </button>
                    </Link>
                    <button className='sm:hidden inline-block hover:text-primary transition-all'
                    onClick={()=> setIsMenuModal(true)}>
                        <GiHamburgerMenu size={20}/>
                    </button>
                </div>
            </div>
            {isSearchModal && (<Search setIsSearchModal={setIsSearchModal}/>)}
        </div>
    )
}

export default Header
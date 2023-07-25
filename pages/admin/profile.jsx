import Image from 'next/image'
import React, { useState } from 'react'
import Order from '@/components/admin/Order';
import Products from '@/components/admin/Products';
import { BiCategoryAlt } from 'react-icons/bi';
import Category from '@/components/admin/Category';
import Footer from '@/components/admin/Footer';
import AddProduct from '@/components/admin/AddProduct'
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const Profile = ({productList}) => {

    const [tabs, setTabs] = useState(0);
    const {push} = useRouter();
    const [isProductModal, setIsProductModal] = useState(false);

    const closeAdminAccount = async () => {
        try {
            if(confirm("Are you sure you want to close your Admin Account?")) {
                const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/admin`);
                if(res.status === 200) {
                    push("/admin");
                    toast.success("Admin Account Closed.");
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='flex flex-wrap px-10 min-h-[calc(100vh-458px)] pb-10
            lg:flex-row flex-col'>
            {/* left */}
            <div className='lg:w-80 w-full flex-shrink-0'>
                <div className='relative flex flex-col gap-y-1 items-center px-10 py-5 border border-b-0'>
                    <Image className='rounded-full' 
                        src={"/images/admin.png"} 
                        alt='' width={100} 
                        height={100} 
                    />
                    <b className='text-2xl mt-1'>Admin</b>
                </div>
                <ul className='flex flex-col items-center'>
                    <li className={`border w-full p-3 flex items-center 
                        lg:justify-normal justify-center gap-x-2 
                        hover:bg-primary cursor-pointer transition-all
                        ${tabs == 0 && 'bg-primary text-white'}`}
                        onClick={() => setTabs(0)}>
                        <i className='fa fa-cutlery'></i>
                        <button>Products</button>
                    </li>
                    <li className={`border w-full p-3 flex items-center 
                        lg:justify-normal justify-center gap-x-2 
                        hover:bg-primary cursor-pointer transition-all
                        ${tabs == 1 && 'bg-primary text-white'}`}
                        onClick={() => setTabs(1)}>
                        <i className='fas fa-motorcycle'></i>
                        <button>Orders</button>
                    </li>
                    <li className={`border w-full p-3 flex items-center 
                        lg:justify-normal justify-center gap-x-2 
                        hover:bg-primary cursor-pointer transition-all
                        ${tabs == 2 && 'bg-primary text-white'}`}
                        onClick={() => setTabs(2)}>
                        <BiCategoryAlt />
                        <button>Categories</button>
                    </li>
                    <li className={`border w-full p-3 flex items-center 
                        lg:justify-normal justify-center gap-x-2 
                        hover:bg-primary cursor-pointer transition-all
                        ${tabs == 3 && 'bg-primary text-white'}`}
                        onClick={() => setTabs(3)}>
                        <i className='fa fa-window-maximize'></i>
                        <button>Footer</button>
                    </li>
                    <li className={`border w-full p-3 flex items-center 
                        lg:justify-normal justify-center gap-x-2 
                        hover:bg-primary cursor-pointer transition-all
                        ${tabs == 4 && 'bg-primary text-white'}`}
                        onClick={() => closeAdminAccount()}>
                        <i className='fas fa-sign-out'></i>
                        <button>Exit</button>
                    </li>
                    
                </ul>
            </div>
            {/* right */}
            { tabs === 0 && ( <Products /> ) }
            { tabs === 1 && ( <Order /> ) }
            { tabs === 2 && ( <Category /> ) }
            { tabs === 3 && ( <Footer /> ) }
            {isProductModal && <AddProduct setIsProductModal={setIsProductModal}/>}
            <button className='btn-primary !w-12 !h-12 !p-0 
                bottom-16 right-10 text-4xl fixed flex justify-center'
                onClick={()=>setIsProductModal(true)}>
                    +
            </button>
        </div>
    )
}

export const getServerSideProps = async (ctx) => {
    const myCookie = ctx.req?.cookies || "";

    if(myCookie.token!==process.env.ADMIN_TOKEN) {
        return {
            redirect: {
                destination: "/admin",
                permanent: false
            }
        }
    }
    return {
        props: {

        }
    }
}

export default Profile
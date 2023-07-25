import React, { useEffect, useState } from 'react'
import Title from '../ui/Title'
import { useSession } from 'next-auth/react';
import axios from 'axios';

const Order = () => {

    const {data: session} = useSession();
    const [orders, setOrders] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);
    const status = ["preparing","on the way","delivered"];

    // get all orders
    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders`);
                setOrders(res.data.filter((order) => order.customer === currentUser?.fullName));
            } catch (error) {
                console.log(error);
            }
        }
        getOrders();
    },[currentUser])

    // get currentUser
    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
                setCurrentUser(res.data.filter((user) => user.email === session.user.email)[0]);
            } catch (error) {
                console.log(error);
            }
        }
        getCurrentUser();
    },[session])


  return (
    <div className='lg:p-8 flex-1 lg:mt-0 mt-10 w-full'>
        <Title addClass={"text-[40px] lg:text-start text-center"}>My Orders</Title>
        <div className="mt-5 overflow-x-auto">
                <table className="w-full text-sm text-center text-gray-500">
                    <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                        <tr>
                            <th scope="col" className="py-3 px-6">ID</th>
                            <th scope="col" className="py-3 px-6">ADDRESS</th>
                            <th scope="col" className="py-3 px-6">DATE</th>
                            <th scope="col" className="py-3 px-6">TOTAL</th>
                            <th scope="col" className="py-3 px-6">STATUS</th>
                        </tr>
                    </thead>
                    <tbody className="border-b border-gray-700 bg-secondary">
                        {
                            orders?.map((order) => (
                                <tr className="relative" key={order?._id}>
                                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                                        <span>{(order?._id).substring(0,6)}...</span>
                                    </td>
                                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                                        <span>{order?.address}</span>
                                    </td>
                                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                                        <span>{(order?.createdAt).substring(0,10)}</span>
                                    </td>
                                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                                        <span>${order?.total}</span>
                                    </td>
                                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                                        <span>{status[order?.status]}</span>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
        </div>
    </div>
  )
}

export default Order
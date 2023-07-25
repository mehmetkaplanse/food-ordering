import React, { useEffect, useState } from 'react'
import Title from '../ui/Title'
import Image from 'next/image'
import axios from 'axios'

const Order = () => {

    const [orders, setOrders] = useState([]);
    const status = ["preparing","on the way","delivered"];


    // get all orders
    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders`);
                setOrders(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getOrders();
    },[])

    const handleStatus = async (id) => {
        const item = orders.find((order) => order._id === id);
        const currentStatus = item.status;

        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`,
                {status: currentStatus+1}
                );
            setOrders([res.data,...orders.filter((order) => order._id !== id)]);
        } catch (error) {
            
        }
    }

  return (
    <div className='lg:p-8 flex-1 lg:mt-0 mt-10 w-full'>
        <Title addClass={"text-[40px]"}>Orders</Title>
        <div className="mt-5 overflow-x-auto">
                <table className="w-full text-sm text-center text-gray-500">
                    <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                        <tr>
                            <th scope="col" className="py-3 px-6">PRODUCT</th>
                            <th scope="col" className="py-3 px-6">CUSTOMER</th>
                            <th scope="col" className="py-3 px-6">TOTAL</th>
                            <th scope="col" className="py-3 px-6">PAYMENT</th>
                            <th scope="col" className="py-3 px-6">STATUS</th>
                            <th scope="col" className="py-3 px-6">ACTION</th>
                        </tr>
                    </thead>
                    <tbody className="border-b border-gray-700 bg-secondary">
                        {  orders.length > 0 &&
                            orders
                            .sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
                            .map((order) => (
                                <tr className="relative" key={order?._id}>
                                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                                    <span>{(order?._id).substring(0,6)}...</span>
                                    </td>
                                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                                        <span>{order?.customer}</span>
                                    </td>
                                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                                        <span>${order?.total}</span>
                                    </td>
                                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                                        <span>{order?.method === 0 ? 'Cash' : "Credit Cart"}</span> 
                                    </td>
                                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                                        <span>{status[order?.status]}</span>
                                    </td>
                                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                                    <button className='btn-primary !bg-green-500'
                                        disabled={order?.status > 1}
                                        onClick={()=> handleStatus(order?._id)}>Next Stage</button>
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
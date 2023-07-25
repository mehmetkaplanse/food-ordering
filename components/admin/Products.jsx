import React, { useEffect, useState } from 'react'
import Title from '../ui/Title'
import Image from 'next/image'
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Products = () => {

    const [products, setProducts] = useState([]);

    const getAllProducts = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
            setProducts(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllProducts();
    },[])

    const handleDelete = async (id) => {
        try {
            if(confirm("Are you sure want to delete this product ?")) {
                const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
                if(res.status===200) {
                    toast.success("Product deleted successfully.")
                    getAllProducts();
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='lg:p-8 flex-1 lg:mt-0 mt-10 w-full'>
            <Title addClass={"text-[40px]"}>Products</Title>
            <div className="mt-5 overflow-auto max-h-[400px]">
                    <table className="w-full text-sm text-center text-gray-500">
                        <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                            <tr>
                                <th scope="col" className="py-3 px-6">IMAGE</th>
                                <th scope="col" className="py-3 px-6">ID</th>
                                <th scope="col" className="py-3 px-6">TITLE</th>
                                <th scope="col" className="py-3 px-6">PRICE</th>
                                <th scope="col" className="py-3 px-6">ACTION</th>
                            </tr>
                        </thead>
                        <tbody className="border-b border-gray-700 bg-secondary">
                            {
                                products.map((p) => (
                                    <tr className="relative" key={p._id}>
                                        <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white 
                                        relative grid place-content-center">
                                        <Image src={p.img} alt='' width={50} height={50}/>
                                        </td>
                                        <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                                            <span>{(p._id).substring(0,6)}...</span>
                                        </td>
                                        <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                                            <span>{p.title}</span>
                                        </td>
                                        <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                                            <span>${p.prices[0]}</span>
                                        </td>
                                        <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                                        <button className='btn-primary !bg-danger'
                                            onClick={() => handleDelete(p._id)}>
                                            Delete
                                        </button>
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

export default Products



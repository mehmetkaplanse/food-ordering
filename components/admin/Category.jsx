import React, { useEffect, useState } from 'react'
import Title from '../ui/Title'
import Input from '../form/Input'
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Category = () => {

    const [inputText, setInputText] = useState();
    const [categories, setCategories] = useState([]);

    // get all-categories
    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
                setCategories(res?.data);
            } catch (error) {
                console.log(error);
            }
        } 
        getCategories();
    }, []);

    // create a category
    const handleCreate = async () => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/categories`,
                {title:inputText});
            setCategories([...categories,res.data]);
            setInputText("");
            toast.success("Category created successfully.")
            
        } catch (error) {
            console.log(error);
        }
    }

    // delete a category
    const handleDelete = async (id) => {
        try {
            if(confirm("Are you sure you want to delete this category?")) {
                const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`);
                setCategories(categories.filter((cat) => cat._id !== id));
                toast.success("Category deleted successfully.")
            }
            
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className='lg:p-8 flex-1 lg:mt-0 mt-10 w-full'>
        <Title addClass={"text-[40px]"}>Categories</Title>
        <div className='mt-5'>
            <div className='flex gap-4 items-center'>   
                <Input placeholder="Add a new category..." 
                        onChange={(e) => setInputText(e.target.value)}
                        value={inputText} />
                <button className="btn-primary"
                    onClick={() => handleCreate()}>Add</button>
            </div>
            <div className='mt-10 flex flex-col gap-y-2 max-h-[250px] overflow-auto p-2'>
                {
                    categories.map((category) => (
                        <div className='flex justify-between items-center' key={category._id}>
                            <b className='text-xl'>{category.title}</b>
                            <button className='btn-primary !bg-danger'
                                onClick={() => handleDelete(category?._id)}>
                                Delete
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Category
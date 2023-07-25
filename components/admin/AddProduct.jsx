
import React, { useEffect, useState } from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import {GiCancel} from 'react-icons/gi'
import Title from '../ui/Title'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const AddProduct = ({setIsProductModal}) => {

    const [file,setFile] = useState();
    const [imageSrc, setImageSrc] = useState();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("pizza");
    const [prices, setPrices] = useState([]);
    
    const [extra, setExtra] = useState("");
    const [extraOptions, setExtraOptions] = useState([]);
    
    const [categories, setCategories] = useState([]);

    // get all categories
    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
                if(res.status===200) {
                    setCategories(res.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getCategories();
    }, []);

    const handleOnChange = (changeEvent) => {
        const reader = new FileReader();

        reader.onload = function (onLoadEvent) {
            setImageSrc(onLoadEvent.target.result);
            setFile(changeEvent.target.files[0]);
        }

        reader.readAsDataURL(changeEvent.target.files[0]);
    }

    const changePrice = (e, index) => {
        const currentPrices = prices;
        currentPrices[index] = e.target.value;
        setPrices(currentPrices);
    }

    const handleCreate = async () => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "food-ordering");

        try {
            const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dpsfcfzim/image/upload",data);
            const {url} = uploadRes.data;
            const newProduct = {
                img: url,
                title,
                description,
                category: category.toLowerCase(),
                prices,
                extraOptions
            };
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products`,newProduct);
            if(res.status === 200) {
                setIsProductModal(false);
                toast.success("Product created successfully.");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleExtra = (e) => {
        if(extra) {
            if(extra.text && extra.price) {
                setExtraOptions((prev) => [...prev,extra]);
            }
        }
    }


  return (
    <div className="fixed w-screen h-screen z-50 top-0 left-0
    after:content-[''] after:w-screen after:h-screen after:bg-white
    after:absolute after:top-0 after:left-0 after:opacity-20 flex justify-center">
        <OutsideClickHandler onOutsideClick={() => setIsProductModal(false)}>
            <div className='w-full h-full grid place-content-center'>
                <div className='relative z-50 md:w-[550px] w-[370px] bg-white border-2 p-5 rounded-3xl'>
                    <Title addClass="text-[40px] text-center" >Add a New Product</Title>

                    <div className='flex flex-col text-sm mt-6'>
                        <label className='flex gap-4 items-center'>
                            <input type="file" 
                                onChange={(e) => handleOnChange(e)} 
                                className='hidden'/>
                            <button className='btn-primary !rounded-none !bg-blue-600 pointer-events-none'>
                                Choose an image
                            </button>
                            {
                                imageSrc && (
                                    <div>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={imageSrc} alt="" className='w-14 h-14 rounded-full' />
                                    </div>
                                )
                            }
                        </label>
                    </div>
                    <div className='flex flex-col text-sm mt-4'>
                        <span className='font-semibold mb-1'>Title</span>
                        <input type="text" 
                            className='border p-1 px-2 outline-none' 
                            placeholder='Write a title...'
                            onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                    <div className='flex flex-col text-sm mt-4'>
                        <span className='font-semibold mb-1'>Description</span>
                        <textarea 
                            className='border p-1 outline-none'
                            onChange={(e) => setDescription(e.target.value)}>
                        </textarea>
                    </div>

                    <div className='flex flex-col text-sm mt-4'>
                        <span className='font-semibold mb-1'>Select Category</span>
                        <select className='border p-1 outline-none'
                        onChange={(e) => setCategory(e.target.value)}>
                            {
                                categories.length>0 && 
                                categories.map((cat) => (
                                    <option value={cat.title.toLowerCase()} 
                                        key={cat._id}>{cat.title}
                                    </option>
                                ))
                            }
                        </select>
                    </div>

                    <div className='flex flex-col text-sm mt-4'>
                        <span className='font-semibold mb-1'>Prices</span>
                        {category==="pizza" ? (
                            <div className='flex gap-4'>
                                <input type="number" 
                                    className='border-b p-1 outline-none w-1/3'
                                    placeholder='small'
                                    onChange={(e) => changePrice(e, 0)}/>
                                <input type="number" 
                                    className='border-b p-1 outline-none w-1/3'
                                    placeholder='medium'
                                    onChange={(e) => changePrice(e, 1)}/>
                                <input type="number" 
                                    className='border-b p-1 outline-none w-1/3'
                                    placeholder='large'
                                    onChange={(e) => changePrice(e, 2)}/>
                            </div>
                        ) : (
                            <div className='flex gap-4'>
                                <input type="number" 
                                    className='border-b p-1 outline-none w-1/3'
                                    placeholder='small'
                                    onChange={(e) => changePrice(e, 0)}/>
                            </div>
                        )
                    }
                    </div>

                    <div className='flex flex-col text-sm mt-4'>
                        <span className='font-semibold mb-1'>Extra</span>
                        <div className='flex gap-4'>
                            <input type="text" 
                                name='text'
                                className='border-b p-1 outline-none'
                                placeholder='Item'
                                onChange={(e)=>setExtra({...extra,[e.target.name]: e.target.value})}/>
                            <input type="number" 
                                name='price'
                                className='border-b p-1 outline-none'
                                placeholder='Price'
                                onChange={(e)=>setExtra({...extra,[e.target.name]: e.target.value})}/>
                            <button className='btn-primary mx-auto'
                            onClick={handleExtra}>Add</button>
                        </div>
                    </div>
                    <div className='mt-2 flex gap-2'>
                        {extraOptions.map((item,index) => (
                            <span key={index} className='inline-block border 
                            text-orange-400 cursor-pointer
                            border-orange-400 text-xs p-1 rounded-xl'
                            onClick={()=> {
                                setExtraOptions(extraOptions.filter((_,i) => i!==index))
                            }}>{item.text}</span>
                        ))}
                    </div>
                    <div className='text-sm flex justify-end'>
                        <button className='btn-primary !bg-green-500'
                        onClick={handleCreate}>Create</button>
                    </div>

                    <button className='absolute top-5 right-5' onClick={() => setIsProductModal(false)}>
                        <GiCancel size={25}/>
                    </button>
                </div>
            </div>
        </OutsideClickHandler>
    </div>
  )
}

export default AddProduct
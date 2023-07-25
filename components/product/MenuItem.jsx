import cartSlice, { addProduct } from '@/redux/cartSlice'
import Image from 'next/image'
import Link from 'next/link'
import { HiShoppingCart } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'


const MenuItem = ({product}) => {

    const cart = useSelector((state) => state.cart);
    const findCart = cart.products.find((item) => item._id===product._id);

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(addProduct({...product, extras: {text:"empty"}, price: product.prices[0], quantity:1}))
    }

  return (
    <div className='bg-secondary rounded-3xl shadow-2xl'>
        <div className='w-full bg-gray-100 rounded-t-2xl rounded-bl-[46px] h-[210px] grid place-content-center'>
           <Link href={`/product/${product._id}`}>
                <div className='relative w-36 h-36 hover:scale-110 transition-all'>
                    <Image src={product.img} alt='' layout='fill'/>
                </div>
           </Link>
        </div>
        <div className='p-[25px] text-white h-[220px] flex flex-col'>
            <h4 className='text-xl font-semibold text-primary'>{product.title}</h4>
            <p className='text-sm my-2'>
                {(product.description).substring(0,130)}...
            </p>
            <div className='flex justify-between items-center mt-auto pb-0'>
                <span>${product.prices[0]}</span>
                <button className='btn-primary !w-10 !h-10 !rounded-full !p-0 grid place-content-center'
                    disabled={findCart}
                    onClick={handleClick}>
                    <HiShoppingCart size={20}/> 
                </button>
            </div>
        </div>
    </div>
  )
}

export default MenuItem
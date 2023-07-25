import Title from "@/components/ui/Title"
import Image from "next/image"
import { useSelector, useDispatch } from "react-redux"
import { reset } from "@/redux/cartSlice"
import axios from "axios"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"
import { useRouter } from "next/router"



const Cart = ({userList}) => {

    const {data: session} = useSession();
    const router = useRouter();

    const cart = useSelector((state) => state.cart);
    const products = cart.products;

    const dispatch = useDispatch();
    const user = userList?.find((user) => user.email === session?.user?.email);

    const newOrder = {
        customer: user?.fullName,
        address: user?.address ? user?.address : "No Address",
        total: cart.total,
        method: 0,
    }

    const createOrder = async() => {
        try {
            if(session) {
                if(confirm("Are you sure to order?")) {
                    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`,newOrder);
                    if(res.status===200) {
                        router.push(`/order/${res.data._id}`);
                        dispatch(reset());
                        toast.success("Order created succesfully.", {autoClose: 1000});
                    }
                }
            }
            else {
                toast.error("Please login first!", {autoClose: 1000});
            }
        } catch (error) {
            toast.error("Please login first!", {autoClose: 1000});
            console.log(error);
        }
    }

    const handleClean = () => {
        dispatch(reset());
    }


    return (
        <div className="min-h-[calc(100vh-433px)]">
            <div className="flex justify-center md:flex-row flex-col">
                <div className="md:min-h-[calc(100vh-433px)] w-full flex flex-1 items-center p-10 overflow-x-scroll">
                   {
                    cart.products.length > 0 ? (
                        <table className="w-full text-sm text-center text-gray-500 min-w-[1000px]">
                            <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                                <tr>
                                    <th scope="col" className="py-3 px-6">PRODUCT</th>
                                    <th scope="col" className="py-3 px-6">EXTRAS</th>
                                    <th scope="col" className="py-3 px-6">PRICE</th>
                                    <th scope="col" className="py-3 px-6">QUANTITY</th>
                                </tr>
                            </thead>
                            <tbody className="border-b border-gray-700 bg-secondary">
                                {
                                    products.map((product) => (
                                        <tr className="relative border-b" key={product.id}>
                                            <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white
                                            flex justify-center items-center gap-x-2">
                                                <Image src={product.img} alt="" width={50} height={50} />
                                                <span>{product.name}</span>
                                            </td>
                                            <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                                                {product.extras.length > 0 ? (
                                                    <span>
                                                    {
                                                    product.extras.map((extra, index) => (
                                                        <span key={extra.id}>
                                                        {extra.text.toLowerCase()}
                                                        {index !== product.extras.length - 1  && ', '}
                                                        </span>
                                                    ))
                                                    }
                                                    </span>
                                                ) : <span>-</span>}
                                            </td>
                                            <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                                                <span>${product.price}</span>
                                            </td>
                                            <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                                                <span>{product.quantity}</span>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    ) : <div className="p-2 w-full bg-yellow-200 rounded-xl">
                            <p className="text-center text-xl font-semibold text-secondary">There are no product in the cart!</p>
                        </div>
                   }
                </div>
                <div className="bg-secondary min-h-[calc(100vh-433px)] p-12
                text-white md:w-auto w-full md:border-none border-b">
                    <div className="flex flex-col justify-center md:items-start 
                        items-center md:gap-y-3 gap-y-5 md:mt-10">
                        <Title addClass={"text-[40px] text-center"}>Cart Total</Title>
                        <div className="flex flex-col">
                            <span><b>Subtotal</b>: ${cart.total}</span>
                            <span><b>Discount</b>: $0.00</span>
                            <span><b>Total</b>: ${cart.total}</span>
                        </div>
                        <button className="btn-primary"
                            onClick={createOrder}
                            >
                            CHECK OUT NOW!
                        </button>
                        <button className="btn-primary !bg-red-600"
                            onClick={handleClean}
                            >
                            CLEAR
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart


export const getServerSideProps = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
    return {
        props: {
            userList: res.data ? res.data : []
        }
    }
}
import axios from "axios";
import Image from "next/image"


const Order = ({order}) => {

    const status = order?.status;
    const statusClass = (index) => {
        if(index-status<1) return "";
        if(index-status===1) return "animate-pulse";
        if(index-status>1) return ""
    };

    return (
        <div className="min-h-[calc(100vh-433px)] flex justify-center items-center flex-col px-10 py-20 gap-y-5">
            <div className="w-full flex items-center overflow-x-auto">
                <table className="w-full text-sm text-center text-gray-500 min-w-[1000px]">
                    <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                        <tr>
                            <th scope="col" className="py-3 px-6">ORDER ID</th>
                            <th scope="col" className="py-3 px-6">CUSTOMER</th>
                            <th scope="col" className="py-3 px-6">ADDRESS</th>
                            <th scope="col" className="py-3 px-6">TOTAL</th>
                        </tr>
                    </thead>
                    <tbody className="border-b border-gray-700 bg-secondary">
                        <tr className="relative">
                            <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                                <span>{(order?._id).substring(0,6)}..</span>
                            </td>
                            <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                                <span>{order?.customer}</span>
                            </td>
                            <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                                <span>{order?.address}</span>
                            </td>
                            <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                                <span>${order?.total}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="flex md:flex-row flex-col justify-between items-center bg-primary 
                w-full p-8 mt-4 md:gap-y-0 gap-y-4">
                <div className={`relative flex flex-col items-center ${statusClass(0)}`}>
                    <Image src={"/images/paid.png"} width={40} height={40} objectFit="contain"  alt=""/>
                    <span className="text-sm">Payment</span>
                </div>
                <div className={`relative flex flex-col items-center ${statusClass(1)}`}>
                    <Image src={"/images/bake.png"} width={40} height={40} objectFit="contain"  alt=""/>
                    <span className="text-sm">Preparing</span>
                </div>
                <div className={`relative flex flex-col items-center ${statusClass(2)}`}>
                    <Image src={"/images/bike.png"} width={40} height={40} objectFit="contain"  alt=""/>
                    <span className="text-sm">On the way</span>
                </div>
                <div className={`relative flex flex-col items-center ${statusClass(3)}`}>
                    <Image src={"/images/delivered.png"} width={40} height={40} objectFit="contain"  alt=""/>
                    <span className="text-sm">Delivered</span>
                </div>
            </div>
        </div>

    )
}

export default Order


export const getServerSideProps = async ({params}) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders/${params.id}`);
    return {
        props: {
            order: res.data ? res.data : []
        }
    }
}
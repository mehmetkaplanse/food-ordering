import Image from "next/image"
import Title from "./ui/Title"
import {HiShoppingCart} from 'react-icons/hi'

const CampaignItem = () => {
    return (
        <div className="bg-secondary flex-1 rounded-lg py-5 px-[15px] 
        flex items-center gap-x-10">
            <div className="relative md:w-44 md:h-40 w-32 h-32 after:content-[''] 
                border-[5px] border-primary rounded-full overflow-hidden">
                <Image src={"/images/o1.jpg"} alt="" layout="fill" 
                objectFit="cover" className="hover:scale-105 transition-all"/>
            </div>
            <div className="text-white">
                <Title addClass={"text-2xl"}>Tasty Thursdays</Title>
                <div className="font-dancing my-2">
                    <span className="text-[40px]">20%</span>
                    <span className="text-sm inline-block ml-1">Off</span>
                </div>
                <button className="btn-primary flex items-center gap-x-2">
                    Order Now <HiShoppingCart size={20}/> 
                </button>
            </div>
        </div>
    )
}

const Campaigns = () => {
  return (
    <div className="container mx-auto py-20 flex justify-between gap-5 flex-wrap">
        <CampaignItem />
        <CampaignItem />
    </div>
  )
}

export default Campaigns
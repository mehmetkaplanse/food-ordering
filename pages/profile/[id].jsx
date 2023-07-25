import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Account from '@/components/profile/Account';
import Password from '@/components/profile/Password';
import Order from '@/components/profile/Order';
import { getSession, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import axios from 'axios';

const Profile = ({user}) => {

    const { data: session } = useSession();
    const {push} = useRouter();
    const [tabs, setTabs] = useState(0);

    const handleSignOut = () => {
        if(confirm("Are you sure want to sign out?")) {
            signOut({redirect: false});
            push("/auth/login");
        }
    }

    useEffect(() => {
        if(!session) {
            push("/auth/login");
        }
    },[session,push])


    return (
        <div className='flex flex-wrap px-10 min-h-[calc(100vh-458px)] pb-10
            lg:flex-row flex-col'>
            {/* left */}
            <div className='lg:w-80 w-full flex-shrink-0'>
                <div className='relative flex flex-col gap-y-1 items-center px-10 py-5 border border-b-0'>
                    <Image className='rounded-full' 
                        src={user.image ? user.image : "/images/client2.jpg"} 
                        alt='' width={100} 
                        height={100} 
                    />
                    <b className='text-2xl mt-1'>{user.fullName}</b>
                </div>
                <ul className='flex flex-col items-center'>
                    <li className={`border w-full p-3 flex items-center 
                        lg:justify-normal justify-center gap-x-2 
                        hover:bg-primary cursor-pointer transition-all
                        ${tabs == 0 && 'bg-primary text-white'}`}
                        onClick={() => setTabs(0)}>
                        <i className='fa fa-home'></i>
                        <button>Account</button>
                    </li>
                    <li className={`border w-full p-3 flex items-center 
                        lg:justify-normal justify-center gap-x-2 
                        hover:bg-primary cursor-pointer transition-all
                        ${tabs == 1 && 'bg-primary text-white'}`}
                        onClick={() => setTabs(1)}>
                        <i className='fa fa-key'></i>
                        <button>Password</button>
                    </li>
                    <li className={`border w-full p-3 flex items-center 
                        lg:justify-normal justify-center gap-x-2 
                        hover:bg-primary cursor-pointer transition-all
                        ${tabs == 2 && 'bg-primary text-white'}`}
                        onClick={() => setTabs(2)}>
                        <i className='fas fa-motorcycle'></i>
                        <button>Orders</button>
                    </li>
                    <li className={`border w-full p-3 flex items-center 
                        lg:justify-normal justify-center gap-x-2 
                        hover:bg-primary cursor-pointer transition-all`}
                        onClick={handleSignOut}>
                        <i className='fas fa-sign-out'></i>
                        <button>Exit</button>
                    </li>
                </ul>
            </div>
            {/* right */}
            { tabs === 0 && ( <Account user={user} /> ) }
            { tabs === 1 && ( <Password user={user} /> ) }
            { tabs === 2 && ( <Order /> ) }
        </div>
    )
}


export async function getServerSideProps({req, params}) {
    const session = await getSession({ req });

    if(!session) {
        return {
            redirect: {
                destination: "/auth/login",
                permanent: false
            }
        }
    }

    const user = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${params.id}`);

    return {
        props: {
            user: user ? user.data : null
        }
    }
}

export default Profile
import Input from '@/components/form/Input'
import Title from '@/components/ui/Title'
import {  useFormik } from 'formik';
import { loginSchema } from '@/schema/login';
import Link from 'next/link';
import {  signIn, getSession, useSession } from "next-auth/react"
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Login = () => {

    const {data: session} = useSession();
    const {push} = useRouter();
    const [currentUser, setCurrentUser] = useState();

    const onSubmit = async (values,actions) => {
        const {email,password} = values;
        let options = {redirect: false, email, password};
        try {
            const res = await signIn("credentials", options);
            actions.resetForm();
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
                setCurrentUser(res.data?.find((user) => user.email === session?.user?.email));
                session && push("/profile/"+currentUser?._id);
            } catch (error) {
                console.log(error);
            }
        }
        getUser();
    },[session, push, currentUser])


    // formik-validation
    const formik = useFormik({
        initialValues: {
          email: "",
          password: ""
        },
        onSubmit,
        validationSchema: loginSchema
      });

    // inputs
    const inputs = [
        {
            id: 1,
            name: "email",
            type: "email",
            placeholder: "Your Email",
            value: formik.values.email,
            errorMessage: formik.errors.email,
            touched: formik.touched.email
        },
        {
            id: 2,
            name: "password",
            type: "password",
            placeholder: "Your Password",
            value: formik.values.password,
            errorMessage: formik.errors.password,
            touched: formik.touched.password
        }
    ]

  return (
    <div className='container mx-auto'>
        <form className='flex flex-col items-center my-20 md:w-1/2 w-full mx-auto' onSubmit={formik.handleSubmit}>
            <Title addClass={"text-[40px] mb-6"}>Login</Title>
            <div className='flex flex-col gap-y-2 w-full'>
                {
                    inputs.map((input) => (
                        <Input key={input.id} 
                                {...input} 
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur}
                        />
                    ))
                }
            </div>
            <div className='w-full flex flex-col gap-3 mt-5'>
                <button className='btn-primary' type='submit'>Login</button>
                <button className='btn-secondary flex items-center gap-1 justify-center'
                    type='button' onClick={()=>signIn("github")}>
                    <i class="fab fa-github" aria-hidden="true"></i>
                    Github
                </button>
                <Link href={"/auth/register"} className='text-sm text-secondary underline' >Do you have any account?</Link>
            </div>
        </form>
    </div>
  )
}


export async function getServerSideProps({req}) {
    const session = await getSession({ req });

    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`)
    const user = res.data?.find((user) => user.email===session?.user.email)

    if(session && user) {
        return {
            redirect: {
                destination: "/profile/"+user._id,
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}


export default Login
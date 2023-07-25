import Input from '@/components/form/Input'
import Title from '@/components/ui/Title'
import { Formik, useFormik } from 'formik';
import { adminSchema } from '@/schema/admin';
import Link from 'next/link';
import axios from 'axios';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const Login = () => {

    const {push} = useRouter();

    const onSubmit = async (values,actions) => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin`,values);
            if(res.status===200) {
                toast.success("Admin Login Success");
                actions.resetForm();
                push("/admin/profile");
            }
        } catch (error) {
            
        }
        actions.resetForm();
    }

    const formik = useFormik({
        initialValues: {
          username: "",
          password: ""
        },
        onSubmit,
        validationSchema: adminSchema
      });


    const inputs = [
        {
            id: 1,
            name: "username",
            type: "text",
            placeholder: "Your Username",
            value: formik.values.username,
            errorMessage: formik.errors.username,
            touched: formik.touched.username
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
    <div className='container mx-auto py-3'>
        <form className='flex flex-col items-center my-20 md:w-1/2 w-full mx-auto' onSubmit={formik.handleSubmit}>
            <Title addClass={"text-[40px] mb-6"}>Admin Login</Title>
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
                <button className='btn-primary'>Login</button>
                <Link href={"/"} className='text-sm text-secondary underline' >Home Page</Link>
            </div>
        </form>
    </div>
  )
}


export const getServerSideProps = (ctx) => {
    const myCookie = ctx.req?.cookies || "";
    if(myCookie.token===process.env.ADMIN_TOKEN) {
        return {
            redirect: {
                destination: "/admin/profile",
                permanent: false
            }
        }
    }
    return {
        props: {}
    }
}

export default Login
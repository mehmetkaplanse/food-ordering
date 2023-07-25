import Input from '@/components/form/Input'
import Title from '@/components/ui/Title'
import { useFormik } from 'formik';
import { registerSchema } from '@/schema/register';
import Link from 'next/link';
import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const Register = () => {

  const {push} = useRouter();

    const onSubmit = async (values, actions) => {
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/users/register`,
            values
          );
          if (res.status === 200) {
            toast.success("User created successfully");
            push("/auth/login");
          }
        } catch (err) {
          toast.error(err.response.data.message);
          console.log(err);
        }
        actions.resetForm();
      };

    const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        onSubmit,
        validationSchema: registerSchema
      });


    const inputs = [
        {
            id: 1,
            name: "fullName",
            type: "text",
            placeholder: "Your Full Name",
            value: formik.values.fullName,
            errorMessage: formik.errors.fullName,
            touched: formik.touched.fullName
        },
        {
            id: 2,
            name: "email",
            type: "email",
            placeholder: "Your Email",
            value: formik.values.email,
            errorMessage: formik.errors.email,
            touched: formik.touched.email
        },
        {
            id: 3,
            name: "password",
            type: "password",
            placeholder: "Your Password",
            value: formik.values.password,
            errorMessage: formik.errors.password,
            touched: formik.touched.password
        },
        {
            id: 4,
            name: "confirmPassword",
            type: "password",
            placeholder: "Your Confirm Password",
            value: formik.values.confirmPassword,
            errorMessage: formik.errors.confirmPassword,
            touched: formik.touched.confirmPassword
        }
    ]

  return (
    <div className='container mx-auto'>
        <form className='flex flex-col items-center my-10 md:w-1/2 w-full mx-auto' onSubmit={formik.handleSubmit}>
            <Title addClass={"text-[40px] mb-6"}>Register</Title>
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
                <button className='btn-primary' type='submit'>Register</button>
                <Link href={"/auth/login"} className='text-sm text-secondary underline' >Do you have a account?</Link>
            </div>
        </form>
    </div>
  )
}

export default Register
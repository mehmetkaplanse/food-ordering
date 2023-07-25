import Input from '@/components/form/Input'
import Title from '@/components/ui/Title'
import { useFormik } from 'formik';
import { newPasswordSchema } from '@/schema/newPassword';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Password = ({user}) => {

    const onSubmit = async (values,actions) => {
        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/${user?._id}`,values);
            if(res.status===200) {
                toast.success("Password updated successfully!");
            }
        } catch (error) {   
            console.log(error);
        }
        actions.resetForm();
    }

    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: ""
        },
        onSubmit,
        validationSchema: newPasswordSchema
      });

    const inputs = [
        {
            id: 1,
            name: "password",
            type: "password",
            placeholder: "Your Password",
            value: formik.values.password,
            errorMessage: formik.errors.password,
            touched: formik.touched.password
        },
        {
            id: 2,
            name: "confirmPassword",
            type: "password",
            placeholder: "Your Confirm Password",
            value: formik.values.confirmPassword,
            errorMessage: formik.errors.confirmPassword,
            touched: formik.touched.confirmPassword
        }
    ]

  return (
    <form className='lg:p-8 flex-1 lg:mt-0 mt-10' onSubmit={formik.handleSubmit}>
        <Title addClass={"text-[40px] lg:text-start text-center"}>Password Settings</Title>
        <div className='grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4'>
            {
                inputs.map((input) => (
                    <Input key={input.id} {...input}
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                    />
                ))
            }
        </div>
        <button className="btn-primary mt-4 lg:w-1/4 w-full">Update</button>
    </form>

  )
}

export default Password
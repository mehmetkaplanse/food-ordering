import React from 'react'
import Title from './ui/Title'
import Input from './form/Input'
import { Formik, useFormik } from 'formik';
import { reservationSchema } from '@/schema/reservation';


const Reservation = () => {

    const onSubmit = async (values,actions) => {
        await new Promise((resolve) => setTimeout(resolve, 4000));
        actions.resetForm();
    }

    const formik = useFormik({
        initialValues: {
          fullName: "",
          phoneNumber: "",
          email: "",
          persons: "",
          date: "",
        },
        onSubmit,
        validationSchema: reservationSchema
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
            name: "phoneNumber",
            type: "number",
            placeholder: "Your Phone Number",
            value: formik.values.phoneNumber,
            errorMessage: formik.errors.phoneNumber,
            touched: formik.touched.phoneNumber
        },
        {
            id: 3,
            name: "email",
            type: "email",
            placeholder: "Your Email Address",
            value: formik.values.email,
            errorMessage: formik.errors.email,
            touched: formik.touched.email
        },
        {
            id: 4,
            name: "persons",
            type: "number",
            placeholder: "How Many Persons?",
            value: formik.values.persons,
            errorMessage: formik.errors.persons,
            touched: formik.touched.persons
        },
        {
            id: 5,
            name: "date",
            type: "datetime-local",
            value: formik.values.date,
            errorMessage: formik.errors.date,
            touched: formik.touched.date
        }
    ]


    return (
        <div className='container mx-auto py-12'>
            <Title addClass={"text-[40px] mb-10"}>Book A Table</Title>
            <div className='flex flex-wrap-reverse justify-between gap-10'>
                <form className='lg:flex-1 w-full' onSubmit={formik.handleSubmit}>
                    <div className='flex flex-col gap-y-3'>
                        {
                            inputs.map((input) => (
                                <Input key={input.id} {...input} 
                                onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            ))
                        }
                    </div>
                    <div>
                        <button className='btn-primary mt-4' type='submit'>Book Now</button>
                    </div>
                </form>
                <div className='lg:flex-1 w-full'>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d68428.79412470883!2d-74.0925793907755!3d40.71463262472186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20Amerika%20Birle%C5%9Fik%20Devletleri!5e0!3m2!1str!2str!4v1686050992069!5m2!1str!2str" 
                        width="600" height="450" allowFullScreen="" 
                        loading="lazy" 
                        className='h-full w-full'
                        referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
            </div>
        </div>
    )
}

export default Reservation
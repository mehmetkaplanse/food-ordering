import * as Yup from 'yup';


export const reservationSchema = Yup.object({
    fullName: Yup.string()
         .min(3, 'Full Name must be at least 3 characters')
         .required('Full Name is required'),
    phoneNumber: Yup.string()
        .min(10, 'Phone Number must be 10 characters')
        .required('Phone Number is required'),
    email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
    persons: Yup.string().required('Persons is required'),
    date: Yup.string().required('Date is required'),

})
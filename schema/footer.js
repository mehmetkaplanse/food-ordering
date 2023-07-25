import * as Yup from 'yup';


export const footerSchema = Yup.object({
    location: Yup.string()
         .required('Location is required'),
    email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
    phoneNumber: Yup.string()
        .min(10, 'Phone Number must be 10 characters')
        .required('Phone Number is required'),
    description: Yup.string().required('Description is required'),
    day: Yup.string().required('Day is required'),
    time: Yup.string().required('Time is required')

})
import * as Yup from 'yup';


export const profileSchema = Yup.object({
    fullName: Yup.string()
         .min(3, 'Full Name must be at least 3 characters')
         .required('Full Name is required'),
    phoneNumber: Yup.string()
        .min(10, 'Phone Number must be 10 characters')
        .required('Phone Number is required'),
    email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
    address: Yup.string().required('Address is required'),
    job: Yup.string().required('Job is required'),
    bio: Yup.string().required('Bio is required')

})
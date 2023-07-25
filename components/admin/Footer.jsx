import Input from '@/components/form/Input'
import Title from '@/components/ui/Title'
import { useFormik } from 'formik';
import { footerSchema } from '@/schema/footer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Footer = () => {

    const [linkAddress, setLinkAddress] = useState("https://");
    const [iconName, setIconName] = useState("fab fa-");
    const [footerData, setFooterData] = useState([]);
    const [socialMediaLinks, setSocialMediaLinks] = useState([]);


    // get footer data
    useEffect(() => {     
        const getFooterData = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/footer`);
                setFooterData(res.data[0]);
                setSocialMediaLinks(res.data[0].socialMedia)
            } catch (error) {
                console.log(error);
            }
        }
        getFooterData();
    }, []);


    // put footer data
    const onSubmit = async (values,actions) => {
        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/footer/${footerData._id}`,
            {
                location: values.location,
                email: values.email,
                phoneNumber: values.phoneNumber,
                description: values.description,
                openingHours: {
                    day: values.day,
                    hour: values.time
                },
                socialMedia: socialMediaLinks
            });
            if(res.status===200) {
                toast.success("Footer updated succesfully.");
            }
            
        } catch (error) {
            console.log(error);
        }

    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
          location: footerData?.location,
          email: footerData?.email,
          phoneNumber: footerData?.phoneNumber,
          description: footerData?.description,
          day: footerData?.openingHours?.day,
          time: footerData?.openingHours?.hour
        },
        onSubmit,
        validationSchema: footerSchema
      });

    const inputs = [
        {
            id: 1,
            name: "location",
            type: "text",
            placeholder: "Your Location",
            value: formik.values.location,
            errorMessage: formik.errors.location,
            touched: formik.touched.location
        },
        {
            id: 2,
            name: "email",
            type: "email",
            placeholder: "Your Email Address",
            value: formik.values.email,
            errorMessage: formik.errors.email,
            touched: formik.touched.email
        },
        {
            id: 3,
            name: "phoneNumber",
            type: "number",
            placeholder: "Your Phone Number",
            value: formik.values.phoneNumber,
            errorMessage: formik.errors.phoneNumber,
            touched: formik.touched.phoneNumber
        },
        {
            id: 4,
            name: "description",
            type: "text",
            placeholder: "Write a description",
            value: formik.values.description,
            errorMessage: formik.errors.description,
            touched: formik.touched.description
        },
        {
            id: 5,
            name: "day",
            type: "text",
            placeholder: "Write a day",
            value: formik.values.day,
            errorMessage: formik.errors.day,
            touched: formik.touched.day
        },
        {
            id: 6,
            name: "time",
            type: "time",
            placeholder: "Write a time",
            value: formik.values.time,
            errorMessage: formik.errors.time,
            touched: formik.touched.time
        }
    ]

    const handleCreate = (e) => {
        setSocialMediaLinks([...footerData?.socialMedia, {
            icon: iconName,
            link: linkAddress
        }]);
    }

  return (
    <form className='lg:p-8 flex-1 lg:mt-0 mt-10' onSubmit={formik.handleSubmit}>
        <Title addClass={"text-[40px] lg:text-start text-center"}>Footer</Title>
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
        <div className='mt-10 flex xl:flex-row flex-col justify-between xl:items-center gap-4'>
            <div className='flex items-center gap-4'>
                <Input placeholder="Link Address" 
                    value={linkAddress} 
                    onChange={(e) => setLinkAddress(e.target.value)}/>
                <Input placeholder="Icon Name"
                    onChange={(e) => setIconName(e.target.value)}
                    value={iconName}/>
                <button className="btn-primary" type='button' 
                    onClick={handleCreate}>
                    Add
                </button>
            </div>
            <ul className='flex items-center gap-6'>
                {
                    socialMediaLinks?.map((item,i) => (
                    <li key={i}>        
                        <i className={`${item.icon} lg:text-2xl text-xl`}></i>
                        <button className='text-red-500' 
                            onClick={() => setSocialMediaLinks(socialMediaLinks.filter((sc) => item !==sc))}>
                            <i className='fa fa-trash lg:text-xl text-lg ml-2'></i>
                        </button>
                    </li>
                    ))
                }
            </ul>
        </div>
        <button className="btn-primary mt-4" type='submit'>Update</button>
    </form>

  )
}

export default Footer
import React, { useEffect, useState } from 'react'
import Title from '../ui/Title'
import MenuItem from './MenuItem'

const MenuWrapper = ({categoryList, productList}) => {

  const [active, setActive] = useState(0);
  const [filter, setFilter] = useState([]);
  const [productLimit, setProductLimit] = useState(3);

  useEffect(() => {
    setFilter(
      productList.filter(
        (product) =>
          product.category === categoryList[active].title.toLowerCase()
      )
    );
  }, [categoryList, productList, active]);


  return (
    <div className='container mx-auto mb-16'>
        <div className='flex flex-col items-center w-full'>
            <Title addClass={"text-[40px]"}>Our Menu</Title>
            <div className='flex gap-x-2 mt-8'>
                {categoryList && categoryList.map((category,i) => (
                  <button className={`px-6 py-2 rounded-3xl transition-all sm:text-base text-xs
                  ${i===active && 'bg-secondary text-white'}`}
                  onClick={()=> {
                    setActive(i)
                    setProductLimit(3)
                  }}
                  key={category._id}>{category.title}</button>
                ))}
            </div>
        </div>
        <div className='mt-8 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 min-h-[400px]'>
            { filter.length > 0 &&
              filter
              .slice(0,productLimit)
              .map((product) => (
                <MenuItem key={product._id} product={product}/>
              ))
            }
        </div>
        <div className='mt-8 flex items-center justify-center'>
            <button className='btn-primary' onClick={() => 
                setProductLimit(productLimit+3)}>
                  View More
            </button>
        </div>
    </div>
  )
}

export default MenuWrapper
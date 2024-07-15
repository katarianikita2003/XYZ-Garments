import React from 'react'

const HomeCard = ({ name, image, price, category, loading }) => {
  return (
    <div className='p-2 bg-white rounded shadow-md min-w-[150px] '>
      {
        name ? (
        <> <div className='w-40 min-h-[150px] '>
          <img src={image} className='w-full h-full' />
        </div>
          <h3 className='text-lg font-semibold text-center capitalize text-slate-800'>{name}</h3>
          <p className='font-medium text-center text-slate-600'>{category}</p>
          <p className='font-bold text-center'><span className='text-red-500'>Rs. </span> <span>{price}</span></p>
        </>
      )
    :
    <div className='flex items-center justify-center h-full'>
      <p>{loading}</p>
    </div>
    }
    </div>
  )
}

export default HomeCard

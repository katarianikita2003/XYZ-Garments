import React from 'react'

const CardFeatures = (image, name, price, category) => {
  return (
    <div className='w-full min-w-[280px] bg-white hover:shadow-lg cursor-pointer drop-shadow-lg px-4 py-5 flex flex-col'>
      <div className='h-28 '>
        <img src={ image } className='h-full' />
      </div>
      {/* <h3 className='text-lg font-semibold text-center capitalize text-slate-800'>{name}</h3>
        <p className='font-medium text-center text-slate-600'>{category}</p>
        <p className='font-bold text-center'><span className='text-red-500'>Rs. </span> <span>{price}</span></p> */}
    </div>
  )
}

export default CardFeatures

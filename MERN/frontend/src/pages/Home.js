import React from 'react'
import HomeCard from '../component/HomeCard'
import { useSelector } from 'react-redux'
import CardFeatures from '../component/CardFeatures'

const Home = () => {
  const productData = useSelector((state) => state.product.productList)
  console.log(productData)
  const homeProductCartList = productData.slice(4, 8);
  const homeProductCartListDress = productData.filter(el => el.category === "dress", [])
  console.log(homeProductCartListDress)

  const loadingArray = new Array(4).fill(null)
  const loadingArrayFeature = new Array(10).fill(null)
  return (
    <div className='p-2 md:p-4 '>
      <div className='gap-4 py-2 md:flex'>
        <div className='md:w-1/2'>
          <div className='flex items-center w-48 gap-3 px-2 rounded-full bg-slate-300'>
            <p className='text-sm font-medium '>Dress to Express</p>
            <img src='https://pic.onlinewebfonts.com/thumbnails/icons_221960.svg' className='h-9' />
          </div>
          <h2 className='py-3 text-4xl font-semibold md:text-4xl'>What you wear is how you present yourself to the world.</h2>
          <span className='text-5xl font-bold text-blue-600 md:text-6xl'>"Fashion is instant language."</span>
          <p className='max-w-lg py-3 text-base'>Importance of a Good Product Description for a Clothing Business
            Good product description examples for clothing are the ones that provide accurate and complete information about an item while writing a persuasive copy that attracts buyers. .</p>
          <p className='max-w-lg text-base'>Indulge in the timeless elegance of our pink handwoven silk saree. Adorned with intricate zari work, this saree captures the essence of Indian craftsmanship. Its rich colour scheme and luxurious drape make it a true masterpiece. This saree is perfect for weddings and festivities.. </p>
          <button className='px-4 py-1 my-4 font-bold bg-red-600 rounded-md hover:bg-red-700 text-slate-200 '>Order Now</button>
        </div>
        <div className='flex flex-wrap justify-center gap-5 p-4 md:w-1/2'>
          {
            homeProductCartList[0] ? homeProductCartList.map(el => {
              return (
                <HomeCard
                  key={el._id}
                  image={el.image}
                  name={el.name}
                  price={el.price}
                  category={el.category}
                />
              )
            }) :
              loadingArray.map((el, index) => {
                return (
                  <HomeCard
                    key={index}
                    loading={"Loading..."}
                  />
                )
              })
          }
        </div>
      </div>
      <div className=''>
        <h2 className='text-2xl font-bold text-slate-800'>Our Collection</h2>
        <h3 className='text-xl font-semibold text-slate-800'>Dress</h3>
        <div className='flex gap-5'>
          {homeProductCartListDress[0]
            ? homeProductCartListDress.map((el) => {
              return (
                <CardFeatures
                  key={el._id+"dress"}
                  id={el._id}
                  image={el.image}
                  name={el.name}
                  price={el.price}
                  category={el.category}
                />
              )
            })
            : loadingArrayFeature.map((el,index) => (
              <CardFeatures loaing ="Loading..." key={index+"cartLoading"} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Home

import React, { useState } from 'react'
import { MdFileUpload } from "react-icons/md";
import { imageToBase64 } from '../utility/imageToBase64'
import toast from 'react-hot-toast'

const NewProduct = () => {
  const [data,setData] = useState({
    name : "",
    category : "",
    image  : "",
    price : "",
    description : "",
  })

  const handleOnChange = (e) => {
    const {name,value} = e.target
    setData((preve)=>{
      return{
        ...preve,
        [name] : value
      }
    })
  }
  const uploadImage = async (e) => {
    const data = await imageToBase64(e.target.files[0])
    // console.log(data)

    setData((preve)=>{
      return{
        ...preve,
        image : data
      }
    })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    console.log(data)

    const {name, image,category,price} = data
    if(name&&image&&category&&price){

    const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/uploadProduct`,{
      method: "POST",
      headers: {
        "content-type" : "application/json"
      },
      body : JSON.stringify(data)
    })
    const fetchRes = await fetchData.json()
    console.log(fetchRes)
    toast(fetchRes.message)
    setData(()=>{
      return{
        name : "",
    category : "",
    image  : "",
    price : "",
    description : "",
      }
    })
  }else{
    toast("Enter Required Fields")
  }
}
  return (
    <div className='p-4'>
      <form className='flex flex-col w-full max-w-md p-3 m-auto bg-white shadow' onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input type='text' value={data.name} name='name' className='p-1 bg-slate-200' onChange={handleOnChange} />

        <label htmlFor='category'>Category</label>
        <select value={data.category} className='p-1 my-1 bg-slate-200' id='category' name='category' onChange={handleOnChange}>
          <option value={"other"}>Select Category</option>
          <option value={"kids"}>Kids Wear</option>
          <option value={"pants"}>Pants</option>
          <option value={"shirt"}>Shirts</option>
          <option value={"dress"}>Dress</option>
          <option value={"tshirt"}>T-Shirt</option>
          <option value={"top"}>Tops</option>
          <option value={"bottom"}>Bottom</option>
          <option value={"saree"}>Saree</option>
          <option value={"kurta"}>Kurta/Kurti</option>
          <option value={"formal"}>Formal</option>
          <option value={"men"}>Men Wear</option>
          <option value={"women"}>Women Wear</option>
        </select>
        
        <label htmlFor='image'>Image
        <div  className='flex items-center justify-center w-full h-40 rounded cursor-pointer bg-slate-200'>
            {
              data.image ? <img src={data.image} className="h-full" /> :<span className='text-5xl'><MdFileUpload/></span> 
            }
            
            
           <input type={"file"} accept="image/*" id="image" onChange={uploadImage} className="hidden"/>
        </div>
        </label>

        <label htmlFor='price' className='my-1'>Price</label>
        <input type='text' value={data.price} name='price' className='p-1 bg-slate-200' onChange={handleOnChange} />

        <label htmlFor='desc' className='my-1'>Description</label>
        <textarea value={data.description} rows={3} name='description' className='p-1 my-1 bg-slate-200' onChange={handleOnChange}></textarea>

        <button className='my-2 text-lg font-medium text-white bg-blue-700 hover:bg-blue-900'>Save</button>
      </form>
    </div>
  )
}

export default NewProduct

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import loginSignUpImage from "../assest/signUp.gif"
import { BiSolidShow, BiSolidHide } from "react-icons/bi"
import { useNavigate } from 'react-router-dom'
import { imageToBase64 } from '../utility/imageToBase64'
import  toast  from 'react-hot-toast'

const SignUp = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        image : "",
    });
    console.log(data);
    const handleShowPassword = () => {
        setShowPassword(preve => !preve)
    }
    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(preve => !preve)
    }
    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData((preve) => {
            return {
                ...preve,
                [name]: value,
            }
        })
    }
    const handleUploadProfileImage = async (e) => {
        const data = await imageToBase64(e.target.files[0])
        console.log(data)

        setData((preve)=>{
            return{
                ...preve,
                image : data
            }
        })
    }
    console.log(process.env.REACT_APP_SERVER_DOMAIN)
    const handleSubmit = async(e) => {
        e.preventDefault();
        const { firstName, email, password, confirmPassword } = data;
        if (firstName && email && password && confirmPassword) {
            if (password === confirmPassword) {
                const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/signUp`,{
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                const dataRes = await fetchData.json()
                // console.log(dataRes)
                
                // alert(dataRes.message);
                toast(dataRes.message)

                if(dataRes.alert){
                    navigate("/login")
                }
            }
            else {
                alert("Password and confirm password are not same")
            }
        }
        else {
            alert("plaese enter the required field.")
        }
    }
    return (
        <div className='p-3 md:p-4'>
            <div className='flex flex-col w-full max-w-sm p-2 m-auto bg-white'>
                {/* <h1 className='text-2xl font-bold text-center'>SignUp</h1> */}
                <div className='w-20 h-20 m-auto overflow-hidden rounded-full shadow drop-shadow-md'>
                    <img src={data.image ? data.image : loginSignUpImage} className='w-full h-full' />
                    <label htmlFor='profileImage'>
                        <div className='absolute bottom-0 w-full text-center bg-opacity-50 h-1/3 bg-slate-400'>
                            <p className='p-1 text-white cursor-pointer taxt-sm'> Upload</p>
                        </div>
                        <input type='file' id='profileImage' accept='image/*' className='hidden' onChange={handleUploadProfileImage} />
                    </label>
                </div>
                <form className='flex flex-col w-full py-3' onSubmit={handleSubmit}>
                    <label htmlFor='firstName'>First Name</label>
                    <input type='text' id='firstName' name='firstName' className='w-full px-2 py-1 mt-1 mb-2 rounded bg-slate-200 focus-within:outline-blue-800' value={data.firstName} onChange={handleOnChange} />

                    <label htmlFor='lastName'>Last Name</label>
                    <input type='text' id='lastName' name='lastName' className='w-full px-2 py-1 mt-1 rounded bg-slate-200 focus-within:outline-blue-800' value={data.lastName} onChange={handleOnChange} />

                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' name='email' className='w-full px-2 py-1 mt-1 rounded bg-slate-200 focus-within:outline-blue-800' value={data.email} onChange={handleOnChange} />

                    <label htmlFor='password'>Password</label>
                    <div className='flex px-2 py-1 mt-1 mb-2 rounded bg-slate-200 focus-within:outline focus-within:outline-blue-800'>
                        <input type={showPassword ? "text" : 'password'} id='password' name='password' className='w-full outline-none bg-slate-200' value={data.password} onChange={handleOnChange} />
                        <span className='flex text-xl cursor-pointer' onClick={handleShowPassword}>{showPassword ? <BiSolidShow /> : <BiSolidHide />}</span>
                    </div>

                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <div className='flex px-2 py-1 mt-1 mb-2 rounded bg-slate-200 focus-within:outline focus-within:outline-blue-800'>
                        <input type={showConfirmPassword ? "text" : 'password'} id='confirmPassword' name='confirmPassword' className='w-full outline-none bg-slate-200' value={data.confirmPassword} onChange={handleOnChange} />
                        <span className='flex text-xl cursor-pointer' onClick={handleShowConfirmPassword}>{showConfirmPassword ? <BiSolidShow /> : <BiSolidHide />}</span>
                    </div>

                    <button className='max-w-[120px] w-full mt-2 p-1 text-xl rounded-full m-auto bg-blue-800 text-white hover:bg-blue-900'>SignUp</button>


                </form>

                <p className='mt-2 text-sm text-left'>Already have an account ? <Link to="/login" className='text-blue-800 underline'> Login</Link></p>

            </div>
        </div>
    )
}

export default SignUp

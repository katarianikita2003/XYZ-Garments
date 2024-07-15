import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import loginSignUpImage from "../assest/signUp.gif"
import { BiSolidShow, BiSolidHide } from "react-icons/bi"
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { loginRedux } from '../redux/userSlice'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate()
    const userData = useSelector(state => state)
    const dispatch = useDispatch()

    const handleShowPassword = () => {
        setShowPassword(preve => !preve)
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
    const handleSubmit = async (e) => {
        e.preventDefault()
        const { email, password, } = data
        if (email && password) {
            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/login`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
            const dataRes = await fetchData.json()
            console.log(dataRes)

            toast(dataRes.message)

            if (dataRes.alert) {
                dispatch(loginRedux(dataRes))
                setTimeout(() => {
                    navigate("/")
                }, 1000);
            }

            console.log(userData)
        }

        else {
            alert("please enter the required field.")
        }
    }
    return (
        <div>
            <div className='p-3 md:p-4'>
                <div className='flex flex-col w-full max-w-sm p-2 m-auto bg-white'>
                    {/* <h1 className='text-2xl font-bold text-center'>SignUp</h1> */}
                    <div className='w-20 m-auto overflow-hidden rounded-full shadow drop-shadow-md'>
                        <img src={loginSignUpImage} className='w-full' />
                    </div>
                    <form className='flex flex-col w-full py-3' onSubmit={handleSubmit}>


                        <label htmlFor='email'>Email</label>
                        <input type='email' id='email' name='email' className='w-full px-2 py-1 mt-1 rounded bg-slate-200 focus-within:outline-blue-800' value={data.email} onChange={handleOnChange} />

                        <label htmlFor='password'>Password</label>
                        <div className='flex px-2 py-1 mt-1 mb-2 rounded bg-slate-200 focus-within:outline focus-within:outline-blue-800'>
                            <input type={showPassword ? "text" : 'password'} id='password' name='password' className='w-full outline-none bg-slate-200' value={data.password} onChange={handleOnChange} />
                            <span className='flex text-xl cursor-pointer' onClick={handleShowPassword}>{showPassword ? <BiSolidShow /> : <BiSolidHide />}</span>
                        </div>



                        <button className='max-w-[120px] w-full mt-2 p-1 text-xl rounded-full m-auto bg-blue-800 text-white hover:bg-blue-900'>Login</button>


                    </form>

                    <p className='mt-2 text-sm text-left'>Don't have an account ? <Link to="/signUp" className='text-blue-800 underline'> SignUp</Link></p>

                </div>
            </div>
        </div>
    )
}

export default Login

import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
import Cookies from 'js-cookie'; 
import { useNavigate } from 'react-router-dom';
export const Signup = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

interface Data {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
}

const api_url = import.meta.env.VITE_REACT_APP_API_URL;

     async function handleSignup(data: Data){
        setLoading(true);
        axios.post(`${api_url}/api/v1/signup`, data)
      .then(function (response) {
        setError("");
        Cookies.set("token", response.data.token);
        if(response.data.success != false) navigate("/home");
      })
      .catch(function (error) {
        setError(error.response.data.message);
        console.log("Error : " + error.response.data.message);
      }).finally(()=>{
        setLoading(false);
      })
       
    }

    return (
        <div className='w-[100vw] overflow-hidden h-[100vh] flex justify-center items-center'>
            <div>
            <p className='text-center my-3 text-red-500'>{error.length > 0 ? "Error : " + error : ""}</p>
      <form className='flex border-2 p-7 rounded-xl border-black flex-col' onSubmit={handleSubmit((data) => handleSignup(data))}>
      <p className='text-center font-bold text-xl'>JOIN 100xBlogs</p>
      <input className='p-4 py-3 my-4 border-2 outline-none border-black rounded-lg' type="text" placeholder='First Name' {...register('firstName', { required: true })} />
      {errors.firstName && <p className='text-red-500'>First name is required.</p>}
      <input className='p-4 py-3 my-4 border-2 outline-none border-black rounded-lg' type="text" placeholder='Last Name' {...register('lastName')} />
      <input className='p-4 py-3 my-4 border-2 outline-none border-black rounded-lg' type='email'  placeholder='Email address' {...register('email', {required: true})} />
      {errors.email && <p className='text-red-500'>Please enter valid email.</p>}
      <input className='p-4 py-3 my-4 border-2 outline-none border-black rounded-lg' type='text'  placeholder='Username' {...register('username', {required: true})} />
      {errors.username && <p className='text-red-500'>Please enter valid username</p>}
      <input className='p-4 py-3 my-4 border-2 outline-none border-black rounded-lg' type='password'  placeholder='Password' {...register('password', {required: true})} />
      <input className='px-4 py-2 bordwe-2 border-green-700 bg-green-500 text-white rounded-xl cursor-pointer' type="submit" />
      <p className='text-center'>{loading ? " Creating User... " : ""}</p>
    </form>
    </div>
            
        </div>
    );
}

import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Cookies from 'js-cookie'; 
export const Signin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

interface Data {
    password: string;
    email: string;
}

const api_url = import.meta.env.VITE_REACT_APP_API_URL;

     async function handleSignin(data: Data){
        setLoading(true);
        axios.post(`${api_url}/api/v1/signin`, data)
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
        <div className='w-[100vw] h-[100vh] overflow-hidden flex justify-center items-center'>
            <div>
            <p className='text-center my-3 text-red-500'>{error.length > 0 ? "Error : " + error : ""}</p>
      <form className='flex border-2 p-7 rounded-xl border-black flex-col' onSubmit={handleSubmit((data) => handleSignin(data))}>
      <p className='text-center font-bold text-xl'>Welcome Back!!</p>
      <input className='p-4 py-3 my-4 border-2 outline-none border-black rounded-lg' type='email'  placeholder='Email address' {...register('email', {required: true})} />
      {errors.email && <p className='text-red-500'>Please enter valid email.</p>}
      <input className='p-4 py-3 my-4 border-2 outline-none border-black rounded-lg' type='password'  placeholder='Password' {...register('password', {required: true})} />
      <input className='px-4 py-2 bordwe-2 border-green-700 bg-green-500 text-white rounded-xl cursor-pointer' type="submit" />
      <p className='text-center'>{loading ? " Authenticating User... " : ""}</p>
    </form>
    </div>
            
        </div>
    );
}
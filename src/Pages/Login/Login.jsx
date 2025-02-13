import React, { useContext, useState } from 'react'
import logo from '../../assets/notelogo.png'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { FaSpinner } from 'react-icons/fa';
import { tokenContext } from '../../Context/TokenContext';
const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { setToken } = useContext(tokenContext);
  const [messages, setMessages] = useState({
    errorMessage: "",
    successMessage: "",
  })
  const callLoginAPI = async (values) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signIn`, values);
      console.log(data);
      if (data.msg === "done") {
        setMessages(prevState => ({ ...prevState, errorMessage: "", successMessage: "Success, Redirecting to home page" }));
        setToken(data.token);
        localStorage.setItem("Token", data.token);
        console.log(data.token);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.log(error.response.data.msg);
      setMessages(prevState => ({ ...prevState, errorMessage: error.response.data.msg, successMessage: "" }));
    }
    finally {
      setIsLoading(false);
    }
  }
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid Email!").required("Email is required"),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/, "Password must start with a capital letter, 3~8 chars").required("Password is required"),
  })
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: callLoginAPI
  })
  return (
    <>
      <div className="flex flex-col flex-1 justify-center px-6 py-12 lg:px-8 bg-[#171717] rounded-md w-1/2">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex items-center justify-center">
          <img className="h-10" src={logo} alt="Your Company" />
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
            Login to your account
          </h2>
        </div>
        {messages.successMessage && <p className='bg-green-400 text-white rounded-lg w-fit mx-auto px-4 py-2 text-center my-3'>
          {messages.successMessage}
        </p>}
        {messages.errorMessage && <p className='bg-red-500 text-white rounded-lg w-fit mx-auto px-4 py-2 mt-2 text-center capitalize'>{messages.errorMessage}</p>}
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={formik.handleSubmit}>
            {/*email input*/}
            <div>
              <label htmlFor="email" className="capitalize block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                email
              </label>
              <div className="my-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder='tharwat'
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus-visible:outline-[#005dcb] sm:text-sm sm:leading-6"
                />
              </div>
              {formik.errors.email && formik.touched.email && <p className='text-red-500 mt-2'>{formik.errors.email}</p>}
            </div>
            {/*password input*/}
            <div>
              <label htmlFor="password" className="capitalize block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                password
              </label>
              <div className="my-4">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder='tharwat'
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus-visible:outline-[#005dcb] sm:text-sm sm:leading-6"
                />
              </div>
              {formik.errors.password && formik.touched.password && <p className='text-red-500 mt-2'>{formik.errors.password}</p>}
            </div>
            <button
              disabled={!(formik.dirty && formik.isValid)}
              type="submit"
              className="disabled:opacity-70 flex w-full justify-center rounded-md bg-[#005dcb] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm"
            >
              {isLoading ? <FaSpinner className='icon-spin' /> : "Login"}
            </button>
            <button
              onClick={formik.resetForm}
              type='reset' className='my-2 flex w-full justify-center rounded-md bg-red-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm'>
              Clear Inputs
            </button>
          </form >
          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?
            <Link to={"/register"} className="font-semibold leading-6 text-[#005dcb] hover:text-indigo-500">
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Login
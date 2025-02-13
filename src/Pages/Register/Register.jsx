import React, { useState } from 'react';
import logo from '../../assets/notelogo.png';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState({
    errorMessage: "",
    successMessage: "",
  })
  const callRegisterAPI = async (values) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signUp`, values);
      if (data.msg === "done") {
        setMessages(prevState => ({ ...prevState, errorMessage: "", successMessage: "Success, Redirecting to login page" }));
        setTimeout(() => {
          navigate("/login");
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
    name: Yup.string().required("Your name is required").min(3, "Name is too short").max(10, "Name is too long"),
    email: Yup.string().email("Invalid Email!").required("Email is required"),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/, "Password must start with a capital letter, 3~8 chars").required("Password is required"),
    age: Yup.number().required("Your age is required").moreThan(15, "You're too young"),
    phone: Yup.string().required("Your mobile is required").matches(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/, "Please enter a valid Egyptian mobile number"),
  })
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: ""
    },
    validationSchema,
    onSubmit: callRegisterAPI
  })
  return (
    <>
      <div className="flex flex-col flex-1 justify-center px-6 py-12 lg:px-8 bg-[#171717] rounded-md w-1/2">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex items-center justify-center">
          <img className="h-10" src={logo} alt="Your Company" />
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
            Register a new account
          </h2>
        </div>
        {messages.successMessage && <p className='bg-green-400 text-white rounded-lg w-fit mx-auto px-4 py-2 text-center my-3'>
          {messages.successMessage}
        </p>}
        {messages.errorMessage && <p className='bg-red-500 text-white rounded-lg w-fit mx-auto px-4 py-2 mt-2 text-center capitalize'>{messages.errorMessage}</p>}
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={formik.handleSubmit}>
            {/*Name input*/}
            <div>
              <label htmlFor="name" className="capitalize block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                name
              </label>
              <div className="my-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder='tharwat'
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus-visible:outline-[#005dcb] sm:text-sm sm:leading-6"
                />
              </div>
              {formik.errors.name && formik.touched.name && <p className='text-red-500 mt-2'>{formik.errors.name}</p>}
            </div>
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
              <div className="mt-2">
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
            {/*age input*/}
            <div>
              <label htmlFor="age" className="capitalize block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                age
              </label>
              <div className="mt-2">
                <input
                  id="age"
                  name="age"
                  type="number"
                  placeholder='tharwat'
                  onChange={formik.handleChange}
                  value={formik.values.age}
                  onBlur={formik.handleBlur}
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus-visible:outline-[#005dcb] sm:text-sm sm:leading-6"
                />
              </div>
              {formik.errors.age && formik.touched.age && <p className='text-red-500 mt-2'>{formik.errors.age}</p>}
            </div>
            {/*phone input*/}
            <div>
              <label htmlFor="phone" className="capitalize block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                phone
              </label>
              <div className="my-2">
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder='tharwat'
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  onBlur={formik.handleBlur}
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus-visible:outline-[#005dcb] sm:text-sm sm:leading-6"
                />
              </div>
              {formik.errors.phone && formik.touched.phone && <p className='text-red-500 mt-2'>{formik.errors.phone}</p>}
            </div>
            <button
              disabled={!(formik.dirty && formik.isValid)}
              type="submit"
              className="disabled:opacity-70 flex w-full justify-center rounded-md bg-[#005dcb] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm"
            >
              {isLoading ? <FaSpinner className='icon-spin' /> : "Register"}
            </button>
            <button
              onClick={formik.resetForm}
              type='reset' className='my-2 flex w-full justify-center rounded-md bg-red-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm'>
              Clear Inputs
            </button>
          </form >
          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?
            <Link to={"login"} className="font-semibold leading-6 text-[#005dcb] hover:text-indigo-500">
              Login Now
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Register
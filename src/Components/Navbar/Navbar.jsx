import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/notelogo.png'
import { tokenContext } from '../../Context/TokenContext';
const Navbar = () => {
    const { token, setToken } = useContext(tokenContext);
    const navigate = useNavigate();
    const signOut = () => {
        setToken(null);
        localStorage.removeItem("Token");
        navigate("/login");
    }
    return (
        <>
            <nav className=" bg-[#000000] fixed top-0 left-0 right-0 z-10 py-3">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {/* Mobile menu button*/}
                            <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open main menu</span>
                                {/*
                                    Icon when menu is closed.
                                    Menu open: "hidden", Menu closed: "block"*/}
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                                {/*
                            Icon when menu is open.
                            Menu open: "block", Menu closed: "hidden"*/}
                                <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
                            <div >
                                <Link to={"/"} className="flex items-center">
                                    <img className="h-10 w-auto" src={logo} alt="Your Company" />
                                    <p className='text-white font-bold'>Notes Application</p>
                                </Link>
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4 items-center">
                                    {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                                    {token ? <>
                                        <NavLink to={"/"} className={`rounded-md px-3 py-2 text-sm text-gray-300 font-medium`} aria-current="page">Home</NavLink>
                                        <button onClick={signOut} className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Sign Out</button>
                                    </> : <>
                                        <NavLink to={"login"} className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Login</NavLink>
                                        <NavLink to={"register"} className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Register</NavLink>
                                    </>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Mobile menu, show/hide based on menu state. */}
                <div className="sm:hidden" id="mobile-menu">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                        <NavLink to="/login" className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" aria-current="page">Login</NavLink>
                        <NavLink to="/register" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Register</NavLink>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Navbar;

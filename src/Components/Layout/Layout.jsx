import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
const Layout = () => {
    return (
        <>
            <Navbar />
            <section className="relative container mx-auto min-h-dvh mt-[120px] flex items-center justify-center xl:w-[90%] bg-[#171717] rounded">
                <Outlet />
            </section>
            <Footer />
        </>
    )
}

export default Layout;

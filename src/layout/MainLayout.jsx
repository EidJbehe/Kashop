import React from 'react'
import Navbar from './../assets/components/navbar/Navbar';
import Footer from './../assets/components/footer/Footer';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
   <>
   <Navbar/>
   <Outlet/>
   <Footer/>
   </>
  )
}

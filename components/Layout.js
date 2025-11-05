import React from 'react'
import Navbar from './Navbar';
import Footer from './Footer';
import Announcement from './Announcement';



const Layout = ({children}) => {
  return (
    <>  
      <Announcement/>
      <Navbar/>
      {children}
      <Footer/>
    </>
  )
}

export default Layout
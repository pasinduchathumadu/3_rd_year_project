import React from 'react';
import {Link} from "react-router-dom"
import '../components/styles/Navbar.css'
import { ShoppingCart } from '@mui/icons-material'
import { Person } from '@mui/icons-material';
import { VideoCall } from '@mui/icons-material';

const Navbar = ()=> {
  return (
    <div className='navbar navbar-expand-sm bg-dark navbar-dark fixed-top'>
    <div className='navbar'>
        <div className='leftSide'>
        {/* <img src={Logo}/> */}
 </div>
        <div className='rightSide'>
            <Link to="/">Home</Link>
            <Link to ="/menu">Foods</Link>
            <Link to ="/vegitable">Toys</Link>
            <Link to ="/about">about</Link>
            <Link to ="/contact">contact</Link>
            <Link to ='/'><ShoppingCart/></Link>
            <Link to ='/Login'><Person/></Link>
            <Link to ='/VideoBackground'><VideoCall/></Link>

            

        </div>

    </div>
    </div>
  )
}

export default Navbar;
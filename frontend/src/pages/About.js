import React from 'react'
import dragon from "../components/assests/dragon.jpg"
import '../styles/About.css'
import {motion}from 'framer-motion'


function About() {
  return (
    <motion.div className='about'
    initial={{width:0}}
    animate={{width:"100%"}}
    exit={{x: window.innerWidth,transition: { duration:0.1}}}
    
    >
        <div className='aboutTop'
            style={{backgroundImage: `url(${dragon})`}}        
        >
            
        </div>
        <div className='aboutBotom'>
            <h1> ABOUT  <span> US</span> </h1>
            <p>FAGO is an online gas ordering system which connects gas agents of a particular area and customers. 
                It provides a platform for gas agents to manage their business online.
                Customer can Reserve their gas cylinders as well as other gas related appliences throguth this system and get it delivered to their doorsteps.
                So,try it and we're sure you'll love it.
            </p>
        </div>
        
    </motion.div>
  )
}

export default About
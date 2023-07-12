import React from "react";
import "./../styles/Home.css"
import video from "../../components/assests/video"


const Home = () =>{
    return(
        <section className="Home">
         <div className="overlay"></div>
          <video src={video} type="video/mp4"></video>


         </section>
    )
}

export default Home
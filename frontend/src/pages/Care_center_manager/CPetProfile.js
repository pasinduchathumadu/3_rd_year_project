import React from 'react';
import '../../styles/Care_center_manager/CPetProfile.css';
import care from "../../assests/caregiver.jpg";
import doggy from '../../assests/petpro.jpg';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';


function CPetProfile(){
    return(

    <div className='main-pop'>

            {/* pet details */}
        <div className='mycontainer'>

            <div className='leftside'>
                <img className='img-container'src={doggy} alt="doggy" />
            </div>

            <div className='rightside'>
                <form className="regform">
                    <div  className="col1">
                    <div className="col1-md-1">
                        <label for="inputEmail4" className="form1-label">Pet ID</label>
                        <input type="text" className="form1-control" placeholder="001" aria-label="First name"></input>
                    </div>
                    <div className="col1-md-2">
                        <label for="inputEmail4" className="form1-label">Breed</label>
                        <input type="text" className="form1-control" placeholder="Golden Retriever" aria-label="Last name"></input>
                    </div>
                    </div>

                    <div  className="col1">
                    <div className="col1-md-1">
                        <label for="inputEmail4" className="form1-label">Pet name</label>
                        <input type="email" className="form1-control" placeholder="Coby"  id="inputEmail4"></input>
                    </div>
                    <div className="col1-md-2">
                        <label for="inputPassword4" className="form1-label">Age</label>
                        <input type="password" className="form1-control" placeholder="3yrs"  id="inputPassword4"></input>
                    </div>
                    </div>
                </form>
            </div>
        </div>

            {/* ------------owner details------------------------------------------------- */}
        <div className='mycontainer'>
            <div className='leftside'>
                <img className='img-container' src={care} alt="John"/>
            </div>

            <div className='rightside'>
            <DisabledByDefaultIcon className='icon-close' />

                <form className="regform">
                    <div  className="col1">
                    <div className="col1-md-1">
                        <label for="inputEmail4" className="form1-label">Owner ID</label>
                        <input type="text" className="form1-control" placeholder="005" aria-label="First name"></input>
                    </div>
                    <div className="col1-md-2">
                    <label for="inputEmail4" className="form1-label">Owner name</label>
                        <input type="text" className="form1-control" placeholder="John" aria-label="Last name"></input>
                    </div>
                    </div>

                    <div  className="col1">
                    <div className="col1-md-1">
                        <label for="inputEmail4" className="form1-label">Contact Number</label>
                        <input type="email" className="form1-control" placeholder="077-xxxxxxx" id="inputEmail4"></input>
                    </div>
                    <div className="col1-md-2">
                        <label for="inputPassword4" className="form1-label">Address</label>
                        <input type="password" className="form1-control" placeholder="Yakkala,Gampaha" id="inputPassword4"></input>
                    </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

    )
}

export default CPetProfile;
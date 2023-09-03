import React from 'react';
import '../../styles/Care_center_manager/AddPackage.css';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import AddIcon from '@mui/icons-material/Add';


function AddPackage() {
    return (

        <div className="my-container">
            <div className="myformsheet">
                <DisabledByDefaultIcon className='icon-cross' />
                <form className="resform">
                    <label for="text" className="form-label">Package name:</label>
                    <input type="text" className="form-control" placeholder="" aria-label=""></input>

                    <label for="text" className="form-label">Package price:</label>
                    <input type="text" className="form-control" placeholder="" aria-label=""></input>

                    <button className='service-btn'>Add New Service<AddIcon style={{ fontSize: "20px" }} className="icon-plus" /></button>
                    <button type="submit" className="sub-btn">SUBMIT</button>


                </form>

            </div>
        </div>
    )
}
export default AddPackage;
import React from 'react';
import '../../styles/Care_center_manager/EditPackage.css';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


function EditPackage(){
    return(

        <div className="container-package">
        <div className="formsheet">
        <DisabledByDefaultIcon className='icon-cancel' />
        <form className="resform">
        <label for="text" className="form-label">Package name:</label>
        <input type="text" className="form-control" placeholder="BATH" aria-label=""></input>

        <label for="text" className="form-label">Package price:</label>
        <input type="text" className="form-control" placeholder="Rs.3000" aria-label=""></input>

        <label for="text" className="form-label">Service 1:</label>
        <div className='field'><input type="text" className="form-control" placeholder="Deep cleansing shampoo" aria-label=""></input><DeleteForeverIcon className='icon-delete' style={{fontSize:"25px"}}/></div>

        <label for="text" className="form-label">Service 2:</label>
        <div className='field'><input type="text" className="form-control" placeholder="Blow dry" aria-label=""></input><DeleteForeverIcon className='icon-delete' style={{fontSize:"25px"}}/></div>

        <label for="text" className="form-label">Service 3:</label>
        <div className='field'><input type="text" className="form-control" placeholder="Nail trim" aria-label=""></input><DeleteForeverIcon className='icon-delete' style={{fontSize:"25px"}}/></div>

        <label for="text" className="form-label">Service 4:</label>
        <div className='field'><input type="text" className="form-control" placeholder="Ear cleaning" aria-label=""></input><DeleteForeverIcon className='icon-delete' style={{fontSize:"25px"}}/></div>

        <label for="text" className="form-label">Service 5:</label>
        <div className='field'><input type="text" className="form-control" placeholder="15-min brushout" aria-label=""></input><DeleteForeverIcon className='icon-delete' style={{fontSize:"25px"}}/></div>

        <button className='servicebtn'>Add New Service<AddIcon style={{fontSize:"20px"}} className="icon-plus"/></button>

            <div className="submitbtn">
            <button type="submit" className="subbtn">SUBMIT</button>
            </div>

        </form>

        </div>
        </div>
    )
}
export default EditPackage;
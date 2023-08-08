import React from 'react';
import '../../styles/Care_center_manager/EditPackage.css';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


function EditPackage(){
    return(

        <div className="container-package">
        <div className="formsheet">
        <DisabledByDefaultIcon className='icons-cancel' />
        <form className="resform">
        <div className='fieldsn'>
        <label for="text" className="forms-label">Package name:</label>
        <input type="text" className="forms-control" placeholder="BATH" aria-label=""></input>
        <label for="text" className="forms-label1">Package price:</label>
        <input type="text" className="forms-control" placeholder="Rs.3000" aria-label=""></input>
        </div>
        <p className='edit-services'>SERVICES :</p>
        <div className='fieldsn'>
        <label for="text" className="forms-label">Service 1:</label>
        <input type="text" className="forms-control" placeholder="Deep cleansing shampoo" aria-label=""></input><DeleteForeverIcon className='icon-delete' style={{fontSize:"25px"}}/>
        <label for="text" className="forms-label">Service 2:</label>
        <input type="text" className="forms-control" placeholder="Blow dry" aria-label=""></input><DeleteForeverIcon className='icon-delete' style={{fontSize:"25px"}}/>
        </div>

        <div className='fieldsn'>
        <label for="text" className="forms-label">Service 3:</label>
        <input type="text" className="forms-control" placeholder="Nail trim" aria-label=""></input><DeleteForeverIcon className='icon-delete' style={{fontSize:"25px"}}/>
        <label for="text" className="forms-label">Service 4:</label>
        <input type="text" className="forms-control" placeholder="Ear cleaning" aria-label=""></input><DeleteForeverIcon className='icon-delete' style={{fontSize:"25px"}}/>
        </div>

        <div className='fieldsn'>
        <label for="text" className="forms-label">Service 5:</label>
        <input type="text" className="forms-control" placeholder="15-min brushout" aria-label=""></input><DeleteForeverIcon className='icon-delete' style={{fontSize:"25px"}}/>
        </div>

        <button className='servicebtn'>Add New Service<AddIcon style={{fontSize:"20px"}} className="icon-plus"/></button>
        <button type="submit" className="subbtn">SUBMIT</button>

        </form>

        </div>
        </div>
    )
}
export default EditPackage;
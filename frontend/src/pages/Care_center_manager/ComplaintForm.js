import React from 'react';
import '../../styles/Care_center_manager/ComplaintForm.css';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';

function ComplaintForm(){
    return(

        <div className="complaint-container">
        <div className="form-sheet">
        <DisabledByDefaultIcon className='icon-cancel' />
        <form className="resform">
        <label for="text" className="form-label">Enter the response:</label>
        <textarea className='form-text'></textarea>
        <label for="file" className="form-label">Add image(If needed):</label>
        <input type="file" classNam="form-file" id="fileToUpload"></input>

            <div className="submitbtn">
            <button type="submit" className="submbtn">SUBMIT</button>
            </div>

        </form>

        </div>
        </div>
    )
}
export default ComplaintForm;
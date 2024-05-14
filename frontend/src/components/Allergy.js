import React from 'react'

function Allergy({id, title, deleteAllergy}){
    return(
        <span class="badge badge-styling">
            {title}
            
            <button type="button" class="btn-close btn-close-white" aria-label="Close" 
            onClick={() => {deleteAllergy(id)}}
            style={{ width: "0.05em", marginLeft: "5px" }}
            
            ></button>
        </span>
    )
}

export default Allergy;
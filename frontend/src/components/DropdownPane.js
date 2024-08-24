import React from 'react'

function DropdownPane({ prepTimeList, prepTime, updatePrepTime, cuisineList, updateCuisineList, decrServingSize, servingSize, incrServingSize }){

    return (
        <div className='customise-button'>
          <label htmlFor='touch'>
            <p style={{marginBottom: "0px", paddingRight: "10px", color: "#4F4F4F", cursor: "pointer"}}>
              customise
            </p>
          </label>
          <input type='checkbox' id='touch' /> 
    
          <ul className='slide'>
            <hr style={{marginTop: "0px"}}/>
            {/* Preparation time */}
            <div className='row pb-1'>
              <div className='col preference-list-text'>Maximum Preparation Time</div>
    
              <div className='col preference-options'>
                <select name='prep-time' id='prep-time' className="form-select form-select-sm" value={prepTime} onChange={updatePrepTime}>
                  {prepTimeList.map( (prepTime) => (
                            <option value={prepTime.value}>{prepTime.label}</option>
                        ))}
                </select>
              </div>
            </div>

            {/* Cuisine */}
            <div className='row pb-1'>

              <div className='col preference-list-text'>
                <div className="customise_labels">
                  Cuisine
                </div>                
              </div>
    
              <div className='col preference-options'>
                <div className="dropdown">
                    <button className="cuisine_select btn btn-light .btn-sm">Select Cuisine</button>
                    <div className="dropdown-content">
                        {cuisineList.map( (cuisine) => (
                            <label className="cuisine_select">
                              
                              <input type="checkbox" name="cuisines" className="cuisine_select" style={{marginRight: "10px"}}
                                id={cuisine.id} value={cuisine.value} 
                                checked={cuisine.state} onChange={updateCuisineList}/> 
                                
                                {cuisine.name}
                                
                            </label>
                        ))}
                    </div>
                </div>
              </div>
            </div>
    
            
            {/* Number of servings: REMOVED FOR NOW */}

            {/* <div className='row'>
             <div className='col preference-list-text'>
                <div className="customise_labels">
                  Serving Size
                </div>                
              </div>
    
              <div className='col preference-options'>
                <button className='serving-size-box' onClick={decrServingSize}>-</button>
                <span className='serving-size-box'>{servingSize}</span>
                <button className='serving-size-box' onClick={incrServingSize}>+</button>
              </div>
            </div> */}


          </ul>
    
        </div>
      );
}

export default DropdownPane;
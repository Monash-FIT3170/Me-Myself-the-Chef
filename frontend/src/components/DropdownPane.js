import React from 'react'

function DropdownPane({ prepTime, updatePrepTime, cuisineList, updateCuisineList, decrServingSize, servingSize, incrServingSize }){

    return (
        <div className='customise-button'>
          <label htmlFor='touch'>customise</label>
          <input type='checkbox' id='touch' />
    
          <ul className='slide'>
            <div className='row'>
              <div className='col preference-list-text'>Preparation Time</div>
    
              <div className='col preference-options'>
                <select name='prep-time' id='prep-time' value={prepTime} onChange={updatePrepTime}>
                  <option value='5'>5 mins</option>
                  <option value='15'>15 mins</option>
                  <option value='30'>30 mins</option>
                  <option value='60'>1 hr</option>
                  <option value='120'>2 hrs</option>
                  <option value='180'>3 hrs</option>
                </select>
              </div>
            </div>
    
            <div className='row'>
              <div className='col preference-list-text'>Cuisine</div>
    
              <div className='col preference-options'>
                <div className="dropdown">
                    <button>Select Cuisine</button>
                    <div className="dropdown-content">
                        {cuisineList.map( (cuisine) => (
                            <label><input type="checkbox" name="fruits" style={{marginRight: "10px"}}
                                id={cuisine.id} value={cuisine.value} 
                                checked={cuisine.state} onChange={updateCuisineList}/> 
                                {cuisine.name}
                            </label>
                        ))}
                    </div>
                </div>
              </div>
            </div>
    
            
    
            <div className='row'>
              <div className='col preference-list-text'>Serving Size</div>
    
              <div className='col preference-options'>
                <button className='serving-size-box' onClick={decrServingSize}>-</button>
                <span className='serving-size-box'>{servingSize}</span>
                <button className='serving-size-box' onClick={incrServingSize}>+</button>
              </div>
            </div>
          </ul>
    
        </div>
      );
}

export default DropdownPane;
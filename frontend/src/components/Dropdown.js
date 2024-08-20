import React from 'react'
import { useEffect, useState, useContext } from 'react';
import { PreferenceContext } from '../context/PreferenceContext';

function Dropdown({}) {
  const { prepTime, setPrepTime } = useContext(PreferenceContext);
  const { cuisine, setCuisine } = useContext(PreferenceContext);
  const { servingSize, setServingSize } = useContext(PreferenceContext);

  //Prep Time Handlers
  const [tempPrepTime, setTempPrepTime] = useState(() => {
    if (prepTime === undefined) return "180";
    return prepTime;
  });

  useEffect(() => {
    setTempPrepTime(prepTime || "180");
  }, [prepTime]);

  useEffect(() => {
    setPrepTime(tempPrepTime)
  }, [tempPrepTime])

  const updatePrepTime = (event) => {
    setTempPrepTime(event.target.value)    
  }

  //Cuisine List Handlers
  const baseCuisineList = [
    {id: 0, name: "Apple", state: false},
    {id: 1, name: "Orange", state: false},
    {id: 2, name: "Banana", state:false},
    {id: 3, name: "Grape", state: false}
  ]

  const [cuisineList, setCuisineList] = useState(() => {
    if (cuisine === null) return baseCuisineList;
    return cuisine;
  });

  useEffect(() => {
    setCuisineList(cuisine || baseCuisineList);
  }, [cuisine]);

  useEffect(() => {
    setCuisine(cuisineList)
  }, [cuisineList]);

  const updateCuisine = (event) => {
    const id = event.target.id
    let checked = event.target.checked

    const updatedObj = {...cuisineList[id], state: checked}

    setCuisineList(
        cuisineList.map( obj =>
            obj.id === updatedObj.id ? updatedObj : obj
        )
    );
  }

  //Serving Size Handlers
  const [tempServingSize, setTempServingSize] = useState(() => {
    if (servingSize === undefined) return "1";
    return servingSize;
  });

  useEffect(() => {
    setTempServingSize(servingSize || "1");
  }, [servingSize]);

  useEffect(() => {
    setServingSize(tempServingSize)
  }, [tempServingSize]);

  const incrServingSize = () => {
    setTempServingSize(parseInt(tempServingSize) + 1);
  };

  const decrServingSize = () => {
    if (tempServingSize > 1) {
      setTempServingSize(parseInt(tempServingSize) - 1);
    }
  };

  return (
    <div className='customise-button'>
      <label htmlFor='touch'>Customise</label>
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
            <button>Select Fruits</button>
            <div className="dropdown-content">
              <label><input type="checkbox" className="dropdown_left" name="fruits" value="apple"/> Apple</label>
              <label><input type="checkbox" className="dropdown_left" name="fruits" value="orange"/> Orange</label>
              <label><input type="checkbox" className="dropdown_left" name="fruits" value="banana"/> Banana</label>
              <label><input type="checkbox" className="dropdown_left" name="fruits" value="grape"/> Grape</label>
            </div>
          </div>
            {/* <select name='cuisine' id='cuisine'>
              <option value='african'>African</option>
              <option value='asian'>Asian</option>
              <option value='american'>American</option>
              <option value='british'>British</option>
              <option value='cajun'>Cajun</option>
              <option value='caribbean'>Caribbean</option>
              <option value='chinese'>Chinese</option>
              <option value='easterneuropean'>Eastern European</option>
              <option value='european'>European</option>
              <option value='french'>French</option>
              <option value='german'>German</option>
              <option value='greek'>Greek</option>
              <option value='indian'>Indian</option>
              <option value='irish'>Irish</option>
              <option value='italian'>Italian</option>
              <option value='japanese'>Japanese</option>
              <option value='jewish'>Jewish</option>
              <option value='korean'>Korean</option>
              <option value='latinamerican'>Latin American</option>
              <option value='mediterranean'>Mediterranean</option>
              <option value='mexican'>Mexican</option>
              <option value='middleeastern'>Middle Eastern</option>
              <option value='nordic'>Nordic</option>
              <option value='southern'>Southern</option>
              <option value='spanish'>Spanish</option>
              <option value='thai'>Thai</option>
              <option value='vietnamese'>Vietnamese</option>
            </select> */}
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

export default Dropdown;

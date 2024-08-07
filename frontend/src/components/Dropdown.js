import React, { useState } from 'react';

function Dropdown({}) {
  const [display, setDisplay] = useState('none');
  const [servingSize, setServingSize] = useState(1); // Initial serving size

  const handleClick = () => {
    setDisplay(display === 'none' ? 'block' : 'none');
  };

  const increaseServingSize = () => {
    setServingSize(servingSize + 1);
  };

  const decreaseServingSize = () => {
    if (servingSize > 1) {
      setServingSize(servingSize - 1);
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
            <select name='prep-time' id='prep-time'>
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
            <select name='cuisine' id='cuisine'>
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
            </select>
          </div>
        </div>

        <div className='row'>
          <div className='col preference-list-text'>Serving Size</div>

          <div className='col preference-options'>
            <button className='serving-size-box' onClick={decreaseServingSize}>-</button>
            <span className='serving-size-box'>{servingSize}</span>
            <button className='serving-size-box' onClick={increaseServingSize}>+</button>
          </div>
        </div>
      </ul>
    </div>
  );
}

export default Dropdown;

import React from 'react'
import { useEffect, useState, useContext } from 'react';
import DropdownPane from "./DropdownPane"
import { PreferenceContext } from '../context/PreferenceContext';

function Dropdown({}) {
  const { prepTime, setPrepTime } = useContext(PreferenceContext);
  const { cuisine, setCuisine } = useContext(PreferenceContext);
  const { servingSize, setServingSize } = useContext(PreferenceContext);

  //Prep Time Handlers
  const prepTimeList = [
    {id: 0, label: "5 minutes", value: "5"},
    {id: 1, label: "10 minutes", value: "10"},
    {id: 2, label: "30 minutes", value: "30"},
    {id: 3, label: "1 hour", value: "60"},
    {id: 4, label: "2 hours", value: "120"},
    {id: 5, label: "3 hours", value: "180"}
  ]

  const [tempPrepTime, setTempPrepTime] = useState(() => {
    if (prepTime === null) return prepTimeList[prepTimeList.length - 1].value;
    return prepTime;
  });

  useEffect(() => {
    setTempPrepTime(prepTime || prepTimeList[prepTimeList.length - 1].value);
  }, [prepTime]);

  useEffect(() => {
    setPrepTime(tempPrepTime)
  }, [tempPrepTime])

  const updatePrepTime = (event) => {
    setTempPrepTime(event.target.value)    
  }

  //Cuisine List Handlers
  const baseCuisineList = [
    {id: 0, name: "African", value: "african", state: false},
    {id: 1, name: "Asian", value: "asian", state: false},
    {id: 2, name: "American", value: "american", state:false},
    {id: 3, name: "British", value: "british", state: false},
    {id: 4, name: "Cajun", value: "cajun", state: false},
    {id: 5, name: "Caribbean", value: "caribbean", state: false},
    {id: 6, name: "Chinese", value: "chinese", state: false},
    {id: 7, name: "Eastern European", value: "easterneuropean", state: false},
    {id: 8, name: "European", value: "european", state: false},
    {id: 9, name: "French", value: "french", state: false},
    {id: 10, name: "German", value: "german", state: false},
    {id: 11, name: "Greek", value: "greek", state: false},
    {id: 12, name: "Indian", value: "indian", state: false},
    {id: 13, name: "Irish", value: "irish", state: false},
    {id: 14, name: "Italian", value: "italian", state: false},
    {id: 15, name: "Japanese", value: "japanese", state: false},
    {id: 16, name: "Jewish", value: "jewish", state: false},
    {id: 17, name: "Korean", value: "korean", state: false},
    {id: 18, name: "Latin American", value: "latinamerican", state: false},
    {id: 19, name: "Mediterranean", value: "mediterranean", state: false},
    {id: 20, name: "Mexican", value: "mexican", state: false},
    {id: 21, name: "Middle Eastern", value: "middleeastern", state: false},
    {id: 22, name: "Nordic", value: "nordic", state: false},
    {id: 23, name: "Southern", value: "southern", state: false},
    {id: 24, name: "Spanish", value: "spanish", state: false},
    {id: 25, name: "Thai", value: "thai", state: false},
    {id: 26, name: "Vietnamese", value: "vietnamese", state: false}
  ]

  const [cuisineList, setCuisineList] = useState(() => {
    if (cuisine === undefined) return baseCuisineList;
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
      setServingSize(tempServingSize);
  }, [tempServingSize]);

  const incrServingSize = () => {
    setTempServingSize(parseInt(tempServingSize) + 1);
  };

  const decrServingSize = () => {
    if (tempServingSize > 1) {
      setTempServingSize(parseInt(tempServingSize) - 1);
    }
  };

  return(
    <DropdownPane 
      prepTimeList = {prepTimeList}
      prepTime={tempPrepTime}
      updatePrepTime={updatePrepTime}
      cuisineList={cuisineList}
      updateCuisineList={updateCuisine}
      decrServingSize={decrServingSize} 
      servingSize={tempServingSize}
      incrServingSize={incrServingSize} 
    />
  );

}

export default Dropdown;

import React from 'react'
import { useEffect, useState, useContext } from 'react';
import { PreferenceContext } from '../context/PreferenceContext';
import { baseCuisineList } from '../utils/preferenceBaseLists';
import DropdownPane from "./DropdownPane"

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

  const [cuisineList, setCuisineList] = useState(() => {
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

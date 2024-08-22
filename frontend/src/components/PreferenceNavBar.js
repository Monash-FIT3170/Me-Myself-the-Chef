import React from 'react'
import { Link } from 'react-router-dom'
import '../css/preference.css'

function PrefNavBar({ id }){
    const preferenceList = [
        {id: 0, name:"Dietary Requirements", link: "/dietary_requirements"}, 
        {id: 1, name:"Nutritional Requirements", link: "/nutrition_requirements"}, 
        {id: 2, name:"Preparation Time", link: "/preparation_time"}, 
        {id: 3, name:"Recipe Complexity/Cooking Experience", link: ""}
    ]; 

    const colSpan = 12/preferenceList.length

    return (
        <div class="row flex-fill navbar-padding">
            {preferenceList.map((pref) => {
                if (pref.id === id) {
                    return(
                    <Link to={"/preferences" + pref.link} 
                        class={"col-md-" + colSpan + " navbar-text"} 
                        style={{color: "#458D59"}}>

                        <strong>{pref.name}</strong>
                    </Link>
                    )
                }
                return (
                <Link to={"/preferences" + pref.link} 
                    class={"col-md-" + colSpan + " navbar-text"} 
                    style={{opacity: "33%"}}>

                    <p>{pref.name}</p>
                </Link>
                )
            })}

            <hr class="mx-auto" style={{marginTop: "15px", width: "75%"}}></hr>
        </div>
    )
}

export default PrefNavBar
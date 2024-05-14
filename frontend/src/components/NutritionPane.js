import React from "react";

function NutritionPane({ nutrition }) {
   return (
       <div className="row pb-5 flex-fill" style={{ backgroundColor: '#3E6C4B' }}>
           <div className="col-md-12">
               <div className="container-fluid">
                   <div className="row pt-5 text-center">
                       <h2>Nutrition</h2>
                       <div className="horiz_line"></div>
                   </div>

                   <div className="row text-center">
                       <div className="col-md-12">
                           <p>Calories: {nutrition.calories} ({nutrition.percentDailyValue})</p>
                           {/* Include other nutrition information here */}
                       </div>
                   </div>
               </div>
           </div>
       </div>
   );
}

export default NutritionPane;
import React from 'react';


function Ingredient({id, title}) {
    return (
        <div className="row">
            <div className="col text-center">
                <p>{title}</p>
            </div>
        </div>
    );
}

export default Ingredient;

import React from 'react';


function Ingredient({id, name, deleteIngredient}) {
    return (
        <div className="row">
            <div className="col text-center">
                <p>{name}</p>
            </div>
            <div className="col-md-4">
                <input type="image" onClick={() => deleteIngredient(id)} src="/static/images/bin.png" height="24px" alt="button failed to display" />
            </div>
        </div>
    );
}

export default Ingredient;

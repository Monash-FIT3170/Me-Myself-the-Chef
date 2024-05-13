import React from 'react'
import '../css/preference.css'

function PreferenceInformation() {
    return (
        <div class="row">

            {/*<!-- Dietary Requirements column -->*/}
            <div class="col-md-4">
                <div class="row text-left" style={{padding: "50px 0px 20px 50px" }}>
                    <h3> Dietary Requirements </h3>
                </div>
                <div class="container d-flex" style={{ paddingLeft: "60px" }}>
                    <div class="list-group">
                        <label class="list-group-item checkbox-size" style={{ borderColor: "transparent" }}>
                            <input class="form-check-input me-5" type="checkbox" value="" />
                            Vegetarian
                        </label>
                        <label class="list-group-item checkbox-size" style={{ borderColor: "transparent" }}>
                            <input class="form-check-input me-5" type="checkbox" value="" />
                            Vegan
                        </label>
                        <label class="list-group-item checkbox-size" style={{ borderColor: "transparent" }}>
                            <input class="form-check-input me-5" type="checkbox" value="" />
                            Halal
                        </label>
                        <label class="list-group-item checkbox-size" style={{ borderColor: "transparent" }}>
                            <input class="form-check-input me-5" type="checkbox" value="" />
                            Gluten-free
                        </label>
                        <label class="list-group-item checkbox-size" style={{ borderColor: "transparent" }}>
                            <input class="form-check-input me-5" type="checkbox" value="" />
                            Dairy-free
                        </label>
                    </div>
                </div>
            </div>


            {/*<!-- Allergy Consideration column -->*/}
            <div class="col-md-4">
                <div class="row text-center p-5">
                    <h3> Allergy Considerations </h3>
                </div>
                <div class="container">
                    <form class="form-inline">
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Search Allergies" />
                        </div>
                    </form>
                </div>
                <div class="row text-left" style= {{paddingLeft: "25px", paddingTop: "10px" }}>
                    <p>Allergies:</p>
                </div>
                <div class="container px-4">
                    <span class="badge badge-styling">Almond
                        <a><i class="bi bi-x"></i></a>
                    </span>
                    <span class="badge badge-styling">Peanut
                        <a><i class="bi bi-x"></i></a>
                    </span>
                    <span class="badge badge-styling">Egg
                        <a><i class="bi bi-x"></i></a>
                    </span>
                    <span class="badge badge-styling">Avocado
                        <a><i class="bi bi-x"></i></a>
                    </span>
                    <span class="badge badge-styling">Fish
                        <a><i class="bi bi-x"></i></a>
                    </span>
                    <span class="badge badge-styling">Milk
                        <a><i class="bi bi-x"></i></a>
                    </span>
                </div>
            </div>


            {/*<!-- Save Preferences Button Column -->*/}
            <div class="container">
                <button class="save-pref-button">Save Preferences</button>

            </div>
        </div>
    )
}

export default PreferenceInformation
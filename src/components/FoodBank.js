import React from "react";
import "./FoodBank.css";

function FoodBank({ owner, name, location, foodList, quantity}) {

    return (
        <div className="foodbank container">
            <div className="card-group">
                <div className="card border-primary mb-3">
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                            {location}
                        </h6>
                        <p className="card-text">Made By: {owner}</p>
                    </div>
                </div>

                <div className="card border-primary mb-3">
                    <p className="columnTitle">Needed Materials</p>
                    <ul className="list-group list-group-flush">                
                        <div>
                            <li className="list-group-item">
                                {foodList.split(",")[0]}
                            </li>
                            <li className="list-group-item">
                                {foodList.split(",")[1]}
                            </li>
                            <li className="list-group-item">
                                {foodList.split(",")[2]}
                            </li>
                        </div>
                    </ul>
                </div>

                <div className="card border-primary mb-3">
                    <p className="columnTitle">Quantity</p>
                    <ul className="list-group list-group-flush">
                        <div>
                            <li className="list-group-item">
                                {quantity.split(",")[0]}
                            </li>
                            <li className="list-group-item">
                                {quantity.split(",")[1]}
                            </li>
                            <li className="list-group-item">
                                {quantity.split(",")[2]}
                            </li>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default FoodBank;

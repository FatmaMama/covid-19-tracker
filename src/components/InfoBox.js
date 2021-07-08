import React from 'react';
import './InfoBox.css';

export default function InfoBox({title, cases, total, active, isRed, ...props}) {
    return (
       <div className={`card infoBox ${active && "infoBox--selected"} ${active && isRed && "infoBox--red"}`}
       onClick={props.onClick}>
           <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className={`card-text infoBox__cases ${!isRed && "infoBox__cases--green"}`}>{cases}</p>
                <p className="card-text">{total}</p>
            </div>
       </div>
    )
}


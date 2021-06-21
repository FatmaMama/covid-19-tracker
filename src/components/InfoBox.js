import React from 'react'

export default function InfoBox({title, cases, total}) {
    return (
       <div className="card">
           <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{cases}</p>
                <p className="card-text">{total}</p>
            </div>
       </div>
    )
}


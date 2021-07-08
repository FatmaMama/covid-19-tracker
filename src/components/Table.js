import React from 'react';
import numeral from 'numeral';
import './Table.css'

export default function Table({ countries }) {
    return (
        <div className="table__countries">
            <table>
            {countries.map(country => (
                <tr>
                    <td>{country.country}</td>
                    <td><strong>{numeral(country.cases).format('0,0')}</strong></td>
                </tr>
            ))}
            </table>
        </div>
    )
}

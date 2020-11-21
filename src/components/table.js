import React from 'react'
import '../style/table.css'

function Table(props) {
    const employee = props.results.map((emp, i) => {
        return (
            <tr key={i}>
                <th scope="row"><img src={emp.image} alt="employee" /></th>
                <td>{emp.name}</td>
                <td>{emp.dob}</td>
                <td>{emp.phone}</td>
                <td>{emp.email}</td>

            </tr>
        )
    })
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">PICTURE</th>
                    <th scope="col" onClick={() => props.sortBy('name')}>NAME &#8597;</th>
                    <th scope="col" onClick={() => props.sortBy('age')}>BIRTHDAY &#8597;</th>
                    <th scope="col">EMAIL</th>
                    <th scope="col">PHONE NUMBER</th>

                </tr>
            </thead>
            <tbody>
                {employee}
            </tbody>
        </table>
    )
}

export default Table
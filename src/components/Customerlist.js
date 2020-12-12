import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

export default function Customerlist() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
    }

    const columns = [
        {
            Header: 'First name',
            accessor: 'firstname'
        },
        {
            Header: 'Last name',
            accessor: 'lastname'
        },
        {
            Header: 'Street Address',
            accessor: 'streetaddress'
        },
        {
            Header: 'Post code',
            accessor: 'postcode'
        },
        {
            Header: 'City',
            accessor: 'city'
        },
        {
            Header: 'Email',
            accessor: 'email'
        },
        {
            Header: 'Phone',
            accessor: 'phone'
        },
    ]

    return (
        <div>
            <ReactTable filterable={true} data={customers} columns={columns}/>
        </div>
    )
}
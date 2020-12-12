import moment from 'moment';
import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

export default function Trainingslist() {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => fetchTrainingsData(), []);

    const fetchTrainingsData = async () => {
        try {
            const response = await fetch('http://customerrest.herokuapp.com/api/trainings')
            const responseToJSON = await response.json()
    
            const addedCustomer = await Promise.all(responseToJSON.content.map(async (training) => {
                try {
                    
                const customer = await fetch(training.links[2].href)
                const customerToJSON = await customer.json()
    
                return {...training, customer: `${customerToJSON.firstname} ${customerToJSON.lastname}`}
                } catch (error) {
                    console.log(`Error in promise all: ${error.message}`)
                }
            }))
    
            const modifiedDates = addedCustomer.map(training => {
                if (training !== undefined) {
                    return {...training, date: moment(training.date).format('LLL')}
                }
            })
    
            setTrainings(modifiedDates)
        } catch (error) {
            console.log('Error: ', error.message)
        }
    }
    

    const columns = [
        {
            Header: 'Customer ID',
            accessor: 'customer'
        },
        {
            Header: 'Date',
            accessor: 'date',
        },
        {
            Header: 'Duration',
            accessor: 'duration'
        },
        {
            Header: 'Activity',
            accessor: 'activity'
        },
    ]

    return (
        <div>
            <ReactTable filterable={true} data={trainings} columns={columns}/>
        </div>
    )
}
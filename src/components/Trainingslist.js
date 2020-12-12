import moment from 'moment';
import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

export default function Trainingslist() {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => fetchTrainingsData(), []);

    const fetchTrainingsData = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => {
            const modifiedDates = data.content.map(training => {
                return {...training, date: moment(training.date).format('L')}
            })
            setTrainings(modifiedDates)
        })
    }

    const columns = [
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
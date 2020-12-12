import moment from 'moment';
import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';

export default function Trainingslist() {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [link, setLink] = useState('');

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
                    return {...training, customer: ''}
                    console.log(`Error in promise all: ${error.message}`)
                }
            }))
    
            const modifiedDates = addedCustomer.map(training => {
                if (training !== undefined) {
                    return {...training, date: moment(training.date).format('L')}
                }
            })
    
            setTrainings(modifiedDates)
        } catch (error) {
            console.log('Error: ', error.message)
        }
    }
    
    const handleOpen = (link) => {
        console.log(link)
        setLink(link);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const deleteTraining = () => {
        fetch(link, {method: 'DELETE'})
        .then(res => fetchTrainingsData())
        .catch(err => console.error(err))
        setOpen(false);
    }

    const columns = [
        {
            Header: 'Customer',
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
        {
            sortable: false,
            filterable: false,
            width: 100,
            accessor: 'links[1].href',
            Cell: row =>
                <IconButton aria-label="delete" 
                onClick={() => handleOpen(row.value)}>
                    <DeleteIcon fontSize="small" />
                </IconButton>
        }
    ]

    return (
        <div>
            <ReactTable filterable={true} data={trainings} columns={columns}/>
            <Snackbar
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message="Are you sure?"
            action={
            <React.Fragment>
                <Button color="secondary" size="small" onClick={deleteTraining}>
                    Delete
                </Button>
                <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </React.Fragment>
            }
        />
        </div>
    )
}
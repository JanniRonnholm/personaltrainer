import React, { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  Appointments,
  ViewSwitcher,
  Toolbar
} from '@devexpress/dx-react-scheduler-material-ui';
import moment from 'moment';

export default function Calendar() {
    const [schedulerData, setSchedulerData] = React.useState([]);

    const currentDate = Date.now();

    useEffect(() => fetchSchedulerData(), []);
    useEffect(() => console.log(schedulerData), [schedulerData])

    const fetchSchedulerData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => {
            const formattedData = data.map(item => {
                return {
                    title: `${item.activity} / ${item.customer.firstname} ${item.customer.lastname}`,
                    startDate: item.date, 
                    endDate: moment(item.date).add('minutes', item.duration)}
            })
            setSchedulerData(formattedData)
        })
    }

    return(
        <Paper>
            <Scheduler
                data={schedulerData}
            >
            <ViewState
                currentDate={currentDate}
            />
            <WeekView
                startDayHour={6}
                endDayHour={21}
            />
            <DayView />
            <MonthView />
            <Toolbar />
            <ViewSwitcher />
            <Appointments />
            </Scheduler>
        </Paper>
    )
}
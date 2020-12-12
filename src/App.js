import React, { useState } from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Customerlist from './components/Customerlist';
import Trainingslist from './components/Trainingslist';
import Calendar from './components/Calendar';

function App() {
  const [value, setValue] = useState('one');

  const handleChange = (event, value) => {
    setValue(value);
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab value="one" label="Customers"/>
          <Tab value="two" label="Trainings"/>
          <Tab value="three" label="Calendar"/>
        </Tabs>
      </AppBar>
      {value === 'one' && <div><Customerlist /></div>}
      {value === 'two' && <div><Trainingslist /></div>} 
      {value === 'three' && <div><Calendar /> </div>}
    </div>
  );
}

export default App;

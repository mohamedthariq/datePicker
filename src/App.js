import React, { useState } from 'react';
import { DateRangePicker } from './DateRangePicker';
import './App.css';

export default function App() {
  const [selectedRange, setSelectedRange] = useState([]);
  const [weekends, setWeekends] = useState([]);

  const handleDateChange = (dateRange, weekendDates) => {
    setSelectedRange(dateRange);
    setWeekends(weekendDates);
  };
  
  const predefinedRanges = [
    { label: 'Last 7 days', value: 7 },
    { label: 'Last 30 days', value: 30 }
    // predefined ranges as needed
  ];

  return (
    <div>
      <h1>Date Range Picker Demo</h1>
      <DateRangePicker onChange={handleDateChange}  predefinedRanges={predefinedRanges} />
      <div>
        <p>Selected Range: {selectedRange[0]?.toLocaleDateString()} to {selectedRange[1]?.toLocaleDateString()}</p>
        <p>Weekend Dates: {weekends.map(date => date.toLocaleDateString()).join(', ')}</p>
      </div>
    </div>
  );
};

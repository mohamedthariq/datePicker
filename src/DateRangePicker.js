import React, { useState } from 'react';

export const DateRangePicker = ({ onChange, predefinedRanges = [] }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateChange = (event, type) => {
    const { value } = event.target;
    const selectedDate = new Date(value);

    // check selected date is a weekday (Monday = 1, ..., Friday = 5)
    if (selectedDate.getDay() !== 0 && selectedDate.getDay() !== 6) {
      if (type === 'start') {
        setStartDate(selectedDate);
      } else {
        setEndDate(selectedDate);
      }
    }
  };

  const handleSubmit = () => {
    if (startDate && endDate) {
      const dateRange = [startDate, endDate];
      const weekends = getWeekendDates(startDate, endDate);
      onChange(dateRange, weekends);
    }
  };

  const handlePredefinedRangeSelect = (value) => {
    const currentDate = new Date();
    const pastDate = new Date(currentDate);
    pastDate.setDate(currentDate.getDate() - value);

    setStartDate(pastDate);
    setEndDate(currentDate);
  };

  const getWeekendDates = (start, end) => {
    const weekends = [];
    let currentDate = new Date(start);

    while (currentDate <= end) {
      if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
        weekends.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return weekends;
  };

  return (
    <div className="DateRangePicker">
      <label htmlFor="startDate">Start Date:</label>
      <input
        type="date"
        id="startDate"
        value={startDate ? startDate.toISOString().split('T')[0] : ''}
        onChange={(e) => handleDateChange(e, 'start')}
      />
      <label htmlFor="endDate">End Date:</label>
      <input
        type="date"
        id="endDate"
        value={endDate ? endDate.toISOString().split('T')[0] : ''}
        onChange={(e) => handleDateChange(e, 'end')}
      />
      <button onClick={handleSubmit}>Submit</button>
      <div className="predefinedButton">
        {predefinedRanges.map((range, index) => (
          <button key={index} onClick={() => handlePredefinedRangeSelect(range.value)}>
            {range.label}
          </button>
        ))}
      </div>
    </div>
  );
};

import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { CalendarProps } from '../types/types';

export const Calendar: React.FC<CalendarProps> = ({ 
  selectedDate, 
  onDateSelect,
  dayData,
  darkMode
}) => {
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  return (
    <div className="grid grid-cols-7 gap-1">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
        <div key={day} className={`p-2 text-center font-semibold ${
          darkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {day}
        </div>
      ))}
      {days.map(day => {
        const dateStr = format(day, 'yyyy-MM-dd');
        const data = dayData[dateStr];
        return (
          <button
            key={dateStr}
            onClick={() => onDateSelect(dateStr)}
            className={`p-2 rounded-full relative
              ${data?.flow ? darkMode ? 'bg-red-900' : 'bg-red-100' : ''}
              ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}
              ${selectedDate === day ? 'ring-2 ring-blue-500' : ''}`}
          >
            <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
              {format(day, 'd')}
            </span>
            {data?.flow && (
              <span className={`absolute bottom-1 right-1 w-2 h-2 rounded-full ${
                darkMode ? 'bg-red-500' : 'bg-red-500'
              }`} />
            )}
          </button>
        );
      })}
    </div>
  );
};
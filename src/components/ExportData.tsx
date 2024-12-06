import React from 'react';
import { BaseComponentProps, CycleData, ExportDataProps } from '../types/types';
import { format } from 'date-fns';


export const ExportData: React.FC<ExportDataProps> = ({ cycles, darkMode }) => {
  const exportToJson = () => {
    const dataStr = JSON.stringify(cycles, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cycle-data-${format(new Date(), 'yyyy-MM-dd')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportToCsv = () => {
    const headers = ['Date', 'Flow', 'Mood', 'Symptoms', 'Notes'];
    const rows = cycles.flatMap(cycle => 
      cycle.days.map(day => [
        day.date,
        day.flow || '',
        (day.mood || []).join(', '),
        (day.symptoms || []).join(', '),
        day.notes || ''
      ])
    );
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cycle-data-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow`}>
      <h3 className="font-semibold mb-4">Export Data</h3>
      <div className="flex gap-4">
        <button
          onClick={exportToJson}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Export as JSON
        </button>
        <button
          onClick={exportToCsv}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Export as CSV
        </button>
      </div>
    </div>
  );
};
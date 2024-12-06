import React from 'react';
import { BaseComponentProps, CycleData, CycleInsightsProps, SymptomType } from '../types/types';
import { format, differenceInDays } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';


export const CycleInsights: React.FC<CycleInsightsProps> = ({ cycles, darkMode }) => {
    const cycleLengths = cycles.map((cycle, index) => ({
    cycleNumber: index + 1,
    length: differenceInDays(
      new Date(cycle.endDate || cycle.startDate),
      new Date(cycle.startDate)
    )
  }));

  const symptomFrequency: Record<SymptomType, number> = cycles.reduce((acc, cycle) => {
    cycle.days.forEach(day => {
      day.symptoms?.forEach(symptom => {
        acc[symptom] = (acc[symptom] || 0) + 1;
      });
    });
    return acc;
  }, {} as Record<SymptomType, number>);

  return (
    <div className="space-y-6">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow`}>
        <h3 className="font-semibold mb-4">Cycle Length Trends</h3>
        <div className="h-64">
          <LineChart data={cycleLengths} width={500} height={250} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="length" stroke={darkMode ? '#8884d8' : '#6366f1'} />
            <CartesianGrid stroke={darkMode ? '#374151' : '#ccc'} strokeDasharray="5 5" />
            <XAxis dataKey="cycleNumber" stroke={darkMode ? '#9CA3AF' : '#4B5563'} />
            <YAxis stroke={darkMode ? '#9CA3AF' : '#4B5563'} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
                border: darkMode ? '1px solid #374151' : '1px solid #E5E7EB',
                color: darkMode ? '#FFFFFF' : '#000000'
              }}
            />
          </LineChart>
        </div>
      </div>

      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow`}>
        <h3 className="font-semibold mb-4">Symptom Frequency</h3>
        <div className="space-y-2">
          {Object.entries(symptomFrequency)
            .sort(([, a], [, b]) => b - a)
            .map(([symptom, count]) => (
              <div key={symptom} className="flex justify-between items-center">
                <span className="capitalize">{symptom}</span>
                <div className={`w-48 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-4`}>
                  <div
                    className="bg-purple-500 rounded-full h-4"
                    style={{
                      width: `${(count / cycles.length) * 100}%`
                    }}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
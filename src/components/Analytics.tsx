import React from 'react';
import { AnalyticsProps } from '../types/types';
import { differenceInDays } from 'date-fns';


export const Analytics: React.FC<AnalyticsProps> = ({ cycles, darkMode }) => {
  const calculateAverageCycleLength = () => {
    if (cycles.length < 2) return 0;
    
    const lengths = cycles.slice(0, -1).map(cycle => {
      return differenceInDays(
        new Date(cycle.endDate || cycle.startDate),
        new Date(cycle.startDate)
      );
    });

    return Math.round(lengths.reduce((sum, len) => sum + len, 0) / lengths.length);
  };

  const calculateCommonSymptoms = () => {
    const symptomCounts: Record<string, number> = {};
    cycles.forEach(cycle => {
      cycle.days.forEach(day => {
        day.symptoms?.forEach(symptom => {
          symptomCounts[symptom] = (symptomCounts[symptom] || 0) + 1;
        });
      });
    });

    return Object.entries(symptomCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([symptom]) => symptom);
  };

  return (
    <div className="space-y-4">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow`}>
        <h3 className="font-semibold mb-2">Cycle Statistics</h3>
        <p>Average cycle length: {calculateAverageCycleLength()} days</p>
        <p>Tracked cycles: {cycles.length}</p>
      </div>

      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow`}>
        <h3 className="font-semibold mb-2">Most Common Symptoms</h3>
        <ul>
          {calculateCommonSymptoms().map(symptom => (
            <li key={symptom} className="capitalize">{symptom}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
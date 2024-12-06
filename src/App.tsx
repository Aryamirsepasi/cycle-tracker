// src/App.tsx
import React, { useState, useEffect } from 'react';
import { Calendar } from './components/Calendar';
import { DayEditor } from './components/DayEditor';
import { Analytics } from './components/Analytics';
import { CycleInsights } from './components/CycleInsights';
import { Reminders } from './components/Reminders';
import { ExportData } from './components/ExportData';
import { useCycleData } from './hooks/useCycleData';
import { format } from 'date-fns';
import { Moon, Sun } from 'lucide-react';

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [activeTab, setActiveTab] = useState<'tracker' | 'insights' | 'settings'>('tracker');
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true' ||
        window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const { cycles, updateDayData, predictNextPeriod } = useCycleData();

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const dateStr = format(selectedDate, 'yyyy-MM-dd');
  const dayData = cycles.reduce((acc, cycle) => {
    cycle.days.forEach(day => {
      acc[day.date] = day;
    });
    return acc;
  }, {} as Record<string, any>);

  const currentDayData = dayData[dateStr] || { date: dateStr };
  const predictedDate = predictNextPeriod();

  return (
    <div className={`min-h-screen transition-colors duration-200 
      ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Cycle Tracker</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg ${
                darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            {(['tracker', 'insights', 'settings'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === tab
                    ? 'bg-blue-500 text-white'
                    : darkMode 
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'tracker' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <div className={`p-6 rounded-lg shadow ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}>
                <Calendar
                  selectedDate={selectedDate}
                  onDateSelect={date => setSelectedDate(new Date(date))}
                  dayData={dayData}
                  darkMode={darkMode}
                />
              </div>

              {predictedDate && (
                <div className={`p-4 rounded-lg shadow ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                }`}>
                  <h3 className="font-semibold">Next Period Prediction</h3>
                  <p>Expected start date: {format(new Date(predictedDate), 'MMM d, yyyy')}</p>
                </div>
              )}

              <Reminders darkMode={darkMode} />
            </div>

            <div className="space-y-8">
              <div className={`p-6 rounded-lg shadow ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}>
                <h2 className="text-xl font-semibold mb-4">
                  {format(selectedDate, 'MMMM d, yyyy')}
                </h2>
                <DayEditor
                  date={dateStr}
                  data={currentDayData}
                  onUpdate={data => updateDayData(dateStr, data)}
                  darkMode={darkMode}
                />
              </div>

              <Analytics cycles={cycles} darkMode={darkMode} />
            </div>
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="space-y-8">
            <CycleInsights cycles={cycles} darkMode={darkMode} />
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-8">
            <ExportData cycles={cycles} darkMode={darkMode} />
            <div className={`p-4 rounded-lg shadow ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <p className="text-center text-sm">
                Created by{' '}
                <a 
                  href="https://aryamirsepasi.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Arya Mirsepasi
                </a>
                <br />
                © {new Date().getFullYear()} All rights reserved.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
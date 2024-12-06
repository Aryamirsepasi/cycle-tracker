import React, { useState } from 'react';
import { format, addDays } from 'date-fns';
import { BaseComponentProps, RemindersProps } from '../types/types';

interface Reminder extends BaseComponentProps {
  id: string;
  date: string;
  text: string;
}

export const Reminders: React.FC<RemindersProps> = ({ darkMode }) => {
    const [reminders, setReminders] = useState<Reminder[]>(() => {
    const saved = localStorage.getItem('reminders');
    return saved ? JSON.parse(saved) : [];
  });
  const [newReminder, setNewReminder] = useState({ date: '', text: '' });

  const addReminder = () => {
    if (!newReminder.date || !newReminder.text) return;
    
    const reminder: Reminder = {
        id: Date.now().toString(),
        ...newReminder,
        darkMode: false
    };
    
    setReminders(prev => {
      const updated = [...prev, reminder];
      localStorage.setItem('reminders', JSON.stringify(updated));
      return updated;
    });
    
    setNewReminder({ date: '', text: '' });
  };

  const deleteReminder = (id: string) => {
    setReminders(prev => {
      const updated = prev.filter(r => r.id !== id);
      localStorage.setItem('reminders', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow`}>
      <h3 className="font-semibold mb-4">Reminders</h3>
      
      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            type="date"
            value={newReminder.date}
            onChange={e => setNewReminder(prev => ({ ...prev, date: e.target.value }))}
            className={`border rounded px-2 py-1 ${
              darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
            }`}
          />
          <input
            type="text"
            value={newReminder.text}
            onChange={e => setNewReminder(prev => ({ ...prev, text: e.target.value }))}
            placeholder="Reminder text"
            className={`border rounded px-2 py-1 flex-1 ${
              darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
            }`}
          />
          <button
            onClick={addReminder}
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        <div className="space-y-2">
          {reminders
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .map(reminder => (
              <div key={reminder.id} className={`flex justify-between items-center p-2 rounded ${
                darkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <div>
                  <div className="font-medium">{format(new Date(reminder.date), 'MMM d, yyyy')}</div>
                  <div>{reminder.text}</div>
                </div>
                <button
                  onClick={() => deleteReminder(reminder.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
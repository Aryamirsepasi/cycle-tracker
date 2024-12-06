import React from 'react';
import { BaseComponentProps, DayData, DayEditorProps, FlowIntensity, MoodType, SymptomType } from '../types/types';


export const DayEditor: React.FC<DayEditorProps> = ({ date, data, onUpdate, darkMode }) => {
  const flowOptions: FlowIntensity[] = ['light', 'medium', 'heavy', 'spotting'];
  const moodOptions: MoodType[] = [
    'happy', 'sad', 'anxious', 'neutral', 'irritable', 'energetic', 'tired'
  ];
  const symptomOptions: SymptomType[] = [
    'cramps', 'headache', 'bloating', 'breast tenderness', 
    'acne', 'backache', 'nausea', 'fatigue'
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold mb-2">Flow</h3>
        <div className="flex gap-2">
          {flowOptions.map(flow => (
            <button
              key={flow}
              onClick={() => onUpdate({ flow })}
              className={`px-3 py-1 rounded-full ${
                data.flow === flow 
                  ? 'bg-red-500 text-white' 
                  : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100'
              }`}
            >
              {flow}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Mood</h3>
        <div className="flex flex-wrap gap-2">
          {moodOptions.map(mood => (
            <button
              key={mood}
              onClick={() => {
                const newMoods = data.mood?.includes(mood)
                  ? data.mood.filter(m => m !== mood)
                  : [...(data.mood || []), mood];
                onUpdate({ mood: newMoods });
              }}
              className={`px-3 py-1 rounded-full ${
                data.mood?.includes(mood)
                  ? 'bg-blue-500 text-white'
                  : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100'
              }`}
            >
              {mood}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Symptoms</h3>
        <div className="flex flex-wrap gap-2">
          {symptomOptions.map(symptom => (
            <button
              key={symptom}
              onClick={() => {
                const newSymptoms = data.symptoms?.includes(symptom)
                  ? data.symptoms.filter(s => s !== symptom)
                  : [...(data.symptoms || []), symptom];
                onUpdate({ symptoms: newSymptoms });
              }}
              className={`px-3 py-1 rounded-full ${
                data.symptoms?.includes(symptom)
                  ? 'bg-purple-500 text-white'
                  : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100'
              }`}
            >
              {symptom}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Notes</h3>
        <textarea
          value={data.notes || ''}
          onChange={e => onUpdate({ notes: e.target.value })}
          className={`w-full p-2 border rounded-md ${
            darkMode 
              ? 'bg-gray-700 border-gray-600 text-white' 
              : 'bg-white border-gray-300'
          }`}
          rows={4}
        />
      </div>
    </div>
  );
};

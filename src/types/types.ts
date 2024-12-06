// src/types/types.ts
export type FlowIntensity = 'light' | 'medium' | 'heavy' | 'spotting';

export type MoodType = 'happy' | 'sad' | 'anxious' | 'neutral' | 'irritable' | 'energetic' | 'tired';

export type SymptomType = 
  | 'cramps' 
  | 'headache' 
  | 'bloating' 
  | 'breast tenderness' 
  | 'acne' 
  | 'backache' 
  | 'nausea'
  | 'fatigue';

export interface DayData {
  date: string;
  flow?: FlowIntensity;
  mood?: MoodType[];
  symptoms?: SymptomType[];
  notes?: string;
}

export interface CycleData {
  cycleId: string;
  startDate: string;
  endDate?: string;
  days: DayData[];
}

export interface BaseComponentProps {
  darkMode: boolean;
}

// src/components/Calendar.tsx
export interface CalendarProps extends BaseComponentProps {
  selectedDate: Date;
  onDateSelect: (date: string) => void;
  dayData: Record<string, DayData>;
}

// src/components/Analytics.tsx
export interface AnalyticsProps extends BaseComponentProps {
  cycles: CycleData[];
}

// src/components/CycleInsights.tsx
export interface CycleInsightsProps extends BaseComponentProps {
  cycles: CycleData[];
}

// src/components/DayEditor.tsx
export interface DayEditorProps extends BaseComponentProps {
  date: string;
  data: DayData;
  onUpdate: (data: Partial<DayData>) => void;
}

// src/components/ExportData.tsx
export interface ExportDataProps extends BaseComponentProps {
  cycles: CycleData[];
}

// src/components/Reminders.tsx
export interface RemindersProps extends BaseComponentProps {}
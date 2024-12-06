import { useState, useEffect } from 'react';
import { CycleData, DayData } from '../types/types';
import { format, addDays, differenceInDays } from 'date-fns';

export const useCycleData = () => {
  const [cycles, setCycles] = useState<CycleData[]>(() => {
    const savedData = localStorage.getItem('cycleData');
    return savedData ? JSON.parse(savedData) : [];
  });

  useEffect(() => {
    localStorage.setItem('cycleData', JSON.stringify(cycles));
  }, [cycles]);

  const addCycle = (startDate: string) => {
    const newCycle: CycleData = {
      cycleId: Date.now().toString(),
      startDate,
      days: []
    };
    setCycles([...cycles, newCycle]);
  };

  const updateDayData = (date: string, data: Partial<DayData>) => {
    setCycles(prevCycles => {
      const updatedCycles = [...prevCycles];
      const cycleIndex = updatedCycles.findIndex(cycle => {
        if (!cycle.endDate) return true;
        const daysDiff = differenceInDays(new Date(date), new Date(cycle.startDate));
        return daysDiff >= 0 && daysDiff <= 35;
      });

      if (cycleIndex === -1) {
        addCycle(date);
        return updatedCycles;
      }

      const dayIndex = updatedCycles[cycleIndex].days.findIndex(
        day => day.date === date
      );

      if (dayIndex === -1) {
        updatedCycles[cycleIndex].days.push({ date, ...data });
      } else {
        updatedCycles[cycleIndex].days[dayIndex] = {
          ...updatedCycles[cycleIndex].days[dayIndex],
          ...data
        };
      }

      return updatedCycles;
    });
  };

  const predictNextPeriod = () => {
    if (cycles.length < 2) return null;
    
    const lastCycle = cycles[cycles.length - 1];
    const avgCycleLength = cycles.reduce((sum, cycle, index) => {
      if (index === cycles.length - 1) return sum;
      const cycleLength = differenceInDays(
        new Date(cycle.endDate || cycle.startDate),
        new Date(cycle.startDate)
      );
      return sum + cycleLength;
    }, 0) / (cycles.length - 1);

    const lastStartDate = new Date(lastCycle.startDate);
    return format(addDays(lastStartDate, Math.round(avgCycleLength)), 'yyyy-MM-dd');
  };

  return {
    cycles,
    addCycle,
    updateDayData,
    predictNextPeriod
  };
};

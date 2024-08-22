import { useState } from 'react';
import { HistoryItem } from '@history/models';

const useRequestHistory = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const addHistory = (item: Omit<HistoryItem, 'sendTime'>) => {
    setHistory([
      ...history,
      {
        ...item,
        sendTime: Date.now(),
      },
    ]);
  };

  return {
    history,
    addHistory,
  };
};

export default useRequestHistory;

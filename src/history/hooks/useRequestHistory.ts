import { useEffect, useState } from 'react';
import { HistoryItem } from '@history/models';
import { app } from '@shared/configs';

function getHistory(): HistoryItem[] {
  'use client';

  const history = localStorage.getItem(app.HISTORY_KEY);
  let parsedHistory: HistoryItem[];

  try {
    parsedHistory = JSON.parse(history || '[]');
  } catch (e) {
    localStorage.removeItem(app.HISTORY_KEY);
    parsedHistory = [];
  }

  if (!Array.isArray(parsedHistory)) {
    localStorage.removeItem(app.HISTORY_KEY);
    parsedHistory = [];
  }

  return parsedHistory;
}

const useRequestHistory = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setHistory(getHistory());
    setIsLoading(false);
  }, []);

  const addHistory = (item: Omit<HistoryItem, 'sendTime'>) => {
    const newHistory = [
      ...history,
      {
        ...item,
        sendTime: Date.now(),
      },
    ];

    localStorage.setItem(app.HISTORY_KEY, JSON.stringify(newHistory));

    setHistory(getHistory());
  };

  return {
    isLoading,
    history,
    addHistory,
  };
};

export default useRequestHistory;

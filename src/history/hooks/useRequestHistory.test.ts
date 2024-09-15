import { renderHook, act } from '@testing-library/react';
import { app } from '@shared/configs';
import { HistoryItem } from '@history/models';
import useRequestHistory from './useRequestHistory';

describe('useRequestHistory', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should add a new history item', () => {
    const { result } = renderHook(() => useRequestHistory());

    const newItem: HistoryItem = {
      baseUrl: 'http://localhost',
      method: 'GET',
      sendTime: Date.now(),
      url: 'http://localhost',
    };

    act(() => {
      result.current.addHistory(newItem);
    });

    expect(result.current.history.length).toBe(1);
    expect(result.current.history[0]).toMatchObject(newItem);
    expect(result.current.history[0].sendTime).toBeDefined();
  });

  it('should handle invalid JSON in localStorage', () => {
    localStorage.setItem(app.HISTORY_KEY, 'invalid JSON');

    const { result } = renderHook(() => useRequestHistory());

    expect(result.current.history).toEqual([]);
  });

  it('should handle non-array JSON in localStorage', () => {
    localStorage.setItem(app.HISTORY_KEY, JSON.stringify({}));

    const { result } = renderHook(() => useRequestHistory());

    expect(result.current.history).toEqual([]);
  });
});

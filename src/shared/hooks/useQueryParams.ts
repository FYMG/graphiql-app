import { useState } from 'react';

type KeyValue = {
  key: string;
  value: string;
};

const useQueryParams = () => {
  const [queryParams, setQueryParams] = useState<KeyValue[]>([]);

  const addItem = (key: string, value: string) => {
    const existingItem = queryParams.find((item) => item.key === key);

    if (existingItem) {
      existingItem.value = value;
    } else {
      queryParams.push({ key, value });
    }

    setQueryParams([...queryParams]);
  };

  const removeItem = (key: string) => {
    setQueryParams(queryParams.filter((item) => item.key !== key));
  };

  const changeItemKey = (oldKey: string, newKey: string) => {
    setQueryParams(
      queryParams.map((item) => (item.key === oldKey ? { ...item, key: newKey } : item))
    );
  };

  return {
    queryParams,
    addItem,
    removeItem,
    changeItemKey,
  };
};

export default useQueryParams;

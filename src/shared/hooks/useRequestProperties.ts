import { useState } from 'react';

export type KeyValue = {
  key: string;
  value: string;
};

const useRequestProperties = () => {
  const [properties, setQueryParams] = useState<KeyValue[]>([]);

  const addItem = (key: string, value: string) => {
    const existingItem = properties.find((item) => item.key === key);

    if (existingItem) {
      existingItem.value = value;
    } else {
      properties.push({ key, value });
    }

    setQueryParams([...properties]);
  };

  const removeItem = (key: string) => {
    setQueryParams(properties.filter((item) => item.key !== key));
  };

  const changeItemKey = (oldKey: string, newKey: string) => {
    setQueryParams(
      properties.map((item) => (item.key === oldKey ? { ...item, key: newKey } : item))
    );
  };

  return {
    properties,
    addItem,
    removeItem,
    changeItemKey,
  };
};

export default useRequestProperties;

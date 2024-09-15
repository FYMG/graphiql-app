import { useState } from 'react';

export type KeyValue = {
  key: string;
  value: string;
};

function convertToMap(items: KeyValue[]): Map<string, KeyValue> {
  return new Map(items.map((item, index) => [String(index), item]));
}

const useRequestProperties = (initialValues: KeyValue[]) => {
  const [properties, setQueryParams] = useState<Map<string, KeyValue>>(
    convertToMap(initialValues)
  );

  const addItem = (key: string, value: string) => {
    const existingItem = Array.from(properties.values()).find((item) => item.key === key);

    if (existingItem) {
      existingItem.value = value;
    } else {
      properties.set(String(properties.size), { key, value });
    }

    setQueryParams(new Map(properties));
  };

  const removeItem = (key: string) => {
    setQueryParams(
      new Map(Array.from(properties.entries()).filter((item) => item[1].key !== key))
    );
  };

  const changeItemKey = (oldKey: string, newKey: string) => {
    const existingItem = Array.from(properties.values()).find(
      (item) => item.key === oldKey
    );

    if (existingItem) {
      existingItem.key = newKey;
    }

    setQueryParams(new Map(properties));
  };

  return {
    properties,
    addItem,
    removeItem,
    changeItemKey,
  };
};

export default useRequestProperties;

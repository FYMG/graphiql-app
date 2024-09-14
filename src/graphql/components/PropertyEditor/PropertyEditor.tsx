import React, { useEffect, useId, useState } from 'react';
import useRequestProperties, { KeyValue } from '@shared/hooks/useRequestProperties';
import { DropDownBtn } from '@rest/views/components/DropDownBtn';
import { Input } from '@shared/shadcn/ui/input';
import { Button } from '@shared/shadcn/ui/button';

interface PropertyEditorProps {
  items: KeyValue[];
  onPropertyChange: (properties: KeyValue[]) => void;
  title: string;
}

function PropertyEditor({ title, onPropertyChange, items }: PropertyEditorProps) {
  const [isHidden, setIsHidden] = useState(false);
  const { properties, addItem, removeItem, changeItemKey } = useRequestProperties(items);

  useEffect(() => {
    onPropertyChange(properties);
  }, [properties, onPropertyChange]);

  const blockId = useId();

  const onAddClick = () => {
    addItem('', '');
    setIsHidden(false);
  };

  const onKeyChanged = (oldKey: string, newKey: string) => changeItemKey(oldKey, newKey);
  const onValueChanged = (key: string, value: string) => addItem(key, value);
  const onItemRemoved = (key: string) => removeItem(key);
  const hideParams = () => setIsHidden(!isHidden);

  return (
    <div className="mb-2 px-1">
      <div className="flex justify-between">
        <h3 className="font-semibold">{title}</h3>
        {properties.length ? (
          <DropDownBtn
            isHidden={isHidden}
            onClick={hideParams}
            text={title.toLowerCase()}
          />
        ) : null}
      </div>
      {!isHidden &&
        properties.map((item) => (
          <div
            key={blockId}
            className="flex justify-between gap-2 rounded-md border border-gray-300 px-1 py-1"
          >
            <Input
              type="text"
              placeholder="key"
              value={item.key}
              onChange={(e) => onKeyChanged(item.key, e.target.value)}
            />
            <Input
              type="text"
              placeholder="value"
              value={item.value}
              onChange={(e) => onValueChanged(item.key, e.target.value)}
            />
            <Button variant="default" onClick={() => onItemRemoved(item.key)}>
              Remove
            </Button>
          </div>
        ))}

      <Button
        variant="link"
        onClick={onAddClick}
        className="m-0 h-auto p-0 text-sm text-blue-400 transition delay-150 hover:text-blue-700 hover:no-underline"
      >
        Add {title}
      </Button>
    </div>
  );
}

export default PropertyEditor;

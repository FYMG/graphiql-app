import React, { useState } from 'react';
import useQueryParams from '@shared/hooks/useQueryParams';
import { DropDownBtn } from '@rest/views/components/DropDownBtn';
import { Input } from '@shared/shadcn/ui/input';
import { Button } from '@shared/shadcn/ui/button';

interface PropertyEditorProps {
  title: string;
}

function PropertyEditor({ title }: PropertyEditorProps) {
  const [isHidden, setIsHidden] = useState(false);
  const { queryParams, addItem, removeItem, changeItemKey } = useQueryParams();

  const onAddClick = () => {
    addItem('', '');
    setIsHidden(false);
  };

  const onKeyChanged = (oldKey: string, newKey: string) => {
    changeItemKey(oldKey, newKey);
  };

  const onValueChanged = (key: string, value: string) => {
    addItem(key, value);
  };

  const onItemRemoved = (key: string) => {
    removeItem(key);
  };

  const hideParams = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div className="mb-2 px-1">
      <div className="flex justify-between">
        <h3 className="font-semibold">{title}</h3>
        {queryParams.length ? (
          <DropDownBtn
            isHidden={isHidden}
            onClick={hideParams}
            text={title.toLowerCase()}
          />
        ) : null}
      </div>
      {!isHidden &&
        queryParams.map((item) => (
          <div
            key={item.key}
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

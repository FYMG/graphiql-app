import React, { useEffect, useState } from 'react';
import useRequestProperties, { KeyValue } from '@shared/hooks/useRequestProperties';
import { DropDownBtn } from '@rest/views/components/DropDownBtn';
import { Input } from '@shared/shadcn/ui/input';
import { Button } from '@shared/shadcn/ui/button';
import { useTranslations } from 'next-intl';

interface PropertyEditorProps {
  items: KeyValue[];
  onPropertyChange: (properties: KeyValue[]) => void;
  title: string;
}

function PropertyEditor({ title, onPropertyChange, items }: PropertyEditorProps) {
  const t = useTranslations('rest');
  const [isHidden, setIsHidden] = useState(false);
  const { properties, addItem, removeItem, changeItemKey } = useRequestProperties(items);

  useEffect(() => {
    onPropertyChange(Array.from(properties.values()));
  }, [properties, onPropertyChange]);

  const onAddClick = () => {
    addItem('', '');
    setIsHidden(false);
  };

  const onKeyChanged = (oldKey: string, newKey: string) => changeItemKey(oldKey, newKey);
  const onValueChanged = (key: string, value: string) => addItem(key, value);
  const onItemRemoved = (key: string) => removeItem(key);
  const hideParams = () => setIsHidden(!isHidden);

  return (
    <>
      <div className="flex justify-between">
        <h3 className="font-semibold">
          {t(title).charAt(0).toUpperCase() + t(title).slice(1)}
        </h3>
        {properties.size ? (
          <DropDownBtn
            isHidden={isHidden}
            onClick={hideParams}
            text={t(title).toLowerCase()}
          />
        ) : null}
      </div>
      {!isHidden &&
        Array.from(properties.entries()).map((item) => (
          <div
            key={item[0]}
            className="flex justify-between gap-2 rounded-md border border-gray-300 px-1 py-1"
          >
            <Input
              type="text"
              placeholder="key"
              value={item[1].key}
              onChange={(e) => onKeyChanged(item[1].key, e.target.value)}
            />
            <Input
              type="text"
              placeholder="value"
              value={item[1].value}
              onChange={(e) => onValueChanged(item[1].key, e.target.value)}
            />
            <Button variant="default" onClick={() => onItemRemoved(item[1].key)}>
              {t('remove')}
            </Button>
          </div>
        ))}

      <Button
        variant="link"
        onClick={onAddClick}
        className="m-0 h-auto p-0 text-sm text-blue-400 transition delay-150 hover:text-blue-700 hover:no-underline"
      >
        {t('add')}
      </Button>
    </>
  );
}

export default PropertyEditor;
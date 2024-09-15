import React, { useEffect, useState } from 'react';
import useRequestProperties, { KeyValue } from '@shared/hooks/useRequestProperties';
import { DropDownBtn } from '@rest/views/components/DropDownBtn';
import { Input } from '@shared/shadcn/ui/input';
import { Button } from '@shared/shadcn/ui/button';
import { useTranslations } from 'next-intl';

interface PropertyEditorProps {
  items: KeyValue[];
  onPropertyChange: (properties: KeyValue[]) => void;
  placeholders: KeyValue;
  title: string;
}

function PropertyEditor({
  title,
  onPropertyChange,
  items,
  placeholders,
}: PropertyEditorProps) {
  const t = useTranslations('rest');
  const [isHidden, setIsHidden] = useState(false);
  const { properties, addItem, removeItem, changeItemKey, changeItemValue } =
    useRequestProperties(items);

  useEffect(() => {
    onPropertyChange(Array.from(properties.values()));
  }, [properties, onPropertyChange]);

  const onAddClick = () => {
    addItem('', '');
    setIsHidden(false);
  };

  const onKeyChanged = (index: string, value: string) => changeItemKey(index, value);
  const onValueChanged = (index: string, value: string) => changeItemValue(index, value);
  const onItemRemoved = (index: string) => removeItem(index);
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
              placeholder={t(placeholders.key)}
              value={item[1].key}
              onChange={(e) => onKeyChanged(item[0], e.target.value)}
            />
            <Input
              type="text"
              placeholder={t(placeholders.value)}
              value={item[1].value}
              onChange={(e) => onValueChanged(item[0], e.target.value)}
            />
            <Button variant="default" onClick={() => onItemRemoved(item[0])}>
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

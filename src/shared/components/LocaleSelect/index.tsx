import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@shared/shadcn/ui/dropdown-menu';
import { Button } from '@shared/shadcn/ui/button';
import useLanguageSwitcher from '../../hooks/useLanguageSwitcher';

function LocaleDropDown() {
  const t = useTranslations('shared');
  const { currentLocale, changeLanguage, localesList } = useLanguageSwitcher();
  const [value, setValue] = useState(currentLocale);

  const changeLang = (data: typeof value) => {
    changeLanguage(data);
    setValue(data);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <span>{t(currentLocale)}</span>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => changeLang(localesList[0])}
        >
          {t(localesList[0])}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => changeLang(localesList[1])}
        >
          {t(localesList[1])}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LocaleDropDown;

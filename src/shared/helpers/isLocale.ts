import { app } from '@shared/configs';

function isLocale(value: string | undefined) {
  if (value === undefined) return false;

  return app.locale.includes(value as (typeof app.locale)[number]);
}

export default isLocale;

import { useMemo } from 'react';

export const useFormatCurrency = (
  amount: number,
  currency: string = 'ZAR',
  locale: string = 'en-ZA'
) =>
  useMemo(() => {
    // Return empty string or some default/error indicator
    if (isNaN(amount)) return '';
    return amount.toLocaleString(locale, {
      style: 'currency',
      currency,
    });
  }, [amount, currency, locale]);

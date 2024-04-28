// import { useMemo } from 'react';

// export const useFormatCurrency = (
//   amount: number,
//   currency: string = 'ZAR',
//   locale: string = 'en-US'
// ) =>
//   useMemo(() => {
//     // Return empty string or some default/error indicator
//     if (isNaN(amount)) return '';
//     return amount.toLocaleString(locale, {
//       style: 'currency',
//       currency,
//     });
//   }, [amount, currency, locale]);

import { useMemo } from 'react';

export const useFormatCurrency = (
  amount: number,
  currency: string = 'ZAR',
  locale: string = 'en-US'
) =>
  useMemo(() => {
    if (isNaN(amount)) return '';

    // Manual handling if 'toLocaleString' does not work as expected
    const formattedNumber = amount.toLocaleString(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return `R ${formattedNumber}`; // Manually prepend the Rand symbol
  }, [amount, locale]);

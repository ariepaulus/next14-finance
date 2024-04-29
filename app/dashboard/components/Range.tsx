'use client';

import DateRangeSelect from '@/components/DateRangeSelect';
import { DateRange } from '@/enums/enums';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ChangeEvent } from 'react';

interface RangeProps {
  id?: string;
  defaultValue?: DateRange;
  name?: string;
}

export default function Range({ defaultValue }: RangeProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const range =
    searchParams.get('range') ?? defaultValue ?? DateRange.last30days;

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams();
    params.set('range', e.target.value);
    replace(`${pathname}?${params.toString()}`);
  };

  const rangeArray: DateRange[] =
    range === DateRange.last30days
      ? [DateRange.last30days]
      : [DateRange[range as keyof typeof DateRange]];

  return <DateRangeSelect defaultValue={rangeArray} onChange={handleChange} />;
}

import { DateRange } from '@/enums/enums';
import Select from './ui/Select';

interface DateRangeSelectProps {
  id: string;
  defaultValue: DateRange[];
  name: string;
}

export default function DateRangeSelect(props: DateRangeSelectProps) {
  return (
    <Select {...props}>
      <option value='last24hours'>Last 24 hours</option>
      <option value='last7days'>Last 7 days</option>
      <option value='last30days'>Last 30 days</option>
      <option value='last12months'>Last 12 months</option>
    </Select>
  );
}

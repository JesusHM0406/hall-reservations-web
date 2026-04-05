import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

export interface FilterItem<T extends string> {
  value: T;
  label: string;
}

interface FilterSelectProps<T extends string> {
  items: FilterItem<T>[];
  onValueChange: (value: T) => void;
  placeholder: string;
  value: T;
  id: string;
}

export const CustomSelect = <T extends string>({ items, onValueChange, placeholder, value, id }: FilterSelectProps<T>) => {

  return (
    <Select onValueChange={onValueChange} value={value} >
      <SelectTrigger id={id} className='min-w-30 max-w-50 w-full uppercase text-2xs font-bold py-2.5 px-3'>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent position='popper'>
        {items.map((item) => {
          return (
            <SelectItem
              className='text-2xs font-bold uppercase py-2.5 px-3'
              key={item.value}
              value={item.value}>
              {item.label}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  );
};
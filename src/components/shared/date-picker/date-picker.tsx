'use client';

import * as React from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { DateTime } from '@/utils/luxon';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';

export function DatePicker({
  value,
  setValue,
  disabled,
}: {
  value: string;
  setValue: (value: string) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const date = new Date(value);

  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" id="date" className="w-48 h-10 justify-between font-normal">
            {value ? DateTime.fromJSDate(date).toFormat('yyyy-MM-dd') : 'Select date'}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              if (date) {
                setValue(DateTime.fromJSDate(date).toFormat('yyyy-MM-dd'));
              }
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

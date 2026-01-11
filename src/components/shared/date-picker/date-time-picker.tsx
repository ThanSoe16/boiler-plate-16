'use client';

import * as React from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { DateTime } from '@/utils/luxon';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { TimeSelect } from './time-select';

export function DateTimePicker({
  value,
  setValue,
  label = '',
  type = '12hour',
  disabled = false,
}: {
  value: string;
  setValue: (value: string) => void;
  label?: string;
  type?: '12hour' | '24hour';
  disabled?: boolean;
}) {
  const [open, setOpen] = React.useState(false);

  const [tempValue, setTempValue] = React.useState<string>(value);

  const committedDt = React.useMemo(() => {
    const parsed = value ? DateTime.fromISO(value) : null;
    return parsed?.isValid ? parsed : null;
  }, [value]);

  const tempDt = React.useMemo(() => {
    const parsed = tempValue ? DateTime.fromISO(tempValue) : null;
    return parsed?.isValid ? parsed : DateTime.now().set({ second: 0, millisecond: 0 });
  }, [tempValue]);

  const selectedDate = tempValue ? tempDt.toJSDate() : undefined;
  const timeValue = tempDt.toFormat('HH:mm:ss');

  const setDatePart = (picked?: Date) => {
    if (!picked) return;
    const pickedDt = DateTime.fromJSDate(picked);
    const next = pickedDt.set({
      hour: tempDt.hour,
      minute: tempDt.minute,
      second: tempDt.second,
      millisecond: 0,
    });
    setTempValue(next.toISO() ?? '');
  };

  const setTimePart = (t: string) => {
    const [hh, mm, ss = '0'] = t.split(':');
    const next = tempDt.set({
      hour: Number(hh),
      minute: Number(mm),
      second: Number(ss),
      millisecond: 0,
    });
    setTempValue(next.toISO() ?? '');
  };

  return (
    <div className="flex flex-col gap-2">
      <Label className="px-1">{label}</Label>

      <Popover
        open={open}
        onOpenChange={(nextOpen) => {
          setOpen(nextOpen);

          if (nextOpen) setTempValue(value);
        }}
      >
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-between font-normal">
            {committedDt ? committedDt.toFormat('yyyy-MM-dd HH:mm:ss') : 'Select date & time'}
            <ChevronDownIcon className="h-4 w-4 opacity-70" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[335px] p-3" align="start">
          <div className="flex flex-col gap-3 w-full">
            <Calendar
              mode="single"
              selected={selectedDate}
              captionLayout="dropdown"
              onSelect={setDatePart}
              disabled={disabled}
            />

            <div className="flex pl-3 w-full">
              <TimeSelect
                value={timeValue}
                onChange={setTimePart}
                type={type}
                minuteStep={5}
                secondStep={1}
                disabled={disabled}
              />
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setTempValue(value);
                  setOpen(false);
                }}
              >
                Cancel
              </Button>

              <Button
                type="button"
                size="sm"
                onClick={() => {
                  setValue(tempValue);
                  setOpen(false);
                }}
                disabled={disabled}
              >
                Done
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

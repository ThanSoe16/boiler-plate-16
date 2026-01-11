'use client';
import { DatePicker } from '@/components/shared/date-picker/date-picker';
import { DateTimePicker } from '@/components/shared/date-picker/date-time-picker';
import { ISODatePicker } from '@/components/shared/date-picker/iso-date-picker';
import { Flex } from '@radix-ui/themes';
import { useState } from 'react';

const Snippets = () => {
  const [value, setValue] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [value3, setValue3] = useState<string>('');
  return (
    <div>
      <Flex align={'center'} className="gap-2">
        <DatePicker value={value} setValue={setValue} />
        <h2>{value}</h2>
      </Flex>
      <Flex align={'center'} className="gap-2">
        <ISODatePicker value={value2} setValue={setValue2} />
        <h2>{value2}</h2>
      </Flex>
      <Flex align={'center'} className="gap-2">
        <DateTimePicker value={value3} setValue={setValue3} />
        <h2>{value3}</h2>
      </Flex>
    </div>
  );
};

export default Snippets;

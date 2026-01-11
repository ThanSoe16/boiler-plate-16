'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import * as React from 'react';

function pad2(n: number) {
  return String(n).padStart(2, '0');
}

function clamp(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max);
}

function parseTime(value?: string) {
  if (!value) return { hh: 0, mm: 0, ss: 0 };
  const [h = '0', m = '0', s = '0'] = value.split(':');
  return {
    hh: clamp(Number(h) || 0, 0, 23),
    mm: clamp(Number(m) || 0, 0, 59),
    ss: clamp(Number(s) || 0, 0, 59),
  };
}

export function TimeSelect({
  value,
  onChange,
  type = '24hour',
  minuteStep = 1,
  secondStep = 1,
  disabled = false,
  className,
}: {
  value?: string; // always "HH:mm:ss"
  onChange: (value: string) => void;
  type?: '24hour' | '12hour';
  minuteStep?: number;
  secondStep?: number;
  disabled?: boolean;
  className?: string;
}) {
  const { hh, mm, ss } = React.useMemo(() => parseTime(value), [value]);

  const isPM = hh >= 12;
  const displayHour12 = hh % 12 === 0 ? 12 : hh % 12;

  const hours24 = React.useMemo(() => Array.from({ length: 24 }, (_, i) => pad2(i)), []);

  const hours12 = React.useMemo(() => Array.from({ length: 12 }, (_, i) => pad2(i + 1)), []);

  const minutes = React.useMemo(
    () => Array.from({ length: Math.ceil(60 / minuteStep) }, (_, i) => pad2(i * minuteStep)),
    [minuteStep],
  );

  const seconds = React.useMemo(
    () => Array.from({ length: Math.ceil(60 / secondStep) }, (_, i) => pad2(i * secondStep)),
    [secondStep],
  );

  const update = ({
    h = hh,
    m = mm,
    s = ss,
    pm = isPM,
  }: {
    h?: number;
    m?: number;
    s?: number;
    pm?: boolean;
  }) => {
    let hour24 = h;

    if (type === '12hour') {
      if (pm) {
        hour24 = h === 12 ? 12 : h + 12;
      } else {
        hour24 = h === 12 ? 0 : h;
      }
    }

    onChange(`${pad2(hour24)}:${pad2(m)}:${pad2(s)}`);
  };

  return (
    <div className={`flex gap-2 w-[275px] ${className ?? ''}`}>
      {/* Hour */}
      <Select
        value={pad2(type === '12hour' ? displayHour12 : hh)}
        onValueChange={(v) => update({ h: Number(v) })}
        disabled={disabled}
      >
        <SelectTrigger className="w-18 p-2">
          <SelectValue placeholder="HH" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="max-h-64 overflow-auto">
            {(type === '12hour' ? hours12 : hours24).map((h) => (
              <SelectItem key={h} value={h}>
                {h}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Minute */}
      <Select value={pad2(mm)} onValueChange={(v) => update({ m: Number(v) })} disabled={disabled}>
        <SelectTrigger className="w-18 p-2">
          <SelectValue placeholder="MM" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="max-h-64 overflow-auto">
            {minutes.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Second */}
      <Select value={pad2(ss)} onValueChange={(v) => update({ s: Number(v) })} disabled={disabled}>
        <SelectTrigger className="w-18 p-2">
          <SelectValue placeholder="SS" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="max-h-64 overflow-auto">
            {seconds.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* AM / PM (12 hour only) */}
      {type === '12hour' && (
        <Select
          value={isPM ? 'PM' : 'AM'}
          onValueChange={(v) => update({ pm: v === 'PM' })}
          disabled={disabled}
        >
          <SelectTrigger className="w-18 p-2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AM">AM</SelectItem>
            <SelectItem value="PM">PM</SelectItem>
          </SelectContent>
        </Select>
      )}
    </div>
  );
}

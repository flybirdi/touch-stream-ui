import React from 'react';
import { offsetTz } from 'utils/timezone';
import { format } from 'date-fns';

function tzUTCOffset() {
  const offset = -(new Date().getTimezoneOffset() / 60);
  if (offset === 0) return 0;
  if (offset > 0) return `+${offset}`;
  if (offset < 0) return `-${offset}`;
}

export const TimeFormat = ({ time: rawTime, locale = undefined }) => {
  if (!rawTime) return <span>-</span>;
  const time = locale ? offsetTz(rawTime, locale) : rawTime;
  return (
    <div>
      <span>{format(time, 'HH:mm DD MMM')} {!locale && `(UTC${tzUTCOffset()})`}</span>
      <span>{locale && ` (${locale})`}</span>
    </div>
  );
};

import {
  addMinutes, subMinutes, parse,
} from 'date-fns';
import getTzOffset from 'get-timezone-offset';

export function offsetTz(date, timezone) {
  const originOffset = getTzOffset(timezone);
  const localOffset = (new Date().getTimezoneOffset());
  const offset = localOffset - originOffset;
  return Math.sign(offset) !== -1 ? addMinutes(date, offset) : subMinutes(date, Math.abs(offset));
}

// Input range of local dates
// get beginning of day in specified timezone
export function getOffsetDateRange(dateRange) {
  return dateRange.map((date) => {
    // Beginning of day GMT+0
    const parsedDate = parse(`${date}T00:00:00`);
    // Beginning of day GMT+/-offset
    return parsedDate;
  });
}

export function isSameDay(zeroDay, checkDay) {
  const zeroDayValue = new Date(zeroDay).valueOf();
  const checkDayValue = new Date(checkDay).valueOf();
  if ((checkDayValue - zeroDayValue) / 1000 / 3600 > 24) return false;
  if ((checkDayValue - zeroDayValue) / 1000 / 3600 < 0) return false;
  return true;
}

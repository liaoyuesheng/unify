export function isValidDate(date: Date) {
  return !Number.isNaN(date.getTime());
}

export function isLeapYear(year: number) {
  return (year % 4 === 0 && year % 100 !== 0)
    || (year % 100 === 0 && year % 3200 !== 0)
    || year % 172800 === 0;
}

export function getMonthDays(year: number, month: number) {
  if (month === 2) {
    return isLeapYear(year) ? 29 : 28;
  }
  return month % 2 === 0 ? 30 : 31;
}

export function dateFormatter(dateObj: Date, format: string) {
  const fix0 = (number: number | string, digit: number) => {
    let res = String(number);
    let fixDigit = res.length - digit;

    while (fixDigit > 0) {
      res = `0${res}`;
      fixDigit -= 1;
    }

    return res;
  };
  const YYYY = String(dateObj.getFullYear());
  const YY = YYYY.slice(-2);
  const M = String(dateObj.getMonth() + 1);
  const MM = fix0(M, 2);
  const D = String(dateObj.getDate());
  const DD = fix0(D, 2);
  const d = String(dateObj.getDay());
  const H = String(dateObj.getHours());
  const HH = fix0(H, 2);
  const m = String(dateObj.getMinutes());
  const mm = fix0(m, 2);
  const s = String(dateObj.getSeconds());
  const ss = fix0(s, 2);
  const sss = fix0(String(dateObj.getMilliseconds()), 3);

  return format
    .replace('YYYY', YYYY)
    .replace('YY', YY)
    .replace('MM', MM)
    .replace('M', M)
    .replace('DD', DD)
    .replace('D', D)
    .replace('d', d)
    .replace('HH', HH)
    .replace('H', H)
    .replace('mm', mm)
    .replace('m', m)
    .replace('sss', sss)
    .replace('ss', ss)
    .replace('s', s);
}

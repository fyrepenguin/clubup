export function parsePrice(price: number | bigint): string {
  return new Intl.NumberFormat('ko', { style: 'currency', currency: 'KRW' }).format(price);
}

export function parseDate(date: string) {
  // workaround for firefox bug
  const formattedDate = new Date(date);
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
  }).format(formattedDate);
}
const parsers = { parseDate, parsePrice };

export default parsers;

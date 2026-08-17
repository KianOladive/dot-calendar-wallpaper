export function getDotCounts(startDate, endDate, timezone = 'UTC') {
  if (!startDate || !endDate) {
    return { dotCount: null, highlightedDotCount: null }
  }
  const end = new Date(endDate);
  const start = new Date(startDate);
  const todayString = new Intl.DateTimeFormat('en-CA', { timeZone: timezone }).format(new Date())
  const today = new Date(todayString);
  const dotCount = (end - start) / (1000 * 60 * 60 * 24) + 1;
  const highlightedDotCount = Math.floor((today - start) / (1000 * 60 * 60 * 24));
  return { dotCount, highlightedDotCount }
}

export function getMonthDotCounts(timezone = 'UTC') {
  const todayString = new Intl.DateTimeFormat('en-CA', { timeZone: timezone }).format(new Date())
  const [year, month, day] = todayString.split('-').map(Number);
  const dotCount = new Date(year, month, 0).getDate();
  const highlightedDotCount = day - 1;
  const offset = new Date(year, month - 1, 1).getDay();
  const monthName = new Intl.DateTimeFormat('en-US', {month: 'long'}).format(new Date(year, month - 1, 1));
  return { dotCount, highlightedDotCount, offset, monthName }
}

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

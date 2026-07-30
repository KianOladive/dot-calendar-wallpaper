export function getDotCounts(startDate, endDate) {
  const end = new Date(endDate);
  const start = new Date(startDate);
  const today = new Date();
  const dotCount = (end - start) / (1000 * 60 * 60 * 24) + 1;
  const highlightedDotCount = Math.floor((today - start) / (1000 * 60 * 60 * 24)) + 1;
  return { dotCount, highlightedDotCount }
}

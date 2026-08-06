export function getDotCounts(startDate, endDate) {
  if (!startDate || !endDate) {
    return { dotCount: null, highlightedDotCount: null }
  }
  const end = new Date(endDate);
  const start = new Date(startDate);
  const today = new Date();
  const dotCount = (end - start) / (1000 * 60 * 60 * 24) + 1;
  const highlightedDotCount = Math.floor((today - start) / (1000 * 60 * 60 * 24));
  return { dotCount, highlightedDotCount }
}

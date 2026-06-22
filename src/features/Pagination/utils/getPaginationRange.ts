export const getPaginationRange = (
  currentPage: number,
  totalPages: number
): (number | '...')[] => {
  const siblings = 2;
  const range: (number | '...')[] = [];

  if (totalPages <= siblings) {
    for (let i = 1; i <= totalPages; i += 1) range.push(i);

    return range;
  }

  const leftSiblingIndex = Math.max(1, currentPage - siblings);
  const rightSiblingIndex = Math.min(totalPages, currentPage + siblings);

  const showLeftDots = leftSiblingIndex > siblings;
  const showRightDots = rightSiblingIndex < totalPages - siblings;

  if (showLeftDots) {
    range.push(1);
    range.push('...');
  }

  for (let i = leftSiblingIndex; i <= rightSiblingIndex; i += 1) range.push(i);

  if (showRightDots) {
    range.push('...');
    range.push(totalPages);
  }

  return range;
};

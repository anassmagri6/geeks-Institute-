export function authorName(author) {
  if (typeof author === 'string') return author;
  return author?.name || 'Olivia Bennett';
}

export function recordId(record) {
  return record?.id || record?._id;
}

export function initials(author) {
  return authorName(author)
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function formatDate(value) {
  if (!value) return 'Oct 9, 2026';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

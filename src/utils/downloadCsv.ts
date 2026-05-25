import type { CardType } from '../components/Card/Card';

const escapeCsvValue = (value: string): string => {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
};

const buildCsvContent = (items: CardType[]): string => {
  const header = ['Name', 'Description', 'Details URL', 'Image URL', 'ID'];
  const rows = items.map((item) =>
    [item.title, item.description, item.link, item.image, String(item.id)].map(
      escapeCsvValue
    )
  );

  return [header.join(','), ...rows.map((row) => row.join(','))].join('\n');
};

export const downloadSelectedItemsAsCsv = (items: CardType[]): void => {
  if (items.length === 0) {
    return;
  }

  const csvContent = buildCsvContent(items);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${items.length}_items.csv`;
  link.click();
  URL.revokeObjectURL(url);
};

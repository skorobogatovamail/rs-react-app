import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const data = await request.json();
  const items = data.items || [];

  if (items.length === 0) {
    return new NextResponse('No items to export', { status: 400 });
  }

  const headers = ['ID', 'Title', 'Description', 'Image', 'Link'];
  const csvRows = [
    headers.join(','),
    ...items.map(
      (item: {
        id: number;
        title: string;
        description: string;
        image: string;
        link: string;
      }) =>
        [
          item.id,
          `"${item.title.replace(/"/g, '""')}"`,
          `"${item.description.replace(/"/g, '""')}"`,
          item.image,
          item.link,
        ].join(',')
    ),
  ];

  const csvContent = csvRows.join('\n');

  return new NextResponse(csvContent, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename=characters.csv',
    },
  });
}

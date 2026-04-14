export default {
  name: 'keynote',
  title: 'Keynote Topics',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    },
    {
      name: 'videoUrl',
      title: 'Video URL (YouTube)',
      type: 'url',
    },
  ],
  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', order: 'order' },
    prepare(selection: any) {
      return {
        title: selection.title,
        subtitle: `Order: ${selection.order ?? '—'}`,
      };
    },
  },
};

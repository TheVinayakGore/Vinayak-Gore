import { defineField, defineType } from "sanity";

export const gallery = defineType({
  title: "Gallery",
  name: "gallery",
  type: "document",
  fields: [
    defineField({
      title: "Title",
      name: "title",
      type: "string",
    }),
    defineField({
      title: "Image",
      name: "image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          title: "Attribution",
          name: "attribution",
          type: "string",
        },
      ],
    }),
  ],
});

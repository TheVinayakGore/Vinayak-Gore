import { defineField, defineType } from "sanity";

export const figma = defineType({
  name: "figma",
  title: "Figma",
  type: "document",
  fields: [
    defineField({
      title: "Image",
      name: "image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "attribution",
          type: "string",
          title: "Attribution",
        },
      ],
    }),
    defineField({
      title: "Title",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Download",
      name: "downloadurl",
      type: "url",
    }),
  ],
});

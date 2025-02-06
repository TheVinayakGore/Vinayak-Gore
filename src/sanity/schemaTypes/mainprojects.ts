import { defineField, defineType } from "sanity";

export const mainprojects = defineType({
  title: "Main Projects",
  name: "mainprojects",
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
      title: "Description",
      name: "description",
      type: "string",
    }),
    defineField({
      title: "Project URL",
      name: "projectUrl",
      type: "url",
      description: "URL to the project",
      validation: (Rule) => Rule.uri({ allowRelative: false }),
    }),
  ],
});

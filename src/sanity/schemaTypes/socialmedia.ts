import { defineField, defineType } from "sanity";

export const socialMedia = defineType({
  title: "Social Media",
  name: "socialMedia",
  type: "document",
  fields: [
    defineField({
      title: "Title",
      name: "title",
      type: "string",
    }),
    defineField({
      title: "Short Description",
      name: "desc",
      type: "string",
    }),
    defineField({
      title: "Icon Image",
      name: "img",
      type: "image",
      options: {
        hotspot: true,
      }
    }),
    defineField({
      title: "URL Link",
      name: "UrlLink",
      type: "url",
      description: "URL link to the social Media profile",
      validation: (Rule) => Rule.uri({ allowRelative: false }),
    }),
  ],
});

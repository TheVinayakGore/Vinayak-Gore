import { defineField, defineType } from "sanity";

export const comment = defineType({
  name: "comment",
  title: "  Comment",
  type: "document",
  fields: [
    defineField({
      title: "Name",
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
